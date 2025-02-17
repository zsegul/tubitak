"use client";
import ProjectsComponent from "./project/ProjectsTable";
import ExperienceTable from "./experience/ExperienceTable";
import ContributionsTable from "./contribution/ContributionsTable";
import { axiosInstance } from "@/config/axios_config";
import EducationTable from "./education/educationTable";
import FilesTable from "./file/FilesTable";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import UserInfoForm from "@/app/pages/hakkinda/kisisel";
import CompInfoForm from "@/app/pages/hakkinda/kurumsal";
import { useAvatar } from "@/app/contexts/AvatarContext";
import { useUserFrom } from "@/app/contexts/UserFormContext";
import { useCompForm } from "@/app/contexts/CompFormContext";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";


export default function Hakkinda() {
  const [avatar, setAvatar] = useState();
  const [userFormData, setUserFormData] = useState();
  const [compFormData, setCompFormData] = useState();


  const searchParams = useSearchParams();
  const userId = searchParams.get("id");



  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axiosInstance.get("/user/getProfile", { params: { userId: userId, } });

        console.log(response)

        setUserFormData(response?.data?.userInformation);
        setCompFormData(response?.data?.compInformation)
        setAvatar(`data:image/png;base64,${response?.data?.avatar?.body}`);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [avatar, setAvatar, setUserFormData, setCompFormData]);


  const [selectedFile, setSelectedFile] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null);
  const [isNewAvatarUploaded, setIsNewAvatarUploaded] = useState(false);




  const handleSubmit = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('avatar', selectedFile);
      formData.append('userId', userId);

      const uploadResponse = await axiosInstance.post('/user/uploadAvatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const base64Image = uploadResponse.data.avatar;
      if (base64Image) {
        setAvatar(`data:image/png;base64,${uploadResponse.data.avatar}`)
        setIsNewAvatarUploaded(false);
      } else {
        console.error('Avatar data is missing in the response.');
      }
    }

    const updateResponse = await axiosInstance.put('/user/updateProfile', {
      userId: userId,
      userInformation: userFormData,
      compInformation: compFormData,
    });

    const { userInformation, compInformation } = updateResponse.data;

    setUserFormData((prevData) => ({ ...prevData, ...userInformation }));
    setCompFormData((prevData) => ({ ...prevData, ...compInformation }));
    toast.success("Changes are saved!");


  };

  return (

    <Box sx={{ background: '#f0f0f0', padding: '10px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginRight: '25px' }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          KAYDET
        </Button>
      </Box>

      {userFormData !== undefined && (<Box direction='row' sx={{ display: 'flex' }}>
        <UserInfoForm
          userId={userId}
          newAvatar={newAvatar}
          setNewAvatar={setNewAvatar}
          isNewAvatarUploaded={isNewAvatarUploaded}
          setIsNewAvatarUploaded={setIsNewAvatarUploaded}
          avatar={avatar}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          formData={userFormData}
          setFormData={setUserFormData}
        />

        <CompInfoForm
          formData={compFormData}
          setFormData={setCompFormData}
        />
      </Box>)}

      {userId !== undefined && (<ProjectsComponent userId={userId} />)}

      {userId !== undefined && (<EducationTable userId={userId} />)}

      {userId !== undefined && (<ContributionsTable userId={userId} />)}

      {userId !== undefined && (<ExperienceTable userId={userId} />)}

      {userId !== undefined && (<FilesTable userId={userId} />)}

    </Box>
  );
}

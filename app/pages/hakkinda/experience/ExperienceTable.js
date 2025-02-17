'use client'
import React, {useEffect, useContext} from 'react';
import { Card, CardContent, Typography, Table, IconButton, TableHead, TableRow, TableCell, TableBody, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Portrait } from "@mui/icons-material";
import ExperienceAddForm from './ExperienceAddForm'
import ExperienceUpdateForm from './ExperienceUpdateForm'
import { ExperienceContext, ExperienceProvider } from '../../../contexts/ExperienceContext';
import { axiosInstance } from '@/config/axios_config';
import { useSearchParams } from "next/navigation";

const ExperienceTable = () => {
  const { experienceData,
    setExperienceData,
    openAddDialog,
    setOpenAddDialog,
    openUpdateDialog,
    setOpenUpdateDialog,
    experienceToUpdate,
    setExperienceToUpdate
  } = useContext(ExperienceContext);

  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  useEffect(() => {
    axiosInstance.get(`/user/experience/${userId}`)
      .then(response => {
        setExperienceData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [setExperienceData]);


  function handleDelete(experienceId) {
    axiosInstance.delete(`/user/experience/${userId}/delete/${experienceId}`)
    .then(response => {
      setExperienceData(response.data);
    })
      .catch(error => {
        console.log(error);
      });
  }


  return (

    <Card sx={{ borderRadius: '10px', borderBottom: '4px solid red !important', border: '2px solid lightgray', marginTop: '20px', marginLeft: '15px', marginRight: '15px'}}>
      <CardContent>

        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

          <Box sx={{padding: '10px', display: 'flex', alignItems: 'center', mb: 2}}>
            <Portrait sx={{color: 'red', width: '40px', height: '40px', marginRight: '25px'}} />
            <Typography variant="h6" sx={{fontSize: '18px', flexGrow: 1, fontWeight: 'bold'}}>
              DENEYİM
            </Typography>
          </Box>

          <Button
              variant="contained"
              style={{ backgroundColor: '#4CAF50', color: 'white', borderRadius: '10px', padding: '10px 20px', marginRight: '30px' }}
              startIcon={<AddIcon />}
              onClick={() => { setOpenAddDialog(true) }}
          >
            EKLE
          </Button>
        </Box>

        <ExperienceAddForm userId = {userId} open={openAddDialog}></ExperienceAddForm>
        <ExperienceUpdateForm userId = {userId} open={openUpdateDialog}></ExperienceUpdateForm>
        <Table>
          <TableHead>
            <TableRow display="flex">
              <TableCell width='15.15%'>Çalıştığı Kurum Adı</TableCell>
              <TableCell width='15.15%'>Çalıştığı Pozisyon</TableCell>
              <TableCell width='15.15%'>Çalışma Şekli</TableCell>
              <TableCell width='15.15%'>İşe Başlama Tarihi</TableCell>
              <TableCell width='15.15%'>İşten Çıkış Tarihi</TableCell>
              <TableCell width='15.15%'>İşten Ayrılış Nedeni</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              experienceData.length === 0 ?
                <TableRow>
                  <TableCell colSpan={6}>
                    Kullanıcı henüz deneyim bilgisi girmemiş.
                  </TableCell>
                </TableRow>
                :
                experienceData.map(experience => (
                  <TableRow key={experience.id}>
                    <TableCell>{experience.companyName === null | experience.companyName === "" ? "-" : experience.companyName}</TableCell>
                    <TableCell>{experience.title === null | experience.title === "" ? "-" : experience.title}</TableCell>
                    <TableCell>{experience.typeOfEmployment === null | experience.typeOfEmployment === "" ? "-" : experience.typeOfEmployment}</TableCell>
                    <TableCell>{experience.startDate === null | experience.startDate === "" ? "-" : experience.startDate}</TableCell>
                    <TableCell>{experience.endDate === null | experience.endDate === "" ? "Devam ediyor" : experience.endDate}</TableCell>
                    <TableCell>{experience.reasonForLeavingEmployment === null | experience.reasonForLeavingEmployment === "" ? "Devam ediyor" : experience.reasonForLeavingEmployment}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => {
                        setExperienceToUpdate({ ...experience, ongoing: experience.endDate === null })
                        setOpenUpdateDialog(true);
                      }
                      }>
                        <EditIcon style={{ width: 16, height: 16 }} />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(experience.id)}>
                        <DeleteIcon style={{ width: 16, height: 16 }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const App = () => {
  return (
      <ExperienceProvider>
          <ExperienceTable/>
      </ExperienceProvider>
  );
};

export default App;
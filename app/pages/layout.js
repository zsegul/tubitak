"use client";
import React, {useState, useEffect} from 'react';
import {Container, CircularProgress, Box, CssBaseline} from '@mui/material';
import AdminNavbar from '../nav_bars/AdminNavBar';
import UserNavbar from '../nav_bars/UserNavBar';
import { useRouter } from 'next/navigation';
import {ToastContainer} from "react-toastify";
import {axiosInstance} from "@/config/axios_config";
import {useAvatar} from "@/app/contexts/AvatarContext";
import {useUserFrom} from "@/app/contexts/UserFormContext";
import {useCompForm} from "@/app/contexts/CompFormContext";
import { EnumProvider } from '../contexts/EnumContext';

const Layout = ({ children }) => {

  const {avatar, setAvatar} = useAvatar();
  const {userFormData, setUserFormData} = useUserFrom();
  const {compFormData, setCompFormData} = useCompForm();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const calculateDuration = (startDate) => {
    const start = new Date(startDate);
    const end = new Date();

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  };

  useEffect(() => {
    const authority = localStorage.getItem('authority');
    if (authority) {
      setIsAuthenticated(true);
      setLoading(false);
      setIsAdmin(authority.includes('ADMIN'));
    } else {
      setIsAuthenticated(false);
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("id");

        const response = await axiosInstance.get("/user/getProfile",{params: {userId: id,}});

        setUserFormData(response?.data?.userInformation);
        setCompFormData(response?.data?.compInformation)
        setAvatar(`data:image/png;base64,${response?.data?.avatar?.body}`);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [avatar, setAvatar, setUserFormData, setCompFormData]);

  const { years, months, days } = calculateDuration(compFormData?.iseGirisTarihi || new Date());


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (

    <EnumProvider>
      <CssBaseline/>
      {isAuthenticated && (isAdmin ? <AdminNavbar years={years} months={months} days={days} mentor={compFormData?.mentor}/> : <UserNavbar years={years} months={months} days={days} mentor={compFormData?.mentor}/>)}

      <div>
        <ToastContainer/>
        {children}
      </div>
    </EnumProvider>

  );
};

export default Layout;
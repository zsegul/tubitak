"use client";
import React from 'react';
import { useContext, useEffect } from 'react';
import { axiosInstance } from '@/config/axios_config';
import {Card, CardContent, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Avatar, Box} from '@mui/material';
import {Portrait} from "@mui/icons-material";
import { ProjectsContext, ProjectsProvider } from '../../../contexts/ProjectsContext';
import { useSearchParams } from "next/navigation";

const ProjectsTable = () => {

  const { data, setData } = useContext(ProjectsContext);
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  useEffect(() => {
    axiosInstance.get(`/user/${userId}/projects`)
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.log(error);
        });
}, [setData]);

  return (
    <Card sx={{ borderRadius: '10px', borderBottom: '4px solid red !important', border: '2px solid lightgray', marginTop: '20px', marginLeft: '15px', marginRight: '15px'}}>
      <CardContent>

        <Box sx={{padding: '10px', display: 'flex', alignItems: 'center', mb: 2}}>
          <Portrait sx={{color: 'red', width: '40px', height: '40px', marginRight: '25px'}} />
          <Typography variant="h6" sx={{fontSize: '18px', flexGrow: 1, fontWeight: 'bold'}}>
            DAHİL OLUNAN PROJELER
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow display="flex">
                <TableCell>Proje Adı</TableCell>
                <TableCell>Takım</TableCell>
                <TableCell>Görevi</TableCell>
                <TableCell>Başlangıç Tarihi</TableCell>
                <TableCell>Bitiş Tarihi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(project => (
                <TableRow key={project.id}>
                  <TableCell>{project.projectName === null | project.projectName === "" ? "-" : project.projectName }</TableCell>
                  <TableCell>{project.teamName === null | project.teamName === "" ? "-" : project.teamName}</TableCell>
                  <TableCell>{project.title === null | project.title === "" ? "-" : project.title}</TableCell>
                  <TableCell>{project.startDate === null | project.startDate === "" ? "-" : project.startDate}</TableCell>
                  <TableCell>{project.endDate === null | project.endDate === "" ? "-" : project.endDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

const App = () => {
  return (
      <ProjectsProvider>
          <ProjectsTable/>
      </ProjectsProvider>
  );
};

export default App;
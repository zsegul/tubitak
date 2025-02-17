import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EducationAddForm from "./educationAddForm";
import DeleteIcon from '@mui/icons-material/Delete';
import {EducationContext, EducationProvider} from '../../../contexts/educationContext';
import AddIcon from '@mui/icons-material/Add';
import EducationUpdateForm from './educationUpdateForm';
import {Portrait} from "@mui/icons-material";
import {axiosInstance} from '@/config/axios_config';
import { useSearchParams } from "next/navigation";

const EducationTable = () => {
    const { data, setData } = useContext(EducationContext);
    const [openAdd, setOpenAdd] = useState(false);
    const [educationToUpdate, setEducationToUpdate] = useState(
        "",
        "",
        "",
        "",
        "",
        false,
        ""
    );
    const searchParams = useSearchParams();
    const userId = searchParams.get("id");
    const [openUpdate, setOpenUpdate] = useState(false);

    const handleOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };
    const handleOpenUpdate = () => {
        setOpenUpdate(true);
    };

    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    };

    useEffect(() => {
        axiosInstance.get(`/user/${userId}/education`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [setData]);

    function handleDelete(educationId) {
        axiosInstance.delete(`/user/${userId}/education/${educationId}/delete`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    return (
        <Card sx={{ borderRadius: '10px', borderBottom: '4px solid red !important', border: '2px solid lightgray', marginTop: '20px', marginLeft: '15px', marginRight: '15px', marginBottom: '20px' }}>
            <CardContent>

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                    <Box sx={{ padding: '10px', display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Portrait sx={{ color: 'red', width: '40px', height: '40px', marginRight: '25px' }} />
                        <Typography variant="h6" sx={{ fontSize: '18px', flexGrow: 1, fontWeight: 'bold' }}>
                            EĞİTİM
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#4CAF50', color: 'white', borderRadius: '10px', padding: '10px 20px', marginRight: '30px' }}
                        startIcon={<AddIcon />}
                        onClick={handleOpenAdd}
                    >
                        EKLE
                    </Button>

                </Box>

                <EducationAddForm  open={openAdd} handleClose={handleCloseAdd} />
                <EducationUpdateForm open={openUpdate} handleClose={handleCloseUpdate} education={educationToUpdate} setEducation={setEducationToUpdate} />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Eğitim Türü</TableCell>
                            <TableCell>Üniversite/Okul</TableCell>
                            <TableCell>Bölüm</TableCell>
                            <TableCell>Başlangıç Tarihi</TableCell>
                            <TableCell>Mezuniyet Tarihi</TableCell>
                            <TableCell>Açıklama</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.length === 0 ?
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        Kullanıcı henüz eğitim bilgisi girmemiş.
                                    </TableCell>
                                </TableRow>
                                :
                                data.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.type === null || row.type === "" ? "-" : row.type}</TableCell>
                                        <TableCell>{row.university === null || row.university === "" ? "-" : (row.university.split(":").length === 2 ? row.university.split(":")[1] : row.university.split(":")[0])}</TableCell>
                                        <TableCell>{row.department === null || row.department === "" ? "-" : row.department}</TableCell>
                                        <TableCell>{row.startDate === null || row.startDate === "" ? "-" : row.startDate}</TableCell>
                                        <TableCell>{row.graduationDate === null || row.graduationDate === "" ? "-" : row.graduationDate}</TableCell>
                                        <TableCell>{row.explanation === null || row.explanation === "" ? "-" : row.explanation}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => {
                                                setEducationToUpdate({ ...row, ongoing: row.graduationDate === null })
                                                handleOpenUpdate()
                                            }
                                            }>
                                                <EditIcon style={{ width: 16, height: 16 }} />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(row.id)}>
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
        <EducationProvider>
            <EducationTable />
        </EducationProvider>
    );
};

export default App;

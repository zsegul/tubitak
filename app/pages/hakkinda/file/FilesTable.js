'use client';
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
import DownloadIcon from '@mui/icons-material/Download';
import FilesAddForm from "./FilesAddForm";
import DeleteIcon from '@mui/icons-material/Delete';
import {FilesContext, FilesProvider} from '../../../contexts/FilesContext';
import AddIcon from '@mui/icons-material/Add';
import {toast} from 'react-toastify';
import {Portrait} from "@mui/icons-material";
import {axiosInstance} from '@/config/axios_config';
import { useSearchParams } from "next/navigation";


const FilesTable = () => {
    const { data, setData } = useContext(FilesContext);
    const [openAdd, setOpenAdd] = useState(false);
    const searchParams = useSearchParams();
    const userId = searchParams.get("id");
    const handleOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    useEffect(() => {
        axiosInstance.get(`/file/allFiles/${userId}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [setData]);

    function handleDelete(fileId) {
        axiosInstance.delete(`/file/delete/${fileId}`)
        .then(response => {
            setData(response.data);
            toast.success("Dosya başarıyla silindi!");
        })
            .catch(error => {
                console.log(error);
            });
    }

    function handleDownload(fileId) {
        axiosInstance.get(`/file/download/${fileId}`, {
            responseType: 'blob'
        }).then(response => {
            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            window.open(url);
        }).catch(error => {
            toast.error("File was not found!");
            console.error('Error downloading file:', error);
        });
    }

    return (
        <Card sx={{ borderRadius: '10px', borderBottom: '4px solid red !important', border: '2px solid lightgray', marginTop: '20px', marginLeft: '15px', marginRight: '15px'}}>
            <CardContent>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                    <Box sx={{ padding: '10px', display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Portrait sx={{ color: 'red', width: '40px', height: '40px', marginRight: '25px' }} />
                        <Typography variant="h6" sx={{ fontSize: '18px', flexGrow: 1, fontWeight: 'bold' }}>
                            DOSYALAR
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


                <FilesAddForm open={openAdd} handleClose={handleCloseAdd} />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width='22.75%'>Dosya Türü</TableCell>
                            <TableCell width='22.75%'>Dosya Adı</TableCell>
                            <TableCell width='22.75%'>Bölüm</TableCell>
                            <TableCell width='22.75%'>Yükleme Tarihi</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data === undefined || data.length === 0 ?
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        Kullanıcı henüz dosya oluşturmamış.
                                    </TableCell>
                                </TableRow>
                                :
                                data.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.fileType === null || row.fileType === "" ? "-" : row.fileType}</TableCell>
                                        <TableCell>{row.fileName === null || row.fileName === "" ? "-" : (row.fileName)}</TableCell>
                                        <TableCell>{row.department === null || row.department === "" ? "-" : row.department}</TableCell>
                                        <TableCell>{row.uploadDate === null || row.uploadDate === "" ? "-" : row.uploadDate}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleDownload(row.id)}>
                                                <DownloadIcon style={{ width: 16, height: 16 }} />
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
        <FilesProvider>
            <FilesTable />
        </FilesProvider>
    );
};

export default App;
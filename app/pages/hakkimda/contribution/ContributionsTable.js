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
import ContributionAddForm from "./ContributionAddForm";
import DeleteIcon from '@mui/icons-material/Delete';
import {ContributionContext, ContributionProvider} from '../../../contexts/ContributionContext';
import AddIcon from '@mui/icons-material/Add';
import ContributionUpdateForm from './ContributionUpdateForm';
import {toast} from 'react-toastify';
import ClickableFile from '@/app/styles/ClickableFile';
import {Portrait} from "@mui/icons-material";
import {axiosInstance} from '@/config/axios_config';

const ContributionsTable = () => {
    const { data, setData } = useContext(ContributionContext);
    const [openAdd, setOpenAdd] = useState(false);
    const [contributionToUpdate, setContributionToUpdate] = useState(
        "",
        "",
        "",
        "",
        ""
    );

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
        const userId = localStorage.getItem('id');
        axiosInstance.get(`/contribution/allContributions/${userId}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [setData]);

    function handleDelete(contributionId) {
        axiosInstance.delete(`/contribution/delete/${contributionId}`)
            .then(response => {
                setData(response.data);
                toast.success("Katkı başarıyla silindi!");
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
        <Card sx={{ borderRadius: '10px', borderBottom: '4px solid red !important', border: '2px solid lightgray', marginTop: '20px', marginLeft: '15px', marginRight: '15px' }}>
            <CardContent>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                    <Box sx={{ padding: '10px', display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Portrait sx={{ color: 'red', width: '40px', height: '40px', marginRight: '25px' }} />
                        <Typography variant="h6" sx={{ fontSize: '18px', flexGrow: 1, fontWeight: 'bold' }}>
                            KATKILAR
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
                <ContributionAddForm open={openAdd} handleClose={handleCloseAdd} />
                <ContributionUpdateForm open={openUpdate} handleClose={handleCloseUpdate} contribution={contributionToUpdate} setContribution={setContributionToUpdate} />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width='18.16%'>Etkinlik Türü</TableCell>
                            <TableCell width='18.16%'>Açıklama</TableCell>
                            <TableCell width='18.16%'>Link</TableCell>
                            <TableCell width='18.16%'>Ek(ler)</TableCell>
                            <TableCell width='18.16%'>Yükleme Tarihi</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data === undefined || data.length === 0 ?
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        Kullanıcı henüz katkı bilgisi girmemiş.
                                    </TableCell>
                                </TableRow>
                                :
                                data.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.eventType === null || row.eventType === "" ? "-" : row.eventType}</TableCell>
                                        <TableCell>{row.description === null || row.description === "" ? "-" : (row.description)}</TableCell>
                                        <TableCell>{row.link === null || row.link === "" ? "-" : row.link}</TableCell>
                                        <TableCell>{row.fileResponseList.length === 0 ? "-" : row.fileResponseList.map((fileResponse =>
                                            <ClickableFile
                                                key={fileResponse.id}
                                                fileResponse={fileResponse}
                                                handleDownload={handleDownload}
                                            />
                                        ))}</TableCell>
                                        <TableCell>{row.fileResponseList.length === undefined ||
                                            row.fileResponseList.length === null ||
                                            row.fileResponseList.length === 0 ? "-" : row.fileResponseList.map((fileResponse =>
                                                <div key={fileResponse.id}>
                                                    {fileResponse.uploadDate}
                                                </div>
                                            ))}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => {
                                                setContributionToUpdate({ ...row })
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
        <ContributionProvider>
            <ContributionsTable />
        </ContributionProvider>
    );
};

export default App;

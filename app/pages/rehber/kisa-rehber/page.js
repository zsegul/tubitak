import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    Box,
    Stack,
    Divider,
    Avatar, TableRow, TableCell, TableHead, TableBody, Table, TableContainer
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphone from "@mui/icons-material/PhoneIphone";
import { toast } from "react-toastify";
import { axiosInstance } from "@/config/axios_config";
import ClickableFile from "@/app/styles/ClickableFile";

const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => toast("Copied to clipboard"));
};

const RehberPopup = ({ open, onClose, userId }) => {
    const [rehberData, setRehberData] = useState({});

    useEffect(() => {
        axiosInstance.get(`/user/rehber/${userId}`)
            .then(response => {
                setRehberData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [userId]);


    function handleDownload(fileId) {
        axiosInstance.get(`/file/download/${fileId}`)
            .then(response => {
                const blob = new Blob([response.data], { type: "application/pdf" });
                const url = URL.createObjectURL(blob);
                window.open(url);
            }).catch(error => {
            console.error('Error downloading file:', error);
        });
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={onClose}
                    aria-label="close"
                    sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Stack
                    direction="column"
                    spacing={4}
                    sx={{ p: 2 }}
                >
                    <Box display="flex" justifyContent="space-between" >
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                            <Avatar
                                alt={rehberData.fullName}
                                src={rehberData?.image ? `data:image/jpg;base64,${rehberData?.image}` : undefined}
                                sx={{ width: 60, height: 60 }}
                            />
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {rehberData?.fullName}
                                </Typography>
                                <Typography>{rehberData?.department}</Typography>
                                <Typography>
                                    {rehberData?.title} - {rehberData?.projectInWork || "Proje Adı Gelecek"}
                                </Typography>
                            </Box>
                        </Stack>

                        <Stack display="flex-box" justifyContent="space-between">
                            <Box display="flex"   >
                                <Typography sx={{ fontWeight: 'bold' }}>Oda:</Typography>
                                <Typography>{rehberData?.roomNo}</Typography>
                            </Box>
                            <Box display="flex"  >
                                <Typography sx={{ fontWeight: 'bold' }}>Sicil No:</Typography>
                                <Typography>{rehberData?.recordNo}</Typography>
                            </Box>
                        </Stack>

                        <Stack  display="flex-box" justifyContent="space-between" >
                            <Stack direction="row" spacing={1} alignItems="center">
                                <IconButton onClick={() => handleCopyToClipboard(rehberData?.email)}>
                                    <EmailIcon sx={{ color: 'red' }} />
                                </IconButton>
                                <Typography>{rehberData?.email}</Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <IconButton onClick={() => handleCopyToClipboard(rehberData?.phone)}>
                                    <PhoneIphone sx={{ color: 'red' }} />
                                </IconButton>
                                <Typography>{rehberData?.phone}</Typography>
                            </Stack>
                        </Stack>
                    </Box>

                    <Divider sx={{ borderBottomWidth: 2, borderColor: '#333' }} />

                    <Typography variant="h8" sx={{ fontWeight: 'bold' }}>Genel</Typography>
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Box display="flex" flexDirection="column"  spacing={1}  >
                            <Box  display="flex" alignItems="center"  justifyContent="space-between">
                                <Typography sx={{ fontWeight: 'bold' }}>İşe Giriş Tarihi:</Typography>
                                <Typography sx={{ ml: 1 }}>{rehberData?.dateOfStart}</Typography>
                            </Box>
                            <Box  display="flex" alignItems="center" justifyContent="space-between">
                                <Typography sx={{ fontWeight: 'bold' }}>Çalışma Durumu:</Typography>
                                <Typography sx={{ ml: 1 }}>{rehberData?.workStatus}</Typography>
                            </Box>

                        </Box>
                        <Box display="flex" flexDirection="column" spacing={1}>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Typography sx={{ fontWeight: 'bold' }}>Kadro:</Typography>
                                <Typography sx={{ ml: 1 }}>{rehberData?.staff}</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Typography sx={{ fontWeight: 'bold' }}>Personel Türü:</Typography>
                                <Typography sx={{ ml: 1 }}>{rehberData?.staffType}</Typography>
                            </Box>
                        </Box>
                        <Box display="flex" flexDirection="column" spacing={1}>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Typography sx={{ fontWeight: 'bold' }}>Çalışma Türü:</Typography>
                                <Typography sx={{ ml: 1 }}>{rehberData?.typeOfWork}</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Typography sx={{ fontWeight: 'bold' }}>Doğum Tarihi:</Typography>
                                <Typography sx={{ ml: 1 }}>{rehberData?.birthDate}</Typography>
                            </Box>
                        </Box>

                    </Stack>

                    <Divider sx={{ borderBottomWidth: 2, borderColor: '#333' }} />

                    <Typography variant="h8" sx={{ fontWeight: 'bold', color: 'black' }}>Dahil Olunan Projeler</Typography>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow display="flex" style={{ backgroundColor: '#AAA'}}>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Proje Adı</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Takım</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Görevi</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Başlangıç Tarihi</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Bitiş Tarihi</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rehberData.userTeams?.map(project => (
                                    <TableRow key={project.id}>
                                        <TableCell>{project.projectName === null | project.projectName === "" ? "-" : project.projectName }</TableCell>
                                        <TableCell>{project.teamName === null | project.teamName === "" ? "-" : project.teamName}</TableCell>
                                        <TableCell>{project.title === null | project.title === "" ? "-" : project.title}</TableCell>
                                        <TableCell>{project.startDate === null | project.startDate === "" ? "-" : project.startDate}</TableCell>
                                        <TableCell>{project.endDate === null | project.endDate === "" ? "Devam Ediyor" : project.endDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Divider sx={{ borderBottomWidth: 2, borderColor: '#333' }} />
                    <Typography variant="h8" sx={{ fontWeight: 'bold' }}>Eğitim</Typography>
                    <Table>
                        <TableHead>
                            <TableRow display="flex" style={{ backgroundColor:'#AAA'}}  >
                                <TableCell sx={{ fontWeight: 'bold' }}>Eğitim Türü</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Üniversite/Okul</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Bölüm</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Başlangıç Tarihi</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Mezuniyet Tarihi</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Açıklama</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rehberData.educations?.length === 0 ?
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            Kullanıcı henüz eğitim bilgisi girmemiş.
                                        </TableCell>
                                    </TableRow>
                                    :
                                    rehberData.educations?.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.type === null || row.type === "" ? "-" : row.type}</TableCell>
                                            <TableCell>{row.university === null || row.university === "" ? "-" : (row.university.split(":").length === 2 ? row.university.split(":")[1] : row.university.split(":")[0])}</TableCell>
                                            <TableCell>{row.department === null || row.department === "" ? "-" : row.department}</TableCell>
                                            <TableCell>{row.startDate === null || row.startDate === "" ? "-" : row.startDate}</TableCell>
                                            <TableCell>{row.graduationDate === null || row.graduationDate === "" ? "-" : row.graduationDate}</TableCell>
                                            <TableCell>{row.explanation === null || row.explanation === "" ? "-" : row.explanation}</TableCell>
                                        </TableRow>
                                    ))
                            }
                        </TableBody>
                    </Table>

                    <Divider sx={{ borderBottomWidth: 2, borderColor: '#333' }} />
                    <Typography variant="h8" sx={{ fontWeight: 'bold' }}>Deneyim</Typography>

                    <Table>
                        <TableHead>
                            <TableRow display="flex" style={{ backgroundColor:'#AAA'}}>
                                <TableCell sx={{ fontWeight: 'bold' }}>Çalıştığı Kurum Adı</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Çalıştığı Pozisyon</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Çalışma Şekli</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>İşe Başlama Tarihi</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>İşten Çıkış Tarihi</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>İşten Ayrılış Nedeni</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rehberData.experiences?.length === 0 ?
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            Kullanıcı henüz deneyim bilgisi girmemiş.
                                        </TableCell>
                                    </TableRow>
                                    :
                                    rehberData.experiences?.map(experience => (
                                        <TableRow key={experience.id}>
                                            <TableCell>{experience.companyName === null | experience.companyName === "" ? "-" : experience.companyName}</TableCell>
                                            <TableCell>{experience.title === null | experience.title === "" ? "-" : experience.title}</TableCell>
                                            <TableCell>{experience.typeOfEmployment === null | experience.typeOfEmployment === "" ? "-" : experience.typeOfEmployment}</TableCell>
                                            <TableCell>{experience.startDate === null | experience.startDate === "" ? "-" : experience.startDate}</TableCell>
                                            <TableCell>{experience.endDate === null | experience.endDate === "" ? "Devam ediyor" : experience.endDate}</TableCell>
                                            <TableCell>{experience.reasonForLeavingEmployment === null | experience.reasonForLeavingEmployment === "" ? "Devam ediyor" : experience.reasonForLeavingEmployment}</TableCell>
                                        </TableRow>
                                    ))
                            }
                        </TableBody>
                    </Table>

                    <Divider sx={{ borderBottomWidth: 2, borderColor: '#333' }} />
                    <Typography variant="h8" sx={{ fontWeight: 'bold' }}>Katkılar</Typography>

                    <Table>
                        <TableHead>
                            <TableRow display="flex" style={{ backgroundColor: '#AAA'}}>
                                <TableCell sx={{ fontWeight: 'bold' }}>Etkinlik Türü</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Açıklama</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Link</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Ek(ler)</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Yükleme Tarihi</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rehberData.contributions === undefined || rehberData.contributions.length === 0 ?
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            Kullanıcı henüz katkı bilgisi girmemiş.
                                        </TableCell>
                                    </TableRow>
                                    :
                                    rehberData.contributions.map((row) => (
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
                                        </TableRow>
                                    ))
                            }
                        </TableBody>
                    </Table>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default RehberPopup;

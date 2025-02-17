import {Box, IconButton, Stack, Typography} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphone from "@mui/icons-material/PhoneIphone";
import {AccountCircleOutlined, OpenInFull} from "@mui/icons-material";
import React from "react";
import {toast} from "react-toastify";


const handleCopyToClipboard = (text) => {
    if(!(text === null || text === "")){
        navigator.clipboard.writeText(text).then(r => toast("Copied to clipboard"));
    } else {
        toast("No phone number provided")
    }
};

export const columnsForRehber = [
    {
        field: 'fullName',
        headerName: 'Ad Soyad',
        flex: 1.25,
        renderCell: (params) => (
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                <AccountCircleOutlined sx={{ width: 32, height: 32, marginRight: 2, color: "red" }} />
                <Typography>{params.value}</Typography>
            </Box>
        )
    },
    {
        field: 'department',
        headerName: 'Birim',
        flex: 1,
        renderCell: (params) => (
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                <Typography>{params.value}</Typography>
            </Box>
        )
    },
    {
        field: 'title',
        headerName: 'Unvan',
        flex: 1.25,
        renderCell: (params) => (
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                <Typography>{params.value}</Typography>
            </Box>
        )
    },
    {
        field: 'task',
        headerName: 'Görev',
        flex: 1.5,
        renderCell: (params) => (
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                <Typography>{params.value}</Typography>
            </Box>
        )
    },
    {
        field: 'email',
        headerName: 'E-Posta',
        flex: 1.5,
        renderCell: (params) => (
            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>
                    <IconButton onClick={() => handleCopyToClipboard(params.value)}>
                        <EmailIcon sx={{ color: 'red' }} />
                    </IconButton>
                    <Typography>{params.value}</Typography>
                </Stack>
            </Box>
        )
    },
    {
        field: 'phone',
        headerName: 'Telefon',
        flex: 1.5,
        renderCell: (params) => (
            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>
                    <IconButton onClick={() => handleCopyToClipboard(params.value)}>
                        <PhoneIphone sx={{ color: 'red' }} />
                    </IconButton>
                    <Typography>{params.value}</Typography>
                </Stack>
            </Box>
        )
    },
    {
        field: 'expand',
        headerName: '',
        width: 50,
        renderCell: () => (
            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <IconButton >
                    <OpenInFull sx={{ color: 'red'}} />
                </IconButton>
            </Box>
        )
    },
    {
        field: 'edit',
        headerName: '',
        width: 50,
        renderCell: () => (
            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <IconButton >
                    <OpenInFull sx={{ color: 'red'}} />
                </IconButton>
            </Box>
        )
    }
];

export const columnsForMainPage = [
    {
        field: 'fullName',
        headerName: "",
        flex: 2,
        minWidth: 300,
        renderCell: (params) => (
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                <AccountCircleOutlined sx={{ width: 28, height: 28, marginRight: 2, color: "red" }} />
                <Typography>{params.row.fullName}</Typography>
            </Box>
        )
    },
    {
        field: 'dep-tit',
        headerName: "",
        flex: 1.5,
        minWidth: 250,
        renderCell: (params) => (
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{params.row.department}</Typography>
                <Typography variant="body2">{params.row.title}</Typography>
            </Box>
        )
    },
    {
        field: 'task',
        headerName: "",
        flex: 1.5,
        minWidth: 300,
        renderCell: (params) => (
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="body2">{params.row.task}</Typography>
            </Box>
        )
    },
    {
        field: 'contact',
        headerName: "",
        flex: 2,
        minWidth: 300,
        renderCell: (params) => (
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ height: '25px' }}>
                    <IconButton onClick={() => handleCopyToClipboard(params.row.email)}>
                        <EmailIcon sx={{ color: 'red' }} />
                    </IconButton>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{params.row.email}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ height: '25px' }}>
                    <IconButton onClick={() => handleCopyToClipboard(params.row.phone)}>
                        <PhoneIphone sx={{ color: 'red' }} />
                    </IconButton>
                    <Typography variant="body2">{params.row.phone}</Typography>
                </Stack>
            </Box>
        )
    },
    {
        field: 'expand',
        headerName: '',
        width: 50,
        renderCell: () => (
            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <IconButton >
                    <OpenInFull sx={{ color: 'red' }} />
                </IconButton>
            </Box>
        )
    }
];
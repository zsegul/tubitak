import { Box, IconButton, Stack, Typography } from "@mui/material";
import { OpenInNew } from "@mui/icons-material";
import React from "react";
import ContactsIcon from "@mui/icons-material/Contacts";

const handleExpandClick = () => {
    window.location.href = 'http://localhost:3000/pages/rehber';
};

const openInNewButton = (
    <IconButton onClick={handleExpandClick}>
        <OpenInNew sx={{ color: 'red', fontSize: 25 }} />
    </IconButton>
);

const RehberPageHeader = ({ isOpenInNewHidden }) => {
    return (
        <Box sx={{ width: '100%', height: '50px', display: 'flex' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                <Stack direction="row" alignItems="center" spacing={'10px'}>
                    <ContactsIcon sx={{ color: 'red', fontSize: 24 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: 16 }}>REHBER</Typography>
                </Stack>
                {isOpenInNewHidden ? null : openInNewButton}
            </Stack>
        </Box>
    );
};

export default RehberPageHeader;

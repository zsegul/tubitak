import { useContext, useEffect, useState } from "react";
import { Box, Button, InputAdornment, Stack, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { axiosInstance } from "@/config/axios_config";
import { useRouter } from 'next/navigation';
import { EnumContext } from "@/app/contexts/EnumContext";

const SearchBar = ({ editing, handleSaveClick, handleCancelClick, handleEditClick, authorisationRequest, setModifiedUsers, setIsSearched, setPaginationModel, setUsers, setTotalRows, filters, setFilters }) => {

    const handleSearchClick = async () => {
        setPaginationModel(prevState => ({
            ...prevState,
            page: 0
        }));
        try {
            const response = await axiosInstance.post('/user/authorities', authorisationRequest, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setIsSearched(true);
            setUsers(response.data.userAuthoritiesResponseDTO);
            setModifiedUsers(response.data.userAuthoritiesResponseDTO);
            setTotalRows(response.data.totalRows);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
        setIsSearched(true);
        handleSearchClick(); // Call the search function here
    };

    const customWidth = '12%';

    return (
        <Box sx={{ height: '50px', width: '100%', display: 'flex', alignItems: 'center' }}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" width="100%">
                <TextField
                    name="fullName"
                    label="İsim Soyisim"
                    value={filters.fullName}
                    onChange={handleFilterChange}
                    size='small'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Search />
                            </InputAdornment>
                        )
                    }}
                    sx={{ width: '20%' }}
                />

                <Stack direction="row" spacing={2} alignItems="center" sx={{ flexGrow: 1, justifyContent: 'flex-end' }}>

                    {editing ? (
                        <>
                            <Stack spacing={2} direction="row">
                                <Button variant="contained"
                                        onClick={handleSaveClick}
                                        sx={{
                                            backgroundColor: 'primary',
                                            '&:hover': { backgroundColor: 'primary.dark' },
                                            fontSize: '16px',
                                            paddingRight: '10px'
                                        }}>

                                    KAYDET
                                </Button>
                                <Button variant="contained"
                                        sx={{
                                            backgroundColor: 'primary',
                                            '&:hover': { backgroundColor: 'primary.dark' },
                                            fontSize: '16px',
                                            paddingLeft: '10px'
                                        }}
                                        onClick={handleCancelClick}>
                                    İPTAL ET
                                </Button>
                            </Stack>

                        </>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={handleEditClick}
                            sx={{
                                backgroundColor: 'primary',
                                '&:hover': { backgroundColor: 'primary.dark' },
                                fontSize: '16px',
                            }}
                        >
                            DÜZENLE
                        </Button>
                    )}

                </Stack>
            </Stack>
        </Box>
    );
};

export default SearchBar;

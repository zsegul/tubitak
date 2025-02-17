import { useContext, useEffect, useState } from "react";
import { Box, Button, InputAdornment, MenuItem, Stack, TextField } from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import { axiosInstance } from "@/config/axios_config";
import { useRouter } from 'next/navigation';
import { EnumContext } from "@/app/contexts/EnumContext";

const SearchAndFilter = ({ searchRequestAdmin, setIsSearched, setPaginationModel, setUsers, setTotalRows, isMainPage, filters, setFilters }) => {

    const [menuItems, setMenuItems] = useState({});

    const { dropDownEnumTypes } = useContext(EnumContext);

    const router = useRouter();

    useEffect(() => {
        const fetchMenuItems = () => {
            setMenuItems({
                titles: dropDownEnumTypes["Unvan"],
                tasks: dropDownEnumTypes["Görev"],
                departments: dropDownEnumTypes["Birim"],
                projects: dropDownEnumTypes["Çalışılan Proje"],
                contributions: dropDownEnumTypes["Etkinlik Türü"], // Add if needed!!
                teams: dropDownEnumTypes["Takım"]
            });
        };

        fetchMenuItems();
    }, [dropDownEnumTypes]);

    const handleSearchClick = async () => {
        setPaginationModel(prevState => ({
            ...prevState,
            page: 0
        }));
        try {
            const role = localStorage.getItem("authority");
            const url = (role.includes("ADMIN")) ? "/user/auth=admin" : "/user/auth=user";

            const response = await axiosInstance.post(url, searchRequestAdmin, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = response.data.users.map((user) => ({
                id: user.id,
                fullName: user.fullName,
                department: user.department,
                title: user.title,
                task: user.task,
                email: user.email,
                phone: user.phone
            }));

            setUsers(data);
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

    const handleAddUserClick = () => {
        router.push('/pages/personel_ekle');
    };

    const customWidth = '12%';

    return (
        <Box sx={{ height: '50px', width: '100%', display: 'flex', alignItems: 'center' }}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" width="100%">
                <TextField
                    name="fullName"
                    label="İsim Soyisim"
                    value={filters?.fullName}
                    onChange={handleFilterChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
                    size='small'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Search style={{ cursor: 'pointer' }} onClick={handleSearchClick} />
                            </InputAdornment>
                        )
                    }}
                    sx={{ width: '20%' }}
                />

                <Stack direction="row" spacing={2} alignItems="center" sx={{ flexGrow: 1, justifyContent: isMainPage ? 'flex-end' : 'flex-end' }}>
                    <TextField
                        select
                        name="title"
                        label="Unvan"
                        size='small'
                        value={filters?.title}
                        onChange={handleFilterChange}
                        sx={{ width: customWidth }}
                    >
                        <MenuItem value="" sx={{ height: '36px' }}>...</MenuItem>
                        {menuItems.titles && menuItems.titles.map((title) => (
                            <MenuItem key={title} value={title}>{title}</MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        name="task"
                        label="Görev"
                        size='small'
                        value={filters?.task}
                        onChange={handleFilterChange}
                        sx={{ width: customWidth }}
                    >
                        <MenuItem value="" sx={{ height: '36px' }}>...</MenuItem>
                        {menuItems.tasks && menuItems.tasks.map((task) => (
                            <MenuItem key={task} value={task}>{task}</MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        name="department"
                        label="Birim"
                        size='small'
                        value={filters?.department}
                        onChange={handleFilterChange}
                        sx={{ width: customWidth }}
                    >
                        <MenuItem value="" sx={{ height: '36px' }}>...</MenuItem>
                        {menuItems.departments && menuItems.departments.map((department) => (
                            <MenuItem key={department} value={department}>{department}</MenuItem>
                        ))}
                    </TextField>

                    {!isMainPage && (
                        <>
                            <TextField
                                select
                                name="project"
                                label="Proje"
                                size='small'
                                value={filters?.project}
                                onChange={handleFilterChange}
                                sx={{ width: customWidth }}
                            >
                                <MenuItem value="" sx={{ height: '36px' }}>...</MenuItem>
                                {menuItems.projects && menuItems.projects.map((project) => (
                                    <MenuItem key={project} value={project}>{project}</MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                select
                                name="contribution"
                                label="Katkı"
                                size='small'
                                value={filters?.contribution}
                                onChange={handleFilterChange}
                                sx={{ width: customWidth }}
                            >
                                <MenuItem value="" sx={{ height: '36px' }}>...</MenuItem>
                                {menuItems.contributions && menuItems.contributions.map((contribution) => (
                                    <MenuItem key={contribution} value={contribution}>{contribution}</MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                select
                                name="team"
                                label="Takım"
                                size='small'
                                value={filters?.team}
                                onChange={handleFilterChange}
                                sx={{ width: customWidth }}
                            >
                                <MenuItem value="" sx={{ height: '36px' }}>...</MenuItem>
                                {menuItems.teams && menuItems.teams.map((team) => (
                                    <MenuItem key={team} value={team}>{team}</MenuItem>
                                ))}
                            </TextField>
                        </>
                    )}

                    {!isMainPage && localStorage.getItem("authority").includes("ADMIN") && (
                        <Button
                            hidden={true}
                            variant="contained"
                            sx={{
                                width: '14%',
                                backgroundColor: 'green',
                                '&:hover': { backgroundColor: 'darkgreen' },
                                fontSize: '16px',
                            }}
                            startIcon={<Add />}
                            onClick={handleAddUserClick}
                        >
                            Personel Ekle
                        </Button>
                    )}
                </Stack>
            </Stack>
        </Box>
    );
};

export default SearchAndFilter;

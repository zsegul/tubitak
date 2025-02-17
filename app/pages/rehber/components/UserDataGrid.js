import React, {useEffect, useState} from 'react';
import {Box, IconButton} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import RehberPageHeader from "@/app/pages/rehber/components/RehberPageHeader";
import SearchAndFilter from "@/app/pages/rehber/components/SearchAndFilter";
import {axiosInstance} from "@/config/axios_config";
import RehberPopup from "@/app/pages/rehber/kisa-rehber/page";
import {OpenInFull} from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import {useRouter} from 'next/navigation';


const UserDataGrid = ({ columns, outsideBox, isOpenInNewHidden, isSearchBarForMainPage, hideHeaders, customPageSize, customRowHeight, filters, setFilters, rowHeight, dataGridPadding }) => {
    const [paginationModel, setPaginationModel] = useState({
        pageSize: customPageSize,
        page: 0
    });

    const router = useRouter();

    const [isSearched, setIsSearched] = useState(false);
    const searchRequestAdmin = {
        userRequest: {
            fullName: filters?.fullName,
            department: filters?.department,
            title: filters?.title,
            task: filters?.task,
            project: filters?.project,
            contribution: filters?.contribution,
            team: filters?.team
        },
        page: paginationModel?.page,
        pageSize: paginationModel?.pageSize,
        isSearched: isSearched
    };
    const [users, setUsers] = useState([]);
    const [totalRows, setTotalRows] = useState(0);


    const [openPopup, setOpenPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const role = localStorage.getItem("authority");
                const url = (role.includes("ADMIN")) ? "/user/auth=admin" : "/user/auth=user";

                const response = await axiosInstance.post(url, searchRequestAdmin, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = response.data;

                setUsers(data.users);
                setTotalRows(data.totalRows);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [paginationModel, isSearched]);

    const handlePaginationModelChange = (newModel) => {
        setPaginationModel(newModel);
    };

    const handleExpand = (user) => {
        setOpenPopup(true);
        setSelectedUser(user);
    };

    const handleEdit = (user) => {
        router.push(`hakkinda?id=` + user.id);
    };

    const gridHeight = users?.length * rowHeight + dataGridPadding;

    return (
        <Box sx={{ height: 'auto', background: 'white', padding: "10px" }}>

            <Box sx={{ height: 'auto', background: 'white', borderRadius: '15px', padding: '10px' }}>

                <RehberPageHeader isOpenInNewHidden={isOpenInNewHidden} />

                <SearchAndFilter searchRequestAdmin={searchRequestAdmin}
                    isSearched={isSearched}
                    setIsSearched={setIsSearched}
                    setPaginationModel={setPaginationModel}
                    setUsers={setUsers}
                    setTotalRows={setTotalRows}
                    isMainPage={isSearchBarForMainPage}
                    filters={filters}
                    setFilters={setFilters} />

                <Box sx={{ height: gridHeight, borderRadius: '10px', borderBottom: '5px solid red', paddingTop: '5px' }}>
                    <DataGrid
                        paginationMode="server"
                        rows={users}
                        rowCount={totalRows}
                        columns={columns?.map(col => ({
                            ...col,
                            renderCell: (params) => {
                                if (col.field === 'expand') {
                                    return (
                                        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                            <IconButton onClick={() => handleExpand(params.row)}>
                                                <OpenInFull sx={{ color: 'red' }} />
                                            </IconButton>
                                        </Box>
                                    );
                                }
                                if (col.field === 'edit') {
                                    return (
                                        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                            <IconButton onClick={() => handleEdit(params.row)}>
                                                <EditIcon sx={{ color: 'red' }} />
                                            </IconButton>
                                        </Box>
                                    );
                                }
                                return col.renderCell(params);
                            }
                        }))}
                        rowHeight={customRowHeight}
                        pageSizeOptions={[4, 8, 12, 20]}
                        columnHeaderHeight={0}
                        pagination
                        paginationModel={paginationModel}
                        onPaginationModelChange={handlePaginationModelChange}
                        sx={{
                            '& .MuiDataGrid-columnHeaderTitle': {
                                fontWeight: 'bold',
                            },
                            '& .MuiDataGrid-root': {
                                overflow: 'hidden',
                            },
                            '& .MuiDataGrid-viewport': {
                                overflow: 'hidden',
                            },
                            border: 'none'
                        }}
                    />
                </Box>
                {openPopup ? <RehberPopup open={openPopup} onClose={() => setOpenPopup(false)} userId={selectedUser?.id} /> : null}
            </Box>
        </Box>
    );
};

export default UserDataGrid;


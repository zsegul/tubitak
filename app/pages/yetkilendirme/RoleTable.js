'use client';

import {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {Box, Checkbox, FormControlLabel} from '@mui/material';
import {axiosInstance} from "@/config/axios_config";
import {toast} from "react-toastify";
import SearchBar from "@/app/pages/yetkilendirme/SearchBar";

const RoleTable = ({customPageSize, rowHeight, dataGridPadding}) => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [editing, setEditing] = useState(false);
    const [modifiedUsers, setModifiedUsers] = useState([]);
    const [filters, setFilters] = useState({
        fullName: ''
    });
    const [paginationModel, setPaginationModel] = useState({
        pageSize: customPageSize,
        page: 0
    });
    const  [isSearched, setIsSearched] = useState(false);
    const authorisationRequest = {

        fullName: filters.fullName,
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
        isSearched: isSearched
    };
    const [totalRows, setTotalRows] = useState(0);

    const handlePaginationModelChange = (newModel) => {
        setPaginationModel(newModel);
    };

    const handleRoleChange = (userId, role) => {
        setModifiedUsers(modifiedUsers.map(user => {
            if (user.id === userId) {
                if (user.authorities.includes(role)) {
                    return { ...user, authorities: user.authorities.filter(r => r !== role) };
                }
                return { ...user, authorities: [...user.authorities, role] };
            }
            return user;
        }));
    };

    const handleEditClick = () => setEditing(true);

    const handleCancelClick = () => {
        setEditing(false);
        setModifiedUsers(users);
    };
  
    const handleSaveClick = async () => {

        const changes = modifiedUsers.filter((user, index) => user.authorities !== users[index].authorities);
        
        if (changes.length === 0) {
            setEditing(false);
            return;
        }

        const currentUserId = localStorage.getItem('id');
        const currentUserAuthorities = localStorage.getItem('authority').split(',');
        const currentUserNewRoles = modifiedUsers.find(user => user.id === Number(currentUserId))?.authorities;

        if (currentUserNewRoles != null && currentUserAuthorities.includes('ADMIN') && !currentUserNewRoles?.includes('ADMIN')) {
            toast.error("You cannot remove your own admin role");
            setEditing(false);
            setModifiedUsers(users);
            return;
        }
        
        const modifiedUsersBody = changes.map(user => ({
            userId: user.id,
            roles: Array.from(user.authorities),
        }));

        await axiosInstance.put('/user/authorities', modifiedUsersBody)
            .then(() => {
                setEditing(false);
                setUsers(modifiedUsers);
                toast.success("New roles saved successfully");

                if (currentUserNewRoles != null && currentUserNewRoles.length > 0) {
                    localStorage.setItem('authority', currentUserNewRoles.join(','));
                }  
            })
            .catch(() => {
                toast.error("Error saving data");
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const roleData = await axiosInstance.get('/authority');
                setRoles(roleData.data.map(role => role.authority));

                const response = await axiosInstance.post('/user/authorities', authorisationRequest);
                setUsers(response.data.userAuthoritiesResponseDTO);

                setModifiedUsers(response.data.userAuthoritiesResponseDTO);
                setTotalRows(response.data.totalRows);

            } catch (error) {
                toast.error("Error fetching users");
            }
        };

        fetchData();
    }, [paginationModel]);

    const rows = modifiedUsers.map(user => ({
        ...user,
        id: Number(user.id),
        name: user.name || 'No Name',
        surname: user.surname || 'No Name'
    }));

    const columns = [
        { field: 'name', headerName: 'İsim', width: '20%', flex: 1},
        { field: 'surname', headerName: 'Soyisim', width: '20%', flex: 1 },
        ...roles.map(role => ({
            field: role,
            headerName: role,
            width: '20%',
            flex: 1,
            renderCell: (params) => (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={modifiedUsers.find(user => user.id === params.row.id).authorities.includes(role)}
                            onChange={() => handleRoleChange(params.row.id, role)}
                            disabled={!editing}
                        />
                    }
                    label={role}
                />
            ),
        })),
    ];

    const gridHeight = users?.length * rowHeight + dataGridPadding;

    return (
        <Box sx={{ height: 'auto', background: '#f0f0f0', padding: "10px"}}>
            <Box sx={{ height: 'auto', background: 'white', borderRadius: '15px', padding: '10px'}}>

                <SearchBar editing={editing} handleCancelClick={handleCancelClick} handleEditClick={handleEditClick}
                           handleSaveClick={handleSaveClick} setTotalRows={setTotalRows} setPaginationModel={setPaginationModel}
                           setModifiedUsers={setModifiedUsers} setUsers={setUsers}
                           setIsSearched={setIsSearched} authorisationRequest={authorisationRequest}
                           setFilters={setFilters} filters={filters} 
                />

                <Box sx={{ height: gridHeight, borderRadius: '10px', borderBottom: '5px solid red', paddingTop: '5px', paddingLeft: '10px', paddingRight: '10px' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} getRowId={(row) => row.id}
                        paginationMode="server"
                        pagination
                        paginationModel={paginationModel}
                        onPaginationModelChange={handlePaginationModelChange}
                        rowCount={totalRows}
                        pageSizeOptions={[4, 8, 12, 20]}
                        rowHeight={70}
                        sx={{
                            height: '100%',
                            '& .MuiDataGrid-columnHeaderTitle': {
                                fontWeight: 'bold',
                            },
                            '& .MuiDataGrid-root': {
                                overflow: 'hidden',
                            },
                            '& .MuiDataGrid-viewport': {
                                overflow: 'hidden',
                            },
                            border: 'none',
                            '& .MuiDataGrid-footerContainer': {
                                minHeight: 'unset',
                            },
                            '& .MuiDataGrid-row': {
                                marginBottom: 0,
                            }
                        }}
                    />
                </Box>
                
            </Box>
        </Box>
    );
};

export default RoleTable;
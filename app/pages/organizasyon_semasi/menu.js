import React, { useState, useRef, useCallback } from 'react';
import { Box, List, ListItem, ListItemText, Collapse, ListSubheader, Divider, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material';

const ResizableCollapsibleSidebar = ({ receivedData, setReceivedData, treeData, setTreeData }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [open, setOpen] = useState({
        ensitu: false,
        projeler: false,
        teknolojiBirlikleri: false,
    });
    const [width, setWidth] = useState(240);
    const [collapsed, setCollapsed] = useState(false);
    const sidebarRef = useRef(null);
    const dragging = useRef(false);
    const lastData = [];
    lastData.push({ id: 0, name: receivedData?.directorOfInstitution.name, title: "Enstitü Müdürü" });
    receivedData?.yte.childInstitutions.forEach(institution => {
        lastData.push({ id: institution.id + 1, pid: 0, name: institution.name });

        if (institution.employeesInThisInstitution.length !== 0) {
            institution.employeesInThisInstitution.forEach(employee =>
                lastData.push({ id: employee.id + 100, pid: institution.id + 1, name: employee.fullName, title: institution.name })
            );
        } else {
            institution.departments.forEach(department => {
                lastData.push({ id: department.id + 20, pid: institution.id + 1, name: department.name });
                department.employeesInThisDepartment.forEach(emp =>
                    lastData.push({ id: emp.id + 100, pid: department.id + 20, name: emp.fullName, title: department.name })
                );
            });
        }
    });




    const handleClick = (section) => {
        setOpen((prevOpen) => ({ ...prevOpen, [section]: !prevOpen[section] }));
    };

    const handleMouseMove = useCallback((e) => {
        if (dragging.current) {
            const newWidth = Math.max(100, e.clientX);
            setWidth(newWidth);
        }
    }, []);

    const handleMouseUp = () => {
        dragging.current = false;
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDown = (e) => {
        dragging.current = true;
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleCollapseToggle = () => {
        setCollapsed(!collapsed);
    };

    const handleListItemClick = (index, ins) => {
        const copyList = [...lastData]
        if (selectedIndex === index) {
            setSelectedIndex(null);
            setTreeData(lastData);
        } else {
            const tempList = copyList.filter((item) => item.id === ins.id + 1 || item.pid === ins.id + 1);
            const lasty = [...tempList]
            if (lasty[0].name.includes("AFO") || lasty[0].name.includes("Enterprise")) {
                for (let i = 0; i < tempList.length; i++) {
                    for (let j = 0; j < copyList.length; j++) {
                        if (copyList[j].pid === tempList[i].id)
                            lasty.push(copyList[j]);
                    }
                }
            }
            setTreeData(lasty);
            setSelectedIndex(index);
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                ref={sidebarRef}
                sx={{
                    width: collapsed ? '64px' : width,
                    height: '100vh',
                    bgcolor: 'background.paper',
                    borderRight: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'width 0.3s ease',
                }}
            >
                <IconButton
                    onClick={handleCollapseToggle}
                    sx={{
                        margin: '8px',
                        alignSelf: 'start',
                    }}
                >
                    {collapsed ? <KeyboardDoubleArrowLeft /> : <KeyboardDoubleArrowRight />}
                </IconButton>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            {collapsed ? null : ''}
                        </ListSubheader>
                    }
                >
                    <ListItem button onClick={() => handleClick('ensitu')}>
                        <ListItemText primary={collapsed ? null : 'Enstitü'} />
                        {open.ensitu ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open.ensitu} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {
                                receivedData?.yte?.childInstitutions.map((ins, index) =>

                                    <ListItem key={index} button sx={{
                                        '&:hover': {
                                            backgroundColor: selectedIndex === index ? 'rgba(0, 0, 0, 0.38)' : 'inherit'
                                        },
                                        pl: 4, backgroundColor: selectedIndex === index ? 'rgba(0, 0, 0, 0.38)' : 'inherit',
                                    }}
                                        onClick={() => handleListItemClick(index, ins)}
                                    >
                                        <ListItemText primary={collapsed ? null : ins.name} />
                                    </ListItem>
                                )
                            }

                        </List>
                    </Collapse>


                </List>
            </Box>
            <Divider
                sx={{
                    width: '4px',
                    cursor: 'ew-resize',
                    backgroundColor: 'divider',
                }}
                onMouseDown={handleMouseDown}
            />
            <Box
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                }}
            >
                {/* Main content goes here */}
            </Box>
        </Box>
    );
};

export default ResizableCollapsibleSidebar;

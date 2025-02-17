"use client"

import React, { useState , useEffect} from "react";
import { Box } from "@mui/material";
import StyledTreeExample from "@/app/pages/organizasyon_semasi/chart";
import Sidebar from "@/app/pages/organizasyon_semasi/menu";
import ApexTreeChart from "@/app/pages/organizasyon_semasi/menu";
import OrgSema from "@/app/pages/organizasyon_semasi/orgsema";
import {axiosInstance} from "@/config/axios_config";
import OrgChart from "@balkangraph/orgchart.js";

export default function Page() {
    const [treeData, setTreeData] = useState([]);
    const [receivedData, setReceivedData] = useState();


    useEffect(() => {
        axiosInstance.get('/user/organization')
            .then(response => {
                const lastData = [];
                setReceivedData(response.data);
                lastData.push({ id: 0, name: response.data.directorOfInstitution.name, title: "Enstitü Müdürü" });

                response.data.yte.childInstitutions.forEach(institution => {
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

                setTreeData(lastData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);



    return (
        <Box display="flex" flexDirection="row" alignItems="stretch">
            <Box sx={{ width: 240 }}>
                <Sidebar  receivedData = {receivedData} setReceivedData = {setReceivedData} treeData = {treeData} setTreeData = {setTreeData} />
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    ml: 2, // Margin-left to add space between Sidebar and content
                    p: 2 // Padding inside the content area
                }}
            >
                {treeData !== undefined && <OrgSema data = {treeData}/>}
            </Box>
        </Box>
    );
}
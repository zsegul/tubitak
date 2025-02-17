import React, { useEffect, useState } from 'react';
import OrgChartComponent from './OrgChartComponent';
import {axiosInstance} from "@/config/axios_config";
import OrgChart from "@balkangraph/orgchart.js";

const OrgSema = ({data}) => {
    

    if (!data.length) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Organizational Chart</h1>
            <OrgChartComponent data={data} />
        </div>
    );
};

export default OrgSema;

'use client';

import React from "react";
import RoleTable from "./RoleTable";

const Yetkilendirme = () => {
    return (
        <RoleTable
            customPageSize={8}
            rowHeight={70}
            dataGridPadding={119}
        />
    );
};

export default Yetkilendirme;
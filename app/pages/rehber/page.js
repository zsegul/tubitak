"use client"
import * as React from 'react';
import {useState} from 'react';
import UserDataGrid from "@/app/pages/rehber/components/UserDataGrid";
import {columnsForRehber} from "@/app/pages/rehber/components/DataGridColumns";

const App = () => {

    const [rehberFilters, setRehberFilters] = useState({
        fullName: '',
        department: '',
        title: '',
        task: '',
        project: '',
        contribution: '',
        team: '',
    });

    const [mainPageFilters, setMainPageFilters] = useState({
        fullName: '',
        department: '',
        title: '',
        task: ''
    });


    return (
        <>
            <UserDataGrid
                columns={columnsForRehber}
                outsideBox={'calc(100vh - 108px)'}
                isOpenInNewHidden={true}
                isSearchBarForMainPage={false}
                hideHeaders={false}
                customPageSize={8}
                customRowHeight={70}
                filters={rehberFilters}
                setFilters={setRehberFilters}
                rowHeight={70}
                dataGridPadding={63}
            />
        </>
    );
};

export default App;
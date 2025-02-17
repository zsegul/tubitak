"use client"
import React, {useState} from 'react';
import UserDataGrid from "@/app/pages/rehber/components/UserDataGrid";
import {columnsForMainPage, columnsForRehber} from "@/app/pages/rehber/components/DataGridColumns";


const App = () => {

  const [mainPageFilters, setMainPageFilters] = useState({
    fullName: '',
    department: '',
    title: '',
    task: ''
  });
  
  return (
      <>
        <UserDataGrid
            columns={columnsForMainPage}
            outsideBox={'calc(60vh - 64px)'}
            isOpenInNewHidden={false}
            isSearchBarForMainPage={true}
            hideHeaders={true}
            customPageSize={4}
            customRowHeight={60}
            filters={mainPageFilters}
            setFilters={setMainPageFilters}
        />
      </>
  );
};

export default App;
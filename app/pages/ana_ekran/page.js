"use client"
import NewsCarousel from "./NewsCarousel";
import UserDataGrid from "@/app/pages/rehber/components/UserDataGrid";
import {columnsForMainPage} from "@/app/pages/rehber/components/DataGridColumns";
import React, {useState} from "react";


export default function AnaEkran() {

  const news = [
    {
      imageSrc: "../news/haber1.png",
      url: 'https://www.linkedin.com/posts/tubitakbilgemyte_mikroservis-mimarisi-pop%C3%BClerli%C4%9Fini-art%C4%B1rd%C4%B1k%C3%A7a-activity-7123565385794109440-zA9Y?utm_source=share&utm_medium=member_desktop'
    },
    {
      imageSrc: "../news/biz.jfif",
      url: 'https://www.linkedin.com/feed/update/urn:li:share:7225063933475266560/?actorCompanyId=104355200'
    },
    {
      imageSrc: "../news/haber2.png",
      url: 'https://www.linkedin.com/posts/tubitakbilgemyte_daesnyayazaftlaftmcaftlargaesnaes-activity-7107751373407973376-DLnB?utm_source=share&utm_medium=member_desktop'
    },
    {
      imageSrc: "../news/haber3.png",
      url: 'https://www.linkedin.com/posts/tubitakbilgemyte_ara%C5%9Ft%C4%B1rmac%C4%B1lar%C4%B1m%C4%B1z-taraf%C4%B1ndan-haz%C4%B1rlanan-activity-7097479599055417345-uILA?utm_source=share&utm_medium=member_desktop'
    },
    {
      imageSrc: "../news/haber4.png",
      url: 'https://www.linkedin.com/posts/tubitakbilgemyte_yazaftlaftmgeliagntirme-dijitaldaemnaesagnaesm-activity-7094952190326243328-x1Iz?utm_source=share&utm_medium=member_desktop'
    },
    {
      imageSrc: "../news/haber5.png",
      url: 'https://www.linkedin.com/posts/tubitakbilgemyte_teknolojibirlikleri-activity-7094217963804725248-GlYI?utm_source=share&utm_medium=member_desktop'
    }
  ];
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
              columns={columnsForMainPage}
              outsideBox={'calc(60vh - 105px)'}
              isOpenInNewHidden={false}
              isSearchBarForMainPage={true}
              hideHeaders={true}
              customPageSize={4}
              customRowHeight={56}
              filters={mainPageFilters}
              setFilters={setMainPageFilters}
              rowHeight={56}
              dataGridPadding={63}
          />
          <NewsCarousel news={news}/>
  </>
  );
}

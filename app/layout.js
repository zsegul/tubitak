"use client";
import React from 'react';

import "react-toastify/dist/ReactToastify.css";
import theme from "@/app/styles/styles";
import {ThemeProvider} from "@mui/material/styles";
import {AvatarProvider} from "@/app/contexts/AvatarContext";
import {CompFormProvider} from "@/app/contexts/CompFormContext";
import {UserFormProvider} from "@/app/contexts/UserFormContext";

const Layout = ({ children }) => {

  return (

      <AvatarProvider>
          <UserFormProvider>
              <CompFormProvider>
                      <ThemeProvider theme={theme}>
                          <html>
                          <body>
                          <meta charSet="UTF-8"/>
                          {children}
                          </body>
                          </html>
                      </ThemeProvider>
              </CompFormProvider>
          </UserFormProvider>
      </AvatarProvider>



  );
};

export default Layout;
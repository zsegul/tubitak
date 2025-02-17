"use client"
import {CssBaseline} from '@mui/material';
import LoginForm from './LoginForm';
import './page.css'
import Image from "next/legacy/image";

const App = () => {
    return (
        <div className={"main_page"}>
            <div className={"background_image"}>
                <Image
                    src={'/images/1.png'}
                    alt={""}
                    layout="fill"
                    sizes="80vw, 100vw"
                />
            </div>
            <CssBaseline />
            <LoginForm />
        </div>
    );
};

export default App;

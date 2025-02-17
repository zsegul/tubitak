'use client';
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export const NavBarButton = ({ endpoint, content }) => {

    const router = useRouter();

    const navigateTo = (path) => {
        router.push(path);
    };

    return (
        <>
            <Button
                color="inherit"
                sx={{ fontWeight: 'bold', textTransform: 'none' }}
                onClick={() => navigateTo(endpoint)}>
                {content}
            </Button>
        </>
    );
}

export default NavBarButton;
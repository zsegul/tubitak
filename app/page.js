"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Home() {

    const router = useRouter();

    useEffect(() => {
        const checkAuthentication = async () => {
            if (localStorage.getItem('id')) {
                router.push('/pages/ana_ekran');
            } else {
                router.push('/login');
            }
        };

        checkAuthentication();
    }, [router]);

    return null;
}
"use client";

import { ReactNode } from 'react';
import SidePanel from '@/components/SidePanel';
import Header from '@/components/header/Header';
import { useSelectedLayoutSegment } from "next/navigation"
import { UserContextProvider } from '../../contexts/UserContextProvider';

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    const segment = useSelectedLayoutSegment();

    return (
        <UserContextProvider>
            <div className='flex h-screen'>
                <SidePanel currentPage={segment}/>
                <main className='flex-1 overflow-y-auto px=[15px]'>
                    {children}
                </main>
            </div>
        </UserContextProvider>
    );  
};
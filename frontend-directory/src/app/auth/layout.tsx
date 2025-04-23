"use client";

import { ReactNode } from 'react';
import SidePanel from '@/components/SidePanel';
import { useSelectedLayoutSegment } from "next/navigation"
import { UserContextProvider } from '../../contexts/UserContextProvider';

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    const segment = useSelectedLayoutSegment();

    return (
        <UserContextProvider>
            <div className='flex flex-row'>
                <SidePanel currentPage={segment}/>
                {children}
            </div>
        </UserContextProvider>
    );  
};
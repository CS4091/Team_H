"use client";

import { ReactNode } from 'react';
import SidePanel from '@/components/SidePanel';
import AuthHeader from '@/components/AuthHeader';
import { useSelectedLayoutSegment } from "next/navigation"
import { UserContextProvider } from '../../contexts/UserContextProvider';

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    const segment = useSelectedLayoutSegment();

    return (
        <UserContextProvider>
            <div>
                <AuthHeader/>
                <div className='flex h-full'>
                    <SidePanel currentPage={segment}/>
                    <main className='flex-1 overflow-y-auto pl-[50px]'>
                        {children}
                    </main>
                </div>
            </div>
        </UserContextProvider>
    );  
};
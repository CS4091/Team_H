"use client";

import { ReactNode } from 'react';
import { UserContextProvider } from '../../contexts/UserContextProvider';

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <UserContextProvider>
            {children}
        </UserContextProvider>
    );  
};
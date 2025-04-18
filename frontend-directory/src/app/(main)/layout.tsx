'use client'

import React, { useState, useEffect } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/Footer';

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: RootLayoutProps) {
    return (
        <div>
            <Header authenticated={false} displayActions={true}/>
                <div className='py-4 px-4 min-h-[calc(100vh-72px)]'>
                    {children}
                </div>
            <Footer/>
        </div>
    );
};
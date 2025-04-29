'use client';

import { useState } from 'react';
import Button from './Button';

interface RouteOptionsProps {
    onClick: () => void;
}

export default function RouteOptions({ onClick }: RouteOptionsProps) {
    return (
        <div className='bg-black rounded-lg w-fit px-[20px] h-full py-[20px] flex justify-center gap-[50x]'>
            <h3 className='text-white'>Sidebar</h3>
            <Button
                text='Generate rotute'
                onClick={onClick}
                fillContainer={true}
            />
        </div>
    );
};
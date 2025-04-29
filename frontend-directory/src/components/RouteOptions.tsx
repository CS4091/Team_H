'use client';

import { useState, useContext } from 'react';
import Button from './Button';
import { RouteContext } from '@/contexts/RouteOptionsContext';

interface RouteOptionsProps {
    name: string;
    onClick: () => void;
}

export default function RouteOptions({ 
    name,
    onClick 
}: RouteOptionsProps) {
    const { airports, setAirports } = useContext(RouteContext);

    return (
        <div className='bg-black rounded-lg w-fit px-[20px] h-full py-[20px] flex justify-center gap-[50x]'>
            <h5 className='text-white text-bold'>{name}</h5>
            <Button
                text='Generate rotute'
                onClick={onClick}
                fillContainer={true}
            />
        </div>
    );
};
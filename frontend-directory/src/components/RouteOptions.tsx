'use client';

import { useState, useContext } from 'react';
import Button from './Button';
import { RouteContext } from '@/contexts/RouteOptionsContext';
import { airportType } from '@/types';

interface RouteOptionsProps {
    onClick: () => void;
}

const selectedAirports: airportType[] = [
    {
        name: 'Abu Dhabi International Airport',
        lat: 24.433,
        long: 54.6511
    },
    {
        name: 'Menongue Airport',
        lat: -14.6576,
        long: 17.7198
    },
    {
        name: 'Menongue Airport',
        lat: -14.6576,
        long: 17.7198
    },
    {
        name: 'Menongue Airport',
        lat: -14.6576,
        long: 17.7198
    },
    {
        name: 'Menongue Airport',
        lat: -14.6576,
        long: 17.7198
    },
    {
        name: 'Menongue Airport',
        lat: -14.6576,
        long: 17.7198
    },
    {
        name: 'Menongue Airport',
        lat: -14.6576,
        long: 17.7198
    }
];

export default function RouteOptions({ 
    onClick 
}: RouteOptionsProps) {
    const { 
        name, setName, 
        airports, setAirports
    } = useContext(RouteContext);



    return (
        <div className='bg-black rounded-lg w-fit px-[20px] h-full py-[20px] flex flex-col justify-start gap-[50px]'>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="
                bg-black 
                text-white 
                font-bold 
                text-lg 
                border-none 
                outline-none 
                focus:ring-0
                "
            />
            <div className="h-48 overflow-y-auto bg-gray-800 rounded p-2">
                {selectedAirports.length === 0 ? (
                <p className="text-gray-400">No airports added</p>
                ) : (
                    selectedAirports.map((airport, idx) => (
                    <div
                    key={idx}
                    className="text-white py-1 border-b border-gray-700 last:border-b-0"
                    >
                        {airport.name}
                    </div>
                ))
                )}
            </div>
            <Button
                text='Generate route'
                onClick={onClick}
                fillContainer={true}
                invert={true}
            />
        </div>
    );
};
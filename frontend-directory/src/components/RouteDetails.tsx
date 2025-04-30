'use client';

import { Route } from "next";
import { IoAirplaneOutline } from "react-icons/io5";
import { MdModeOfTravel } from "react-icons/md";

interface RouteDetailsProps {
    name: string;
    totalKm: number;
    kmCovered: number;
    aircraft: string;
};

export default function RouteDetails({
    name,
    totalKm,
    kmCovered,
    aircraft,
}: RouteDetailsProps) {
    return (
        <div 
            className='bg-black rounded-lg w-fit w-min-[300px] px-[20px] h-full py-[20px] flex flex-col justify-start gap-[50px]'
            style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(8px)',
            }}
        >
            <div className='w-full flex flex-col gap-[10px]'>
                <h5 className='text-white'>{name}</h5>
                <div className='flex gap-1 items-center'>
                    <IoAirplaneOutline size={24} />
                    <p className='text-sm text-white'>{aircraft}</p>
                </div>
            </div>
        </div>
    );
};
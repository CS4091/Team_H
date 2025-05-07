'use client';

import { Route } from "next";
import { IoAirplaneOutline } from "react-icons/io5";
import { MdModeOfTravel } from "react-icons/md";
import { FiDollarSign } from "react-icons/fi";


interface RouteDetailsProps {
    name: string;
    totalKm: number;
    kmCovered: number;
    totalCost: number;
    aircraft: string;
};

export default function RouteDetails({
    name,
    totalKm,
    kmCovered,
    totalCost,
    aircraft,
}: RouteDetailsProps) {
    return (
        <div 
            //className='bg-black rounded-lg w-fit w-min-[300px] px-[20px] h-fill py-[20px] flex flex-col justify-start gap-[50px]'
            className='bg-black rounded-lg w-[200px] px-[20px] h-fill py-[20px] flex flex-col justify-start gap-[50px]'
            style={{
                backgroundColor: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(8px)',
            }}
        >
            <div className='w-full flex flex-col gap-[10px]'>
                <h5 className=''>{name}</h5>
                <div className='flex gap-[10px] items-center'>
                    <IoAirplaneOutline size={24} />
                    <p className='text-sm font-light'>{aircraft}</p>
                </div>
                <div className='flex gap-[10px] items-center'>
                    <MdModeOfTravel size={24} />
                    <p className='text-sm font-light'>{`${totalKm} km`}</p>
                </div>
                <div className='flex gap-[10px] items-center'>
                    <FiDollarSign size={24} />
                    <p className='text-sm font-light'>{`${totalCost}`}</p>
                </div>
            </div>
        </div>
    );
};
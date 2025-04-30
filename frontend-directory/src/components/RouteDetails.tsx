'use client';

import { Route } from "next";

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
        <div className='bg-black rounded-lg w-fit w-min-[300px] px-[20px] h-full py-[20px] flex flex-col justify-start gap-[50px]'>
            <div className='w-full'>
                <h5 className='text-white'>{name}</h5>
            </div>
        </div>
    );
};
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoAirplaneOutline } from "react-icons/io5";

interface RouteCardProps {
    name: string;
    thumbnail: string;
    date: string;
    aircraftName: string;
    totalKilometers: number;
    currentNode: number;
}


// this card will automatically takes in thumbnail passed in
// anytime route data is updated
export default function RouteCard({ name, thumbnail, date, aircraftName, totalKilometers, currentNode }: RouteCardProps) {
    return (
        <div className='flex flex-col w-fill h-fill rounded-lg shadow-lg'>
            <div className='flex justify-between w-fill h-full py-[10px] px-[10px]'>
                <div>
                    <h6 className='font-bold'>{name}</h6>
                    <div className='flex gap-[5px] justiyf-center items-center'>
                        <IoAirplaneOutline/>
                        <p>{aircraftName}</p>
                    </div>
                </div>
                <p>{date}</p>
            </div>
            <img
                src={thumbnail}
                alt={`Map of ${name} route`}
                className='object-cover rounded-b-lg'
                width={500}
                height={100}
            />
        </div>
    );
}
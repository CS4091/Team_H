'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface RouteCardProps {
    name: string;
    date: string;
    totalKilometers: number;
    currentNode: number;
}


// this card will automatically call the google api to generate the static image
export default function RouteCard({ name, date, totalKilometers, currentNode }: RouteCardProps) {
    return (
        <div className='w-fill h-full rounded-lg outline shadow-lg'>
            <Image
                src="/dummyThumbnail.png"
                alt={`Map of ${name} route`}
                width={700}
                height={100}
            />
            <div className='w-fill h-full'>
                <h6>{name}</h6>
            </div>
        </div>
    );
}
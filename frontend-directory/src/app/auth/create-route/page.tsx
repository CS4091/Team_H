'use client';

import { useState, useEffect } from 'react';
import RouteOptions from '@/components/RouteOptions';
import ChipBar from '@/components/ChipBar';
import dynamic from "next/dynamic";
import RouteMap from '@/components/RouteMap';
import { RouteProvider } from '@/contexts/RouteOptionsContext';
import { useRouter } from 'next/navigation';
import supabase from '@/api/supabaseClient';
import { airportType } from '@/types';
import airports from '@/constants/airports';

// no SSR
/*
const DynamicMap = dynamic(
    () => import("@/components/RouteMap").then((mod) => mod.GoogleMapClient),
    { ssr: false }
);*/

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
    }
];

export default function CreateRoutePage() {
    const router = useRouter();

    const [name, setName] = useState<string>('Example Route');
    const [total_km, setTotal_km] = useState<number>(0);
    const [km_covered, setKm_covered] = useState<number>(0);
    const [airports, setAirports] = useState<airportType[]>([]); // the first airport in the list will be assumed as the starting and ending location
    const [startAirport, setStartAirport] = useState<airportType>();
    const [tour, setTour] = useState<number[]>([0, 1, 2, 0]);

    const [loading, setLoading] = useState<boolean>(false);
    

    const handleGenerateRoute = () => {
        setLoading(true);
        // first call algorothm endpoint to get list of solved 
        // once solved and rerreturned, set the path order
        setTour([0, 1, 2, 0]);

        const generateRoute = async () => {
            const { data, error} = await supabase
                .from('routes')
                .insert([])
                .select()
                .single();
            
                if (error) {
                    console.log(error);
                } 
        }

        generateRoute();
        router.push('/auth/dashboard');
        setLoading(false);
    }

    return (
        <RouteProvider>
            <div className='relative h-full'>
                <div className='absolute h-full z-10 pl-[50px] py-[50px]'>
                <RouteOptions onClick={handleGenerateRoute}/> 
                </div>
                {/* <div className='absolute h-fill justify-end z-10 px-[200px] '>
                    <ChipBar/>
                </div> */}
                {/* <DynamicMap/> */}
                <RouteMap airports={selectedAirports}/>
            </div>
        </RouteProvider>
    );
};
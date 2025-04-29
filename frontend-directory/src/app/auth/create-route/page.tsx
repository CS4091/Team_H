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
    { name: "Camp Bastion Air Base",            icao: "OAZI", lat: 31.8638, long: 64.2246 },
    { name: "Herat International Airport",      icao: "OAHR", lat: 34.21,   long: 62.2283 },
    { name: "Shindand Air Base",                icao: "OASD", lat: 33.3913, long: 62.2610 },
    { name: "Zaranj Airport",                   icao: "OAZJ", lat: 30.9722, long: 61.8658 },
    { name: "Gardez Airport",                   icao: "OAGZ", lat: 33.6315, long: 69.2394 },
    { name: "Kabul International Airport",      icao: "OAKB", lat: 34.5658, long: 69.2131 },
    { name: "Kandahar International Airport",   icao: "OAKN", lat: 31.5058, long: 65.8478 },
    { name: "Tarinkot Airport",                 icao: "OATN", lat: 32.6042, long: 65.8658 },
    { name: "Uruzgan Airport",                  icao: "OARG", lat: 32.9030, long: 66.6309 },
    { name: "Khost Airfield",                   icao: "OAKS", lat: 33.3334, long: 69.9520 },
    { name: "Forward Operating Base Salerno",   icao: "OASL", lat: 33.3638, long: 69.9561 },
    { name: "Kunduz Airport",                   icao: "OAUZ", lat: 36.6651, long: 68.9108 },
    { name: "Forward Operating Base Shank",     icao: "OASH", lat: 33.9225, long: 69.0772 },
    { name: "Jalalabad Airport",                icao: "OAJL", lat: 34.3998, long: 70.4986 },
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
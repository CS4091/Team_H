'use client';

import { useState, useEffect } from 'react';
import RouteOptions from '@/components/RouteOptions';
import ChipBar from '@/components/ChipBar';
import dynamic from "next/dynamic";
import RouteMap from '@/components/RouteMap';
import { useRouter } from 'next/navigation';
import supabase from '@/api/supabaseClient';

// no SSR
/*
const DynamicMap = dynamic(
    () => import("@/components/RouteMap").then((mod) => mod.GoogleMapClient),
    { ssr: false }
);*/

export default function CreateRoutePage() {
    const router = useRouter();

    const [name, setName] = useState<string>('Example Route');
    const [total_km, setTotal_km] = useState<number>(0);
    const [km_covered, setKm_covered] = useState<number>(0);
    const [airports, setAirports] = useState<string[]>([]); // the first airport in the list will be assumed as the starting and ending location
    const [tour, setTour] = useState<number[]>([0, 1, 2, 0]);
    const [lattitudes, setLattitudes] = useState<number[]>([]);
    const [longitudes, setLongitudes] = useState<number[]>([]);

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
        <div className='relative h-full'>
            <div className='absolute h-full z-10 pl-[50px] py-[50px]'>
               <RouteOptions onClick={handleGenerateRoute}/> 
            </div>
            {/* <div className='absolute h-fill justify-end z-10 px-[200px] '>
                <ChipBar/>
            </div> */}
            {/* <DynamicMap/> */}
            <RouteMap/>
        </div>
    );
};
'use client';

import { useState, useEffect } from 'react';
import SolvedMap from '@/components/SolvedMap';
import RouteDetails from '@/components/RouteDetails';
import TourPanel from '@/components/TourPanel';
import { zipAirportData } from '@/utils';
import { useJsApiLoader } from "@react-google-maps/api";
import { useParams } from "next/navigation";
import supabase from '@/api/supabaseClient';
import { airportType } from '@/types';
import { VscDebugContinue } from "react-icons/vsc";

interface RouteDisplayProps {

};

export default function RouteDisplayPage() {
    const { id } = useParams();

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries: ['places'],               // for autocomplete
        mapIds: ['ce7c5f352b0bc4fa'],        // for map styling
    });

    const [tour, setTour] = useState<number[]>([]);
    const [name, setName] = useState<string>('');
    const [total_km, setTotal_km] = useState<number>(0);
    const [km_covered, setKm_covered] = useState<number>(0);
    const [aircraft, setAircraft] = useState<string>('');
    const [currentNode, setCurrentNode] = useState<number>(0);
    // const [airportCodes, setAirportCodes] = useState<string[]>([]);
    // const [lattitudes, setLattitudes] = useState<number[]>([]);
    // const [longitudes, setLongitudes] = useState<number[]>([]);
    const [airports, setAirports] = useState<airportType[]>([]);


    useEffect(() => {
        const fetchRoute = async () => {
            const { data, error } = await supabase
                .from('routes')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                console.error(error);
            } else {
                setTour(data.tour);
                setName(data.name);
                setTotal_km(data.total_km);
                setKm_covered(data.setKm_covered);
                setAircraft(data.aircraft);
                setCurrentNode(data.current_node);
                const zippedUpAirports: airportType[] = zipAirportData(
                    data.airport_codes, 
                    data.airport_codes,
                    data.lat,
                    data.long
                );
                setAirports(zippedUpAirports);
            }
        };
        fetchRoute();
    }, [])

    const handleNext = () => {
        // update currentNode state
        // update supabase row with currentNode + 1
        
    };

    if (loadError) return <p>Error loading Google Maps</p>;

    return (
        <div className='relative h-full'>
            <div className='absolute flex flex-col gap-[200px] w-full h-full z-10 px-[50px] py-[50px] pointer-events-none'>
                {/* <RouteDetails
                    name={name}
                    totalKm={total_km}
                    kmCovered={km_covered}
                    aircraft={aircraft}
                />
                <div className='w-full flex flex-col justify-end px-[100px]'>
                    <div className='flex flex-row gap-[30px] justify-center items-center'>
                        <TourPanel/>
                        <button className='bg-white rounded-full p-[10px]'>
                            <VscDebugContinue size={80}/>
                        </button>
                    </div>
                </div> */}
                <RouteDetails
                    name={name}
                    totalKm={total_km}
                    kmCovered={km_covered}
                    aircraft={aircraft}
                />
                <div className='flex flex-row gap-[30px] justify-center items-center pointer-events-auto'>
                    <TourPanel
                        currentNode={currentNode}
                        tour={tour}
                        airports={airports}
                        onClicks={[]}
                    />
                    <button className='bg-white rounded-full p-[10px]'>
                        <VscDebugContinue size={80}/>
                    </button>
                </div>
            </div>
            {isLoaded && 
                <SolvedMap 
                    airports={airports}
                    tour={tour}
                    currentNode={currentNode}
                />
            } 
        </div>
    );
};
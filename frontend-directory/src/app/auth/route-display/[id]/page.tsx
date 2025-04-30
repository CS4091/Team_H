'use client';

import { useState, useEffect } from 'react';
import SolvedMap from '@/components/SolvedMap';
import { zipAirportData } from '@/utils';
import { useJsApiLoader } from "@react-google-maps/api";
import { useParams } from "next/navigation";
import supabase from '@/api/supabaseClient';
import { airportType } from '@/types';

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

    if (loadError) return <p>Error loading Google Maps</p>;

    return (
        <div className='relative h-full'>
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
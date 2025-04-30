'use client';

import { useState, useEffect, useRef } from 'react';
import SolvedMap from '@/components/SolvedMap';
import RouteDetails from '@/components/RouteDetails';
import TourPanel from '@/components/TourPanel';
import { zipAirportData } from '@/utils';
import { useJsApiLoader } from "@react-google-maps/api";
import { useParams } from "next/navigation";
import supabase from '@/api/supabaseClient';
import { airportType } from '@/types';
import { VscDebugContinue } from "react-icons/vsc";
import { motion } from 'framer-motion';

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
    const [currentStep, setCurrentStep] = useState<number>(0);
    // const [airportCodes, setAirportCodes] = useState<string[]>([]);
    // const [lattitudes, setLattitudes] = useState<number[]>([]);
    // const [longitudes, setLongitudes] = useState<number[]>([]);
    const [airports, setAirports] = useState<airportType[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const fetchRoute = async () => {
            const { data, error } = await supabase
                .from('routes')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                console.error(error);
                setLoading(false);
            } else {
                setTour(data.tour);
                setName(data.name);
                setTotal_km(data.total_km);
                setKm_covered(data.setKm_covered);
                setAircraft(data.aircraft);
                setCurrentStep(data.current_step);
                const zippedUpAirports: airportType[] = zipAirportData(
                    data.airport_names, 
                    data.airport_codes,
                    data.lat,
                    data.long
                );
                setAirports(zippedUpAirports);
            }
        };
        fetchRoute();
        setLoading(false);
    }, [])

    const mapRef = useRef<google.maps.Map | null>(null);
    const handleMapLoad = (map: google.maps.Map) => {
        mapRef.current = map;
    };

    const handleNext = async () => {
        if (tour.length === 0) return;
        const nextStep = (currentStep + 1) % tour.length;
        setCurrentStep(nextStep);
      
        const { data, error } = await supabase
          .from('routes')
          .update({ current_step: nextStep })
          .eq('id', id);
      
        if (error) {
          console.error('Failed to update current_node in DB:', error);
          setCurrentStep(currentStep);
        }
        console.log(currentStep);
     };

    // 3) Build onClicks: one per tour entry, plus loop‐back if needed
    const clickTargets = tour.slice(); 
    if (tour.length && tour[tour.length - 1] !== tour[0]) {
        clickTargets.push(tour[0]);
    }

    const onClicks = clickTargets.map((airportIdx) => () => {
        const pt = airports[airportIdx];
        if (mapRef.current && pt) {
        mapRef.current.panTo({ lat: pt.lat, lng: pt.long });
        mapRef.current.setZoom(6);   // or whatever zoom level you like
        }
    });

    if (loadError) return <p>Error loading Google Maps</p>;

    return (
        <div className='relative h-full'>
            {!loading && (
                <div className='absolute flex flex-col justify-between gap-[200px] w-full h-full z-10 px-[50px] py-[50px] pointer-events-none'>
                    <RouteDetails
                        name={name}
                        totalKm={total_km}
                        kmCovered={km_covered}
                        aircraft={aircraft}
                    />
                    <div className='flex flex-row gap-[30px] justify-center items-center pointer-events-auto'>
                        <TourPanel
                            currentStep={currentStep}
                            tour={tour}
                            airports={airports}
                            onClicks={onClicks}
                        />
                        <motion.button
                            onClick={handleNext}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="
                                bg-white 
                                rounded-full 
                                p-3 
                                shadow-md 
                                hover:bg-gray-100 
                                active:bg-gray-200 
                                transition-colors 
                                duration-200 
                                flex 
                                items-center 
                                justify-center
                            "
                            >
                            <VscDebugContinue size={32} className="text-blue-600" />
                            </motion.button>
                    </div>
                </div>
            )}
            {isLoaded && 
                <SolvedMap 
                    airports={airports}
                    tour={tour}
                    currentStep={currentStep}
                    onMapLoad={handleMapLoad}
                />
            } 
        </div>
    );
};
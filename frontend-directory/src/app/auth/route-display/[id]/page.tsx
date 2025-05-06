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
import { SyncLoader } from "react-spinners"; 

export default function RouteDisplayPage() {
    const { id } = useParams();

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries: ['places'],
        mapIds: ['ce7c5f352b0bc4fa'],
    });

    const [tour, setTour] = useState<number[]>([]);
    const [name, setName] = useState<string>('');
    const [total_km, setTotal_km] = useState<number>(0);
    const [km_covered, setKm_covered] = useState<number>(0);
    const [aircraft, setAircraft] = useState<string>('');
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [airports, setAirports] = useState<airportType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchRoute = async () => {
            setLoading(true);
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
                setKm_covered(data.km_covered); 
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
            setLoading(false); //
        };
        fetchRoute();
    }, [])

    const mapRef = useRef<google.maps.Map | null>(null);
    const handleMapLoad = (map: google.maps.Map) => {
        mapRef.current = map;
    };

    const handleNext = async () => {
        if (tour.length === 0) return;
        const nextStep = (currentStep + 1) % tour.length;
        setCurrentStep(nextStep);

        const { error } = await supabase
          .from('routes')
          .update({ current_step: nextStep })
          .eq('id', id);

        if (error) {
          console.error('Failed to update current_node in DB:', error);
          setCurrentStep(currentStep);
        }
        console.log(currentStep);
     };

    const clickTargets = tour.slice(); 
    if (tour.length && tour[tour.length - 1] !== tour[0]) {
        clickTargets.push(tour[0]);
    }

    const onClicks = clickTargets.map((airportIdx) => () => {
        const pt = airports[airportIdx];
        if (mapRef.current && pt) {
            mapRef.current.panTo({ lat: pt.lat, lng: pt.long });
            mapRef.current.setZoom(6);
        }
    });

    if (loadError) return <p>Error loading Google Maps</p>;

    return (
        <div className='relative h-full'>
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <SyncLoader color="#000000" /> 
                </div>
            ) : (
                <>
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
                                <VscDebugContinue size={32} className="text-[#711b4c]" />
                            </motion.button>
                        </div>
                    </div>
                    {isLoaded && (
                        <SolvedMap 
                            airports={airports}
                            tour={tour}
                            currentStep={currentStep}
                            onMapLoad={handleMapLoad}
                        />
                    )}
                </>
            )}
        </div>
    );
};

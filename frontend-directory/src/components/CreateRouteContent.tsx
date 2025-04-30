'use client';

import { useState, useEffect, useContext } from 'react';
import RouteOptions from '@/components/RouteOptions';
import ChipBar from '@/components/ChipBar';
import dynamic from "next/dynamic";
import RouteMap from '@/components/RouteMap';
import { RouteContext } from '@/contexts/RouteOptionsContext';
import { useRouter } from 'next/navigation';
import supabase from '@/api/supabaseClient';
import { airportType } from '@/types';
import { allAirports} from '@/constants/airports';
import { useJsApiLoader } from '@react-google-maps/api';
import { solveTsp } from '@/api/solveTsp';
import { genRouteThumbnail } from '@/api/genRouteThumbnail';

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
  

export default function CreateRouteContent() {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries: ['places'],               // for autocomplete
        mapIds: ['ce7c5f352b0bc4fa'],        // for map styling
    });    

    const router = useRouter();
    const [tour, setTour] = useState<number[]>([0, 1, 2, 0]);

    const {
        name, setName,
        total_km, setTotal_km,
        airports, setAirports
    } = useContext(RouteContext);

    const [loading, setLoading] = useState<boolean>(false);
    

    const handleGenerateRoute = async () => {
        setLoading(true);
      
        try {
          // 1) Solve TSP
		  console.log('GETTING HERE');
          const result = await solveTsp(name, airports);
          const { json_data } = result;
          const tourResult = json_data.tour;
          const costResult = json_data.cost;
      
          // 2) Update local UI state
          setTour(tourResult);
          setTotal_km(costResult);
		
          // 3) generateThumbnail
		  console.log('generating thumbnail...')
          const url = await genRouteThumbnail(airports);
      
          // 3) Insert into Supabase using the solver’s output
          const { data, error } = await supabase
            .from('routes')
            .insert([{
              name,
              total_km: costResult,
              km_covered: json_data.cost,
              current_step: 0,
              tour: tourResult,
              airport_codes: airports.map(a => a.icao),
              lat:             airports.map(a => a.lat),
              long:            airports.map(a => a.long),
              thumbnail_url: url
            }])
            .select()
            .single();
			console.log(data);
          if (error) {
            console.error('Insert failed:', error);
			setLoading(false);
            throw error;
          }
		  
          // 4) Navigate on success
          router.push(`/auth/route-display/${data.id}`);
        } catch (err) {
          console.error('Error in route generation flow:', err);
        } finally {
          setLoading(false);
        }
      };
      

    if (loadError) return <p>Error loading Google Maps</p>;

    return (
        <div className='relative h-full'>
            <div className='absolute h-full z-10 pl-[70px] py-[50px]'>
            <RouteOptions onClick={handleGenerateRoute} isLoaded={isLoaded} loading={loading}/> 
            </div>
            {/* <div className='absolute h-fill justify-end z-10 px-[200px] '>
                <ChipBar/>
            </div> */}
            {/* <DynamicMap/> */}
            {/* Only render map once loaded */}
            {isLoaded && <RouteMap airports={airports} />}
        </div>
    );
};
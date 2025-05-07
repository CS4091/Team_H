'use client';

import { useState, useEffect, useContext } from 'react';
import { RouteOptions } from '@/components';
//import dynamic from "next/dynamic";
import RouteMap from '@/components/RouteMap';
import { RouteContext } from '@/contexts/RouteOptionsContext';
import { useRouter } from 'next/navigation';
import supabase from '@/api/supabaseClient';
import { airportType } from '@/types';
import { allAirports} from '@/constants/airports';
import { useJsApiLoader } from '@react-google-maps/api';
import { solveTsp } from '@/api/solveTsp';
import { genRouteThumbnail } from '@/api/genRouteThumbnail';

export default function CreateRouteContent() {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries: ['places', 'geometry'],               // for autocomplete
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
      console.log(airports);
      const result = await solveTsp(name, airports);
      const { json_data } = result;
      const tourResult = json_data.tour;
      const costResult = json_data.cost;

      // 2) Update local UI state
      setTour(tourResult);
      setTotal_km(costResult);

      // 3) generateThumbnail
      const thumbnailCoords: [number, number][] = [];
      for (const num of tourResult) {
        thumbnailCoords.push([airports[num].lat, airports[num].long]);
      }
      thumbnailCoords.push(thumbnailCoords[0]); // add the starting coordinate as the ending coordinate
      const thumbnailUrl = await genRouteThumbnail(thumbnailCoords);

      // 3) Insert into Supabase using the solver’s output
      const { data, error } = await supabase
            .from('routes')
            .insert([{
            name,
            total_km: Math.floor(costResult),
            km_covered: 0,
            current_step: 0,
            tour: tourResult,
              airport_codes: airports.map(a => a.icao),
              airport_names: airports.map(a => a.name),
              lat:             airports.map(a => a.lat),
              long:            airports.map(a => a.long),
            thumbnail_url: thumbnailUrl,
			  aircraft: 'Boeing 747-8'
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
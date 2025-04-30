'use client';

import { useState, useContext } from 'react';
import Button from './Button';
import SearchAirportCard from './SearchAirportCard';
import { RouteContext } from '@/contexts/RouteOptionsContext';
import { airportType } from '@/types';
import { allAirports } from '@/constants/airports';

interface RouteOptionsProps {
    onClick: () => void;
    isLoaded: boolean;
}

/*
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
  ];*/
  

export default function RouteOptions({ 
    onClick,
    isLoaded
}: RouteOptionsProps) {
    const { 
        name, setName, 
        airports, setAirports
    } = useContext(RouteContext);

    // by icao code
    const [startAirport, setStartAirport] = useState<string>(
        airports[0]?.icao ?? ''
      );
    
    const [searchOpen, setSearchOpen] = useState<boolean>(false);
      // filter against ICAO, name, or region_name if present
    //   const results = allAirports.filter(a =>
    //     a.icao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     a.airport.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     (a.region_name?.toLowerCase().includes(searchTerm.toLowerCase()))
    //   );
    
    //   const handleAdd = (a: airportType) => {
    //     // only add if its ICAO isn’t already in the list
    //     if (!airports.some(ap => ap.icao === a.icao)) {
    //       setAirports([...airports, a]);
    //     }
    //   };

    return (
        <div className='bg-black rounded-lg w-fit px-[20px] h-full py-[20px] flex flex-col justify-start gap-[50px]'>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="
                bg-black 
                text-white 
                font-bold 
                text-lg 
                border-none 
                outline-none 
                focus:ring-0
                "
            />
        <Button
            text="Add airport"
            onClick={() => {setSearchOpen(true)}}
            fillContainer={true}
            invert={true}
        />
        <SearchAirportCard 
            open={searchOpen} 
            onClose={() => {setSearchOpen(false)}}
            isLoaded={isLoaded}
        />
        <div className="h-48 overflow-y-auto bg-gray-800 rounded p-2">
        {airports.length === 0 ? (
          <p className="text-gray-400">No airports added</p>
        ) : (
          airports.map((airport, idx) => (
            <label
              key={airport.icao}
              className="
                flex items-center text-white py-1
                border-b border-gray-700 last:border-b-0
                cursor-pointer
              "
            >
              <input
                type="radio"
                name="startAirport"
                value={airport.icao}
                checked={startAirport === airport.icao}
                onChange={() => setStartAirport(airport.icao)}
                className="mr-2"
              />
                {`${airport.icao} - ${airport.name}`}
            </label>
          ))
        )}
      </div>
            <Button
                text='Generate route'
                onClick={onClick}
                fillContainer={true}
                invert={true}
            />
        </div>
    );
};
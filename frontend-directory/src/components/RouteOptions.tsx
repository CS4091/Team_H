'use client';

import React, { useState, useContext } from 'react';
import Button from './Button';
import SearchAirportCard from './SearchAirportCard';
import { RouteContext } from '@/contexts/RouteOptionsContext';
import { airportType } from '@/types';

interface RouteOptionsProps {
  onClick: () => void;
  isLoaded: boolean;
}

export default function RouteOptions({ onClick, isLoaded }: RouteOptionsProps) {
  const { name, setName, airports, setAirports } = useContext(RouteContext);

  // track the ICAO of the start airport (first in list)
  const [startAirportIcao, setStartAirportIcao] = useState<string>(
    airports[0]?.icao ?? ''
  );

  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  // when user selects a start airport via radio, reorder list
  const handleStartChange = (icao: string) => {
    setStartAirportIcao(icao);
    // find the selected airport object
    const selected = airports.find((a) => a.icao === icao);
    if (selected) {
      // move it to front
      const rest = airports.filter((a) => a.icao !== icao);
      setAirports([selected, ...rest]);
    }
  };

  return (
    <div className="bg-black rounded-lg w-fit px-[20px] h-full py-[20px] flex flex-col justify-start gap-[50px]">
      {/* Editable route name */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="
          bg-black text-white font-bold text-lg
          border-none outline-none focus:ring-0
        "
      />

      {/* Add Airport Button + Search Dialog */}
      <Button
        text="Add airport"
        onClick={() => setSearchOpen(true)}
        fillContainer={true}
        invert={true}
      />
      <SearchAirportCard
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        isLoaded={isLoaded}
      />

      {/* Scrollable airport list with radio to pick start */}
      <div className="h-48 overflow-y-auto bg-gray-800 rounded p-2">
        {airports.length === 0 ? (
          <p className="text-gray-400">No airports added</p>
        ) : (
          airports.map((airport) => (
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
                checked={startAirportIcao === airport.icao}
                onChange={() => handleStartChange(airport.icao)}
                className="mr-2"
              />
              {`${airport.icao} - ${airport.name}`}
            </label>
          ))
        )}
      </div>

      {/* Generate route */}
      <Button
        text="Generate route"
        onClick={onClick}
        fillContainer={true}
        invert={true}
      />
    </div>
  );
}

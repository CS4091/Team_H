'use client';

import React, { useState, useEffect, useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import { airportType } from '@/types';
import { allAirports } from '@/constants/airports';
import { RouteContext } from '@/contexts/RouteOptionsContext';

interface SearchAirportCardProps {
  open: boolean;
  onClose: () => void;
  isLoaded: boolean;
}

export default function SearchAirportCard({
  open,
  onClose,
  isLoaded,
}: SearchAirportCardProps) {
  const { airports, setAirports } = useContext(RouteContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAirports, setFilteredAirports] = useState<airportType[]>([]);
  const [selectedAirport, setSelectedAirport] = useState<airportType | null>(null);

  // Process allAirports to ensure they match our type and have valid values
  const processedAirports = React.useMemo(() => {
    return allAirports
      .filter(airport => airport && airport.icao && airport.icao.trim() !== "") // Filter out any entries with empty ICAO codes
      .map(airport => ({
        name: airport.airport || "Unknown Airport",
        icao: airport.icao,
        lat: typeof airport.latitude === 'string' ? parseFloat(airport.latitude) : airport.latitude || 0,
        long: typeof airport.longitude === 'string' ? parseFloat(airport.longitude) : airport.longitude || 0,
      }));
  }, []);

  // Filter airports based on search term (focus on ICAO code)
  useEffect(() => {
    if (!searchTerm) {
      setFilteredAirports([]);
      return;
    }
    
    const upperSearchTerm = searchTerm.toUpperCase();
    const results = processedAirports
      .filter(airport => 
        airport.icao.includes(upperSearchTerm) || 
        airport.name.toUpperCase().includes(upperSearchTerm)
      )
      .slice(0, 10); // Limit to 10 results for performance
    
    setFilteredAirports(results);
  }, [searchTerm, processedAirports]);

  const handleSelect = (airport: airportType) => {
    setSelectedAirport(airport);
    setSearchTerm('');
    setFilteredAirports([]);
  };

  const handleAddAirport = () => {
    if (
      selectedAirport &&
      !airports.some((ap) => ap.icao === selectedAirport.icao)
    ) {
      setAirports([...airports, selectedAirport]);
    }
    setSelectedAirport(null);
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <div className="w-80 p-4 bg-white rounded shadow">
        <div className="mb-4">
          <h5 className="font-medium text-gray-900">Search Airport by ICAO</h5>
          <p className="text-sm text-gray-500">Enter an ICAO code to find an airport</p>
        </div>

        <input
          type="text"
          autoFocus
          placeholder="Search by ICAO code or airport name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            w-full mb-2
            bg-white text-gray-900
            border border-gray-300
            rounded px-3 py-2
            outline-none focus:ring-2 focus:ring-blue-400
          "
        />

        <div className="max-h-60 overflow-y-auto bg-white border border-gray-200 rounded">
          {filteredAirports.length === 0 ? (
            <p className="p-2 text-gray-500">
              {searchTerm ? "No matching airports found" : "Enter an ICAO code"}
            </p>
          ) : (
            filteredAirports.map((airport) => {
              // Ensure we have a valid, non-empty key
              const itemKey = airport.icao || `airport-${airport.name}-${airport.lat}-${airport.long}`;
              return (
                <div
                  key={itemKey}
                  onClick={() => handleSelect(airport)}
                  className="
                    px-3 py-2 text-gray-900
                    hover:bg-gray-100 cursor-pointer
                    flex justify-between
                  "
                >
                  <span className="font-medium">{airport.icao || "N/A"}</span>
                  <span className="text-gray-600">{airport.name}</span>
                </div>
              );
            })
          )}
        </div>

        {selectedAirport && (
          <div className="mt-4 p-2 bg-gray-100 rounded border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-900 font-medium">
                {selectedAirport.icao}
              </span>
              <button
                onClick={handleAddAirport}
                className="
                  bg-blue-600 hover:bg-blue-500
                  text-white py-1 px-3 rounded
                  transition-colors duration-150
                "
              >
                Add
              </button>
            </div>
            <div className="text-sm text-gray-700">
              <div>{selectedAirport.name}</div>
              <div className="text-xs text-gray-500">
                Lat: {selectedAirport.lat.toFixed(4)} | Long: {selectedAirport.long.toFixed(4)}
              </div>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
}
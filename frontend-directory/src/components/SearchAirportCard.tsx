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
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [selectedAirport, setSelectedAirport] =
    useState<airportType | null>(null);

  useEffect(() => {
    if (!isLoaded || !searchTerm) {
      setPredictions([]);
      return;
    }
    const svc = new window.google.maps.places.AutocompleteService();
    svc.getPlacePredictions(
      { input: searchTerm, types: ['airport'] },
      (preds, status) => {
        if (
          status ===
            window.google.maps.places.PlacesServiceStatus.OK &&
          preds
        ) {
          setPredictions(preds);
        } else {
          setPredictions([]);
        }
      }
    );
  }, [searchTerm, isLoaded]);

  const handleSelect = (
    p: google.maps.places.AutocompletePrediction
  ) => {
    const desc = p.description || p.structured_formatting.main_text;
    const matchRaw = allAirports.find(
      (a) =>
        a.airport.toLowerCase() === desc.toLowerCase() ||
        desc.toLowerCase().includes(a.airport.toLowerCase())
    );
    if (matchRaw) {
      const mapped: airportType = {
        name: matchRaw.airport,
        icao: matchRaw.icao,
        lat: typeof matchRaw.latitude === 'string'
          ? parseFloat(matchRaw.latitude)
          : matchRaw.latitude,
        long: typeof matchRaw.longitude === 'string'
          ? parseFloat(matchRaw.longitude)
          : matchRaw.longitude,
      };
      setSelectedAirport(mapped);
    }
    setSearchTerm('');
    setPredictions([]);
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
      <div className="w-80 p-4 bg-gray-800 rounded">
        {!isLoaded ? (
          <p className="text-white">Loading autocomplete…</p>
        ) : (
          <>
            <input
              type="text"
              autoFocus
              placeholder="Search airport by name…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full mb-2
                bg-gray-700 text-white
                rounded px-3 py-2
                border-none outline-none focus:ring-0
              "
            />

            <div className="max-h-60 overflow-y-auto">
              {predictions.length === 0 ? (
                <p className="text-gray-400">No results</p>
              ) : (
                predictions.map((p) => (
                  <div
                    key={p.place_id}
                    onClick={() => handleSelect(p)}
                    className="
                      px-3 py-2 text-white
                      hover:bg-gray-700 cursor-pointer
                    "
                  >
                    {p.description}
                  </div>
                ))
              )}
            </div>

            {selectedAirport && (
              <div className="mt-4 p-2 bg-gray-700 rounded text-white flex justify-between items-center">
                <span>
                  <strong>Selected:</strong> {selectedAirport.name} ({selectedAirport.icao})
                </span>
                <button
                  onClick={handleAddAirport}
                  className="ml-2 bg-blue-600 hover:bg-blue-500 text-white py-1 px-2 rounded"
                >
                  Add
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Dialog>
  );
}

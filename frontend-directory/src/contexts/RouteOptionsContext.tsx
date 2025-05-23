import { airportType } from '@/types';
import React, { createContext, useState, ReactNode } from 'react';

// 1. Define context shape
export interface RouteContextType {
  name: string;
  setName: (name: string) => void;
  total_km: number;
  setTotal_km: (km: number) => void;
  km_covered: number;
  setKm_covered: (km: number) => void;
  airports: airportType[];
  setAirports: (airports: airportType[]) => void;
}

// 2. Create context with default values
export const RouteContext = createContext<RouteContextType>({
  name: 'Example Route',
  setName: () => {},
  total_km: 0,
  setTotal_km: () => {},
  km_covered: 0,
  setKm_covered: () => {},
  airports: [],
  setAirports: () => {},
});

// 3. Create provider component
export const RouteProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string>('Example Route');
  const [total_km, setTotal_km] = useState<number>(0);
  const [km_covered, setKm_covered] = useState<number>(0);
  const [airports, setAirports] = useState<airportType[]>([]);

  return (
    <RouteContext.Provider
      value={{
        name,
        setName,
        total_km,
        setTotal_km,
        km_covered,
        setKm_covered,
        airports,
        setAirports,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};
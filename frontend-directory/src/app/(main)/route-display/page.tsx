"use client";

import { useState } from "react";
import React from "react";

import RouteStatsPanel from "@/components/RouteStatsPanel";
import RouteCitiesPanel from "@/components/RouteCitiesPanel";

interface RouteDisplayProps {
  currentStep: number;
  tripSteps: [{ city: string; region: string }];
  tripStats: [
    {
      tripName: string;
      aircraftName: string;
      totalCost: string;
      totalDistance: string;
      totalTravelTime: string;
      routeGenerationDate: string;
    }
  ];
}

export default function RouteDisplayPage({}: RouteDisplayProps) {
  const [currentStep, setCurrentStep] = useState(3);

  const mockTripSteps = [
    { city: "Atlanta", region: "Georgia, USA" },
    { city: "St. Louis", region: "Missouri, USA" },
    { city: "Amsterdam", region: "Netherlands" },
    { city: "Tokyo", region: "Japan" },
    { city: "Toronto", region: "Ontario, Canada" },
    { city: "Paris", region: "France" },
    { city: "Antwerp", region: "Belgium" },
    { city: "Buenos Aires", region: "Argentina" },
  ];

  const mockStats = {
    tripName: "Goated Trip",
    aircraftName: "Boeing 737",
    totalCost: "$1208.28",
    totalDistance: "1285.28km",
    totalTravelTime: "1 day, 13 hours, 53 minutes",
    routeGenerationDate: "May 17th, 2025",
  };

  return (
    <>
      <div className="flex flex-row gap-1 h-[89.5svh]">
        <nav className="h-[89.5svh] w-[12%] bg-gray-300 border-2 border-solid border-2 border-solid">
          SIDEBAR PLACEHOLDER
        </nav>

        <div className="w-full max-w-[88%] h-[89.5svh] gap-1 flex flex-col">
          <div className="w-full h-[71%] flex flex-row gap-1">
            {/* Map Section */}
            <div className="rounded-lg border-2 border-solid w-full h-full bg-red-100">
              GOOGLE MAPS PLACEHOLDER
            </div>

            <div className="w-1/3">
              <RouteStatsPanel
                tripName={mockStats.tripName}
                aircraftName={mockStats.aircraftName}
                startCity={mockTripSteps[0].city}
                endCity={mockTripSteps[mockTripSteps.length - 1].city}
                totalCost={mockStats.totalCost}
                totalDistance={mockStats.totalDistance}
                totalTravelTime={mockStats.totalTravelTime}
                routeGenerationDate={mockStats.routeGenerationDate}
              />
            </div>
          </div>

          <div className="h-[29%]">
            <RouteCitiesPanel
              currentStep={currentStep}
              tripSteps={mockTripSteps}
            />
          </div>
        </div>
      </div>
    </>
  );
}

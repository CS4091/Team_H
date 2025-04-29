"use client";

import { useState } from "react";
import React from "react";

import RouteStatsPanel from "@/components/RouteStatsPanel";
import RouteCitiesPanel from "@/components/RouteCitiesPanel";

import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface RouteDisplayProps {
  tripSteps: [{ city: string; region: string }];
  tripStats: {
    tripName: string;
    aircraftName: string;
    totalCost: string;
    totalDistance: string;
    totalTravelTime: string;
    routeGenerationDate: string;
  };
}

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

export default function RouteDisplayAuthPage({}: RouteDisplayProps) {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="relative w-full h-full">
      <div className="absolute w-full h-full bg-red-100 z-0">
        GOOGLE MAPS PLACEHOLDER
      </div>

      <div className="absolute top-4 right-4 w- h-2/3 z-10"></div>

      <div className="absolute top-4 right-4 w-[300px] opacity-30 hover:opacity-90 h-2/3 z-10">
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

      <div className="absolute bottom-4 z-10 flex w-full opacity-30 hover:opacity-90 justify-center items-center gap-4">
        <IconButton
          className="rounded-3xl h-36 w-10"
          onClick={() => {
            if (currentStep - 1 >= 0) {
              setCurrentStep(currentStep - 1);
            }
          }}
        >
          <ChevronRightIcon
            preserveAspectRatio="none"
            className="h-[160px] w-[50px] [transform:scaleX(-1)]"
          />
        </IconButton>

        <div className="w-[89%]">
          <RouteCitiesPanel
            currentStep={currentStep}
            tripSteps={mockTripSteps}
          />
        </div>

        <IconButton
          className="rounded-3xl h-36 w-10"
          onClick={() => {
            if (currentStep + 1 < mockTripSteps.length)
              setCurrentStep(currentStep + 1);
          }}
        >
          <ChevronRightIcon
            preserveAspectRatio="none"
            className="h-[160px] w-[50px]"
          />
        </IconButton>
      </div>
    </div>
  );
}

"use client";

// NOTE: THIS PAGE AND 'route-display' DIRECTORY SHOULD BE MOVED UNDER AUTH ONCE FINISHED

import Image from "next/image";

import { useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import React from "react";

export default function RouteDisplayPage() {
  const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  const [currentStep, setCurrentStep] = useState(2);

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

            {/* Trip Stats Section */}
            <div className="w-1/3 p-3 justify-between flex flex-col bg-white rounded-lg border-2 border-solid">
              <div className="font-bold text-[34px] text-center leading-[1.1] pt-2">
                “Goated Trip” from Atlanta to Boston
              </div>
              <div className="flex flex-col gap-2">
                <div className="border-2 border-solid rounded-lg p-2 text-center">
                  💲
                  <div className="h-[14px]" />
                  Estimated Total Cost:
                  <br />
                  $1208.28
                </div>
                <div className="border-2 border-solid rounded-lg p-2 text-center">
                  💲
                  <div className="h-[14px]" />
                  Estimated Total Cost:
                  <br />
                  $1208.28
                </div>
                <div className="border-2 border-solid rounded-lg p-2 text-center">
                  💲
                  <div className="h-[14px]" />
                  Estimated Total Cost:
                  <br />
                  $1208.28
                </div>
              </div>
              <div className="border-2 border-solid rounded-lg p-1 text-center italic text-gray-500 text-[12px]">
                Route Generation Date:
                <br />
                May 17th, 2025
              </div>
            </div>
          </div>

          {/* LocationCard Navigation Section */}
          <div
            className="h-[29%] rounded-lg border-2 border-solid px-16 flex flex-col justify-center overflow-x-auto scrollbar-hide select-none gap-16 cursor-[grab]"
            {...events}
            ref={ref}
          >
            <div className="flex gap-[150px] min-w-max relative">
              {mockTripSteps.map((step, index) => (
                <div
                  key={step.city}
                  className={`
                    relative flex flex-col items-center justify-center w-[160px] h-[100px]
                    rounded-xl shadow-md hover:shadow-xl text-s text-center cursor-pointer 
                    ${
                      index === currentStep
                        ? "bg-blue-200 font-semibold"
                        : "bg-blue-50 hover:bg-blue-100 active:bg-blue-200"
                    }
                  `}
                  onClick={() => setCurrentStep(index)}
                >
                  <span className="absolute top-1 left-2 italic text-xs text-gray-400">
                    {index + 1}
                  </span>
                  {step.city}
                  <span className="text-gray-400 italic">{step.region}</span>
                </div>
              ))}
              <div
                className="absolute z-10 top-[110px]"
                style={{ left: `calc(${currentStep} * 310px + 42px)` }}
              >
                <Image
                  width={70}
                  height={70}
                  src="/PlaneSilhouette.png"
                  alt="A plane silhouette"
                  className="opacity-65"
                />
              </div>
            </div>

            <div className="ml-16 flex items-center min-w-max">
              {mockTripSteps.map((step, index) => (
                <React.Fragment key={index}>
                  <span
                    className={`w-6 h-3 rounded-full mx-1
                    ${
                      index < currentStep
                        ? "bg-gray-400"
                        : index === currentStep
                        ? "bg-yellow-500"
                        : "bg-gray-200"
                    }`}
                  />
                  {index < mockTripSteps.length - 1 && (
                    <span
                      className={`w-[270px] h-1 mx-1
                      ${index < currentStep ? "bg-gray-400" : "bg-gray-200"}`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

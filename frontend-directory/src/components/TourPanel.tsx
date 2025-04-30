'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useDraggable } from 'react-use-draggable-scroll';
import { motion } from 'framer-motion';
import { airportType } from '@/types';
import React from 'react';

interface TourPanelProps {
  currentStep: number;
  tour: number[];                // e.g. [0,2,1,3]
  airports: airportType[];       // full list of airport objects
  onClicks: Array<() => void>;   // one handler per tour position
}

export default function TourPanel({
  currentStep,
  tour,
  airports,
  onClicks,
}: TourPanelProps) {
    const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLInputElement>;
    const { events } = useDraggable(ref);
  
    const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  
    useEffect(() => {
      if (cardRefs.current[currentStep]) {
        cardRefs.current[currentStep]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }, [currentStep]);
  
    return (
      <div
        className="w-full rounded-lg border-2 border-solid bg-white py-4 px-16 flex flex-col
          justify-center overflow-x-auto scrollbar-hide select-none gap-16 cursor-[grab]"
        {...events}
        ref={ref}
      >
        <div className="flex gap-[150px] min-w-max relative">
          {tour.map((node, index) => (
            <button
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onClick={onClicks[index]}
              className={`
                relative flex flex-col items-center justify-center w-[160px] h-[100px]
                rounded-xl shadow-md text-s text-center 
                ${
                  index === currentStep
                    ? "bg-blue-200 font-semibold"
                    : "bg-blue-50"
                }
              `}
            >
              {/* <span className="absolute top-1 left-2 italic text-xs text-gray-400">
                {index + 1}
              </span> */}
              
              <h4>{airports[node].icao}</h4>
              <p className="text-gray-400 italic">{airports[node].name}</p>
            </button>
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
          {tour.map((node, index) => (
            <React.Fragment key={index}>
              <span
                className={`w-6 h-3 rounded-full mx-1
                  ${
                    index < currentStep
                      ? "bg-gray-400"
                      : index === currentStep
                      ? "bg-[#6124eb]"
                      : "bg-gray-200"
                  }`}
              />
              {index < airports.length - 1 && (
                <span
                  className={`w-[270px] h-1 mx-1
                    ${index < currentStep ? "bg-gray-400" : "bg-gray-200"}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
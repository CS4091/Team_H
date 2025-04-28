"use client";

import React from "react";
import Image from "next/image";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

interface RouteCitiesPanelProps {
  currentStep: number;
  tripSteps: { city: string; region: string }[];
}

export default function RouteCitiesPanel({
  currentStep,
  tripSteps,
}: RouteCitiesPanelProps) {
  const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  return (
    <div
      className="w-full h-full rounded-lg border-2 border-solid px-16 flex flex-col
        justify-center overflow-x-auto scrollbar-hide select-none gap-16 cursor-[grab]"
      {...events}
      ref={ref}
    >
      <div className="flex gap-[150px] min-w-max relative">
        {tripSteps.map((step, index) => (
          <div
            key={step.city}
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
        {tripSteps.map((step, index) => (
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
            {index < tripSteps.length - 1 && (
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

'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useDraggable } from 'react-use-draggable-scroll';
import { motion } from 'framer-motion';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { airportType } from '@/types';

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
  // container ref for scrolling + measuring
  const containerRef = useRef<HTMLDivElement>(null);
  const { events } = useDraggable(containerRef);

  // refs to each StepButton DOM node
  const stepBtnRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // plane position state
  const [planePos, setPlanePos] = useState({ x: 0, y: 0 });

  // whenever currentStep changes, re‐measure
  useEffect(() => {
    const container = containerRef.current;
    const btn = stepBtnRefs.current[currentStep];
    if (!container || !btn) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    setPlanePos({
      // center of the button minus container’s left edge
      x: btnRect.left + btnRect.width / 2 - containerRect.left,
      // button’s top edge minus container’s top edge
      y: btnRect.top - containerRect.top,
    });
  }, [currentStep, tour]);

  return (
    <div
      ref={containerRef}
      {...events}
      className="w-full rounded-2xl border-2 border-solid py-4 px-16
                 flex flex-col justify-center overflow-x-auto
                 scrollbar-hide select-none gap-16 cursor-[grab]"
      style={{
        backgroundColor: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(2px)',
      }}
    >
      <Stepper
        nonLinear
        activeStep={currentStep}
        alternativeLabel
        sx={{
          py: 0,
          '& .MuiStepConnector-line': { borderTopWidth: 2 },
        }}
      >
        {tour.map((node, idx) => (
          <Step key={idx}>
            <StepButton
              // capture each button’s DOM node
              ref={el => (stepBtnRefs.current[idx] = el)}
              onClick={onClicks[idx]}
            >
              <Box textAlign="center">
                <Typography variant="subtitle2">
                  {airports[node].icao}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {airports[node].name}
                </Typography>
              </Box>
            </StepButton>
          </Step>
        ))}
      </Stepper>

      {/* animated plane */}
      <motion.div
        initial={false}
        animate={{ left: planePos.x, top: planePos.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          position: 'absolute',
          // translate back by half its width (x) and full height (y)
          transform: 'translate(-50%, -100%)',
          zIndex: 10,
        }}
      >
        <Image
          src="/PlaneSilhouette.png"
          alt="Plane silhouette"
          width={48}
          height={48}
          className="opacity-60"
        />
      </motion.div>
    </div>
  );
}

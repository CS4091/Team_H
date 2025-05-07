'use client';

import React, { useRef } from 'react';
import { Box, Stepper, Step, StepButton, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
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
  const total = tour.length;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        bgcolor: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(2px)',
        borderRadius: 2,
        border: 2,
        borderColor: 'divider',
        px: 2,
        py: 4,
        overflowX: 'auto',
      }}
    >
      <Stepper
        nonLinear
        activeStep={currentStep}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          py: 0,
          '& .MuiStepConnector-line': {
            borderTopWidth: 2,
          },
        }}
      >
        {tour.map((node, idx) => {
          const airport = airports[node];
          return (
            <Step key={idx}>
              <StepButton onClick={onClicks[idx]}>
                <div className='flex flex-col'>
                    <Box textAlign="center">
                    <Typography variant="subtitle2">{airport.icao}</Typography>
                    <Typography variant="caption" color="text.secondary">
                        {airport.name}
                    </Typography>
                    </Box>
                    <Image
                        src="/PlaneSilhouette.png"
                        alt="Plane silhouette"
                        width={48}
                        height={48}
                        className="opacity-60"
                    />
                </div>
              </StepButton>
            </Step>
          );
        })}
      </Stepper>

      {/* Animated plane */}
      <motion.div
        initial={false}
        animate={{
          left: `calc(${currentStep} * (100% / ${total - 1}))`,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          position: 'absolute',
          top: 72,                // adjust to sit just under the connector line
          transform: 'translateX(-50%)',
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
    </Box>
  );
}

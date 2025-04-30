'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { IoAirplaneOutline } from "react-icons/io5";

interface RouteCardProps {
  name: string;
  thumbnail: string;
  date: string;
  aircraftName: string;
  totalKilometers: number;
  currentNode: number;
  id: number;
}

export default function RouteCard({
  name,
  thumbnail,
  date,
  aircraftName,
  totalKilometers,
  currentNode,
  id,
}: RouteCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // track pointer offset from center
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // map pointer offsets to rotation angles
  const rotateY = useTransform(x, [-100, 100], [15, -15]);
  const rotateX = useTransform(y, [-100, 100], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
//55, 132, 240, 0.5
  return (
    <a 
        href={`/auth/route-display/${id}`}
    >
        <motion.div
        ref={cardRef}
        className=" w-[400px] rounded-lg shadow-[5px_8px_10px_1px_rgba(113,27,76,0.25)]
 bg-white overflow-hidden"
        style={{ 
            perspective: 800,
            rotateX, 
            rotateY 
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
        <div className='flex flex-col h-[360px]'>
            <div className='p-4 flex justify-between'>
            <div>
                <h6 className='font-bold'>{name}</h6>
                <div className='flex gap-1 items-center'>
                <IoAirplaneOutline />
                <p className='text-sm'>{aircraftName}</p>
                </div>
            </div>
            <p className='text-sm text-gray-500'>{date}</p>
            </div>
            <img
            src={thumbnail}
            alt={`Map of ${name} route`}
            className='object-cover flex-1'
            />
        </div>
        </motion.div>
    </a>
  );
}
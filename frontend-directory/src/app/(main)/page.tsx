'use client';

import { useRef } from 'react';
import Image from 'next/image';
import FlightIcon from '@mui/icons-material/Flight';
import Button from '@/components/Button';
import Features from "@/components/Features";
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
	const containerRef = useRef<HTMLDivElement>(null);
	
	// Text animation variants
	const textVariants = {
		hidden: {
			opacity: 0,
			scale: 0.8,
			filter: "blur(8px)",
		},
		visible: {
			opacity: 1,
			scale: 1,
			filter: "blur(0px)",
			transition: {
				duration: 0.8,
				ease: "easeOut",
			}
		}
	};
	
	// Stagger the animations
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2
			}
		}
	};

	return (
        <div>
			<div className='flex h-screen justify-center items-center px-[100px] gap-[100px]'>
				<div className='flex flex-row gap-[70px] w-full'> 
					<motion.div 
						className='flex flex-col justify-center gap-[30px]'
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						<motion.h1 variants={textVariants}>
							Find the Most Efficient Route for you Trip
						</motion.h1>
						
						<motion.h5 variants={textVariants}>
							Make your life easier by finding the optimal route for your trip with our minimalist approach
						</motion.h5>
						
						<motion.div 
							className='flex flex-row gap-[50px]'
							variants={textVariants}
						>
							<button 
                  className={`flex items-center justify-center shadow-lg  ${false ? 'bg-white text-black' : 'bg-black text-white'} rounded-[10px] py-[12px] px-[20px] ${false ? 'w-full' : 'w-fill'}`}
                  
              >
                <p className='font-light'>
                  Get Started
                </p>
              </button>
							<button 
                  className={`flex items-center justify-center bg-white outline outline-[1px] shadow-lg rounded-[10px] py-[12px] px-[20px] ${false ? 'w-full' : 'w-fill'}`}
                  
              >
                <p className='font-light'>
                 Learn More
                </p>
              </button>
						</motion.div>
					</motion.div>
			</div>
			<div className='w-full ml-[10px] mr-[-50px]' ref={containerRef}>
                <Image 
                    width={906}
                    height={512}
                    src="/PlaneOverCity.png" 
                    alt="A plane flying over a city" 
                    className="rounded-xl shadow-xl"
                />
			</div>
		</div>
        <Features/>
    </div>
	);
};
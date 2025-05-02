'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RouteCard from '@/components/RouteCard';
import { formatDate } from '@/utils';
import supabase from '@/api/supabaseClient';

const containerVariants = {
    hidden: {}, // we don’t need to animate the container itself
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
};

const cardVariants = {
hidden: { opacity: 0, y: 20 },
show:   { opacity: 1, y: 0 }
};

export default function DashboardPage() {
    const [routes, setRoutes] = useState<any | null>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        //setRoutes(dummyData);
        const fetchRoutes = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('routes')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) {
                console.error(error);
            } else {
                setRoutes(data);
                setLoading(false);
            }
        };
        fetchRoutes();
    }, []);

    // h-fill is very important
    return (
        <>
            {!loading ? (
                <div className="flex flex-col min-h-screen justify-center items-center pl-[50px] pt-[50px]">
                <motion.div
                    className="flex flex-wrap justify-center gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {routes.map((route, idx) => (
                        <motion.div 
                            key={idx} 
                            variants={cardVariants}
                            className=""  // or whatever width you want
                        >
                            <RouteCard
                                name={route.name}
                                thumbnail={route.thumbnail_url}
                                aircraftName={route.aircraft}
                                date={formatDate(route.created_at)}
                                totalKilometers={route.total_km}
                                currentNode={route.current_node}
                                id={route.id}
                            />
                        </motion.div>
                    ))}
                </motion.div>
                </div>
            ) : (
                <motion.div 
					className='flex flex-col justify-center items-center pt-[200px]'
					variants={cardVariants}
				>
					<div className="flex items-center">
						<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
						<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
					</div>
				</motion.div>
            )}
        </>
      );    
};
'use client';
import { SyncLoader } from "react-spinners";
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
            className="flex justify-center items-center h-screen"
            variants={cardVariants}
        >
            <div className="my-4">
                <SyncLoader color="#000000" size={20} />
            </div>
        </motion.div>                  
            )}
        </>
      );    
};
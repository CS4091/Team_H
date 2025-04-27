'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RouteCard from '@/components/RouteCard';
import { formatDate } from '@/utils';

const dummyData = [
    {
        name: "Hide Shippings",
        aircraftName: "Boeing 747-8",
        dateCreated: "2025-04-12T14:23:45.123+00:00",
        totalKilometers: 23452,
        currentNode: 0,
    },
    {
        name: "Hide Shippings",
        aircraftName: "Boeing 747-8",
        dateCreated: "2025-04-12T14:23:45.123+00:00",
        totalKilometers: 23452,
        currentNode: 0,
    },
    {
        name: "Hide Shippings",
        aircraftName: "Boeing 747-8",
        dateCreated: "2025-04-12T14:23:45.123+00:00",
        totalKilometers: 23452,
        currentNode: 0,
    },
    {
        name: "Hide Shippings",
        aircraftName: "Boeing 747-8",
        dateCreated: "2025-04-12T14:23:45.123+00:00",
        totalKilometers: 23452,
        currentNode: 0,
    },
    {
        name: "Hide Shippings",
        aircraftName: "Boeing 747-8",
        dateCreated: "2025-04-12T14:23:45.123+00:00",
        totalKilometers: 23452,
        currentNode: 0,
    },
    {
        name: "Hide Shippings",
        aircraftName: "Boeing 747-8",
        dateCreated: "2025-04-12T14:23:45.123+00:00",
        totalKilometers: 23452,
        currentNode: 0,
    },
    {
        name: "Hide Shippings",
        aircraftName: "Boeing 747-8",
        dateCreated: "2025-04-12T14:23:45.123+00:00",
        totalKilometers: 23452,
        currentNode: 0,
    },
    {
        name: "Hide Shippings",
        aircraftName: "Boeing 747-8",
        dateCreated: "2025-04-12T14:23:45.123+00:00",
        totalKilometers: 23452,
        currentNode: 0,
    },
    {
        name: "Hide Shippings",
        aircraftName: "Boeing 747-8",
        dateCreated: "2025-04-12T14:23:45.123+00:00",
        totalKilometers: 23452,
        currentNode: 0,
    },
    {
        name: "Hide Shippings",
        aircraftName: "Boeing 747-8",
        dateCreated: "2025-04-12T14:23:45.123+00:00",
        totalKilometers: 23452,
        currentNode: 0,
    },
]

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
    const [routes, setRoutes] = useState(dummyData);

    useEffect(() => {
        setRoutes(dummyData);
    }, []);

    // h-fill is very important
    return (
        <div className="flex flex-col min-h-screen justify-center items-center">
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
                    thumbnail={"/dummyThumbnail.png"}
                    aircraftName={route.aircraftName}
                    date={formatDate(route.dateCreated)}
                    totalKilometers={route.totalKilometers}
                    currentNode={route.currentNode}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      );    
};
'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import RouteCard from '@/components/RouteCard';
import { formatDate } from '@/utils';
import { Route } from '@mui/icons-material';

export default function DashboardPage() {
    const [routes, setRoutes] = useState([
        {
            name: "Hide Shippings",
            dateCreated: "2025-04-12T14:23:45.123+00:00",
            totalKilometers: 23452,
            currentNode: 0,
        },
        {
            name: "Hide Shippings",
            dateCreated: "2025-04-12T14:23:45.123+00:00",
            totalKilometers: 23452,
            currentNode: 0,
        },
        {
            name: "Hide Shippings",
            dateCreated: "2025-04-12T14:23:45.123+00:00",
            totalKilometers: 23452,
            currentNode: 0,
        },
    ]);

    useEffect(() => {

    }, []);

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <div className="flex flex-wrap">
                {routes.map((route, index) => (
                    <RouteCard
                        key={index}
                        name={route.name}
                        date={formatDate(route.dateCreated)}
                        totalKilometers={route.totalKilometers}
                        currentNode={route.currentNode}
                    />
                ))}
            </div>
        </div>
    );
};
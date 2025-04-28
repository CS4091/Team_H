'use client';

import { useState, useEffect } from 'react';
import dynamic from "next/dynamic";

// no SSR
const DynamicMap = dynamic(
  () => import("@/components/RouteMap").then((mod) => mod.GoogleMapClient),
  { ssr: false }
);

export default function CreateRoutePage() {
    return (
        <div className='outline h-full'>
            <DynamicMap/>
        </div>
    );
};
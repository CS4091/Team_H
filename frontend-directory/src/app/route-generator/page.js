"use client"

import { useState } from 'react'
import CsvUploader from '@/components/CsvUploader';

export default function RouteGeneratorPage() {
    return (
        <div classNam='flex justify-center items-center'>
            <CsvUploader/>
        </div>
    );
};
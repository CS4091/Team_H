"use client"

import { useState } from 'react'
import CsvUploader from '@/components/CsvUploader';
import Button from '@/components/Button';

import { generateRouteFromCsv } from '@/api/generateRouteFromCsv';

export default function RouteGeneratorPage() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false)

    // update this code to send api resposne to backend
    const handleSubmit = () => {
        const uploadProblem = async () => {
            try {
                setLoading(true);
                const result = await generateRouteFromCsv({ file });
                alert('Solved the TSP!');
            } catch (err) {
                alert('Failed to solve the TSP. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        uploadProblem();
    };

    return (
        <div className='flex h-screen justify-center items-center'>
            <div className='flex flex-col justify-center items-center w-[400px] gap-[50px]'>
                <CsvUploader onFileSelect={(csv: File) => {setFile(csv)}}/>
                <Button 
                    text='Calculate Route'
                    onClick={handleSubmit}
                    fillContainer={true}
                />
            </div>
        </div>
    );
};
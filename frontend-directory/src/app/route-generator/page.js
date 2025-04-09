"use client"

import { useState } from 'react'
import CsvUploader from '@/components/CsvUploader';
import Button from '@/components/Button';
import { tspClient } from '@/api/tspClient';

export default function RouteGeneratorPage() {
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false)

    // update this code to send api resposne to backend
    const handleSubmit = () => {
        const uploadProblem = async () => {
            try {
                setLoading(true);
                const result = await tspClient.uploadProblem(file);
                // handel result her not sure the format of the response
                // FUTURE UPDATE: will need to take user to dynamic routed page for this generated route
                // also update user data in database
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
                <CsvUploader onFileSelect={(csv) => {setFile(csv)}}/>
                <Button 
                    text='Calculate Route'
                    onClick={handleSubmit}
                    fillContainer={true}
                />
            </div>
        </div>
    );
};
"use client"

import { useState } from 'react'
import CsvUploader from '@/components/CsvUploader';
import Button from '@/components/Button';

export default function RouteGeneratorPage() {
    const [file, setFile] = useState();

    // update this code to send api resposne to backend
    const handleSubmit = () => {

    };

    return (
        <div classNam='flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center w-[400px] gap-[50px]'>
                <CsvUploader/>
                <Button 
                    text='Calculate Route'
                    onClick={handleSubmit}
                    fillContainer={true}
                />
            </div>
        </div>
    );
};
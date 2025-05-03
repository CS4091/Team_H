'use client';

import { useState } from 'react';
//import { tspClient } from '../api/tspClient';

interface FileUploadProps {
  onSolveComplete?: (result: any) => void;
}

export default function FileUpload({ onSolveComplete }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      //const result = await tspClient.uploadProblem(file);
      if (onSolveComplete) {
        //onSolveComplete(result);
      }
    } catch (err) {
      setError('Failed to solve the TSP problem. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload TSP Problem</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            CSV File with Graph Data
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <p className="mt-1 text-sm text-gray-500">
            Upload a CSV file with From, To, Cost columns
          </p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading || !file}
          className={`w-full py-2 px-4 rounded-md font-medium text-white 
            ${isLoading || !file
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
        >
          {isLoading ? 'Processing...' : 'Solve TSP Problem'}
        </button>
      </form>
    </div>
  );
} 
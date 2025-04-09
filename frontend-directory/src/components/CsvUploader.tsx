'use client';

import { useState, useRef } from 'react'

interface CsvUploaderProps {
    onFileSelect: (file: File, content: string) => void;
};

export default function CsvUploader({ onFileSelect }: CsvUploaderProps) {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
  
    const handleFile = (file: File) => {
      if (file.type !== 'text/csv') {
        alert('Please upload a CSV file.');
        return;
      }
  
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        onFileSelect(file, text); // Pass file + contents back to parent
      };
      reader.readAsText(file);
    };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-8 transition-colors duration-200 ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <h6 className="text-center text-gray-600 mb-4">
          Drag & drop your CSV file here, or
        </h6>
        <button
          onClick={triggerFileInput}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Upload CSV
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </div>
  );
}

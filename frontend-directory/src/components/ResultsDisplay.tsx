'use client';

import { useState, useEffect } from 'react';
import { tspClient, ResultSummary, TSPResult } from '../api/tspClient';
import Image from 'next/image';

export default function ResultsDisplay() {
  const [results, setResults] = useState<ResultSummary[]>([]);
  const [selectedResult, setSelectedResult] = useState<TSPResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch results on component mount
  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await tspClient.getResults();
      setResults(data);
    } catch (err) {
      setError('Failed to fetch results');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = async (resultName: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await tspClient.getResultDetails(resultName);
      setSelectedResult(data);
    } catch (err) {
      setError('Failed to fetch result details');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className="w-full p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">TSP Results</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Results List */}
        <div className="md:col-span-1 border rounded-lg p-4 bg-gray-50">
          <h3 className="text-lg font-semibold mb-3">Available Results</h3>
          
          {isLoading && !selectedResult && (
            <div className="text-center py-4">Loading results...</div>
          )}
          
          {results.length === 0 && !isLoading && (
            <div className="text-center py-4 text-gray-500">No results available</div>
          )}
          
          <ul className="divide-y">
            {results.map((result) => (
              <li key={result.name} className="py-2">
                <button
                  onClick={() => handleResultClick(result.name)}
                  className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <div className="font-medium">{result.name}</div>
                  <div className="text-sm text-gray-500">
                    Cost: {result.cost.toFixed(2)} | 
                    Nodes: {result.nodes}
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatDate(result.created)}
                  </div>
                </button>
              </li>
            ))}
          </ul>
          
          <button
            onClick={fetchResults}
            className="mt-4 w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700"
          >
            Refresh Results
          </button>
        </div>
        
        {/* Result Details */}
        <div className="md:col-span-2 border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Result Details</h3>
          
          {isLoading && selectedResult && (
            <div className="text-center py-4">Loading details...</div>
          )}
          
          {!selectedResult && !isLoading && (
            <div className="text-center py-12 text-gray-500">
              Select a result to view details
            </div>
          )}
          
          {selectedResult && (
            <div>
              <div className="mb-4">
                <h4 className="font-medium">Tour Cost</h4>
                <div className="text-2xl font-bold">{selectedResult.cost.toFixed(2)}</div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium">Tour Path</h4>
                <div className="text-sm bg-gray-100 p-2 rounded-md overflow-x-auto">
                  {selectedResult.tour.join(' → ')}
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium">Visualization</h4>
                <div className="mt-2 border rounded-md overflow-hidden">
                  {selectedResult.visualization_path && (
                    <Image
                      src={selectedResult.visualization_path}
                      alt="TSP tour visualization"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <a
                  href={selectedResult.json_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Download JSON
                </a>
                <a
                  href={selectedResult.csv_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Download CSV
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
// import Image from 'next/image';
// import FileUpload from '../components/FileUpload';
// import ResultsDisplay from '../components/ResultsDisplay';
// import { TSPResult } from '../api/tspClient';

export default function Home() {
  //   const [activeTab, setActiveTab] = useState<'upload' | 'results'>('upload');
  //   const [latestResult, setLatestResult] = useState<TSPResult | null>(null);

  //   const handleSolveComplete = (result: TSPResult) => {
  //     setLatestResult(result);
  //     setActiveTab('results');
  //   };

  return (
    <div className="text-6xl mt-[300px] text-center">
      LANDING PAGE PLACEHOLDER
    </div>
    //  <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    //   <div className="container mx-auto px-4 py-8">
    //     {/* Header */}
    //     <header className="flex flex-col items-center mb-8">
    //       <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
    //         TSP Optimization with Christofides
    //       </h1>
    //       <p className="text-gray-600 text-center max-w-2xl">
    //         Approximate solutions to the Traveling Salesman Problem using the Christofides algorithm.
    //         Upload your graph data as CSV and get optimized routes.
    //       </p>
    //     </header>

    //     {/* Navigation Tabs */}
    //     <div className="flex justify-center mb-8">
    //       <div className="inline-flex p-1 bg-gray-100 rounded-lg">
    //         <button
    //           className={`px-4 py-2 rounded-md ${
    //             activeTab === 'upload'
    //               ? 'bg-white shadow-sm text-blue-600'
    //               : 'text-gray-600 hover:text-gray-800'
    //           }`}
    //           onClick={() => setActiveTab('upload')}
    //         >
    //           Upload Problem
    //         </button>
    //         <button
    //           className={`px-4 py-2 rounded-md ${
    //             activeTab === 'results'
    //               ? 'bg-white shadow-sm text-blue-600'
    //               : 'text-gray-600 hover:text-gray-800'
    //           }`}
    //           onClick={() => setActiveTab('results')}
    //         >
    //           View Results
    //         </button>
    //       </div>
    //     </div>

    //     {/* Content Area */}
    //     <div className="max-w-5xl mx-auto">
    //       {activeTab === 'upload' ? (
    //         <FileUpload onSolveComplete={handleSolveComplete} />
    //       ) : (
    //         <ResultsDisplay />
    //       )}
    //     </div>

    //     {/* Footer */}
    //     <footer className="mt-16 border-t border-gray-200 pt-8 text-center text-gray-500 text-sm">
    //       <p>Team H - TSP Optimization Project</p>
    //       <div className="mt-2">
    //         <a
    //           href="https://github.com/yourusername/team_h"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="text-blue-500 hover:underline"
    //         >
    //           View Source on GitHub
    //         </a>
    //       </div>
    //     </footer>
    //   </div>
    // </main>
  );
}

// /**
//  * TSP API Client
//  * Handles communication with the backend API
//  */

// export interface TSPResult {
//   tour: number[];
//   cost: number;
//   visualization_path: string;
//   json_path: string;
//   csv_path: string;
// }

// export interface ResultSummary {
//   name: string;
//   cost: number;
//   nodes: number;
//   created: number;
// }

// export interface ExampleProblem {
//   name: string;
//   path: string;
//   size: number;
//   created: number;
// }

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// export const tspClient = {
//   /**
//    * Check if API is reachable
//    */
//   async healthCheck(): Promise<boolean> {
//     try {
//       const response = await fetch(`${API_URL}/api/health`);
//       return response.ok;
//     } catch (error) {
//       console.error('Health check failed:', error);
//       return false;
//     }
//   },
  
//   /**
//    * Submit a TSP problem for solving
//    */
//   async uploadProblem(file: File): Promise<TSPResult> {
//     const formData = new FormData();
//     formData.append('file', file);
    
//     const response = await fetch(`${API_URL}/api/solve`, {
//       method: 'POST',
//       body: formData,
//     });
    
//     if (!response.ok) {
//       throw new Error('Failed to solve TSP problem');
//     }
    
//     return response.json();
//   },
  
//   /**
//    * Get list of all available result summaries
//    */
//   async getResults(): Promise<ResultSummary[]> {
//     const response = await fetch(`${API_URL}/api/results`);
    
//     if (!response.ok) {
//       throw new Error('Failed to fetch results');
//     }
    
//     return response.json();
//   },
  
//   /**
//    * Get detailed data for a specific result
//    */
//   async getResultDetails(resultId: string): Promise<TSPResult> {
//     const response = await fetch(`${API_URL}/api/results/${resultId}`);
    
//     if (!response.ok) {
//       throw new Error('Failed to fetch result details');
//     }
    
//     return response.json();
//   },
  
//   /**
//    * Get list of example problems
//    */
//   async getExamples(): Promise<ExampleProblem[]> {
//     const response = await fetch(`${API_URL}/api/examples`);
    
//     if (!response.ok) {
//       throw new Error('Failed to fetch examples');
//     }
    
//     return response.json();
//   }
// }; 
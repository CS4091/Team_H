import axiosInstance from "./axiosInstance";
import axios from "axios";
import { airportType } from "@/types";

export interface SolveTspResponse {
  image_data: string;
  json_data: {
    tour: number[];
    cost: number;
    tour_length: number;
    is_cycle: boolean;
  };
}

/**
 * Calls the TSP solver endpoint with latitude/longitude arrays.
 * @param name   Unused by backend today; reserved for future use.
 * @param airports List of airportType objects with lat/long/icao.
 * @returns      The solver response, including image_data and json_data.
 */
export const solveTsp = async (
  name: string,
  airports: airportType[]
): Promise<SolveTspResponse> => {
  try {
    const lat = airports.map((a) => a.lat);
    const long = airports.map((a) => a.long);
    console.log(lat);
    console.log(long);
    
    const payload = { lat, long };
    console.log(axiosInstance.defaults.baseURL)
    const { data } = await axiosInstance.post<SolveTspResponse>(
      "/api/solve",
      payload
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "TSP solve failed:",
        error.response?.status,
        error.response?.data
      );
      throw new Error(`Solve TSP failed: ${error.message}`);
    } else {
      console.error("Unexpected error in solveTsp", error);
      throw error;
    }
  }
};
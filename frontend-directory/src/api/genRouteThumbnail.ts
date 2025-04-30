// services/genRouteThumbnail.ts
import axiosInstance from "./axiosInstance";
import axios from "axios";
import { airportType } from "@/types";

export interface GenRouteThumbnailResponse {
  url: string;
}

/**
 * Calls the /api/gen_thumbnail endpoint with the given airports' lat/long arrays,
 * and returns the public URL of the generated thumbnail.
 *
 * @param airports  Array of airportType objects whose lat/long define the route
 * @returns         A promise resolving to the thumbnail URL string
 */
export const genRouteThumbnail = async (
  airports: airportType[]
): Promise<string> => {
  try {
    // extract parallel arrays of coordinates
    const lat = airports.map((a) => a.lat);
    const long = airports.map((a) => a.long);

    // POST payload: { lat: number[], long: number[] }
    const { data } = await axiosInstance.post<GenRouteThumbnailResponse>(
      "/api/gen_thumbnail",
      { lat, long }
    );

    return data.url;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Thumbnail generation failed:",
        error.response?.status,
        error.response?.data
      );
      throw new Error(`genRouteThumbnail failed: ${error.message}`);
    } else {
      console.error("Unexpected error in genRouteThumbnail:", error);
      throw error;
    }
  }
};

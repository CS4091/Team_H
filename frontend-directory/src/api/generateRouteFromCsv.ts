import axiosInstance from "./axiosInstance";
import axios from "axios";

export const generateRouteFromCsv = async (payload: { file: File }) => {
  try {
    const formData = new FormData();
    formData.append("file", payload.file);

    const { data } = await axiosInstance.post("/api/solve", formData);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Upload failed with status code:", error.response?.status);
      console.log("Error details:", error.response?.data);
      throw new Error(`Upload failed: ${error.message}`);
    } else {
      console.log("Unexpected error:", error);
      throw error;
    }
  }
};

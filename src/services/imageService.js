import axios from "axios";
import { useAuth0 } from "@auth0/auth0-vue";

export const IMAGE_API_BASE_URL = "http://localhost:5242/api/Images";

export const uploadImage = async (file, token) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post(
            `${IMAGE_API_BASE_URL}/Upload`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};
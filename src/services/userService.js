import axios from "axios";
import { useAuth0 } from "@auth0/auth0-vue";

const USER_API_BASE_URL = "http://localhost:5241/api/User";

export const getUsers = async () => {
    try {
        const response = await axios.get(`${USER_API_BASE_URL}/`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
};

export const getUserData = async (userId, token) => {
    try {
        const response = await axios.get(`${USER_API_BASE_URL}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching user data: ${error.message}`);
    }
};

export const deleteUserAccount = async (userId, token) => {
    try {
        await axios.delete(`${USER_API_BASE_URL}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
};

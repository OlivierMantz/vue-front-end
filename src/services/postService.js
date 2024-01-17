import axios from "axios";
import { useAuth0 } from "@auth0/auth0-vue";

const POST_API_BASE_URL = "http://localhost:5205/api/Posts";


// POSTS API Calls
export const getAllPosts = async () => {
    try {
        const response = await axios.get(`${POST_API_BASE_URL}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all posts:", error);
        throw new Error("Error fetching posts: " + error.message);
    }
};

export const getPostById = async (postId) => {
    try {
        const response = await axios.get(`${POST_API_BASE_URL}/${postId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching post:", error);
        throw new Error("Error fetching post: " + error.message);
    }
};

export const createPost = async (postData, token) => {
    console.log("PostData", postData);
    try {
        const response = await axios.post(POST_API_BASE_URL, postData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("post response", response);
        return response.data;
    } catch (error) {
        throw new Error("Error creating post:", error);
    }
};

// export const updatePost = async (postId, postData) => {
//     const response = await fetch(`${apiUrl}/posts/${postId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(postData),
//     });
//     return handleResponse(response);
// };

// export const deletePost = async (postId) => {
//     const response = await fetch(`${apiUrl}/posts/${postId}`, {
//         method: "DELETE",
//     });
//     return handleResponse(response);
// };

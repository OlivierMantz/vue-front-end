import axios from "axios";
const commentApiUrl = import.meta.env.VITE_COMMENT_API_URL;

export const COMMENT_API_BASE_URL = "http://localhost:5092/api/Comments";

const apiClient = axios.create({
    baseURL: commentApiUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

// Helper function to get the auth token
async function getAuthToken() {
    const { getAccessTokenSilently } = useAuth0();
    return await getAccessTokenSilently();
}

// Get comments for a specific post
export const getCommentsByPostId = async (postId) => {
    try {
        const response = await apiClient.get(`${COMMENT_API_BASE_URL}/post/${postId}`);

        return response.data;
    } catch (error) {
        throw new Error("Error fetching comments: " + error.message);
    }
};

// Create a new comment
export const createComment = async (postId, commentData) => {
    try {
        const token = await getAuthToken();
        const response = await apiClient.post(`/comments/post/${postId}`, commentData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error("Error creating comment: " + error.message);
    }
};

// Update a comment
export const updateComment = async (commentId, commentData) => {
    try {
        const token = await getAuthToken();
        const response = await apiClient.put(`/comments/${commentId}`, commentData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error("Error updating comment: " + error.message);
    }
};

// Delete a comment
export const deleteComment = async (commentId) => {
    try {
        const token = await getAuthToken();
        await apiClient.delete(`/comments/${commentId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        throw new Error("Error deleting comment: " + error.message);
    }
};

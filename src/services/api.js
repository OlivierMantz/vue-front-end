import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

// fake data
const posts = [
    {
        postId: 1,
        title: "Mountain",
        image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        authorUsername: "Biff",
    },
    {
        postId: 2,
        title: "Another mountain",
        image: "https://us.123rf.com/450wm/hecke/hecke1907/hecke190700075/127364540-two-jack-lake-near-banff-in-canada.jpg?ver=6",
        authorUsername: "Boof",
    },
];

const comments = [
    { commentId: 1, postId: 1, text: "Nice", authorUsername: "Jingo" },
    { commentId: 2, postId: 1, text: "Cool", authorUsername: "Jango" },
    { commentId: 3, postId: 2, text: "Trash", authorUsername: "Jango" },
];

const apiClient = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

// POSTS API Calls
export const getAllPosts = async () => {
    try {
        // const response = await apiClient.get('/posts');
        return posts; // `response.data` when using real API
    } catch (error) {
        throw new Error("Error fetching posts: " + error.message);
    }
};

export const getPostById = async (postId) => {
    try {
        // const response = await apiClient.get(`/posts/${postId}`);
        const post = posts.find((p) => p.postId === postId);
        if (post) {
            return post; // `response.data` when using real API
        } else {
            throw new Error("Post not found");
        }
    } catch (error) {
        throw new Error("Error fetching post: " + error.message);
    }
};

export const createPost = async (postData) => {
    try {
        const response = await apiClient.post("/posts", postData);
        return response.data;
    } catch (error) {
        throw new Error("Error creating post: " + error.message);
    }
};

export const updatePost = async (id, postData) => {
    const response = await fetch(`${apiUrl}/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
    });
    return handleResponse(response);
};

export const deletePost = async (id) => {
    const response = await fetch(`${apiUrl}/posts/${id}`, {
        method: "DELETE",
    });
    return handleResponse(response);
};

// COMMENTS API Calls
export const getCommentsByPostId = async (postId) => {
    try {
        // const response = await apiClient.get(`/posts/${postId}/comments`);
        const postComments = comments.filter(
            (comment) => comment.postId === postId
        );
        // console.log(postComments, "postComments");
        return postComments; // Use fake data for now
    } catch (error) {
        throw new Error("Error fetching comments: " + error.message);
    }
};

export const createComment = async (commentData) => {
    const response = await fetch(`${apiUrl}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
    });
    return handleResponse(response);
};

export const updateComment = async (id, commentData) => {
    const response = await fetch(`${apiUrl}/comments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
    });
    return handleResponse(response);
};

export const deleteComment = async (id) => {
    const response = await fetch(`${apiUrl}/comments/${id}`, {
        method: "DELETE",
    });
    return handleResponse(response);
};

<template>
    <div
        v-if="post"
        class="post-container"
    >
        <h1>{{ post.title }}</h1>
        <img
            v-if="post.imageFileName"
            :src="fullImageUrl"
            :alt="`Post ${post.id}`"
            class="post-image"
        />
        <div>
            <h2>Description</h2>
            <p>{{ post.description }}</p>
        </div>
        <div
            v-if="comments && comments.length"
            class="comments-container"
        >
            <h2>Comments</h2>
            <div
                v-for="comment in comments"
                :key="comment.id"
                class="comment-container"
            >
                <div>
                    <em>{{ comment.authorUsername }}: </em>
                    <q>{{ comment.content }}</q>
                </div>

                <div
                    v-if="
                        isAuthenticated &&
                        (isUserAuthor(comment.authorId) || isAdmin)
                    "
                    class="comment-actions"
                >
                    <button class="btn btn-edit">Update</button>
                    <button class="btn btn-delete">Delete</button>
                </div>
            </div>
        </div>
        <div v-else>No comments yet.</div>
    </div>
    <div v-else>Post does not exist</div>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";
import {
    getCommentsByPostId,
    updateComment,
    deleteComment,
} from "../services/commentService";

import { getPostById } from "../services/postService";
import { IMAGE_API_BASE_URL } from "../services/imageService";
import { jwtDecode } from "jwt-decode";

export default {
    data() {
        return {
            post: null,
            comments: null,
            isAdmin: false,
        };
    },
    async mounted() {
        if (this.isAuthenticated) {
            await this.checkAdminStatus();
        }
    },
    async created() {
        const { isAuthenticated, user } = useAuth0();

        this.isAuthenticated = isAuthenticated.value;

        if (this.isAuthenticated) {
            await this.checkAdminStatus(user.value);
        }

        const postId = this.$route.params.postId;

        if (!postId) {
            console.error("Post ID is undefined");
            return;
        }

        try {
            this.post = await getPostById(postId);
        } catch (error) {
            console.error("Error fetching post", error);
        }

        try {
            const commentsResponse = await getCommentsByPostId(postId);

            if (commentsResponse && commentsResponse.length > 0) {
                this.comments = commentsResponse;
            } else {
                this.comments = [];
            }
        } catch (error) {
            console.error("Error fetching comments", error);
        }
    },
    computed: {
        fullImageUrl() {
            return this.post && this.post.imageFileName
                ? `${IMAGE_API_BASE_URL}/${this.post.imageFileName}${this.post.fileExtension}`
                : "";
        },
        user() {
            return useAuth0().user;
        },
    },
    methods: {
        async updateComment(commentId, updatedComent) {
            console.log("Update comment:", commentId);
            updateComment(commentId, updatedComent);
        },
        async deleteComment(commentId) {
            console.log("Delete comment:", commentId);
            deleteComment(commentId);
        },
        async checkAdminStatus() {
            try {
                const token = await this.$auth0.getAccessTokenSilently();
                const decodedToken = jwtDecode(token);
                const userRole = decodedToken["https://sublimewebapp.me/roles"];
                this.isAdmin = userRole && userRole.includes("Admin");
            } catch (error) {
                console.error("Error in admin check", error);
                this.isAdmin = false;
            }
        },

        isUserAuthor(commentAuthorId) {
            const user = this.user;
            return user && user.sub === commentAuthorId;
        },
    },
};
</script>

<style>
.post-container {
    margin: 15px auto;
    max-width: 1500px;
    background-color: #2a3a3d;
    position: relative;
    color: white;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.comments-container {
    margin: 10px auto;
    max-width: 600px;
    background-color: #4d6367;
    color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.post-image {
    width: 100%;
    cursor: pointer;

    height: auto;
    border-radius: 10px;
}
.btn {
    background-color: #55666f;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.btn:hover {
    background-color: #023e53;
    transform: translateY(-2px);
}

.btn-edit {
    margin-right: 10px;
    background-color: #4a5a60; 
}

.btn-delete {
    background-color: #7a4343;
}

.btn-delete:hover {
    background-color: #8b5050;
}
</style>

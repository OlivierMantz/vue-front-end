<template>
    <!-- Post image and details -->
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

        <!-- Comments Section -->
        <div class="comments-container">
            <h2>Comments</h2>

            <!-- New Comment Section -->
            <div
                v-if="isAuthenticated"
                class="new-comment-container"
            >
                <input
                    type="text"
                    v-model="newComment"
                    placeholder="Write a comment..."
                />
                <button @click="submitComment">Submit</button>
            </div>

            <!-- Existing Comments Section -->
            <div v-if="comments && comments.length">
                <div
                    v-for="comment in comments"
                    :key="comment.id"
                    class="comment-item"
                >
                    <div v-if="editingCommentId === comment.id">
                        <input
                            type="text"
                            v-model="tempCommentContent"
                        />
                        <button @click="updateComment(comment.id)">Save</button>
                        <button @click="cancelEdit">Cancel</button>
                    </div>
                    <div v-else>
                        <em>{{ comment.authorId }}: </em>
                        <br />
                        <div style="text-indent: 2.5%">
                            {{ comment.content }}
                        </div>
                    </div>

                    <div
                        v-if="showEditedMsg && editingCommentId === comment.id"
                    >
                        Edited
                    </div>

                    <div
                        v-if="
                            isAuthenticated &&
                            (isUserAuthor(comment.authorId) || isAdmin)
                        "
                    >
                        <button
                            class="btn btn-edit"
                            @click="editComment(comment)"
                        >
                            Update
                        </button>
                        <button
                            class="btn btn-delete"
                            @click="deleteComment(comment.id)"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            <div v-else>No comments yet.</div>
        </div>
    </div>
    <div v-else>Post does not exist</div>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";
import {
    getCommentsByPostId,
    createComment,
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
            newComment: "",
            editingCommentId: null,
            tempCommentContent: "",
            showEditedMsg: false,
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
        async submitComment() {
            try {
                const token = await this.$auth0.getAccessTokenSilently();
                const newCommentData = { content: this.newComment };
                const newComment = await createComment(
                    this.post.id,
                    newCommentData,
                    token
                );

                this.comments.push(newComment);
                this.newComment = "";
            } catch (error) {
                console.error("Error submitting comment:", error.message);
            }
        },

        async updateComment(commentId) {
            if (
                this.tempCommentContent !==
                this.comments.find((c) => c.id === commentId).content
            ) {
                try {
                    const token = await this.$auth0.getAccessTokenSilently();
                    const updatedCommentData = {
                        content: this.tempCommentContent,
                    };
                    await updateComment(commentId, updatedCommentData, token);

                    const commentIndex = this.comments.findIndex(
                        (c) => c.id === commentId
                    );
                    if (commentIndex !== -1) {
                        this.comments[commentIndex].content =
                            this.tempCommentContent;
                        this.showEditedMsg = true;
                        setTimeout(() => (this.showEditedMsg = false), 3000);
                    }
                    this.editingCommentId = null;
                    this.tempCommentContent = "";
                } catch (error) {
                    console.error("Error updating comment:", error.message);
                }
            } else {
                this.cancelEdit();
            }
        },

        editComment(comment) {
            this.editingCommentId = comment.id;
            this.tempCommentContent = comment.content;
        },

        cancelEdit() {
            this.editingCommentId = null;
            this.tempCommentContent = "";
        },

        async deleteComment(commentId) {
            try {
                const token = await this.$auth0.getAccessTokenSilently();
                await deleteComment(commentId, token);

                this.comments = this.comments.filter((c) => c.id !== commentId);
            } catch (error) {
                console.error("Error deleting comment:", error.message);
            }
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
            return user && user.value.sub === commentAuthorId;
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

.post-image {
    width: 100%;
    cursor: pointer;

    height: auto;
    border-radius: 10px;
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
.new-comment-container {
    margin-bottom: 15px;
}
.new-comment-container input {
    width: 80%;
    padding: 8px;
    margin-right: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
}
.new-comment-container button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    background-color: #697d88;
    border: white 1px solid;
    color: white;
    cursor: pointer;
}
.new-comment-container button:hover {
    background-color: #65787f;
}
.existing-comments-container {
    background-color: #5b757a;
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

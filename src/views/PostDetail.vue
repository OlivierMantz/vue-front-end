<template>
    <div
        v-if="post"
        class="post-container"
    >
        <h1>{{ post.title }}</h1>
        <img
            :src="post.image"
            :alt="`Post ${post.postId}`"
            class="post-image"
        />
        <div
            v-if="comments && comments.length"
            class="comments-container"
        >
            <h2>Comments</h2>
            <div
                v-for="comment in comments"
                :key="comment.commentId"
            >
                <em> {{ comment.authorUsername }}: </em>
                <q>{{ comment.text }}</q>
            </div>
        </div>
        <div v-else>No comments yet.</div>
    </div>
    <div v-else>Post does not exist</div>
</template>

<script>
import { getPostById, getCommentsByPostId } from "../services/api";

export default {
    props: {
        postId: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            post: null,
            comments: null,
        };
    },
    async created() {
        let _postId = -1;

        try {
            _postId = Number(this.postId);
            if (isNaN(_postId) || _postId <= 0) {
                throw new Error("Invalid postId");
            }
        } catch (error) {
            console.error("Error fetching postId:", error);
            return;
        }

        try {
            this.post = await getPostById(_postId);
        } catch (error) {
            console.error("Error fetching post:", error);
        }

        try {
            this.comments = await getCommentsByPostId(_postId);
        } catch (error) {
            console.error("Error fetching post comments:", error);
        }
    },
};
</script>

<style>
.post-container {
    margin: 50px auto;
    max-width: 600px;
    background-color: #2a3a3d;
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
</style>

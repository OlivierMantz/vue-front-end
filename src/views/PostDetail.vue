<template>
    <div v-if="post">
        <h1>{{ post.title }}</h1>
        <img
            :src="post.image"
            :alt="`Post ${post.postId}`"
            class="post-image"
        />
        <div v-if="comments && comments.length">
            <h2>Comments</h2>
            <div
                v-for="comment in comments"
                :key="comment.commentId"
            >
                <strong>{{ comment.authorUsername }}</strong
                >: {{ comment.text }}
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
.post-image {
    width: 50%;
    height: auto;
}
</style>

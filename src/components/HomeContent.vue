<template>
    <div>
        <h2>All Posts</h2>
        <div v-if="posts.length === 0">No posts found</div>
        <div
            v-for="post in posts"
            :key="post.id"
            class="post-container"
            @click="goToPostDetails(post.id)"
        >
            <h3>{{ post.title }}</h3>
            <img
                :src="getImageUrl(post.imageFileName, post.fileExtension)"
                :alt="'Output: ' + getImageUrl(post.imageFileName, post.fileExtension)"
                class="post-image"
            />
        </div>
    </div>
</template>

<script>
import { getAllPosts } from "../services/postService";
import { IMAGE_API_BASE_URL } from "../services/imageService";

export default {
    data() {
        return {
            posts: [],
        };
    },
    async created() {
        try {
            this.posts = await getAllPosts();
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    },
    methods: {
        goToPostDetails(postId) {
            this.$router.push({
                name: "PostDetails",
                params: { postId: postId },
            });
        },
        getImageUrl(imageFileName, fileExtension) {
            return imageFileName
                ? `${IMAGE_API_BASE_URL}/${imageFileName}${fileExtension}`
                : "";
        },
    },
};
</script>

<style scoped>
.post-container {
    margin: 50px auto;
    max-width: 600px;
    background-color: #2a3a3d;
    color: white;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.post-image {
    width: 100%;
    cursor: pointer;

    height: auto;
    border-radius: 5px;
}
</style>
../services/CommentAPI
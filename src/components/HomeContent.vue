<template>
    <div>
        <h2>All Posts</h2>
        <div v-if="posts.length === 0">
            No posts found
        </div>
        <div
            v-for="post in posts"
            :key="post.postId"
            class="post-container"
            @click="goToPostDetail(post.postId)"
        >
            <h3>{{ post.title }}</h3>
            <img
                :src="post.image"
                :alt="'Post ' + post.postId"
                class="post-image"
            />
        </div>
    </div>
</template>

<script>
import { getAllPosts } from '../services/api';

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
            console.error('Error fetching posts:', error);
        }
    },
    methods: {
        goToPostDetail(postId) {
            this.$router.push({ name: "post", params: { postId: postId } });
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

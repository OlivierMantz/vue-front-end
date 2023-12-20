<template>
    <div>
        <h2>All Posts</h2>
        <div v-if="posts.length === 0">
            No posts found
        </div>
        <div
            v-for="post in posts"
            :key="post.postId"
            class="post-overview"
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
.post-overview {
    cursor: pointer;
}

.post-image {
    width: 50%;
    height: auto;
}
</style>

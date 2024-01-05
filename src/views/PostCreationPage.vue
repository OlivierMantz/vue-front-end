<template>
    <div class="post-creation-container">
        <h1>Upload Post</h1>
        <input
            type="file"
            @change="handleFileChange"
        />
        <input
            type="text"
            v-model="title"
            placeholder="Enter title"
        />
        <textarea
            v-model="description"
            placeholder="Enter description"
        ></textarea>
        <button @click="submitPostCreation">Create post</button>
    </div>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";
import { uploadImage } from "../services/imageService";
import { createPost } from "../services/postService";

export default {
    data() {
        return {
            file: null,
            title: "",
            description: "",
        };
    },
    methods: {
        handleFileChange(event) {
            this.file = event.target.files[0];
        },
        async submitPostCreation() {
            if (this.file && this.title && this.description) {
                try {
                    const token = await this.$auth0.getAccessTokenSilently();
                    const imageResponse = await uploadImage(this.file, token);

                    if (!imageResponse || !imageResponse.guid) {
                        console.error("Image upload failed:", imageResponse);
                        return;
                    }

                    const imageFileName = `${imageResponse.guid}`;
                    const fileExtension = `${imageResponse.fileExtension}`;
                    const postResponse = await createPost(
                        {
                            title: this.title,
                            description: this.description,
                            imageFileName: imageFileName,
                            fileExtension: fileExtension,
                        },
                        token
                    );

                    this.$router.push("/");
                } catch (error) {
                    console.error("Error uploading post:", error);
                }
            } else {
                alert("Please fill in all fields and select an image.");
            }
        },
    },
};
</script>

<style>
.post-creation-container {
    margin: 50px auto;
    width: 500px;
    text-align: center;
}
</style>
../services/CommentAPI
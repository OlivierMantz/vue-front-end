<template>
    <div class="container mb-3">
        <form action="">
            <div class="mb-3">
                <label
                    for=""
                    class="form-label"
                    >Page Title</label
                >
                <input
                    type="text"
                    class="form-control"
                    v-model="pageTitle"
                />
            </div>
            <div class="mb-3">
                <label
                    for=""
                    class="form-label"
                    >Description</label
                >
                <textarea
                    type="text"
                    class="form-control"
                    rows="5"
                    v-model="description"
                ></textarea>
            </div>
            <div class="mb-3">
                <label
                    for=""
                    class="form-label"
                    >Image to upload</label
                >
                <textarea
                    type="text"
                    class="form-control"
                    rows="5"
                    v-model="imageToUpload"
                ></textarea>
            </div>
            <div class="mb-3">
                <button
                    class="btn btn-primary"
                    :disabled="isFormInvalid"
                    @click.prevent="submitForm"
                >
                    Create Page
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: ["pageCreated"],
    computed: {
        isFormInvalid() {
            return !this.pageTitle || !this.description || !this.imageToUpload;
        },
    },

    data() {
        return {
            pageTitle: "",
            description: "",
            imageToUpload: "",
        };
    },
    methods: {
        submitForm() {
            if (this.isFormInvalid) {
                alert("Please fil out all required fields.");
                return;
            }
            this.$emit("pageCreated", {
                pageTitle: this.pageTitle,
                description: this.description,
                imageToUpload: this.imageToUpload,
            });

            this.clearForm({});
        },

        clearForm() {
            this.pageTitle = "";
            this.description = "";
            this.imageToUpload = "";
        },
    },
};
</script>

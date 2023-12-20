<template>
    <div>
        <hr />
        <homeContent />
        <button @click="showToken">Show Token</button>
    </div>
</template>

<script lang="js">
import HomeContent from "../components/HomeContent.vue";

export default {
    components: {
        HomeContent,
    },
    methods: {
        async showToken() {
            console.log(this.$auth0); 
        }
    }
};
</script>

<style lang="css" scoped>
</style>

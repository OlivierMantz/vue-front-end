<template>
    <div id="app">
        <Navbar/>
        <router-view/>    
    </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
    components: {
        Navbar,
    },
    methods: {
        goToHome() {
            this.$router.push("/");
        },
        goToProfile() {
            this.$router.push("/profile");
        },
    },
};
</script>

<style>
/* Your existing styles */
</style>

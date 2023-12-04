<template>
    <div id="app">
        <NavBar/>
        <router-view/>    
    </div>
</template>

<script>
import Navbar from "./components/NavBar.vue";

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

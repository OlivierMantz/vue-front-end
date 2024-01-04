<template>
    <div id="app">
        <Navbar />
        <router-view />
    </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { provide, ref } from "vue";

export default {
    setup(){
        const isDarkMode = ref(false);
        provide('isDarkMode', isDarkMode); // Provide the state

        return {
            isDarkMode,
        };
    },
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

<style></style>

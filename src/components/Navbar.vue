<template>
    <nav
        class="navbar navbar-expand-md"
        :class="{
            'navbar-dark bg-dark': isDarkMode,
            'navbar-light bg-light': !isDarkMode,
        }"
    >
        <a
            class="navbar-brand"
            href="/"
            >Sublime web app</a
        >

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div
            class="collapse navbar-collapse"
            id="navbarSupportedContent"
        >
            <ul class="navbar-nav mr-auto">
                <NavbarLink
                    to="/"
                    label="Home"
                />
                <NavbarLink
                    v-if="isAuthenticated"
                    to="/profile"
                    label="Profile"
                />
                <NavbarLink
                    v-if="isAuthenticated"
                    to="/post-Creation-Page"
                    label="Post Creation Page"
                />
            </ul>
            <button
                v-if="!isAuthenticated"
                @click="login"
            >
                Log in
            </button>
            <button
                v-if="isAuthenticated"
                @click="logout"
            >
                Log out
            </button>
            <button @click="toggleDarkMode">Toggle Dark Mode</button>
        </div>
    </nav>
</template>

<script>
import { inject } from "vue";

import { useAuth0 } from "@auth0/auth0-vue";
import NavbarLink from "./NavbarLink.vue";

export default {
    components: {
        NavbarLink,
    },
    name: "Navbar",
    setup() {
        const isDarkMode = inject("isDarkMode");
        const toggleDarkMode = () => {
            isDarkMode.value = !isDarkMode.value;
            document.body.classList.toggle("dark-mode", isDarkMode.value);
        };

        const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

        const login = () => {
            loginWithRedirect({
                screen_hint: "signup",
            });
        };

        const performLogout = () => {
            logout({ returnTo: window.location.origin });
        };

        return {
            login,
            logout: performLogout,
            isAuthenticated,
            isDarkMode,
            toggleDarkMode,
        };
    },
};
</script>

<style>
#mobileAuthNavBar {
    min-height: 125px;
    justify-content: space-between;
}
.dark-mode {
    background-color: #1a282d;
    color: white;
}
.dark-mode .navbar {
    background-color: #424242;
}
.dark-mode .navbar .navbar-brand,
.nav-link {
    color: white;
}
</style>

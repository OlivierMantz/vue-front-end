<template>
    <nav
        class="navbar navbar-expand-md custom-navbar"
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
            <ul class="navbar-nav mx-auto">
                <NavbarLink
                    to="/"
                    label="Home"
                />
            </ul>

            <div class="navbar-right">
                <ul class="navbar-nav">
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
                    @click="loginWithRedirect"
                >
                    Log in
                </button>
                <button
                    v-if="!isAuthenticated"
                    @click="signup"
                >
                    Sign Up
                </button>
                <button
                    v-if="isAuthenticated"
                    @click="logout"
                >
                    Log out
                </button>

                <button @click="toggleDarkMode">Toggle Dark Mode</button>
            </div>
        </div>
    </nav>
</template>

<script>
import { inject } from "vue";
import NavbarLink from "./NavbarLink.vue";
import { useAuth0 } from "@auth0/auth0-vue";

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

        const signup = () => {
            loginWithRedirect({ screen_hint: "signup" });
        };
        const performLogout = () => {
            logout({ returnTo: window.location.origin });
        };

        return {
            loginWithRedirect,
            signup,
            logout: performLogout,
            isAuthenticated,
            isDarkMode,
            toggleDarkMode,
        };
    },
};
</script>

<style>
.custom-navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}
.custom-navbar .navbar-collapse {
    display: flex;
    justify-content: center;
    flex-grow: 1;
}

.custom-navbar .navbar-right {
    display: flex;
    align-items: center;
}
.navbar-collapse {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110%;
}

.navbar-nav {
    flex-direction: row;
}

.navbar-nav .nav-item {
    margin-left: 10px;
}

.navbar-brand {
    margin-right: 0;
}

#mobileAuthNavBar {
    min-height: 350px;
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

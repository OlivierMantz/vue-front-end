<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link
            class="navbar-brand"
            to="/"
            >Navbar</router-link
        >
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
                    to="/profile"
                    label="Profile"
                />
            </ul>
            <button v-if="!isAuthenticated" @click="login">Log in</button>
            <button v-if="isAuthenticated" @click="logout">Log out</button>
        </div>
    </nav>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";
import NavbarLink from "./NavbarLink.vue";

export default {
    components: {
        NavbarLink,
    },
    name: "Navbar",
    setup() {
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
            isAuthenticated
        };
    },
};
</script>

<style>
#mobileAuthNavBar {
    min-height: 125px;
    justify-content: space-between;
}
</style>

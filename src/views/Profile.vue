<template>
    <div>
        <div v-if="isAuthenticated">
            <h2>
                <strong>{{ user.nickname }}</strong
                >'s Profile
            </h2>
            <button @click="getUserData">View My Data</button>
            <div v-if="fetchedUserData">
                <pre>{{ fetchedUserData }}</pre>
            </div>

            <button @click="deleteUser">Delete My Account</button>
        </div>
    </div>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";
import { getUserData, deleteUserAccount } from "../services/userService.js"; // Adjust the path as necessary

export default {
    data() {
        return {
            user: null,
            isAuthenticated: false,
            fetchedUserData: null,
        };
    },
    methods: {
        async getUserData() {
            if (this.isAuthenticated) {
                try {
                    const token = await this.$auth0.getAccessTokenSilently();
                    const userData = await getUserData(this.user.sub, token);
                    console.log(userData);
                    this.fetchedUserData = userData;
                } catch (error) {
                    console.error(error);
                }
            }
        },

        async deleteUser() {
            if (this.isAuthenticated) {
                try {
                    const token = await this.$auth0.getAccessTokenSilently();

                    await deleteUserAccount(this.user.sub, token);
                    this.$auth0.logout({ returnTo: window.location.origin });
                    this.$router.push('/'); 
                } catch (error) {
                    console.error(error);
                }
            }
        },
    },

    async mounted() {
        this.user = this.$auth0.user;
        this.isAuthenticated = this.$auth0.isAuthenticated;
    },
};
</script>

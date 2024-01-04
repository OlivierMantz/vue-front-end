<template>
    <div>
        <pre v-if="isAuthenticated">
            <h2><strong>{{ user.nickname }}</strong>'s Profile</h2>
        </pre>
    </div>
</template>
<script>
import { useAuth0 } from "@auth0/auth0-vue";

export default {
    setup() {
        const { loginWithRedirect, user, isAuthenticated } = useAuth0();

        return {
            login: () => {
                loginWithRedirect();
            },
            user,
            isAuthenticated,
        };
    },
};
</script>

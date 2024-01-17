import { createAuth0Client } from "@auth0/auth0-spa-js";

let auth0;
const domain = import.meta.env.VITE_AUTH_DOMAIN;
const clientId = import.meta.env.VITE_AUTH_CLIENT_ID;
async function initAuth0() {
    auth0 = await createAuth0Client({
        domain: domain,
        client_id: clientId,
        redirect_uri: window.location.origin,
    });
}

export async function loginWithRedirect() {
    await auth0.loginWithRedirect();
}

export async function logout() {
    await auth0.logout();
}

export async function isAuthenticated() {
    const isAuthenticated = await auth0.isAuthenticated();
    return isAuthenticated;
}

export default {
    install(app) {
        app.config.globalProperties.$auth = {
            loginWithRedirect,
            logout,
            isAuthenticated,
        };
        initAuth0();
    },
};

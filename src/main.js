import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createAuth0 } from "@auth0/auth0-vue";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar.vue";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const app = createApp(App);
app.component('NavBar', Navbar);

app.use(router);
app.use(
    createAuth0({
        domain: import.meta.env.VITE_AUTH_DOMAIN,
        clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
        authorizationParams: {
            redirect_uri: window.location.origin,
        },
    })
);
app.mount("#app");

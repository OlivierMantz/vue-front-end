import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createAuth0 } from "@auth0/auth0-vue";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar.vue";


const app = createApp(App);
app.component('NavBar', NavBar);

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

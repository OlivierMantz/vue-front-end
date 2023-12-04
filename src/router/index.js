import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";

const base = import.meta.env.VITE_APP_BASE_URL || '/';
const router = createRouter({
    history: createWebHistory(base),
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
        },
        {
            path: "/profile",
            name: "Profile",
            component: Profile,
        },
    ],
});

export default router;

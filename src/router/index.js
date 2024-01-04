import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import PostDetails from "../views/PostDetails.vue";
import PostCreationPage from "../views/PostCreationPage.vue";

const base = import.meta.env.VITE_APP_BASE_URL || "/";

const routes = [
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
    {
        path: "/posts/:postId",
        name: "PostDetails",
        component: PostDetails,
    },
    {
        path: '/post-Creation-Page',
        name: 'PostCreationPage',
        component: PostCreationPage,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

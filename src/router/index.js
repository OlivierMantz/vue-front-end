import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import PostDetail from "../views/PostDetail.vue";

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
        path: "/post/:postId",
        name: "post",
        component: PostDetail,
        props: (route) => ({
            postId: Number(route.params.postId)
        }),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

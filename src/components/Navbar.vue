<template>
    <nav
        class="navbar navbar-expand-lg"
        :class="[
            `navbar-${theme}`,
            `bg-${theme}`,
            'navbar',
            'navbar-expand-lg',
        ]"
    >
        <div class="container-fluid">
            <a
                class="navbar-brand"
                href="#"
                >My Vue front-end</a
            >
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <navbar-link
                    v-for="(page, index) in pages"
                    class="nav-item"
                    :key="index"
                    :page="page"
                    :index="index"
                    :isActive="activePage == index"
                    @activated="$emit('activated')"
                >
                </navbar-link>

                <li>
                    <router-link
                        to="/create"
                        class="nav-link"
                        aria-current="page"
                        >Create page</router-link
                    >
                </li>
            </ul>
            <form class="d-flex">
                <button
                    class="btn btn-primary"
                    @click.prevent="changeTheme()"
                >
                    Toggle navbar
                </button>
            </form>
        </div>
    </nav>
</template>

<script>
import NavbarLink from "./NavbarLink.vue";

export default {
    components: {
        NavbarLink,
    },

    created() {
        this.getThemeSetting();
    },

    props: ["pages", "activePage"],

    data() {
        return {
            theme: "light",
        };
    },

    methods: {
        changeTheme() {
            let theme = "light";

            if (this.theme == "light") {
                theme = "dark";
            }
            this.theme = theme;
            this.storeThemeSetting();
        },
        storeThemeSetting() {
            localStorage.setItem("theme", this.theme);
        },
        getThemeSetting() {
            let theme = localStorage.getItem("theme");

            if (theme) {
                this.theme = theme;
            }
        },
    },
};
</script>

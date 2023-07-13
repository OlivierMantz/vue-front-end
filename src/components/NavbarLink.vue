<template>
    <a
        class="nav-link"
        :class="activeClasses"
        aria-current="page"
        :href="page.link.url"
        :title="`This is a link to the ${page.link.text} page`"
        >{{ page.link.text }}</a
    >
</template>
<script>
export default {
    props: ["page", "isActive"],
    computed: {
        activeClasses() {
            return {
                active: this.isActive,
                emphasize: this.isActive,
            };
        },
    },
};
</script>
<style>
.emphasize scoped{
    text-decoration: underline !important;
}
</style>

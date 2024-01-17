<template>
    <li class="nav-item">
        <router-link
            :to="to"
            class="nav-link"
            active-class="active"
            >{{ label }}</router-link
        >
    </li>
</template>

<script>
export default {
    props: {
        to: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
    },
};
</script>
<style>
.active {
    color: #007bff;
}
</style>
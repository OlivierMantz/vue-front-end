<template>
    <li class="nav-item">
        <router-link
            :to="to"
            class="nav-link"
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

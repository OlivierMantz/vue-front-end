<template>
    <div>
        <hr />
        <home-content />
        <button @click="showToken">Show Token</button>
    </div>
</template>

<script lang="js">
export default {
    methods: {
        async showToken() {
            console.log(this.$auth0); 
        }
    }
};
</script>

<style lang="css" scoped>
</style>

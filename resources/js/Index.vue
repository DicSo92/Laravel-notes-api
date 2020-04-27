<template>
    <div class="index flex flex-col justify-start items-center relative">
        <div class="flex justify-center">
            <p class="mx-2 link">
                <router-link :to="{ name: 'home'}" exact-active-class="text-blue-400">Home</router-link>
            </p>
            |
            <p class="mx-2 link">
                <router-link :to="{ name: 'notes'}" exact-active-class="text-blue-400">Notes</router-link>
            </p>
        </div>
        <div class="md:w-4/5 w-11/12 ">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Index',
        components: {
        },
        data () {
            return {
            }
        },
        created() {

        },
        mounted() {
            console.log('Vue home mounted.')
        },
    }
</script>

<style type="scss">
    .link:hover {
        color: indianred;
        cursor: pointer;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>

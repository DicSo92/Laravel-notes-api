<template>
    <div class="home flex flex-col items-center pt-3">
        <h1 class="text-3xl">Home</h1>
        <HomeComponent></HomeComponent>
    </div>
</template>

<script>
    import HomeComponent from '../components/HomeComponent.vue'

    export default {
        name: 'Home',
        components: {
            HomeComponent
        },
        data () {
            return {
            }
        },
        created() {

        },
        mounted() {
            console.log('Vue home mounted.')
        }
    }
</script>

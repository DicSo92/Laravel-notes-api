<template>
    <div class="homeComponent">
        <div class="mt-3 flex flex-col items-center">
            <h1 class="text-red-400 text-lg">Description</h1>
            <p class="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores corporis iste laudantium mollitia
                necessitatibus nisi numquam omnis porro sequi ullam. At atque eos excepturi facilis harum iure officia
                omnis repudiandae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium
                architecto, aspernatur commodi consectetur cumque debitis ea est ex incidunt inventore ipsum laborum
                laudantium modi necessitatibus nostrum, omnis perferendis provident ?
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HomeComponent',
        mounted() {
            console.log('Component exemple mounted.')
        }
    }
</script>

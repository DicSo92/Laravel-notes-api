<template>
    <div class="notes w-full flex bg-gray-100">
        <div class="notesList w-4/12">
            <h3 class="m-3 font-bold">Notes List :</h3>
            <hr>

            <div class="listItem p-3 flex flex-col relative hover:bg-gray-200 cursor-pointer">
                <h6 class="font-bold">18:06</h6>
                <p>Doloremque enim, facere hic inventore ipsam minus molestiae nobis officiis quae quam, quibusdam sunt velit voluptate!</p>

                <button class="bg-transparent hover:bg-red-500 font-semibold hover:text-white p-1 border border-red-600 hover:border-transparent rounded-full trashBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="trashSvg">
                        <path d="M128 405.429C128 428.846 147.198 448 170.667 448h170.667C364.802 448 384 428.846 384 405.429V160H128v245.429zM416 96h-80l-26.785-32H202.786L176 96H96v32h320V96z"/>
                    </svg>
                </button>
            </div>
        </div>
        <div class="w-8/12 flex flex-col">
            <div class="w-full flex justify-center">
                <h3 class="m-3 font-bold">Note</h3>
            </div>
            <hr>

            <textarea class="border rounded focus:outline-none focus:shadow-outline m-3 p-3 h-full bg-gray-100"></textarea>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ToDo',
        components: {

        },
        data () {
            return {
            }
        },
        created() {

        },
        mounted() {
            console.log('Vue Notes mounted.')
        },
        methods: {

        }
    }
</script>

<style lang="scss">
    .notes {
        height: 90vh;
    }
    .notesList {
        border-right: solid #dddddd 2px;
    }
    .listItem {
        border-bottom: solid #dddddd 1px
    }
    .trashBtn {
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .trashSvg {
        width: 17px;
        height: auto;
        fill: #e53e3e;
    }
    .trashBtn:hover {
        .trashSvg {
            fill: white;
        }
    }
</style>

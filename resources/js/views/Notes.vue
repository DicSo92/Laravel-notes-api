<template>
    <div class="notes w-full flex bg-gray-100">
        <div class="notesList w-4/12">
            <h3 class="m-3 font-bold">Notes List :</h3>
            <hr>

            <NoteList></NoteList>
        </div>
        <div class="w-8/12 flex flex-col">
            <div class="w-full flex justify-center">
                <h3 class="m-3 font-bold">Note</h3>
            </div>
            <hr>

            <NoteEdit></NoteEdit>
        </div>
    </div>
</template>

<script>
    import NoteEdit from '../components/NoteEdit.vue'
    import NoteList from '../components/NoteList.vue'

    export default {
        name: 'ToDo',
        components: {
            NoteEdit,
            NoteList
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
</style>

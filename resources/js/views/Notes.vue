<template>
    <div class="notes w-full flex bg-gray-100">
        <div class="notesList w-4/12">
            <h3 class="m-3 font-bold">Notes List :</h3>

            <hr>

            <NoteList></NoteList>
        </div>
        <div class="w-8/12 flex flex-col">
            <div class="w-full flex justify-center relative">
                <h3 class="m-3 font-bold">Note ({{status === 'new' ? 'New' : 'Edit'}})</h3>
                <button class="bg-transparent hover:bg-blue-500 font-semibold hover:text-white p-1 border border-blue-600 hover:border-transparent rounded-full addBtn"
                        @click="addNote">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="addSvg">
                        <path d="M368.5 240H272v-96.5c0-8.8-7.2-16-16-16s-16 7.2-16 16V240h-96.5c-8.8 0-16 7.2-16 16 0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7H240v96.5c0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7 8.8 0 16-7.2 16-16V272h96.5c8.8 0 16-7.2 16-16s-7.2-16-16-16z"/>
                    </svg>
                </button>
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
        name: 'Notes',
        components: {
            NoteEdit,
            NoteList
        },
        data () {
            return {
            }
        },
        created() {
            this.$store.dispatch('refreshNotes')
        },
        mounted() {
            this.$bus.$on("refreshNotes", () => {
                this.$store.dispatch('refreshNotes')
            })
        },
        computed: {
            status () {
                return this.$store.state.status
            },
            first () {
                return this.$store.state.first
            },
            noteEdit () {
                return this.$store.state.noteEdit
            },
            notes () {
                return this.$store.state.notes
            }
        },
        methods: {
            addNote () {
                this.$store.commit('changeFirst', true)
                this.$store.commit('changeStatus', 'new')
                this.$bus.$emit("changeTextContent", '')
            }
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
    .addBtn {
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .addSvg {
        width: 17px;
        height: auto;
        fill: #3182ce;
    }
    .addBtn:hover {
        .addSvg {
            fill: white;
        }
    }
</style>

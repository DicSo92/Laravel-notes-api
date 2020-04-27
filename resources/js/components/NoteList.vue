<template>
    <div class="NoteList">
        <div class="listItem p-3 flex flex-col relative hover:bg-gray-200 cursor-pointer"
             v-for="note in notes"
             :class="noteEdit && note.id === noteEdit.id ? 'bg-orange-300 hover:bg-orange-400' : ''"
             @click="showNote(note)">
            <h6 class="font-bold">18:06</h6>
            <p>{{note.content}}</p>

            <button class="bg-transparent hover:bg-red-500 font-semibold hover:text-white p-1 border border-red-600 hover:border-transparent rounded-full trashBtn"
                    @click.stop="deleteNote(note.id)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="trashSvg">
                    <path d="M128 405.429C128 428.846 147.198 448 170.667 448h170.667C364.802 448 384 428.846 384 405.429V160H128v245.429zM416 96h-80l-26.785-32H202.786L176 96H96v32h320V96z"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NoteList",
        props: [
            'notes'
        ],
        computed: {
            noteEdit () {
                return this.$store.state.noteEdit
            }
        },
        methods: {
            deleteNote (id) {
                axios.delete(`/api/notes/${id}`)
                    .then(response => {
                        this.$notify({
                            group: 'notif',
                            title: 'Success !',
                            text: 'Note succesfully Deleted !',
                            type: 'success'
                        });
                        this.$bus.$emit("refreshNotes")

                        if (this.noteEdit && this.noteEdit.id === id) {
                            this.$store.commit('changeStatus', 'new')
                            this.$store.commit('changeFirst', true)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.$notify({
                            group: 'notif',
                            title: 'Error, something went wrong !',
                            text: error.message,
                            type: 'error'
                        });
                    })
            },
            showNote (note) {
                this.$store.commit('changeStatus', 'edit')
                this.$store.commit('changeFirst', true)
                this.$store.commit('changeNoteEdit', note)
            }
        }
    }
</script>

<style scoped lang="scss">
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

<template>
    <div class="NoteList" ref="list">

        <transition-group name="list" tag="div">
            <div class="listItem p-3 flex flex-col relative hover:bg-gray-200 cursor-pointer transitionItem"
                 v-for="note in notes"
                 :key="note.id"
                 :class="noteEdit && note.id === noteEdit.id ? 'bg-orange-300 hover:bg-orange-400' : ''"
                 @click="showNote(note)">
                <h6 class="font-bold text-gray-800">{{ note.updated_at | moment("calendar") }}</h6>
                <p>{{note.content}}</p>

                <button class="bg-transparent hover:bg-red-500 font-semibold hover:text-white p-1 border border-red-600 hover:border-transparent rounded-full trashBtn"
                        @click.stop="deleteNote(note.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="trashSvg">
                        <path d="M128 405.429C128 428.846 147.198 448 170.667 448h170.667C364.802 448 384 428.846 384 405.429V160H128v245.429zM416 96h-80l-26.785-32H202.786L176 96H96v32h320V96z"/>
                    </svg>
                </button>
            </div>
        </transition-group>
    </div>
</template>

<script>
    export default {
        name: "NoteList",
        props: [],
        watch: {
            listHeight (newData, oldData) {
                this.$refs.list.style.height = `${newData}px`
            }
        },
        computed: {
            noteEdit () {
                return this.$store.state.noteEdit
            },
            notes () {
                return this.$store.state.notes
            },
            listHeight () {
                return this.$store.state.listHeight
            }
        },
        methods: {
            deleteNote (id) {
                this.$store.dispatch('deleteNote', id)
            },
            showNote (note) {
                this.$bus.$emit("focusTextarea")
                this.$store.commit('changeStatus', 'edit')
                this.$store.commit('changeFirst', true)
                this.$store.commit('changeNoteEdit', note)
            }
        }
    }
</script>

<style scoped lang="scss">
    .NoteList {
        overflow-y: auto;
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
    .list-enter, .list-leave-to {
        opacity: 0;
        transform: translateX(-50px);
    }
    .list-leave-active {
        position: absolute;
        /*z-index: 10;*/
    }
    .list-move {
        transition: transform 0.5s;
    }
    .transitionItem {
        transition: all 0.5s;
    }

    .NoteList::-webkit-scrollbar {
        width:10px; // manage scrollbar width here
    }
    .NoteList::-webkit-scrollbar * {
        background:transparent; // manage scrollbar background color here
    }
    .NoteList::-webkit-scrollbar-thumb {
        border-radius: 20px;
        background:rgba(200,200,200,200.1) !important; // manage scrollbar thumb background color here
    }
</style>

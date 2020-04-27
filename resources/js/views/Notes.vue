<template>
    <div class="notes w-full h-full flex bg-gray-100">
        <div class="notesList w-4/12">
            <h3 class="m-3 font-bold">Notes List :</h3>

            <hr ref="hr" class="test">

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
                <transition name="fade">
                    <div class="loaderUploadContainer ml-3" v-show="loading">
                        <div class="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <p class="text-orange-500 font-bold ml-1">{{loadingText}}...</p>
                    </div>
                </transition>
            </div>

            <hr>
            <div ref="loaderDebounce" class="loaderDebounce"></div>

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
            this.$store.commit('changeListHeight', document.body.clientHeight - this.$refs.hr.offsetTop)

            this.$bus.$on("refreshNotes", () => {
                this.$store.dispatch('refreshNotes')
            })
            this.$bus.$on("loaderDebounceRemove", () => {
                if (this.$refs.loaderDebounce.classList.contains('loaderTransition')) {
                    this.$refs.loaderDebounce.classList.remove('loaderTransition')
                }
            })
            this.$bus.$on("loaderDebounceAdd", () => {
                this.$refs.loaderDebounce.classList.add('loaderTransition')
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
            },
            loading () {
                return this.$store.state.loading
            },
            loadingText () {
                return this.$store.state.loadingText
            }
        },
        methods: {
            addNote () {
                this.$store.commit('changeFirst', true)
                this.$store.commit('changeStatus', 'new')
                this.$bus.$emit("changeTextContent", '')
                this.$bus.$emit("focusTextarea")
            }
        }
    }
</script>

<style lang="scss">
    .notes {
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
    .loaderDebounce {
        height: 2px;
        width: 0;
        background-color: blue;
    }
    .loaderTransition {
        animation: linear loaderDeb 1.8s;
    }
    @keyframes loaderDeb {
        0% {
            width: 0;
        }
        100% {
            width: 100%;
        }
    }

    .loaderUploadContainer {
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .lds-ring {
        display: inline-block;
        position: relative;
        width: 20px;
        height: 20px;
        padding-top: 2px;
    }
    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 16px;
        height: 16px;
        border: 2px solid #ed8936;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #ed8936 transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>

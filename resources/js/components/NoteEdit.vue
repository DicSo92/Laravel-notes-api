<template>
    <div class="w-full h-full p-3 relative">
        <textarea class="border rounded focus:outline-none focus:shadow-outline p-3 bg-gray-100 w-full h-full"
                  v-model="textContent"
                  placeholder="New Note...">
        </textarea>

        <div class="wordsLength mb-4 ml-5">
            <h6 class="text-gray-500">{{wordsCount}} Words</h6>
        </div>
        <div class="limitLetters mb-4 mr-5">
            <h6 class="text-gray-500">{{textLength}} / 2000</h6>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NoteEdit",
        props: [],
        data () {
            return {
                textContent: ''
            }
        },
        created() {

        },
        mounted() {
            this.debouncedRequest = _.debounce(this.editNote, 2000)

            this.$bus.$on("changeTextContent", text => {
                this.textContent = text
            })
        },
        watch: {
            textContent: function (newData, oldData) {
                if (!this.first) {
                    if (newData.length > 1) {
                        console.log("J'attends que vous arrêtiez de taper...")
                        this.loading = true
                        this.debouncedRequest()
                    }
                } else {
                    this.$store.commit('changeFirst', false)
                }
            },
            noteEdit: function (newNote, oldNote) {
                this.textContent = newNote.content
            },
            status: function (newStatus, oldStatus) {
                if (newStatus === 'new') this.textContent = ''
                if (newStatus === 'edit') this.textContent = this.noteEdit.content
            }
        },
        computed: {
            first () {
                return this.$store.state.first
            },
            noteEdit () {
                return this.$store.state.noteEdit
            },
            textLength () {
                return this.textContent.length
            },
            wordsCount () {
                return this.textContent.length > 0 ? this.textContent.split(' ').length : 0
            }
        },
        methods: {
            editNote () {
                if (this.textContent.length > 0) {
                    this.$store.dispatch('editNote', this.textContent)
                } else {
                    this.$notify({
                        group: 'notif',
                        title: 'Error, something went wrong !',
                        text: 'Please type something to save !',
                        type: 'error'
                    });
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .limitLetters {
        position: absolute;
        bottom: 0;
        right: 0;
    }
    .wordsLength {
        position: absolute;
        bottom: 0;
        left: 0;
    }
    textarea {
        resize: none;
    }
</style>

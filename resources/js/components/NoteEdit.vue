<template>
    <textarea class="border rounded focus:outline-none focus:shadow-outline m-3 p-3 h-full bg-gray-100"
              v-model="textContent"
              placeholder="New Note...">
    </textarea>
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
            status () {
                return this.$store.state.status
            },
            first () {
                return this.$store.state.first
            },
            noteEdit () {
                return this.$store.state.noteEdit
            }
        },
        methods: {
            editNote () {
                if (this.status === 'new') {
                    axios.post(`/api/notes`, {
                        content: this.textContent
                    })
                        .then(response => {
                            console.log(response);
                            this.$notify({
                                group: 'notif',
                                title: 'Success !',
                                text: 'Note succesfully Created !',
                                type: 'success'
                            });
                            this.$bus.$emit("noteAdded", response.data.data) // set status to 'edit'
                            this.$bus.$emit("refreshNotes") // Refresh notes
                        })
                        .catch(error => {
                            console.log(error);
                            this.$notify({
                                group: 'notif',
                                title: 'Error, something went wrong !',
                                text: error.message,
                                type: 'error'
                            });
                        })
                } else {
                    axios.put(`/api/notes/${this.noteEdit.id}`, {
                        content: this.textContent
                    })
                        .then(response => {
                            console.log(response);
                            this.$notify({
                                group: 'notif',
                                title: 'Success !',
                                text: 'Note succesfully Edited !',
                                type: 'success'
                            });
                            this.$store.commit('changeFirst', false)
                            this.$bus.$emit("refreshNotes") // Refresh notes
                        })
                        .catch(error => {
                            console.log(error);
                            this.$notify({
                                group: 'notif',
                                title: 'Error, something went wrong !',
                                text: error.message,
                                type: 'error'
                            });
                        })
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>

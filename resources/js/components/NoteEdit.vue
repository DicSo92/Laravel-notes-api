<template>
    <textarea class="border rounded focus:outline-none focus:shadow-outline m-3 p-3 h-full bg-gray-100"
              v-model="textContent">
    </textarea>
</template>

<script>
    export default {
        name: "NoteEdit",
        props: [
            'status'
        ],
        data () {
            return {
                textContent: ''
            }
        },
        created() {

        },
        mounted() {
            this.debouncedRequest = _.debounce(this.editNote, 2000)
        },
        watch: {
            textContent: function (newSearch, oldSearch) {
                if (newSearch.length > 1) {
                    console.log("J'attends que vous arrêtiez de taper...")
                    this.loading = true
                    this.debouncedRequest()
                }
            },
        },
        methods: {
            editNote () {
                if (this.status === 'new') {
                    axios.post(`/api/notes`, {
                        content: this.textContent
                    })
                        .then(response => {
                            console.log(response);
                            this.$bus.$emit("noteAdded") // set status to 'edit'
                            this.$bus.$emit("refreshNotes") // Refresh notes

                            this.$bus.$emit("showAlert", {positive: true, alerts: ["Task successfully added"]})
                        })
                        .catch(error => {
                            console.log(error);
                            this.$bus.$emit("showAlert", {positive: false, alerts: error.response.data.errors.name})
                        })
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>

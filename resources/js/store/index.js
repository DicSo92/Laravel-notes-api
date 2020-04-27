import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: 'new',
        first: true,
        noteEdit: null,
        notes: null
    },
    mutations: {
        changeStatus(state, val) {
            state.status = val
        },
        changeFirst(state, val) {
            state.first = val
        },
        changeNoteEdit(state, val) {
            state.noteEdit = val
        },
        changeNotes(state, val) {
            state.notes = val
        },
    },
    actions: {
        refreshNotes({commit, dispatch}) {
            axios.get('/api/notes')
                .then(response => {
                    console.log(response)
                    commit("changeNotes", response.data.data);
                })
                .catch(error => {
                    console.log(error.message)
                    // dispatch('anotherAction')
                })
        },
        deleteNote ({commit, dispatch}, id) {
            axios.delete(`/api/notes/${id}`)
                .then(response => {
                    Vue.notify({
                        group: 'notif',
                        title: 'Success !',
                        text: 'Note succesfully Deleted !',
                        type: 'success'
                    });
                    dispatch('refreshNotes')
                    // this.$bus.$emit("refreshNotes")

                    if (this.noteEdit && this.noteEdit.id === id) {
                        commit('changeStatus', 'new')
                        commit('changeFirst', true)
                    }
                })
                .catch(error => {
                    console.log(error)
                    Vue.notify({
                        group: 'notif',
                        title: 'Error, something went wrong !',
                        text: error.message,
                        type: 'error'
                    });
                })
        },
    },
    modules: {}
})

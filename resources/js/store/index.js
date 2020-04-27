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
        }
    },
    modules: {}
})

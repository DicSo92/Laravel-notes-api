import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: 'new',
        first: true,
        noteEdit: null,
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
    },
    actions: {},
    modules: {}
})

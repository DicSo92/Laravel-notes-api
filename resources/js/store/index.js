import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: 'new',
        first: true,
        noteEdit: null,
        notes: null,
        loading: false,
        loadingText: ''
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
        toggleLoading(state, val) {
            state.loading = !state.loading
        },
        changeLoadingText(state, val) {
            state.loadingText = val
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
                })
        },
        deleteNote ({commit, dispatch, state}, id) {
            commit('changeLoadingText', 'Deleting')
            commit('toggleLoading')
            axios.delete(`/api/notes/${id}`)
                .then(response => {
                    console.log(response)
                    commit('toggleLoading')

                    Vue.notify({
                        group: 'notif',
                        title: 'Success !',
                        text: 'Note succesfully Deleted !',
                        type: 'success'
                    });
                    dispatch('refreshNotes')

                    if (state.noteEdit && state.noteEdit.id === id) {
                        commit('changeStatus', 'new')
                        commit('changeFirst', true)
                        commit('changeNoteEdit', {content: ''})
                    }
                })
                .catch(error => {
                    console.log(error)
                    commit('toggleLoading')

                    Vue.notify({
                        group: 'notif',
                        title: 'Error, something went wrong !',
                        text: error.message,
                        type: 'error'
                    });
                })
        },
        editNote ({commit, dispatch, state}, textContent) {
            commit('changeLoadingText', 'Uploading')
            commit('toggleLoading')
            if (state.status === 'new') {
                axios.post(`/api/notes`, {
                    content: textContent
                })
                    .then(response => {
                        console.log(response);
                        Vue.notify({
                            group: 'notif',
                            title: 'Success !',
                            text: 'Note succesfully Created !',
                            type: 'success'
                        });
                        commit('changeStatus', 'edit')
                        commit('changeFirst', false)
                        commit('changeNoteEdit', response.data.data)

                        commit('toggleLoading')

                        dispatch('refreshNotes')
                    })
                    .catch(error => {
                        console.log(error);
                        commit('toggleLoading')

                        Vue.notify({
                            group: 'notif',
                            title: 'Error, something went wrong !',
                            text: error.message,
                            type: 'error'
                        });
                    })
            } else {
                axios.put(`/api/notes/${state.noteEdit.id}`, {
                    content: textContent
                })
                    .then(response => {
                        console.log(response);
                        Vue.notify({
                            group: 'notif',
                            title: 'Success !',
                            text: 'Note succesfully Edited !',
                            type: 'success'
                        });
                        commit('changeFirst', false)

                        commit('toggleLoading')

                        dispatch('refreshNotes')
                    })
                    .catch(error => {
                        console.log(error);
                        commit('toggleLoading')

                        Vue.notify({
                            group: 'notif',
                            title: 'Error, something went wrong !',
                            text: error.message,
                            type: 'error'
                        });
                    })
            }
        }
    },
    modules: {}
})

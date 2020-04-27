import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: 'new',
    },
    mutations: {
        changeStatus(state, val) {
            state.status = val
        },
    },
    actions: {},
    modules: {}
})

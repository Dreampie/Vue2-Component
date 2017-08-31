import * as type from "./type.js";
import api from "./api.js";

// initial state
const state = {
    session: {}
}

// getters
const getters = {
    session: state => state.session
}

// actions
const actions = {
    getSession({commit}, {successCb, errorCb}) {
        api.getSession(session => {
            window.localStorage.setItem("session", JSON.stringify(session))
            window.localStorage.setItem("loginDisabled", 0)
            commit(type.SET_SESSION, {session})
            typeof successCb === 'function' ? successCb() : undefined
        }, error => {
            //错误信息通过state修改
            typeof errorCb === 'function' ? errorCb() : undefined
        })
    },
    deleteSession({commit}, {successCb, errorCb}) {
        api.deleteSession(result => {
            if (result) {
                //主动退出 必须手动进行sso
                window.localStorage.setItem("loginDisabled", 1)
                window.localStorage.removeItem("session")
                commit(type.DELETE_SESSION)
            }
            typeof successCb === 'function' ? successCb() : undefined
        }, error => {
            //错误信息通过state修改
            typeof errorCb === 'function' ? errorCb() : undefined
        })
    }
}

// mutations
const mutations = {
    [type.SET_SESSION](state, {session}) {
        state.session = session
    },
    [type.DELETE_SESSION](state) {
        state.session = {}
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
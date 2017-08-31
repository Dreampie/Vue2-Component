import * as type from "./type.js";
import api from "./api.js";

// initial state
const state = {
    menus: []
}

// getters
const getters = {
    menus: state => state.menus
}

// actions
const actions = {
    findMenus({commit}, {successCb, errorCb}) {
        api.findMenus(menus => {
            commit(type.SET_MENUS, {menus})
            typeof successCb === 'function' ? successCb() : undefined
        }, error => {
            //错误信息通过state修改
            typeof errorCb === 'function' ? errorCb() : undefined
        })
    },
    clearMenus({commit}, {successCb, errorCb}) {
        commit(type.SET_MENUS, {menus: []})
        typeof successCb === 'function' ? successCb() : undefined
    }
}

const menuSort = (a, b) => {
    if (a.sort > b.sort) {
        return 1;
    }
    if (a.sort < b.sort) {
        return -1;
    }
    return 0;
}

// mutations
const mutations = {
    [type.SET_MENUS](state, {menus}) {
        menus.sort(menuSort)
        menus.forEach(e => {
            if (e.menus && e.menus.length > 0) {
                e.menus.sort(menuSort)
                e.menus.forEach(c => {
                    if (c.menus && c.menus.length > 0) {
                        c.menus.sort(menuSort)
                    }
                })
            }
        })
        state.menus = menus
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
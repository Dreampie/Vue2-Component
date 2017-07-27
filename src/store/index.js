import Vue from "vue";
import Vuex from "vuex";
import session from "./session.js";
import menu from "./menu.js";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        session,
        menu
    },
    strict: true
})
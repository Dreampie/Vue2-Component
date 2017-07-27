import Vue from "vue";
import axios from "axios";

Vue.use({
    install(Vue) {
        const http = axios.create()
        Vue.prototype.$http = http
        Vue.http = http
    }
})
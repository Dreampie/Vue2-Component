import Vue from "vue";
import "./filter.js";
import "./bus.js";
import "./cookie.js";
import "./http.js";
import router from "./router.js";
import store from "./store/index.js";
import App from "./App.vue";
import properties from "./../application.json";

console.log("App start env is: " + process.env.NODE_ENV)
console.log("App root url is: " + properties[process.env.NODE_ENV].rootUrl)
console.log("Api root url is: " + properties[process.env.NODE_ENV].apiRootUrl)
console.log("Login url is: " + properties[process.env.NODE_ENV].loginUrl)

window.localStorage.setItem("rootUrl", properties[process.env.NODE_ENV].rootUrl)
window.localStorage.setItem("apiRootUrl", properties[process.env.NODE_ENV].apiRootUrl)
window.localStorage.setItem("loginUrl", properties[process.env.NODE_ENV].loginUrl)

new Vue({
    router,
    store,
    ...App
}).$mount('#app')

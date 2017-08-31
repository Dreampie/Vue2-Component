import Alert from "./Alert.vue";
import Loading from "./Loading.vue";
import Page from "./Page.vue";
import BackTop from "./BackTop.vue";
import SideBar from "./SideBar.vue";
import TopMenu from "./TopMenu.vue";

export default {
    install(Vue) {
        Vue.component('v-alert', Alert)
        Vue.component('v-loading', Loading)
        Vue.component('v-page', Page)
        Vue.component('v-back-top', BackTop)
        Vue.component('v-side-bar', SideBar)
        Vue.component('v-top-menu', TopMenu)
    }
}

export {Alert, Loading, Page, BackTop, SideBar, TopMenu}
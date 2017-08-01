import Alert from "./Alert.vue";
import Loading from "./Loading.vue";
import Page from "./Page.vue";
import BackTop from "./BackTop.vue";
import TopMenu from "./TopMenu.vue";

export default {
    install(Vue) {
        Vue.component('alert', Alert)
        Vue.component('loading', Loading)
        Vue.component('page', Page)
        Vue.component('back-top', BackTop)
        Vue.component('top-menu', TopMenu)
    }
}

export {Alert, Loading, Page, BackTop, TopMenu}
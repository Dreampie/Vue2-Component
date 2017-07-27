import Vue from "vue";
import VueRouter from "vue-router";
import IndexView from "./view/Index.vue";
import PayToMerchantView from "./view/allocate/PayToMerchant.vue";
import PayToCardView from "./view/allocate/PayToCard.vue";
import TransferToMerchantView from "./view/allocate/TransferToMerchant.vue";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {path: '/process-types/:type(1)/allocates/:range', component: PayToMerchantView},
        {path: '/process-types/:type(2)/allocates/:range', component: PayToCardView},
        {path: '/process-types/:type(3)/allocates/:range', component: TransferToMerchantView},
        {path: '/', component: IndexView}
    ]
})

router.beforeEach((to, from, next) => {
    next()
})

router.afterEach((route) => {
    Vue.bus.$emit('v-menu:reset')
})

export default router
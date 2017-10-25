<template>
    <!--body-->
    <div class="bodyer pusher">
        <v-loading></v-loading>
        <!--sider-->
        <div class="sidebar">
            <v-side-bar :logo="logo" :menus="menus" :help="help"></v-side-bar>
        </div>
        <div class="contenter">
            <!--head-->
            <header class="header">
                <v-top-menu :session="session" :menus="childMenus"></v-top-menu>
            </header>
            <router-view class="main"></router-view>
            <!--foot-->
            <footer class="ui footer segment">
                <div class="container">
                    <div>Copyright&nbsp;©&nbsp;2017&nbsp;
                        <a :href="belong.url" target="_blank">@{{belong.name}}</a>.
                    </div>

                    <div>Base on <a :href="baseOn.url" target="_blank">{{baseOn.name}}</a> | Powered by
                        <a :href="poweredBy.url">{{poweredBy.name}}.</a>
                    </div>
                </div>
            </footer>
        </div>
        <v-alert></v-alert>
        <v-back-top></v-back-top>
    </div>
</template>

<script>
    import '@dreampie/semantic-ui/semantic.min.js'
    import 'semantic-ui-calendar/dist/calendar.min.js'
    import logoImage from './asset/logo.png'

    import {mapGetters, mapActions} from 'vuex'
    import {Alert, Loading, BackTop, SideBar, TopMenu} from './component/index.js'
    import {DomainSolver} from '@dreampie/vue2-common'

    export default {
        name: 'app',
        data() {
            return {
                logo: {name: 'Logo', url: logoImage},
                help: {name: 'Help', url: 'https://www.vuejs.com'},
                belong: {name: 'Vue Components', url: 'https://www.vuejs.com'},
                baseOn: {name: 'Vuejs', url: 'https://github.com/vuejs'},
                poweredBy: {name: 'Dreampie', url: 'https://github.com/Dreampie'},
//                parentMenus: [],
                childMenus: []
            }
        },
        components: {
            'v-alert': Alert,
            'v-back-top': BackTop,
            'v-loading': Loading,
            'v-side-bar': SideBar,
            'v-top-menu': TopMenu
        },
        computed: {
            ...mapGetters([
                'session',
                'menus'
            ])
        },
        methods: {
            initChildMenu(childMenus) {
                $(document.body).animate({
                    scrollTop: '0px'
                }, 400, 'linear')
                this.childMenus = childMenus
            },
            resetMenu() {
                this.$bus.$emit('v-side-bar:reset')
                this.$bus.$emit('v-top-menu:reset')
            },
            login() {
                let rootUrl = window.localStorage.getItem("rootUrl")
                this.$cookie.set("SAVED_URL", window.location.href, {domain: DomainSolver.getTopDomain(rootUrl)})
                window.location.href = window.localStorage.getItem("loginUrl")
                window.localStorage.setItem("loginDisabled", 0)
            },
            logout() {
                const self = this
                this.deleteSession({
                    successCb: () => {
                        self.$router.push({path: '/'})
                        self.clearMenus({})
                    }
                })
            },
            ...mapActions([
                'getSession',
                'deleteSession',
                'findMenus',
                'clearMenus'
            ])
        },
        mounted() {
            const loginDisabled = window.localStorage.getItem("loginDisabled")
            if (!loginDisabled || loginDisabled === 0) {
                this.getSession({})

                const self = this
                this.findMenus({
//                successCb: () => {
//                    self.parentMenus = [
//                        {sort: 0, title: '资金调拨', url: 'retweet', menus: self.menus},
//                        {sort: 1, title: '银行信息', url: 'university', menus: []}
//                    ]
//                }
                })
            }
            this.$bus.$on('v-app:login', this.login)
            this.$bus.$on('v-app:logout', this.logout)
            this.$bus.$on('v-app-child-menu:init', this.initChildMenu)
            this.$bus.$on('v-router:after', this.resetMenu)
        }
    }
</script>

<style lang="stylus">
    @import '~@dreampie/semantic-ui/semantic.min.css';
    @import '~semantic-ui-calendar/dist/calendar.min.css';

    body, html {
        z-index: 0;
        height: 100%;
    }

    html {
        overflow-y: visible;
    }

    body {
        position: relative;
        overflow-x: visible;
    }

    a {
        transition: color 0.2s;
        outline: none;
    }

    .bodyer {
        padding-top: 45px;
        min-height: 100%;
        position: relative;
    }

    .bodyer .sidebar {
        z-index: 3 !important;
    }

    .bodyer .contenter {
        margin-left: 62px;
    }

    .bodyer .header {
        padding-left: 62px;
        padding-bottom: 10px;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 1;
    }

    .bodyer .main {
        padding: 16px 10px 76px 10px;
    }

    .bodyer .footer {
        border-radius: 0 !important;
        margin: 0 !important;
        width: 100%;
        padding-left: 62px;
        padding-bottom: 10px;
        position: fixed;
        left: 0;
        top: auto;
        bottom: 0
        z-index: 1;
    }

    .bodyer .footer .container {
        text-align: center;
    }

    .bodyer .footer .container a {
        color: rgba(0, 0, 0, 0.6);
    }

    .bodyer .footer .container a:hover {
        color: rgba(0, 0, 0, 0.8);
    }

    .calendar {
        display: inline-block;
    }

    .ui.attached.button {
        box-shadow: none !important;
    }

</style>


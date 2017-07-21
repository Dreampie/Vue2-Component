<template>
    <div class="ui menu">
        <router-link class="ui item" to="/" exact>
            <img :src="logo.url">
        </router-link>
        <div v-for="menu in menus" :key="menu.id" class="ui dropdown item" tabindex="0" style="margin: 0">
            <div class="text">{{menu.title}}</div>
            <i class="dropdown icon"></i>
            <div class="menu transition hidden" tabindex="-1">

                <router-link v-for="child in menu.menus" :key="child.id" class="ui item"
                             :to="{path: child.url, force: true}" exact>
                    {{child.title}}
                </router-link>
            </div>
        </div>
        <div class="right menu">
            <a class="ui item" :href="help.url" target="_blank">
                <i class="help icon"></i>
            </a>
            <a v-if="!(session||{}).id" class="ui item" @click="login">
                您好, 请&nbsp;<span style="color: #912d2b">登录!</span>
            </a>
            <a v-else class="ui item" @click="logout">
                欢迎, {{session.realname}}&nbsp;<span style="color: #912d2b">退出!</span>
            </a>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {Domain} from './util.js'

    export default {
        name: 'v-top-menu',
        props: ['logo','session','help'],
        computed: {
            ...mapGetters([
                'menus'
            ])
        },
        methods: {
            login(){
                let rootUrl= window.localStorage.getItem("rootUrl")
                this.$cookie.set("SAVED_URL", window.location.href, {domain: Domain.getTopDomain(rootUrl)})
                window.location.href = window.localStorage.getItem("ssoUrl")
                window.localStorage.setItem("sso", 0)
            },
            logout(){
                this.deleteSession({
                    successCb: () => {
                        this.$router.push({path: '/'})
                        this.deleteMenus({})
                    }
                })
            },
            reset(){
                $(this.$el).find('.ui.dropdown').each((i, e) => {
                    const parent = this.menus[i]
                    const menuIndex = parent.menus.findIndex(e => this.$route.path == e.url)
                    if (menuIndex >= 0) {
                        $(e).addClass('activeMenu')
                        $(e).find('.text').text(parent.menus[menuIndex].title)
                    } else {
                        $(e).removeClass('activeMenu')
                        $(e).find('.text').text(parent.title)
                    }
                })
            },
            ...mapActions([
                'findMenus',
                'deleteMenus',
                'deleteSession'
            ])
        },
        mounted() {
            this.$bus.$on('v-top-menu:reset', this.reset)
            this.findMenus({
                successCb: () => {
                    this.$nextTick(() => {
                        $(this.$el).find('.dropdown').dropdown()
                        this.reset()
                    })
                }
            })
        }
    }
</script>

<style lang="stylus">
    .menu {
        border-radius: 0rem !important;
    }

    .activeMenu {
        background: rgba(0, 0, 0, .05) !important;
        color: rgba(0, 0, 0, .95) !important;
        font-weight: 400 !important;
        box-shadow: none !important;
    }
</style>
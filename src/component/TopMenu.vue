<template>
    <div class="ui menu">
        <router-link v-if="logo" class="item" to="/" exact>
            <img :src="logo.url">
        </router-link>
        <!-- demo
         <div tabindex="0" class="ui dropdown item" style="margin: 0px;">
             <div class="text">充值调拨</div>
             <i class="dropdown icon" tabindex="0">
                 <div class="menu" tabindex="-1"></div>
             </i>
             <div tabindex="-1" class="menu transition hidden">
                 <a href="/process-types/1/allocates/pre-review" class="ui item">充值初审</a>
                 <a href="/process-types/1/allocates/review" class="ui item">充值复审</a>
                 <a href="/process-types/1/allocates/all" class="ui item">全部充值</a>
             </div>
         </div>
         -->
        <template v-if="!disable" v-for="menu in menus">

            <template v-if="menu.menus && menu.menus.length>0">
                <div v-if="!disable" :key="menu.id" class="ui dropdown item m" tabindex="0"
                     style="margin: 0">
                    <div class="text">{{menu.title}}</div>
                    <i class="dropdown icon"></i>
                    <div class="menu transition hidden" tabindex="-1">

                        <router-link v-for="child in menu.menus" :key="child.id" class="ui item"
                                     :to="{path: child.url, force: true}" exact>
                            {{child.title}}
                        </router-link>
                    </div>
                </div>
            </template>
            <template v-else>
                <router-link :key="menu.id" class="item m" :to="{path: menu.url, force: true}" exact>
                    {{menu.title}}
                </router-link>
            </template>

        </template>


        <div class="right menu">
            <a class="item" :href="help.url" target="_blank">
                <i class="help icon"></i>
            </a>
            <a v-if="!(session||{}).id" class="item" @click="login">
                您好, 请&nbsp;<span style="color: #912d2b">登录!</span>
            </a>
            <a v-else class="item" @click="logout">
                欢迎, {{session.realname}}&nbsp;<span style="color: #912d2b">退出!</span>
            </a>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {DomainSolver} from '@dreampie/vue2-common'

    export default {
        name: 'v-top-menu',
        props: ['logo', 'disable', 'session', 'menus', 'help'],
        computed: {},
        methods: {
            login() {
                let rootUrl = window.localStorage.getItem("rootUrl")
                this.$cookie.set("SAVED_URL", window.location.href, {domain: DomainSolver.getTopDomain(rootUrl)})
                window.location.href = window.localStorage.getItem("loginUrl")
                window.localStorage.setItem("loginDisabled", 0)
            },
            logout() {
                this.deleteSession({
                    successCb: () => {
                        this.$router.push({path: '/'})
                        this.clearMenus({})
                    }
                })
            },
            reset() {
                $(this.$el).find('.item.m').each((i, e) => {
                    const parent = this.menus[i]
                    if (parent.menus && parent.menus.length > 0) {
                        const menuIndex = parent.menus.findIndex(e => this.$route.path === e.url)
                        if (menuIndex >= 0) {
                            $(e).addClass('activation')
                            $(e).find('.text').text(parent.menus[menuIndex].title)
                        } else {
                            $(e).removeClass('activation')
                            $(e).find('.text').text(parent.title)
                        }
                    } else {
                        const active = this.$route.path === parent.url
                        if (active) {
                            $(e).addClass('activation')
                            $(e).find('.text').text(parent.title)
                        } else {
                            $(e).removeClass('activation')
                            $(e).find('.text').text(parent.title)
                        }
                    }
                })
            },
            ...mapActions([
                'deleteSession',
                'clearMenus'
            ])
        },
        updated() {
            this.reset()
            this.$nextTick(() => {
                $(this.$el).find('.dropdown.item.m').dropdown()
            })
        },
        mounted() {
            this.$bus.$on('v-top-menu:reset', this.reset)
        }
    }
</script>

<style lang="stylus">
    .menu {
        border-radius: 0rem !important;
    }

    .activation {
        background: rgba(0, 0, 0, .05) !important;
        color: rgba(0, 0, 0, .95) !important;
        font-weight: 400 !important;
        box-shadow: none !important;
    }
</style>
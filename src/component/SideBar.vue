<template>
    <div class="ui left vertical labeled icon sidebar menu uncover visible">
        <router-link v-if="logo" class="item logo" to="/" exact>
            <img :src="logo.url">
        </router-link>

        <!-- demo
        <a class="item" data-content="测试1" data-position="right center" data-variation="large">
            <i class="block layout icon"></i>
            Topics
        </a>
        <a class="item" data-content="测试2" data-position="right center" data-variation="large">
            <i class="smile icon"></i>
            Friends
        </a>
        -->

        <template v-for="(menu, index) in menus">
            <a class="item bar" :key="menu.id" :data-content="menu.title" data-position="right center"
               data-variation="large" @click="active(index)">
                <i class="icon" :class="menu.icon"></i>
                <!--{{menu.title}}-->
            </a>
        </template>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'v-side-bar',
        props: ['logo', 'menus'],
        computed: {
            ...mapGetters([])
        },
        methods: {
            active(index) {
                $(this.$el).find('.item.bar').each((i, e) => {
                    if (i === index) {
                        $(e).addClass('active')
                        this.$bus.$emit('v-app-child-menu:init', this.menus[i].menus)
                    } else {
                        $(e).removeClass('active')
                    }
                })

            },
            reset() {
                let actived = false

                const items = $(this.$el).find('.item.bar')
                items.each((i, e) => {
                    const current = this.menus[i]
                    if (current.menus && current.menus.length > 0) {
                        let menuIndex = current.menus.findIndex(e => this.$route.path === e.url)

                        //查询子菜单
                        if (menuIndex < 0) {
                            current.menus.forEach(m => {
                                if (m.menus && m.menus.length > 0) {
                                    menuIndex = m.menus.findIndex(e => this.$route.path === e.url)
                                }
                            })
                        }

                        if (menuIndex >= 0) {
                            $(e).addClass('active')
                            this.$bus.$emit('v-app-child-menu:init', current.menus)
                            actived = true
                        } else {
                            $(e).removeClass('active')
                        }
                    }
                })

                if (!actived) {
                    items.eq(0).addClass('active')
                    this.$bus.$emit('v-app-child-menu:init', this.menus[0].menus)
                }
            },
        },
        updated() {
            this.reset()
            this.$nextTick(() => {
                $(this.$el).find('.item.bar').popup()
            })
        }
    }
</script>

<style lang="stylus">
    .sidebar .logo {
        padding: 0 !important;
        flex-direction: column !important;
        display: flex !important;
        justify-content: center !important;
    }

    .sidebar .logo img {
        height: 30px;
        margin: 0 auto !important;
    }

    .sidebar .item {
        min-width: 63px !important;
        min-height: 41px !important;
    }
</style>
<template>
    <div class="ui left demo vertical inverted labeled icon sidebar menu along uncover visible" style="">
        <a class="item">
            <i class="home icon"></i>
            Home
        </a>
        <a class="item">
            <i class="block layout icon"></i>
            Topics
        </a>
        <a class="item">
            <i class="smile icon"></i>
            Friends
        </a>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {DomainSolver} from '@dreampie/vue2-common'

    export default {
        name: 'v-left-side-bar',
        props: [],
        computed: {
            ...mapGetters([
            ])
        },
        methods: {

        },
        mounted() {
            this.$bus.$on('v-left-side-bar:reset', this.reset)
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
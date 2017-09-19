<template>
    <div class="loadings">
        <template v-for="loading in loadings">
            <div :for="loading.for" class="ui top attached red progress">
                <div class="bar"></div>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'v-loading',
        data() {
            return {
                loadings: [],
            }
        },
        methods: {
            start(loading) {
                this.loadings.unshift(loading)

                this.$nextTick(() => {
                    const intervalId = window.setInterval(() => {
                        const progress = $('div.loadings').find('div[for="' + loading.for + '"]')

                        if (progress.length > 0) {
                            if (progress.progress('get percent') < 85) {
                                progress.progress('increment')
                            } else {
                                window.clearInterval(intervalId)
                            }
                        }
                    }, 200)
                })
            },
            complete(loading) {
                const self = this
                const progress = $('div.loadings').find('div[for="' + loading.for + '"]')
                progress.progress('complete')

                window.setTimeout(() => {
                    if (progress.length > 0) {
                        if (progress.progress('is complete')) {
                            self.loadings.splice(self.loadings.findIndex(e => loading.for === e.for), 1)
                        }
                    }
                }, 500)
            },
            completeAll() {
                this.loadings.forEach(loading => this.complete(loading))
            }
        },
        mounted() {
            this.$bus.$on('v-loading:start', this.start)
            this.$bus.$on('v-loading:complete', this.complete)
            this.$bus.$on('v-loading:completeAll', this.completeAll)
        }
    }
</script>

<style lang="stylus">
    .loadings {
        overflow-x: hidden;
    }

    .progress {
        width: 100%;
        position: fixed !important;
        left: 0;
        top: 0;
        border-radius: 0rem !important;
        z-index: 9999;
    }
</style>
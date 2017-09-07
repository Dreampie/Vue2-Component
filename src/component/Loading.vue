<template>
    <div class="loadings">
        <div v-for="loading in loadings" :for="loading.for" class="ui top attached red progress">
            <div class="bar"></div>
        </div>
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
                    const progress = $(this.$el).find('[for="' + loading.for + '"]')
                    const intervalId = window.setInterval(() => {
                        if (progress.progress('get percent') < 85) {
                            progress.progress('increment')
                        } else {
                            window.clearInterval(intervalId)
                        }
                    }, 200)
                })
            },
            complete(loading) {
                const progress = $(this.$el).find('[for="' + loading.for + '"]')
                progress.progress('complete')

                window.setTimeout(() => {
                    if (progress.progress('is complete')) {
                        this.loadings.splice(this.loadings.findIndex(e => loading.for === e.for), 1)
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
        position: absolute !important;
        border-radius: 0rem !important;
        z-index: 999;
    }
</style>
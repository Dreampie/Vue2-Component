<template>
    <div class="alerts">
        <div v-for="alert in alerts" :for="alert.for" class="ui alert" :class="alert.type">
            <a v-if="!alert.keep" class="close" @click="close(alert)"><i class="remove icon"></i></a>
            {{alert.message}}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'v-alert',
        data(){
            return {
                alerts: []
            }
        },
        methods: {
            alert(alert){
                this.alerts.unshift(alert)

                this.$nextTick(() => {
                    const bar = $(this.$el).find('[for="' + alert.for + '"]')
                    bar.css({left: '-' + bar.outerWidth() + 'px', display: 'block'})

                    bar.animate({
                        left: '0px'
                    }, 1000, 'linear')

                    if (!alert.keep) {
                        window.setTimeout(() => {
                            this.close(alert)
                        }, 5000)
                    }
                })
            },
            close(alert){
                const bar = $(this.$el).find('[for="' + alert.for + '"]')
                bar.animate({
                    left: '-' + bar.outerWidth() + 'px'
                }, 1000, 'linear')

                window.setTimeout(() => {
                    this.alerts.splice(this.alerts.findIndex(e => alert.for === e.for), 1)
                }, 2000)
            }
        },
        mounted () {
            this.$bus.$on('v-alert:alert', this.alert)
        }
    }
</script>

<style lang="stylus">
    .alerts {
        position: fixed;
        bottom: 70px;
        left: 0;
        margin: 0;
        padding: 0;
        z-index: 999;
    }

    .alerts .alert {
        position: relative;
        display: none;
        width: auto;
        text-align: left;
    }

    .alerts .alert {
        position: relative;
        z-index: 9999;
        display: table;
        margin: 0 0 8px 0;
        padding: 0 14px 0 4px;
        width: auto;
        height: auto;
        border: 0;
        border-left: 4px solid #288ecf;
        border-radius: 1px;
        background-color: #3a9bd9;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        color: #fff;
        word-break: break-all;
        font-weight: 700;
        font-size: 1rem;
        line-height: 24px;
    }

    .alerts .alert .close {
        color: #fff !important;
        right: -12px;
        top: 1px;
        text-shadow: 0 0 0;
        cursor: pointer;
    }

    .alerts .success {
        background-color: #95ba12 !important;
        border-color: #86a710 !important;
    }

    .alerts .info {
        background-color: #055f95 !important;
        border-color: #055586 !important;
    }

    .alerts .warning {
        background-color: #ff9101 !important;
        border-color: #e68300 !important;
    }

    .alerts .danger {
        background-color: #e74c3c !important;
        border-color: #e43422 !important;
    }

</style>
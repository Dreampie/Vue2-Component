<template>
        <div style="height: 2000px">
            <h1>
                {{welcome}}
            </h1>
        </div>
</template>

<script>
    export default {
        name: 'index-view',
        data () {
            return {
                welcome: "欢迎访问资金调拨系统！"
            }
        }
    }
</script>
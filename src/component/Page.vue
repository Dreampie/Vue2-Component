<template>
    <div class="v-page">
        <div class="ui icon button circular" :class="{active:num<=1}" @click="pre">
            <i class="chevron left icon"></i>
        </div>
        <div class="ui icon button circular active">
            {{num}}
        </div>
        <div class="ui icon button circular" :class="{active:isLast}" @click="next">
            <i class="chevron right icon"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'v-page',
        props: ['module', 'num', 'isLast'],
        methods: {
            pre(){
                this.$bus.$emit(this.module + ':pre', this.num > 1 ? this.num - 1 : 1)
            },
            next(){
                this.$bus.$emit(this.module + ':next', this.isLast ? this.num : this.num + 1)
            }
        }
    }
</script>


<style lang="stylus">
    .v-page {
        margin: 20px 0;
        text-align: center;
    }
</style>
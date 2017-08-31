<template>
    <div style="height: 2000px">
        <h1>
            {{welcome}}
        </h1>
        <div class="ui calendar">
            <div class="ui input left icon">
                <i class="calendar icon"></i>
                <input type="text" placeholder="时间插件">
            </div>
        </div>
        <!--分页插件-->
        <v-page :module="module" :num="num" :isLast="isLast"></v-page>
    </div>

</template>

<script>
    import {Page} from '../component/index'
    import {CalendarSetting} from '@dreampie/vue2-common'

    export default {
        name: 'index-view',
        data() {
            return {
                module: 'index',
                num: 5,
                isLast: false,
                welcome: "Welcome to Vue Components！"
            }
        },
        components: {
            'v-page': Page
        },
        mounted() {
            $('div.calendar').calendar({
                    type: 'date',
                    ampm: false,
                    initialDate: new Date(),
                    text: CalendarSetting.Text,
                    formatter: CalendarSetting.Formatter,
                    onChange: (date, text) => {
                        console.log(date)
                        return true
                    }
                }
            )
        }
    }
</script>
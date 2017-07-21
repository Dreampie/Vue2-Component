import Vue from "vue";
import {CurrencyFormatter, DateFormatter} from "./util.js";


//时间 过滤器
Vue.filter('date', DateFormatter.format)
Vue.filter('currency', CurrencyFormatter.format)


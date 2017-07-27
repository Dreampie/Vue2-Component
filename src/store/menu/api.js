import Vue from "vue";

export default {
    findMenus(successCb, errorCb){
        Vue.http.get('/menus', {headers: {'Api-Version': 'v1'}}).then(response => {
            // success callback
            successCb(response.data)
        }).catch(error => {
            errorCb(error)
        })
    }
}
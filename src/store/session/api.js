import Vue from "vue";

export default {
    getSession(successCb, errorCb){
        Vue.http.get('/sessions', {headers: {'Api-Version': 'v1'}}).then(response => {
            // success callback
            successCb(response.data)
        }).catch(error => {
            errorCb(error)
        })
    },
    deleteSession(successCb, errorCb){
        Vue.http.delete('/sessions', {headers: {'Api-Version': 'v1'}}).then(response => {
            // success callback
            successCb(response.data)
        }).catch(error => {
            errorCb(error)
        })
    }
}
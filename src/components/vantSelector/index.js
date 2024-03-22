import selector from "./selector.vue"
const vantselector = {
    install: function(Vue){
        Vue.component("vant-selector", selector)
    }
}
export default vantselector
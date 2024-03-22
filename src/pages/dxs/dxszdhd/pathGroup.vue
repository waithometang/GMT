<template>
    <div>
        <van-radio-group v-model="selected" @change="changeFn">
            <pathCom :isDetail="isDetail" v-for="(item, index) in paths" :key="index" :path="item"/>
        </van-radio-group>
    </div>
</template>

<script>
import paths from "./pathData.js"
import pathCom from "./path.vue"
// import { RadioGroup } from 'vant';
import { CheckboxGroup  } from 'vant';
export default {
    data(){
        return {
            paths: [],
            selected: []
        }
    },
    props: {
        value:{
            type:Array,
            required: false
        },
        isDetail:{
            type:Boolean,
            default:false
        },
    },
    created() {
        if (!this.isDetail) {
            this.paths=paths
        }
    },
    methods: {
        changeFn(val){
            this.$emit('input',val)
            // this.$emit('routeNumber',paths[val-1].name)
        },
        setType(val){
            this.selected=val
            // console.log(val);
            this.paths=paths.filter(m=>val.includes(m.type))
        }
    },
    components:{
        pathCom,
        'van-radio-group':CheckboxGroup 
    }
}
</script>
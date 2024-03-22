<template>
    <div>
        <van-field
        :value="params1"
        :label="label"
        :readonly="readonly"
        :placeholder="placeholder"
        @input="handlerJob"
      />
      <div v-if="showJob">
        <vant-selector :value="params2" :columns="columns" :required="required" @input="val=>$emit('update:params2',val)" label="等级" :readonly="readonly" />
      </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            showJob:false
        }
    },
    props: {
        params1:{
            type: String,
        },
        params2:{
            type: String,
        },
        required:{
            type: Boolean,
            default: true
        },
        columns:{
            type: Array,
            required: true
        },
        label:{
            type: String
        },
        placeholder:{
            type: String
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    created () {
        if(this.params1 && this.params1.length > 0) {
            this.showJob = true;
        }
    },
    watch: {
        params1(val){
            if(val.trim().length > 0) {
                this.showJob = true;
            } else {
                this.showJob = false;
            }
        }
    },
    methods: {
        handlerJob(val) {
            this.$emit('update:params1',val)
            // if(val.trim().length > 0) {
            //     this.showJob = true;
            // } else {
            //     this.showJob = false;
            // }
        },
    }
}
</script>
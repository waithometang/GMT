<template>
    <div class="yesno">
        <div class="tabs">
            <div class="tab" :class="{'active':value==='是'}" @click="change('是')">是</div>
            <div class="tab" :class="{'active':value==='否'}" @click="change('否')">否</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String
        },
        readonly:{
            type: Boolean,
            default: false
        }
    },
    methods: {
        change(val){
            if (this.readonly) {
                return
            }
            this.$emit('input', val)
        }
    }
}
</script>

<style scoped lang='scss'>
    .yesno{
        width:100%;
        .tabs{
            width:100%;
            display: flex;
            .tab{
                flex: 1;
                background-color: #EEEEEE;
                height: 72px;
                line-height: 72px;
                border-radius: 35px;
                font-size: 28px;
                text-align: center;
                margin:10px 15px 15px 28px;
            }
            .active{
                background-color: #CDE6F9;
            }
        }
    }
</style>
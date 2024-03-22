<template>
  <div class="serch_activity zxdt">
    <div class="serch_activity_label">
      <div :class="{'islable':labelIndex==index}" v-for="(item,index) in labels" :key="index" @click="()=>clickFn(index)" >{{item.name}}</div>
    </div>
    <div class="container">
      <PublishList fblxId="33" :t="lbtype" ref="pList"/>
    </div>
  </div>
</template>

<script>
import PublishList from '@/pages/secondLevelPages/CommonPublishList';
export default {
    data(){
        return {
            labelIndex:0,
            lbtype: '0',
            labels: [
                { name: "全部" },
                { name: "3861家长学校" },
                { name: "益家课堂" },
                { name: "乐享家" }
            ],
        }
    },
    methods: {
        clickFn(i){
            this.labelIndex=i
            this.lbtype=i.toString()
            this.$nextTick(()=>this.$refs.pList.updateLb())
        }
    },
    created () {
        this.lbtype=this.$route.params.t
        if (this.lbtype) {
            this.labelIndex=Number(this.lbtype)
        }
    },
    components: {
        PublishList
    }
}
</script>

<style lang="scss" scope>
@import "src/pages/FNT_zhd/style/index.scss";
.zxdt .serch_activity_label div{
    &:nth-child(2){
        width:30%;
    }
}
</style>
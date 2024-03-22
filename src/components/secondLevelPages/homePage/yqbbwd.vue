<template>
    <div class="yqbbwd">
        <GmtCommonList
            ref="commonList"
            url="api/VillageOpen/TzggList"
            :parms="{VillageId:918}"
        >
        <template slot="item" slot-scope="listData">
          <div
            class="item"
            v-for="(item, index) in listData.data"
            :key="index"
            @click="viewDetail(item.id)"
          >
            <div class="card">
            <div class="row">
                <div class="t1">姓名</div>
                <div class="n1">五五</div>
            </div> 
            <div class="row">
                <div class="t1">性别</div>
                <div class="n1">男</div>
            </div> 
            <div class="row">
                <div class="t1">联系方式</div>
                <div class="n1">138888888</div>
            </div> 
            <div class="row">
                <div class="t1">报备时间</div>
                <div class="n1">2020-01-27 10:10：10</div>
            </div> 
            </div>
          </div>
        </template>
      </GmtCommonList>
    </div>
</template>

<script>
import GmtCommonList from "@/components/GmtCommonList.vue";

export default {
    components: {
        GmtCommonList
    },
    methods: {
        viewDetail(){
            this.$router.push('/yqbbxx/3')
        }
    }
}
</script>

<style lang="scss" scoped>
    .MissiveList{
        background-color: #EEEEEE !important;
    }
   .yqbbwd{
        // padding:0px 36px 0px 36px;
        .item{
            background-color: #EEEEEE;
            padding: 20px 36px 0px 36px;
            .card{
                border-radius: 5px;
                padding-top: 20px;
                background-color: #fff;
                 margin: 0px 20px 0px 20px;
                 font-size: 28px;
                .row{
                    display: flex;
                    height: 60px;
                    .t1{
                        flex:2;
                        text-align: right;
                        color:#898989;
                    }
                    .n1{
                        padding-left: 40px;
                        flex: 4;
                        font-weight: 500;
                        color:#333333;
                    }
                }
            }
        }
   }
</style>
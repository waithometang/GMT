<template>
    <div class="scjg">
        <div class="header">
            <div class="icon"><img src="/static/zkbm/shtg.png"></div>
        </div>
        <div class="content">
            <van-field :value="pageObj.xm" label="姓名" input-align="right" readonly/>
            <van-field :value="pageObj.sfzh" label="身份证号" input-align="right" readonly/>
            <van-field :value="pageObj.lxdh" label="联系电话" input-align="right" readonly/>
            <van-field :value="pageObj.zkzh" label="准考证号" input-align="right" readonly/>
        </div>
    </div>
</template> 

<script>
export default {
    data(){
        return {
            pageObj:{xm:''}
        }
    },
}
</script>

<style lang="scss" scoped>
    .scjg {
        .header {
            .icon{
                width: 100%;
                img{
                    width: 100%;
                }
            }
        }
        .content{
            background-color:#fff;
            position: relative;
            top: -180px;
            border: 0px solid #ccc;
            border-radius:20px;
            box-shadow:1Px 2Px 2Px #999;
            margin:0px 30px;
            padding:0px 20px;
        }
        /deep/ .van-cell{
            padding-top: 33px;
            padding-bottom: 33px;
        }
    }
</style>
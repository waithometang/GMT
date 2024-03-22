<template>
    <div class="lqqr" v-if="showAll">
        <div class="contain">
            <van-field label="姓名" colon :value="pageObj.xm" :border="false" readonly/>
            <van-field label="身份证号" colon :value="pageObj.zjhm" :border="false" readonly/>
            <van-field label="事项" colon :value="pageObj.sxmc" :border="false" readonly/>
            <van-field label="见面会时间" colon :value="pageObj.jmhsj" :border="false" readonly/>
            <van-field label="见面会地点" colon :value="pageObj.jmhdd" :border="false" readonly/>
            <van-field label="团微信号" colon :value="pageObj.twxh" :border="false" readonly/>
            <van-field label="联系方式" colon :value="pageObj.lxfs" :border="false" readonly/>
            <van-field label="注意事项" type="textarea" :autosize="{ maxHeight: 10000}" colon :value="pageObj.bz" :border="false" readonly/>
            <br/>
            <div class="van-hairline--top-bottom"></div>
            <van-field label="匹配岗位代码" colon :value="pageObj.gwdm" :border="false" readonly/>
            <van-field label="单位名称" colon :value="pageObj.dwmc" :border="false" readonly/>
            <van-field label="岗位名称" colon :value="pageObj.gwmc" :border="false" readonly/>
            <van-field label="实习时间" colon :value="pageObj.sxsj" :border="false" readonly/>
            <van-field label="是否提供饭餐" colon :value="pageObj.sffc" :border="false" readonly/>
            <van-field label="是否提供实习补贴" colon :value="pageObj.sfbt" :border="false" readonly/>
            <div class="btnDiv" v-if="showBtn && pageObj.sfqr !== '是'">
                <van-button round type="info" @click="qrFn">确认</van-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            pageObj:{
                xm:''
            },
            showAll:false,
            showBtn:true,
        }
    },
    computed:{
        id() {
            return this.$route.params.id;
        }
    },
    methods: {
        qrFn(){
            this.$dialog.confirm({message:'请确认信息无误'}).then(()=>{
                this.$indicator.open('提交中...')
                this.$post('api/zx/dxslqqr', {id:this.id}).then(res=>{
                    this.$indicator.close()
                    if(res.data.success){
                        this.showBtn=false
                        this.$toast.success('确认成功')
                    }else{
                        this.changtoast(res.data.message,'error')
                    }
                })
            })
        }
    },
    created () {
        this.$indicator.open('加载中...')
        this.$post('api/zx/dxslqqrxx',{id:this.id}).then(res =>{
            this.$indicator.close()
            if(res.data.success){
                if(res.data.content){
                    this.showAll=true
                    this.pageObj=res.data.content
                }else{
                    this.changtoast('没有该报名记录数据','error')
                }
            }else{
                this.changtoast(res.data.message,'error')
            }
        })
    }
}
</script>

<style lang="scss" scoped>
    .lqqr{
        min-height: 100vh;
        // width: 100vw;
        background-size:100%;
        background-image: url(/static/vote/dxsbg.png);
        background-color: rgb(76, 174, 255);
        padding:120px 50px 10px 60px;
        .contain{
            background-color: #fff;
            padding:0px 20px 10px 20px;
            border-radius: 30px;
            border: 1px solid #ccc;
            /deep/ .van-cell__title{
                width:auto;
                span{
                    color: rgb(136,136,136);
                }
            }
            /deep/ .van-field__control{
                padding-left: 40px;
            }
            .btnDiv{
                padding:60px 20px 20px 40px;
                /deep/ button{
                    width:100%;
                }
            }
        }
    }
    // /deep/ .van-cell{
    //     margin-top:8px;
    //     margin-bottom:8px;
    // }
</style>
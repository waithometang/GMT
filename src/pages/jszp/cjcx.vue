<template>
    <div class="cjcx">
        <template v-if="showSearch">
            <div class="top">
            <van-form ref="form" @submit="cxData" :scroll-to-error="true">
                    <GmtField v-model="form.xm" required label="姓名"/>
                    <idCardF v-model="form.sfzh" required/>
                    <div class="base">
                        <div class="base-tab width">
                            <div class="public-long-but" @click="checkFn">点击查询</div>
                        </div>
                    </div>
            </van-form>
            </div>
            <template v-if="hasCheck">
                <div class="nodata" v-if="dataCount===0">
                    <div class="img"><img src="/static/zkbm/nodata.png"/></div>
                    <div class="txt">暂时无数据</div>
                </div>
                <div v-else-if="dataCount===1">
                    <detail :data="searchList[0]"/>
                </div>
                <div v-else-if="dataCount===2">
                    <div class="container">
                        <div class="result">
                            查询结果
                        </div>
                        <div class="content" v-for="item in searchList" :key="item.id" @click="()=>showDetail(item)">
                            <div class="title">
                                {{item.ccmc}}
                            </div>
                            <div class="bottom">
                                <div class="left">
                                    <div class="grade">
                                        成绩&nbsp;:&nbsp;{{item.cj}}分
                                    </div>
                                    <div class="date">
                                        {{item.gbrq}}
                                    </div>
                                </div>
                                <div class="right">
                                    <div class="btn">
                                        查看详情 >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </template>
        </template>
        <div class="detail" v-else>
            <detail :data="detailData"/>
            <div class="base">
                <div class="base-tab width">
                    <div class="public-long-but" @click="goback">返回</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import idCardF from "@/components/GmtIdCardField"
import GmtField from "@/components/GmtField"
import detail from "./components/cjcx_detail"

export default {
  components: {
      idCardF,
      GmtField,
      detail
  },
  data() {
      return {
          form:{
              xm:'',
              sfzh: '',
          },
          dataCount:0,
          searchList: [],
          detailData:{},
          showSearch:true,
          hasCheck:false,
      }
  },
  methods: {
      goback(){
          this.showSearch = true
      },
      showDetail(item){
          this.showSearch=false
          this.detailData=item
      },
      checkFn(){
        this.$refs.form.submit()
      },
      cxData(){
          this.$indicator.open('查询中...')
          this.$post('api/zkgl/jgcx',{xm:this.form.xm,sfzh: this.form.sfzh}).then(res => {
              this.$indicator.close()
              if(res.data.success){
                  this.searchList=res.data.content
                  this.hasCheck=true
                  this.dataCount=this.searchList.length
              }else{
                  this.changtoast(res.data.message,'error')
              }
          })
      }
  }
}
</script>

<style lang="scss" scoped>
    .cjcx{
        background:rgba(245,245,245,1);
        min-height:100vh;
        .base{
            padding:0 75px;
            margin-top:20px;
        }
        .top{
            padding-top:20px;
            height: 28vh;
            background-color:#fff;
        }
        .nodata{
            width:100%;
            text-align: center;
            padding-top: 18vh;
            .img{
                width:136px;
                height:136px;
                display: inline-block;
                img{
                    width:100%;
                }
            }
        }
    }

.container {
    margin-top: 14px;
    margin-bottom: 30px;
    padding: 0 30px 20px 30px;
    background-color: #fff;
    .result {
        padding-top: 33px; 
        padding-bottom: 33px;
        font-size:32px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(51,51,51,1);
    }
    .content {
        border:1px solid rgba(229,229,229,1);
        border-radius:10px;
        padding: 0 23px 36px 23px;
        margin-bottom: 30px;
        .title {
            font-size:30px;
            font-family:PingFang SC;
            font-weight:bold;
            color:rgba(51,51,51,1);
            margin-bottom: 41px;
            margin-top: 35px;
        }
        .bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left {
                .grade {
                    font-size:28px;
                    font-family:PingFang SC;
                    font-weight:500;
                    color:rgba(51,51,51,1);
                    margin-bottom: 21px;
                }
                .date{
                    font-size:24px;
                    font-family:PingFang SC;
                    font-weight:400;
                    color:rgba(120,120,120,1);
                }
            }
            .right {
                padding-top: 3.667vw;
                .btn {
                    background:rgba(227,245,255,1);
                    border-radius:4px;
                    font-size:28px;
                    font-family:PingFang SC;
                    font-weight:500;
                    color:rgba(0,153,255,1);
                    padding: 10px 12px 9px 15px;
                }
            }
        }
    }
}
</style>
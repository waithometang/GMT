<template>
    <div class="gwxx">
    <van-row class="header">
        <van-col span="10" :offset="1" class="title">请选择场次</van-col>
        <van-col span="10" :offset="2" align="right" class="tj">合计职位：{{listdata.length}}个</van-col>
    </van-row>
    <div class="gwxx-list">
      <!-- <GmtSearchList url="api/jszp/gwlist" :useSearch="false" :parms="{lx:$route.params.type}" :pageSize="10" ref="gmtlist">
        <template slot="item" slot-scope="listData">
          <div class="gwxx-item-out" :class="{active:selected.id===item.id}" v-for="(item,index) in listData.data" @click="select(item)" :key="index">
           <div class="gwxx-item">
              <div class="gwmc">{{item.gwmc}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.zkrs}}</div>
              <div class="rs">招聘人数：{{item.zkrs}}</div>
              <div class="bzsm">说明：{{item.bz}}</div>
            </div>
            </div>
        </template>
      </GmtSearchList> -->
      <div class="gwxx-item-out" v-for="(item,index) in listdata" @click="select(item)" :key="index">
        <div class="gwxx-item" :class="{active:selected.id===item.id}" >
            <div class="gwmc">{{item.zt}}</div>
            <div class="rs">招聘单位：{{item.zpdw}}</div>
            <div class="rs">招聘时间：{{item.zksj}}</div>
            <van-icon name="arrow" tag="div" class="arrow"/>
        </div>
      </div>
    </div>
    <div class="base-tab">
          <div class="public-long-but" @click="gotoIndex">确定</div>
    </div>
    </div>
</template>
<script>
import GmtSearchList from '@/components/GmtSearchList'
export default {
  computed: {
    bmid() {
      return this.$route.query.bmid;
    }
  },
  data(){
      return {
        zs:0,
        selected:{},
        listdata:[]
      }
  },
  created() {
    this.$indicator.open('加载中...')
    this.$get('api/zkgl/cclist/1').then(res=>{
        this.$indicator.close()
        if(res.data.success){
            this.listdata= res.data.content
        }else{
            this.changtoast(res.data.message,'error')
        }
    })
  },
  methods:{
    gotoIndex(){
        if(!this.selected.id){
            this.$toast.fail('请选择招考场次')
            return
        }
        this.$router.push('xzgw/' + this.selected.id)
    },
    select(item){
        this.selected=item
    }
  }
}
</script>
<style lang="scss" scoped>
$headeHeight: 60px;
$buttonHeight: 80px;
.gwxx{
  background:#F6F6F6;
.header{
    height:$headeHeight;
    .title{
        font-size:32px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:$headeHeight;
    }
    .tj{
        font-size:28px;
        font-family:PingFang SC;
        font-weight:500;
        line-height:$headeHeight;

    }
}
.gwxx-list{
    position:fixed;
    width: 100%;
    background:#F6F6F6;
    top: $headeHeight;
    overflow-y:scroll;
    bottom:$buttonHeight;
    .gwxx-item-out{
        margin: 20px 30px;
        .gwxx-item{
            background-color: white;
            border-radius: 15px;
            padding:10px 20px;
            position: relative;
            .arrow{
                position: absolute;
                width: 30px;
                right: 5px;
                top: 0;
                
            }
            .van-icon-arrow{
                &::before{
                    line-height:22vw;
                }
            }
            .gwmc{
                font-size:30px;
                font-family:PingFang SC;
                font-weight:bold;
                color:rgba(51,51,51,1);
                line-height:80px;
            }
            .rs{
                font-size:28px;
                font-family:PingFang SC;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height:40px;
                padding-bottom: 5px;
            }
            .bzsm{
                font-size:30px;
                font-family:PingFang SC;
                font-weight:400;
                color:rgba(137,137,137,1);
                line-height:40px;
            }
        }
        .active{
           background:#FFF9E5;
        }
    }
}
.base-tab{
    position:fixed;
    width:100%;
    height: $buttonHeight;
    bottom:0px;
}
}
.wrapper{
    background-color: #fff;
    position:fixed;
    top:10vh;
    width:100vw;
    margin: 0 10vw;
}

</style>

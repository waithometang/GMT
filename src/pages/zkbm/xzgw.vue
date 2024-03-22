<template>
    <div class="gwxx">
    <van-row class="header">
        <van-col span="10" :offset="1" class="title">请选择应聘职位</van-col>
        <van-col span="10" :offset="2" align="right" class="tj">合计职位：{{listdata.length}}个</van-col>
    </van-row>
    <div class="gwxx-list">
      <!-- <GmtSearchList url="api/zkgl/gwlist" :useSearch="false" :parms="{lx:$route.params.type}" :pageSize="10" ref="gmtlist">
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
        <div class="gwxx-item" :class="{active:selected.id===item.id}">
            <div class="gwmc">{{item.gwmc}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.dm}}</div>
            <div class="rs">招聘人数：{{item.zkrs}}</div>
            <div class="bzsm">说明：{{item.bz}}</div>
        </div>
      </div>
    </div>
    <div class="base-tab">
          <div class="public-long-but" @click="gotoIndex">确定</div>
    </div>
    <letterread readKey="zkbmwybm" v-model="showLetter" top="30vh" title="招聘村（社区）工作人员<br/>报考承诺书" @confirm="confirmFn">
        <div class="letter_content">
            本人已经认真阅读过招聘公告，所填报的个人信息和提供的资格条件全部属实，并能提供相应的合法证书等书面材料，若有不实之处，本人愿负取消考录资格等后果及承担有关责任。
        </div>
    </letterread>
    </div>
</template>
<script>
import GmtSearchList from '@/components/GmtSearchList'
import letterread from '@/components/LetterRead'
export default {
  components:{
    GmtSearchList,
    letterread
  },
  computed: {
    bmid() {
      return this.$route.query.bmid;
    },
  },
  data(){
      return {
        zs:0,
        selected:{},
        showLetter:false,
        listdata:[]
      }
  },
  created() {
    //   this.$get('api/zkgl/gwtj').then(res=>{
    //       if(res.data.success){
    //           this.zs= res.data.content
    //       }else{
    //           this.changtoast(res.data.message,'error')
    //       }
    //   })
    let that = this
    this.$showSubscribe().then(r=>{
      that.$get('api/zkgl/gwlist/'+this.$route.params.id).then(res=>{
          if(res.data.success){
              that.listdata= res.data.content
          }else{
              that.changtoast(res.data.message,'error')
          }
      })
    })
  },
  methods:{
    gotoIndex(){
        if(!this.selected.id){
            this.$toast.fail('请选择报考岗位')
            return
        }
        if (this.showLetter) {
            this.confirmFn()
        }else{
            this.showLetter=true
        }
    },
    confirmFn(){
        this.$indicator.open('加载中...')
        this.$post('api/zkgl/CheckCcxx',{id:this.selected.zkcc_id,bmid:this.bmid}).then(res => {
            this.$indicator.close()
            if(res.data.success){
                this.$store.state.zkbmData.gwxx=this.selected
                sessionStorage.setItem('zkbmDataGWXX',JSON.stringify(this.selected))
                this.$router.push('/zkbm/txxx' + window.location.search)
            }else{
                this.changtoast(res.data.message,'error')
            }
        })
        
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
<template>
    <div class="gwxx">
    <van-row class="header">
        <van-col span="10" :offset="1" class="title">请选择应聘职位</van-col>
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
            <div class="gwmc">{{item.gwmc}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.dm}}</div>
            <div class="rs">招聘人数：{{item.zkrs}}&nbsp;&nbsp;&nbsp;&nbsp;招考对象：{{item.zkdx}}</div>
        </div>
      </div>
    </div>
    <div class="base-tab">
          <div class="public-long-but" @click="gotoIndex">确定</div>
    </div>
    <van-overlay :show="showLetter">
        <div class="wrapper" @click.stop>
            佛山市高明区中小学教师报考细则
        </div>
    </van-overlay>
    </div>
</template>
<script>
import GmtSearchList from '@/components/GmtSearchList'
import { Overlay } from 'vant';
export default {
  components:{
    GmtSearchList,
    'van-overlay':Overlay
  },
  computed: {
    bmid() {
      return this.$route.query.bmid;
    }
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
    //   this.$get('api/jszp/gwtj').then(res=>{
    //       if(res.data.success){
    //           this.zs= res.data.content
    //       }else{
    //           this.changtoast(res.data.message,'error')
    //       }
    //   })
    let that = this
    this.$showSubscribe().then(r=>{
      that.$get('api/jszp/gwlist').then(res=>{
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
        this.confirmFn()
        // if (this.showLetter) {
        //     this.confirmFn()
        // }else{
        //     this.showLetter=true
        // }
    },
    confirmFn(){
        this.$indicator.open('加载中...')
        this.$post('api/jszp/CheckCcxx',{id:this.selected.zkcc_id,bmid:this.bmid}).then(res => {
            this.$indicator.close()
            if(res.data.success){
                this.$store.state.jszpData.gwxx=this.selected
                console.log(this.selected);
                sessionStorage.setItem('jszpDataGWXX',JSON.stringify(this.selected))
                // this.$router.push({name:'jszpbzxxtxxx'})
                this.$router.push('ydxz' + window.location.search)
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

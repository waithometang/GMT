<template>
  <div class="activity_detail" v-if="listData">
    <div class="hread"  v-if="!sfcy">
      <swiper class="hread-img" :options="swiperOption" v-if="listData">
        <swiper-slide class="hread-img"  v-for="(item,index) in listData.hdtp_urls" :key="index">
          <img :src="item" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="title">{{listData.hdbt}}</div>
    <div v-if="!sfcy" class="activity_detail_active_items">
      <div class="activity_detail_active">
        {{listData.hdzt}}
      </div>
    </div>
    <div class="activity_detail_items items">
      <div class="list">
        <div class="left">已报名{{listData.bmrs}}人/限报名{{listData.zrs}}人</div>
        <div class="right addres"><img src="/static/dingwei.png"/><span>{{listData.sssq}}</span></div>
      </div>
    </div>
    <div v-if="!sfcy" class="activity_detail_active_items">
      <div class="activity_detail_active" v-for="(item,index) in hdlx" :key="index">
        {{item}}
      </div>
    </div>
    <div class="hr"></div>
    <div class="items">
      <div class="list">
        <div class="left">指定身份：</div>
        <div class="right">{{listData.zdsf}}</div>
      </div>
      <div class="list">
        <div class="left">活动地址：</div>
        <div class="right">{{listData.hddz}}</div>
      </div>
      <div class="list">
        <div class="left">活动时间：</div>
        <div class="right">{{listData.hdksrq}} {{listData.hdkssj}} 至 {{listData.hdjsrq}} {{listData.hdjssj}}</div>
      </div>
      <div class="list">
        <div class="left">联系人：</div>
        <div class="right">{{listData.lxr}}</div>
      </div>
      <div class="list">
        <div class="left">联系电话：</div>
        <div class="right">{{listData.lxdh}}</div>
      </div>
    </div>
    <div class="hr"></div>
    <div class="content" v-if="!sfcy">
      <div class="content-title">
        <div></div>活动介绍
      </div>
      <div class="content-text" v-html="listData.hdjs">
      </div>
    </div>
    <div v-else class="items">
      <div class="list">
        <div class="left">姓名：</div>
        <div class="right"><input v-model="datas.xm" placeholder="请输入姓名" type='text' /></div>
      </div>
      <div class="list">
        <div class="left">手机号码：</div>
        <div class="right"><input v-model="datas.lxdh" placeholder="请输入手机号码" type='text' /></div>
      </div>
    </div>
    <div class="base">
      <template v-if="listData.hdzt=='已结束'">
        <div class="but" v-if="sfkypic" @click="gotoPic">上传活动情况(图片)</div>
      </template>
      <div class="but" v-else-if="!sfcy" @click="fill">我要参与</div>
      <div class="but" v-else @click="sumbit">提交报名</div>
    </div>
  </div>
</template>
<script>
import wjutils from "@/js/WjSmrzUtil";
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      },
      listData: "",
      isvideo: false,
      hdlx:[],
      sfcy:false,
      sfkypic: false,
      datas:{
        xm:'',
        lxdh:''
      }
    };
  },
  computed:{
    certToken() {
      return this.$route.query.certToken;
    },
  },
  methods: {
    init() {
      this.$post('api/PartyBuilding/dyhdxx',{id:this.$route.query.id}).then(rps=>{
        if(rps.data.success){
        this.listData=rps.data.content
        this.sfkypic=rps.data.content.sfkypic
        this.hdlx=this.listData.hdlx.split(',')
        this.$indicator.close()
        }else{
          this.$indicator.close()
          this.changtoast(rps.data.message, "error");
        }
      })
    },
    gotoPic(){
      this.$router.push('/PartyActivity_gotoPic?id='+this.$route.query.id)
    },
    fill(){
      this.$indicator.open('数据加载中...')
        this.$post('api/PartyBuilding/dyhdbmCheck').then(rps=>{
          this.$indicator.close()
          if(rps.data.success){
            this.datas.xm = rps.data.content.xm
            if(this.$route.query.r==1){
              this.sfcy=true
            }else if(!rps.data.content.hasWJ){
              wjutils.getWjSmxx(this.certToken, this).then(
                res => {
                  this.sfcy=true
                },
                rej => {
                  this.changtoast(rej, "error");
                }
              );
            }else{  //有网证
              if (rps.data.content.sflb===4 && !rps.data.content.isBddy) {
                this.$dialog
                .confirm({title:"温馨提示",
                          message:"请您先进行党员报到",
                          confirmButtonText:'前往报到',
                          confirmButtonColor:'#2E3092',
                          className:'bigConfirm'
                          }).then(()=>{
                              this.$router.push('/PartyReport_index')
                            })
              }else{
                this.$dialog.confirm({title:"温馨提示",message:"是否使用"+rps.data.content.xm+"的信息登记报名活动?"}).then(()=>{
                  this.sfcy=true
                })
              }
            }
          }else{
            this.changtoast(rps.data.message,'error')
          }
        })
    },
    sumbit(){
      if(!this.datas.xm){
        this.changtoast('姓名不能为空',"error")
        return
      }
      if(!this.datas.lxdh){
        this.changtoast('联系电话不能为空',"error")
        return
      }
      let data = [
        {name: 'phone', data: this.datas.lxdh, msg: '请输入正确的联系电话'},
      ]
      if (this.checkForm (data)) {
        return
      }
      this.datas.id=this.$route.query.id
      this.$indicator.open('提交中...')
      this.$post('api/PartyBuilding/dyhdbm',this.datas).then(rps=>{
        if(rps.data.success){
          this.$indicator.close()
          this.MessageBox({
            content: '报名成功',
            success: function () {
              this.$router.push("/PartyActivity_index")
            },
          })
          // this.changtoast('','success')
          
        }else{
           this.changtoast(rps.data.message,"error")
        }
      })
    }
  },
  created() {
    this.$indicator.open('加载中...')
    this.init();
  }
};
</script>
<style lang="scss" scoped>
@import './style/PartyActivity_detail.scss';
</style>
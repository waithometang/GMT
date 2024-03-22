<!-- 我要预约 -->
<template>
  <div class="needPhono">
    <BetterScroll>
      <template slot="BetterScroll">
        <van-form @submit="onSubmit" label-align="right" label-width="100px">
          <div class="line">基本信息：</div>
          <van-field
            v-model="pageObj.lxdh"
            label="联系方式"
            type="tel"
            :required="true"
            :readonly="readonly"
            maxlength="11"
            placeholder="请输入您的联系方式"
            :rules="[{ required: true, message: '请输入您的联系方式' }]"
          />
          <div class="line">报名人员一：
            <template v-if="canQr">
              <span v-if="pageObj.qrzt1">{{pageObj.qrzt1}}</span>
              <template v-else>
                <van-button size="mini" type="primary" native-type="button" @click="()=>qrClickFn(0,1)">确认</van-button>
                <van-button type="danger" size="mini" native-type="button" @click="()=>qrClickFn(0,0)">放弃</van-button>
              </template>
            </template>
          </div>
          <van-field
            v-model="pageObj.bmxm"
            label="姓名"
            :required="true"
            :readonly="readonly"
            placeholder="请输入您的真实姓名"
            :rules="[{ required: true, message: '请输入您的真实姓名' }]"
          />
          <van-field
            v-model="pageObj.bmxm_sfzh"
            label="身份证号"
            :required="true"
            :readonly="readonly"
            placeholder="请输入您的身份证号"
            :rules="[{ required: true, message: '请输入您的身份证号' }]"
          />
          <div class="line">报名人员二：
          <template v-if="canQr && pageObj.bmxm2">
              <span v-if="pageObj.qrzt2">{{pageObj.qrzt2}}</span>
              <template v-else>
                <van-button size="mini" type="primary" native-type="button" @click="()=>qrClickFn(1,1)">确认</van-button>
                <van-button type="danger" size="mini" native-type="button" @click="()=>qrClickFn(1,0)">放弃</van-button>
              </template>
            </template></div>
          <van-field
            v-model="pageObj.bmxm2"
            label="姓名"
            :required="false"
            :readonly="readonly"
            placeholder="请输入您的真实姓名"
          />
          <van-field
            v-model="pageObj.bmxm2_sfzh"
            label="身份证号"
            :required="false"
            :readonly="readonly"
            placeholder="请输入您的身份证号"
          />
          <!-- <div class="line">报名人员三：
          <template v-if="canQr && pageObj.bmxm3">
              <span v-if="pageObj.qrzt3">{{pageObj.qrzt3}}</span>
              <template v-else>
                <van-button size="mini" type="primary" native-type="button" @click="()=>qrClickFn(2,1)">确认</van-button>
                <van-button type="danger" size="mini" native-type="button" @click="()=>qrClickFn(2,0)">放弃</van-button>
              </template>
            </template></div>
          <van-field
            v-model="pageObj.bmxm3"
            label="姓名"
            :required="false"
            :readonly="readonly"
            placeholder="请输入您的真实姓名"
          />
          <van-field
            v-model="pageObj.bmxm3_sfzh"
            label="身份证号"
            :required="false"
            :readonly="readonly"
            placeholder="请输入您的身份证号"
          /> -->
          <div class="tips">
            &emsp;&emsp;<van-icon name="warning" />&nbsp;注意：每位参加者（包括小孩）都必须填写正确的姓名和身份证号码，没有提交正确身份信息的不得参加活动，活动不接受现场报名，参加活动的小孩建议3周岁以上，老人建议65周岁以下
          </div>
          <div class="appointment-submit">
            <van-button round type="info" size="large" color="rgba(255, 219, 37, 1)" v-if="!hasYY">
              <span>提交预约</span>
            </van-button>
            <van-button round type="info" native-type="button" @click.native="$router.go('-1')" color="rgba(255, 219, 37, 1)" size="large" v-else>
              <span>返回</span>
            </van-button>
          </div>
        </van-form>
      </template>
    </BetterScroll>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import BetterScroll from "@/components/BetterScroll";
import wjutils from "@/js/WjSmrzUtil";

export default {
  props: ["WaChatConfigData"],
  data() {
    return {
      readonly:false,
      canEdit:true,
      pageObj:{
        qrzt1:'',
        qrzt2:'',
        qrzt3:'',
      },
      sfqr:false,
      canQr:false,
    };
  },
  components: {
    BetterScroll,
  },
  computed: {
    hasYY(){
      return this.$route.query.yy
    }
  },
  created () {
    wjutils.gotoSMRZIfNot(this)
    if (this.hasYY) {
      this.readonly=true
      this.getYyxxPost()
    }
  },
  methods: {
    ...mapActions(["getGrxx"]),
    getYyxxPost(){
      this.$indicator.open('加载中...')
      this.$post('api/mlgm/jplxYyxx',{id:this.$route.query.id}).then(res => {
        this.$indicator.close()
        if(res.data.success){
          this.pageObj=res.data.content
          if(this.pageObj.shzt == '已审核' && this.pageObj.yyjg == '通过') this.canQr=true
        }else{
          this.changtoast(res.data.message,'error')
        }
      })
    },
    // 提交举报
    onSubmit() {
      let params = {}
      params.lxdh=this.pageObj.lxdh
      params.bmxm=this.pageObj.bmxm
      params.bmxm_sfzh=this.pageObj.bmxm_sfzh
      params.id=this.$route.query.id
      if (this.pageObj.bmxm2) {
        if (this.pageObj.bmxm2_sfzh) {
          params.bmxm2=this.pageObj.bmxm2
          params.bmxm2_sfzh=this.pageObj.bmxm2_sfzh
        }else{
          this.$toast.fail('请填写报名人员二的身份证号')
          return
        }
      }
      if (this.pageObj.bmxm3) {
        if (this.pageObj.bmxm3_sfzh) {
          params.bmxm3=this.pageObj.bmxm3
          params.bmxm3_sfzh=this.pageObj.bmxm3_sfzh
        }else{
          this.$toast.fail('请填写报名人员三的身份证号')
          return
        }
      }
      this.$indicator.open('提交中...')
      this.$post('api/mlgm/jplxyybm',params).then(res => {
        this.$indicator.close()
        if(res.data.success){
          this.$dialog
            .confirm({
              title: "您的预约已提交成功！",
              message:
                "最终体验名单通过“预约摇号” <br>的方式确定，将以微信推送方式告知您！",
              confirmButtonText: "确定",
              cancelButtonText: "取消",
            })
            .then(() => {
              this.$router.go(-1)
            })
            .catch(() => {});
        }else{
          this.changtoast(res.data.message,'error')
        }
      })
      
    },
    qrClickFn(index,sfqr){
      let tips = sfqr?'是否确认参与活动?':'是否确认放弃参与活动?'
      this.$dialog.confirm({title:"温馨提示",message:tips}).then(res => {
        this.qrPost(index,sfqr)
      })
    },
    qrPost(index,sfqr){
      this.$indicator.open('提交中...')
      this.$post('api/mlgm/jplxYyxxqr',{id:this.$route.query.id,sfqr:!!sfqr, index}).then(res => {
        this.$indicator.close()
        if(res.data.success){
          // this.$toast('提交成功')
          this.getYyxxPost()
        }else{
          this.changtoast(res.data.message,'error')
        }
      })
    },
    _AdultpopupVisible() {
      this.adultpopupVisible = true;
    },
    _ChildpopupVisible() {
      this.childpopupVisible = true;
    },
    _RoutepopupVisible() {
      this.routepopupVisible = true;
    },
    Adultsetopen(item) {
      this.AdultIsAll = item;
      if (item == 1) {
        this.Adultopentitle = "大人1个";
      } else {
        this.Adultopentitle = "大人2个";
      }
      this.adultpopupVisible = false;
    },
    Childsetopen(item) {
      this.ChildIsAll = item;
      if (item == 1) {
        this.Childopentitle = "小孩1个";
      } else if (item == 2) {
        this.Childopentitle = "小孩2个";
      } else {
        this.Childopentitle = "小孩0个";
      }
      this.childpopupVisible = false;
    },
    Routesetopen(item) {
      this.RouteIsAll = item;
      var that = this;
      this.Routecontent.forEach(function (value, key, Routecontent) {
        if (item == value.id) {
          that.Routeopentitle = value.title;
        }
      });
      this.routepopupVisible = false;
    },
  },
};
</script>

<style lang='scss' type="text/css" scoped>
@import "./style/wyyyty.scss";
@import "@/style/components/secondLevelPages/ruralRevitalization/needPhono.scss";
.bigConfirm {
  /deep/ .van-dialog__message {
    text-align: left !important;
    span {
      color: #5dabff;
      cursor: pointer;
    }
  }
}
.sitelist {
  height: auto !important;
}
/deep/ .van-field__label{
  width: auto !important;
}
</style>

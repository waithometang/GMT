<!-- 企业认证 -->
<template>
  <div class="enterpriseCertification" v-if="showContent">
    <BetterScroll>
      <template slot="BetterScroll">
        <div class="from">
          <div class="item">
            <div class="title">企业名称:</div>
            <div class="input">
              <input v-if="state == 1" placeholder="请输入企业名称 (必填)" v-model="name" type="text">
              <input v-else placeholder="请输入企业全称名称" v-model="name" type="text" onfocus="this.blur()">
            </div>
          </div>
          <div class="item">
            <div class="title">企业统一编码:</div>
            <div class="input">
              <input v-if="state == 1" placeholder="请输入企业统一编码 (必填)" v-model="qybm" type="text">
              <input v-else placeholder="请输入地址" v-model="qybm" type="text" onfocus="this.blur()">
            </div>
          </div>
          <div class="item">
            <div class="title">企业邮箱:</div>
            <div class="input">
              <input v-if="state == 1" placeholder="请输入企业公众邮箱 (必填)" v-model="mailbox" type="text">
              <input v-else placeholder="请输入地址" v-model="mailbox" type="text" onfocus="this.blur()">
            </div>
          </div>
          <div class="item">
            <div class="title">企业固定电话:</div>
            <div class="input">
              <input v-if="state == 1" placeholder="请输入企业固定电话 (必填)" v-model="telephone" type="text">
              <input v-else placeholder="请输入地址" v-model="telephone" type="text" onfocus="this.blur()">
            </div>
          </div>
          <div class="item">
            <div class="title">企业地址:</div>
            <div class="input">
              <input v-if="state == 1" placeholder="请输入企业地址 (必填)" v-model="site" type="text">
              <input v-else placeholder="请输入地址" v-model="site" type="text" onfocus="this.blur()">
            </div>
          </div>
          <div class="item">
            <div class="title">所属镇街:</div>
            <div class="input" @click="Setpuop(2)">
              <input placeholder="请输入所属镇街 (必填)" v-model="town" type="text" onfocus="this.blur()">
            </div>
          </div>
          <div class="item">
            <div class="title">联系人:</div>
            <div class="input">
              <input v-if="state == 1" placeholder="请输入联系人 (必填)" v-model="linkman" type="text">
              <input v-else placeholder="请输入联系人" v-model="linkman" type="text" onfocus="this.blur()">
            </div>
          </div>
          <div class="item">
            <div class="title">性别:</div>
            <div class="input" @click="Setpuop(1)">
              <input placeholder="请输入性别 (必填)" v-model="sex" type="text" onfocus="this.blur()">
            </div>
          </div>
          <div class="item">
            <div class="title">手机号码:</div>
            <div class="input">
              <input v-if="state == 1" placeholder="请输入手机号码 (必填)" v-model="phone" type="number">
              <input v-else placeholder="请输入手机号码" v-model="phone" type="text" onfocus="this.blur()">
            </div>
          </div>
          <div class="note">
            <div class="note_name">短信验证:</div>
            <div class="note_input">
              <input type="text" v-model="phoneCode" placeholder="请输入短信验证 (必填)">
            </div>
            <div class="note_but"><span @click="GetphoneCode()" :class="{'static': !(this.phone && codeTime === 0) }">{{codeTime === 0 ? "发送短信" : codeTime + 's重发'}}</span></div>
          </div>
          <div class="item" v-if="rzzt">
            <div class="title">认证状态:</div>
            <div class="input">
              <input placeholder="认证状态" v-model="rzzt" type="text" onfocus="this.blur()">
            </div>
          </div>
        </div>
        <div class="fasong" v-if="state == 1" @click="sbumit">提交认证</div>
      </template>
    </BetterScroll>
    <mt-popup v-model="popupVisible" position="bottom">
      <div class="select-list" v-if="popupState == 1" >
        <div class="list-li" v-for="(item, index) in sexData" :key="index" @click="SetSex(item)">{{item}}</div>
      </div>
      <div class="select-list" v-else>
        <div class="list-li" v-for="(item, index) in townData" :key="index" @click="SetTown(item)">{{item}}</div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { BaiDuORC } from '@/js/BaiDuORC'
import { GetWechatConfig } from "@/api/GetWechatConfig";
import { GetQyrzSq, GetQyrzxx, GetSendCode } from '@/api/secondLevelPage'
import BetterScroll from '@/components/BetterScroll'

export default {
  data () {
    return {
      name: '', // 企业名称
      qybm: '', // 企业编码
      mailbox: '', // 企业邮箱
      telephone: '', // 固定电话
      site: '', // 地址
      town: '', // 所属镇街
      linkman: '', // 联系人
      sex: '', // 性别
      phone: '', // 电话
      phoneCode: '', // 短息验证码
      sexData: ['男', '女'],
      townData: ['荷城街道', '明城镇', '更合镇', '杨和镇', '西江新城', '沧江工业园区'],
      fileId: '',
      WaChatConfigData: '',
      rzzt: '',
      showContent: false,
      popupVisible: false,
      popupState: 1,
      codeTime: 0
    }
  },
  components: {
    BetterScroll
  },
  computed: {
    state () {
      return this.$route.params.state
    },
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    // 显示选择项
    Setpuop (item) {
      this.popupVisible = true
      this.popupState = item
    },
    SetSex (item) {
      this.sex = item
      this.popupVisible = false
    },
    SetTown (item) {
      this.town = item
      this.popupVisible = false
    },
    // 获取微信sdk 初始化参数
    _GetWechatConfig() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      let url = "";
      if (isAndroid) {
        url = location.href;
      }
      if (isIOS) {
        url = location.href.split("#")[0]; //hash后面的部分如果带上ios中config会不对
      }
      GetWechatConfig({
        url: url
      }).then(rps => {
        if (rps.data.success) {
          this.WaChatConfigData = rps.data.content;
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    },
    // 获取短信验证码
    GetphoneCode () {
      if (!this.phone) {
        this.changtoast('请输入手机号码')
        return
      }
      if (this.codeTime > 0){
        return
      }
      this.codeTime = 60
      GetSendCode ({
        mobile: this.phone,
        smsType: 1
      }).then (rps => {
        if (rps.data.success) {
          let dome = setInterval(() => {
            if (this.codeTime > 0) {
              this.codeTime--
              console.log(this.codeTime)
            } else {
              clearInterval(dome)
            }
          }, 1000);
          } else {
            this.codeTime = 0
          this.changtoast(rps.data.message, "error")
        }
      })
    },
    stopcodeTime (item) {

    },
    // 提交认证
    sbumit () {
      if (this.verificationInfo () ) {
        return
      }
      GetQyrzSq ({
        name: this.name,
        Qybm: this.qybm, 
        addr: this.site,
        Mobile: this.phone,
        fileId: this.fileId,
        lxr: this.linkman,
        email: this.mailbox,
        sszj: this.town,
        sex: this.sex,
        tel: this.telephone,
        code: this.phoneCode
      }).then (rps => {
        if (rps.data.success) {
          this.rzzt = '审核中'
          this.changtoast('提交成功，等待审核')
          this.$router.push({
            path: '/submit',
            query: {
              pass: '001'
            }
          })
        } else {
          this.changtoast(rps.data.message, "error");
        }
      })
    },
    // 验证填写信息
    verificationInfo () {
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      var result=/\d{3}-\d{8}|\d{4}-\d{7}/;
      if (!this.name) {
        this.changtoast('企业名称不能为空')
        return true
      }
      if (!this.qybm) {
        this.changtoast('企业统一编码不能为空')
        return
      }
      if (!myreg.test(this.mailbox)) {
        this.changtoast('邮箱格式不正确')
        return true
      }
      if (!result.test(this.telephone)) {
        this.changtoast('0570-xxxxxxx 请按格式填写固定电话')
        return true
      }
      if (!this.site) {
        this.changtoast('企业地址不能为空')
        return true
      }
      if (!this.town) {
        this.changtoast('所属镇街址不能为空')
        return true
      }
      if (!this.linkman) {
        this.changtoast('联系人不能为空')
        return true
      }
      if (!this.linkman) {
        this.changtoast('联系人性别不能为空')
        return true
      }
      if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone))) {
        this.changtoast('手机号码不正确')
        return true
      }
    },
    // _GetQyrzxx 获取认证信息 
    _GetQyrzxx () {
      GetQyrzxx ({
        id: this.id
      }).then (rps => {
        this.showContent = true
        if (rps.data.success) {
          let _data = rps.data.content
          this.phone = _data.mobile, // 电话
          this.linkman = _data.lxr, // 联系人
          this.site = _data.addr, // 地址
          this.name = _data.name, // 企业名称
          this.rzzt = _data.rzzt
          this.sex = _data.sex
          this.telephone = _data.tel
          this.town = _data.sszj
          this.mailbox = _data.email
          this.qybm = _data.qybm
        } else {
          this.changtoast(rps.data.message, "error");
        }
      })
    },
    // 百度识别营业执照
    GetBaiDuORC () {
      BaiDuORC(this.WaChatConfigData, this)
    }
  },
  created () {
    this._GetWechatConfig()
    if (this.state == 2) {
      this._GetQyrzxx()
    } else {
      this.showContent = true
    }
  }
}
</script>

<style lang='scss' scoped type="text/css">
@import '@/style/pages/secondLevelPages/PersonalCenter/enterpriseCertification.scss';
</style>

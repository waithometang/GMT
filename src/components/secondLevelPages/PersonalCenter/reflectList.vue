<template>
  <div class="reflectList" v-if="showContent">
    <dir class="reflectList-content">
    <BetterScroll>
      <template slot="BetterScroll">
        <div class="textImages">
          <div class="text-content">
            <textarea  v-model="content" placeholder="请输入您反映的诉求..."></textarea>
          </div>
          <div class="quantity">{{content.length}}/200</div>
          <div class="toast">上传照片/文件</div>
          <div class="images">
            <div class="images-list">
              <div class="list-li" v-for="(item, index) in UploadPicturesSrc" :key="index" @click="remove(item)">
                <img :src="item.src" alt="" />
              </div>
              <div class="list-li" @click="UploadPictures" v-if="UploadPicturesSrc.length < 9">
                <img src="/images/add.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="listFoem">
          <div class="item">
            <div class="title">企业名称:</div>
            <div class="input number">
              <input  v-model="name" placeholder="企业名称 (必填)" type="text">
            </div>
          </div>
          <div class="item" v-if="false">
            <div class="title">企业统一编码:</div>
            <div class="input">
              <input  v-model="qybm" placeholder="企业统一编码 (必填)" type="text">
            </div>
          </div>
          <div class="item" v-if="false">
            <div class="title">企业邮箱:</div>
            <div class="input">
              <input  v-model="mailbox" placeholder="企业邮箱 (必填)" type="text">
            </div>
          </div>
          <div class="item">
            <div class="title">企业固定电话:</div>
            <div class="input">
              <input  v-model="telephone" placeholder="固定电话 (选填)" type="text">
            </div>
          </div>
          <div class="item" v-if="false">
            <div class="title">企业地址:</div>
            <div class="input">
              <input  v-model="site" placeholder="企业地址 (必填)" type="text">
            </div>
          </div>
          <div class="item">
            <div class="title">所属镇街:</div>
            <div class="input" @click="Setpuop(2)">
              <input   v-model="town" placeholder="企业所属镇街 (必填)" type="text" readonly="readonly">
            </div>
          </div>
          <div class="item">
            <div class="title">联系人:</div>
            <div class="input">
              <input  v-model="linkman" placeholder="联系人 (必填)" type="text">
            </div>
          </div>
          <div class="item">
            <div class="title">性别:</div>
            <div class="input" @click="Setpuop(1)">
              <input   v-model="sex" placeholder="联系人性别 (选填)" type="text" readonly="readonly">
            </div>
          </div>
          <div class="item">
            <div class="title">手机号码:</div>
            <div class="input">
              <input  v-model="phone" placeholder="手机号码 (必填)" type="Number">
            </div>
          </div>
          <div class="note">
            <div class="note_name">短信验证码:</div>
            <div class="note_input">
              <input type="text"  v-model="phoneCode" placeholder="请输入验证码">
            </div>
            <div class="note_but"><span @click="GetphoneCode()" :class="{'static': !(this.phone && codeTime === 0) }">{{codeTime === 0 ? "获取验证码" : codeTime + 's重发'}}</span></div>
          </div>
        </div>
        <div class="tab" @click="submit">
          发送诉求反映
        </div>
      </template>
    </BetterScroll>
    </dir>
    <mt-popup  v-model="popupVisible"  position="bottom">
      <div class="sitelist" v-if="popupType == 1">
        <div class="list" v-for="(item, index) in listData" :key="index" @click="Set_address(item)">
          <div class="site_name">{{item.title}}</div>
          <div class="site_location">{{item.address}}</div>
        </div>
      </div>
      <div class="sitelist" v-if="popupType == 2">
        <div class="list">
          <div class="site_name" @click="Setopen(true)">公开</div>
        </div>
        <div class="list">
          <div class="site_name" @click="Setopen(false)">保密</div>
        </div>
      </div>
    </mt-popup>
    <mt-popup v-model="popupVisible_tab" position="bottom">
      <div class="select-list" v-if="popupState == 1" >
        <div class="list-li" v-for="(item, index) in sexData" :key="index" @click="SetSex(item)">{{item}}</div>
      </div>
      <div class="select-list" v-if="popupState == 2">
        <div class="list-li" v-for="(item, index) in townData" :key="index" @click="SetTown(item)">{{item}}</div>
      </div>
      <div class="select-list" v-if="popupState == 3">
        <div class="list-li" v-for="(item, index) in YrzListData" :key="index" @click="Setqy(item)">{{item.name}}</div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import BetterScroll from '@/components/BetterScroll'
import { WaChatUploadPictures } from "@/js/WaChatUploadPictures";
import { DelUpload } from "@/api/WaChatApi";
import { WeChatGetLocation } from "@/js/WeChatGetLocation";
import { GetQyfy, GetQyYrzList, GetSendCode } from  '@/api/secondLevelPage'

export default {
props: ["WaChatConfigData"],
  data () {
    return {
      name: '', // 企业名称
      qybm: '', // 企业统一编码
      mailbox: '', // 企业邮箱
      telephone: '', // 固定电话
      site: '', // 地址
      town: '', // 所属镇街
      linkman: '', // 联系人
      sex: '', // 性别
      phone: '', // 电话
      phoneCode: '', // 短信验证码
      content: '', //内容
      address: '',
      popupVisible: false,
      listData: [],
      popupType: 0,
      sexData: ['男', '女'],
      townData: ['荷城街道', '明城镇', '更合镇', '杨和镇', '西江产业新城'],
      popupVisible_tab: false,
      popupState: 1,
      YrzListData: [],
      showContent: true,
      codeTime: 0
    }
  },
  components: {
    BetterScroll
  },
  computed: {
    UploadPicturesSrc() {
      return this.$store.state.UploadPicturesSrc;
    },
    WaChetLatitude() {
      return this.$store.state.WaChetLatitude;
    },
    WaChetLongitude() {
      return this.$store.state.WaChetLongitude;
    },
    UploadPicturesId() {
      return this.$store.state.MainIdData;
    },
  },
  watch: {
    content () {
      if (this.content.length > 200) {
        this.content = this.content.substring(0, 200);
      }
    }
  },
  methods: {
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
        smsType: 2
      }).then (rps => {
        if (rps.data.success) {
          let dome = setInterval(() => {
            if (this.codeTime > 0) {
              this.codeTime--
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
    // 提交反映
    submit () {
      if (this.verificationInfo()) {
        return
      }
      let that = this
      this.MessageBox ({
        content: '是否确认发送诉求反映，发送后内容则不可修改',
        success: function () {
          that._GetQyfy()
        },
        failStata: true
      })
    },
    // 已认证企业列表
    _GetQyYrzList () {
      GetQyYrzList({}).then(rps => {
        if (rps.data.success) {
          this.YrzListData = rps.data.content
          if (rps.data.content.length > 0) {
            let _data = rps.data.content[0]
            this.name = _data.name
            this.mailbox = _data.email
            this.telephone = _data.tel
            this.site = _data.addr
            this.town = _data.sszj
            this.linkman = _data.lxr
            this.sex = _data.sex
            this.phone = _data.mobile
            this.qybm = _data.qybm
          }
        } else {
          this.changtoast(rps.data.message, "error");
        }
      })
    },
    _GetQyfy () {
      this.$indicator.open('正在提交数据，请稍等...')
      GetQyfy ({
        name:  this.name,
        tel:  this.telephone,
        sszj: this.town,
        lxr:  this.linkman,
        sex:  this.sex,
        mobile:  this.phone,
        code: this.phoneCode,
        content: this.content,
        mainId: this.UploadPicturesId,
      }).then (rps => {
        this.$indicator.close()
        if (rps.data.success) {
          this.$emit('GetTab', 1)
          this.changtoast('提交成功');
          this.$store.commit("SetUploadPicturesSrc", ""); // 清空记录的图片路径
          this.$store.commit("SetMainIdData", ""); // 清空记录的图片id
          this.$store.commit('Set_TopTagState', 1)
        } else {
          this.MessageBox ({
            content: rps.data.message,
            success: function () {},
            failStata: false
          })
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
      if (!this.town) {
        this.changtoast('所属镇街址不能为空')
        return true
      }
      if (!this.linkman) {
        this.changtoast('联系人不能为空')
        return true
      }
      if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone))) {
        this.changtoast('手机号码不正确')
        return true
      }
      if (!this.phoneCode) {
        this.changtoast('请输入短信验证码')
        return true
      }
      if (!this.content) {
        this.changtoast('请简要描述反映事件')
        return true
      }
    },
    SetSex (item) {
      this.sex = item
      this.popupVisible_tab = false
    },
    SetTown (item) {
      this.town = item
      this.popupVisible_tab = false
    },
    Setqy (item) {
      this.popupVisible_tab = false
      let _data = item
      this.name = _data.name // 企业名称
      this.mailbox = _data.email // 企业邮箱
      this.telephone = _data.tel // 固定电话
      this.site = _data.addr // 地址
      this.town = _data.sszj // 所属镇街
      this.linkman = _data.lxr // 联系人
      this.sex = _data.sex // 性别
      this.phone = _data.mobile // 电话
    },
    // 显示选择项
    Setpuop (item) {
      this.popupVisible_tab = true
      this.popupState = item
    },
    // 选取图片 9张
    UploadPictures() {
      let amount = 9 - this.UploadPicturesSrc.length
      WaChatUploadPictures(this.WaChatConfigData, amount);
    },
    // 删除图片
    remove(item) {
      DelUpload({
        id: item.id
      }).then(rps => {
        if (rps.data.success) {
          this.changtoast("删除成功");
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
      let newUploadPicturesSrc = this.UploadPicturesSrc.filter(rps => {
        return rps.id != item.id;
      });
      this.$store.commit("SetUploadPicturesSrc", newUploadPicturesSrc);
    },
    _popupVisible (item) {
      this.popupType = item
      if (this.siteError && this.popupType == 1) { // 定位失败重新定位
        WeChatGetLocation(this.WaChatConfigData, this)
        return
      }
      this.popupVisible = true
    },
    // 重新获取位置
    shuaxin () {
      WeChatGetLocation(this.WaChatConfigData, this)
    },
    Set_address (item) {
      this.address = item.title,
      this.popupVisible = false
    },
  }
}
</script>

<style lang='scss' scoped type="text/css">
@import '@/style/components/secondLevelPages/PersonalCenter/reflectList.scss';
</style>

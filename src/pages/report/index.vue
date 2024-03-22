<template>
  <div class="report">
    <div class="head"><img src="/static/report/banner1.png" alt=""></div>
    <div class="title">请放心填写，我们承诺对您的信息保密。</div>
    <div class="report-content">
      <div class="input-tab">
        <div class="tab-name">姓名</div>
        <div class="tab-hint">请填写您的姓名(选填）</div>
        <div class="tab-inp"><input type="text" v-model="name"></div>
      </div>
      <div class="input-tab">
        <div class="tab-name">手机号码</div>
        <div class="tab-hint">必须为有效联系手机号码,以方便联系核实情况(必填)</div>
        <div class="tab-inp"><input type="Number" v-model="phone"></div>
      </div>
      <div class="input-tab">
        <div class="tab-name">违法行为类型</div>
        <div class="tab-hint">当前投诉的行为属于以下违法行为类型(多选)</div>
        <div class="select-list">
          <div class="select-tab" v-for="(item, index) in selectData" :key="index" @click="selectTab(item)">
            <div class="select-icon"><div class="select-icon-mini" v-if="getStart(item.id) >= 0"></div></div>
            <div class="select-name">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="input-tab">
        <div class="tab-name">举报内容</div>
        <div class="tab-hint">简要描述违法行为的基本事实,尽可能提供有效线索或证据(必填)</div>
        <div class="tab-inp"><textarea v-model="content"></textarea></div>
      </div>
      <div class="input-tab">
        <div class="tab-name">图片上传</div>
        <div class="tab-hint">上传所掌握违法现场或违法行为的照片(支持jpg,png,gif,bmp,psd,tiff等图片格式,必填)</div>
        <ul class="images-list">
          <li class="images-tab" v-for="(item, index) in UploadPicturesSrc" :key="index">
            <img :src="item.src" alt="">
            <div class="delect" @click="remove(item)"></div>
          </li>
          <li class="images-tab" @click="selectImage" v-if="UploadPicturesSrc.length < 9">
            <img src="/images/add.png" alt="">
          </li>
          <div style="clear:both;"></div>
        </ul>
      </div>
      <div class="site-tab" @click="SetTxMap">
        <div class="site-icon"><img src="/static/report/dw.png" alt=""></div>
        <div class="site-name">{{address ? address : '正在获取位置'}}</div>
        <div class="site-image"><img src="/static/report/jt.png" alt=""></div>
      </div>
    </div>
    <div class="base-but"><div class="but" @click="submit">提交</div></div>
    <mt-popup  v-model="popupVisible"  position="bottom">
      <TxMap @setTxMAP="getTxMAP" v-if="popupVisible"/>
    </mt-popup>
  </div>
</template>

<script>
import TxMap from '@/components/secondLevelPages/ruralRevitalization/TxMap'
import { WeChatGetLocation } from "@/js/WeChatGetLocation";
import { WaChatUploadPictures } from "@/js/WaChatUploadPictures";
import { GetWechatConfig } from "@/api/GetWechatConfig"
import { gyjb } from '@/api/secondLevelPage'
import { DelUpload } from "@/api/WaChatApi";

export default {
  data () {
    return {
      selectData: [{name:'生态环境和资源保护', id:1}, {name:'食品药品安全', id:2}, {name:'国有财产保护', id:3}, {name:'国有土地出让使用', id:4}, {name:'侵害英烈名誉', id:5}, {name:'其他', id:6}],
      selectStart: [],
      name: '',
      phone: '',
      content: '',
      popupVisible: false,
      listData: "",
      address: '',
      WaChatConfigData: ''
    }
  },
  components: {
    TxMap
  },
  computed: {
    UploadPicturesSrc() {
      return this.$store.state.UploadPicturesSrc;
    },
    UploadPicturesId() {
      return this.$store.state.MainIdData;
    },
     WaChetLatitude() {
      return this.$store.state.WaChetLatitude;
    },
    WaChetLongitude() {
      return this.$store.state.WaChetLongitude;
    }
  },
  created () {
    this._GetWechatConfig()
  },
  methods: {
    selectTab (item) {
      console.log(item)
      if (this.selectStart.indexOf(item.id) >= 0) {
        this.selectStart = this.selectStart.filter(val => {
          return val != item.id
        })
      } else {
        this.selectStart.push(item.id)
      }
    },
    getStart (item) {
      return this.selectStart.indexOf(item)
    },
    // 获取微信sdk 初始化参数
    _GetWechatConfig() {
      let url = location.href
      GetWechatConfig({
        url: url
      }).then(rps => {
        if (rps.data.success) {
          this.WaChatConfigData = rps.data.content
          this.getStie()
        } else {
          this.changtoast(rps.data.message, "error")
        }
      });
    },
    getStie () {
      WeChatGetLocation(this.WaChatConfigData, this);
    },
    selectImage () {
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
    SetTxMap () {
      this.popupVisible = true
    },
    getTxMAP (item) {
      this.address = item.poiname
      this.popupVisible = false
    },
    submit () {
      if(!(/^1[3456789]\d{9}$/.test(this.phone))) {
        this.changtoast('请输入电话号码', 'warning')
        return
      }
      if (this.selectStart.length <= 0) {
        this.changtoast('请选择违法类型', 'warning')
        return
      }
      if (!this.content) {
        this.changtoast('请输入举报内容', 'warning')
        return
      }
      if (!this.UploadPicturesId) {
        this.changtoast('请上传图片', 'warning')
        return
      }
      gyjb({
        xm: this.name,
        tel: this.phone,
        wfxw: this.selectStart,
        jbnr: this.content,
        pics: this.UploadPicturesId,
        addr: this.address,
        lat: this.WaChetLatitude,
        lng: this.WaChetLongitude,
      }).then (rps => {
        if (rps.data.success) {
          this.$store.commit("SetUploadPicturesSrc", ""); // 清空记录的图片路径
          this.$store.commit("SetMainIdData", ""); // 清空记录的图片id
          this.$router.push('/gyjbjg/true')
        } else {
          this.changtoast(rps.data.message, 'error')
          this.$router.push('/gyjbjg/false')
        }
      })
    },
  }
}
</script>

<style lang='scss' scoped>
@import './style/index.scss';
</style>
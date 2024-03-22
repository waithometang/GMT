<template>
  <div class="personalPublished">
    <div class="select">
      <div class="tost">请选择发布类型</div>
      <div class="select-tab">
        <div class="tab-option">
          <GmtOption :listData="options" @SetselectTag="SetTagState" v-if="options.length > 0"></GmtOption>
        </div>
      </div>
    </div>
    <div class="title">
      <GmtInput :modelData="modelData" @WatchInputModel="setTitle"></GmtInput>
    </div>
    <div class="content">
      <textarea placeholder="请输入内容 (可不填)" ref="textarea" v-model="content"></textarea>
    </div>
    <div class="number">{{content.length}}/200</div>
    <div class="images-list">
      <div class="list-tab" v-for="(item, index) in UploadPicturesSrc" :key="index" @click="remove(item)">
        <img :src="item.src" alt="">
      </div>
      <div class="list-tab" @click="UploadPictures" v-if="UploadPicturesSrc.length < 9">
        <img src="/images/add.png" alt="">
      </div>
    </div>
    <div class="but" @click="submitData">提交发布</div>
  </div>
</template>

<script>
import GmtInput from '@/components/GmtInput'
import GmtOption from "@/components/GmtOption";
import { WaChatUploadPictures } from "@/js/WaChatUploadPictures";
import { GetWechatConfig } from "@/api/GetWechatConfig";
import { DelUpload } from "@/api/WaChatApi";
import { GetGrfb, GetWdfb } from "@/api/secondLevelPage"
import {mapActions} from "vuex"
import { storage } from "@/js/until";

export default {
  components: {
    GmtInput,
    GmtOption
  },
  data () {
    return {
      modelData: {type: 'text', placeholder: '请输入标题 (必填)'},
      content: '',
      title: '',
      WaChatConfigData: '',
      options: [],
      lx: ''
    }
  },
  watch: {
    content () {
      if (this.content.length > 200) {
        this.content = this.content.substring(0, 200);
      }
    }
  },
  computed: {
    // 获取选中的图片路径
    UploadPicturesSrc() {
      return this.$store.state.UploadPicturesSrc;
    },
    // 上传的图片id
    UploadPicturesId() {
      return this.$store.state.MainIdData;
    },
    villageId () {
      let userInfo = storage.fetch("longData").data
      let vid = this.$route.params.vid
      if (vid) {
        return vid
      } else {
        return userInfo.id
      }
    },
  },
  methods: {
    ...mapActions(['GetuserInfo']),
    SetTagState (item) {
      this.lx = item.type
    },
    // 返回输入框的值
    setTitle (item) {
      this.title = item
    },
    // 发布数据
    submitData () {
      if (!this.lx) {
        this.changtoast ('请选择在发布类型', 'warning')
        return
      }
      if (!this.title) {
        this.changtoast ('请填写标题', 'warning')
        return
      }
      this.$indicator.open('正在提交数据，请稍等...')
      GetGrfb ({
        VillageId: this.villageId,
        lx: this.lx,
        img_mainId :this.UploadPicturesId,
        Title: this.title,
        Content: this.content,
      }).then (rps => {
        this.$indicator.close()
          if (rps.data.success) {
          this.$store.commit("SetUploadPicturesSrc", ""); // 清空记录的图片路径
          this.$store.commit("SetMainIdData", ""); // 清空记录的图片id
          this.$emit('changTabStateData', 0)
        } else {
          this.changtoast(rps.data.message, "error");
          this.GetuserInfo('post')
        }
      })
    },
    // 选取照片 最多九张
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
    // 判断发布权限
    jurisdiction () {
      this.options = [{name: '两委工作', type: 1}, {name: '直联日志', type: 2}, {name: '党员实事', type: 3}]
      this.GetuserInfo ().then(Grxx => {
        if (!Grxx.lwfb) {
          this.options = this.options.filter(function (item) {
            return item.type != 1
          })
        }
        if (!Grxx.dyfb) {
          this.options = this.options.filter(function (item) {
            return item.type != 3
          })
        }
        if (!Grxx.zlfb) {
          this.options = this.options.filter(function (item) {
            return item.type != 2
          })
        }
        this.lx = this.options[0].type
      })
    }
  },
  created () {
    this._GetWechatConfig()
    this.jurisdiction()
  }
}
</script>

<style lang='scss' scoped type="text/css">
.personalPublished /deep/ .el-input__inner {
	height: auto !important;
	padding: 10px 10px !important;
	line-height: 0;
}
@import '@/style/pages/secondLevelPages/personalCenter/personalPublished.scss';
</style>

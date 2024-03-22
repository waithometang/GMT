<template>
  <div class="personalPublished" v-if="showPages">
    <div class="title">
      <GmtInput :modelData="modelData" @WatchInputModel="setTitle"></GmtInput>
    </div>
    <div class="content">
      <textarea  placeholder="请输入内容 (可不填)" ref="textarea" v-model="content"></textarea>
    </div>
    <div class="number">{{content.length}}/200</div>
    <div class="images-list">
      <div class="list-tab" v-for="(item, index) in UploadPicturesSrc" :key="index" @click="remove(item)">
        <img :src="item.src || item.url" alt="">
      </div>
      <div class="list-tab" @click="UploadPictures" v-if="UploadPicturesSrc.length < 9">
        <img src="/images/add.png" alt="">
      </div>
    </div>
    <div class="but" @click="submitData">修改发布</div>
    <div class="but remove" @click="_DelGrfb()">删除发布</div>
  </div>
</template>

<script>
import GmtInput from '@/components/GmtInput'
import { WaChatUploadPictures } from "@/js/WaChatUploadPictures";
import { GetWechatConfig } from "@/api/GetWechatConfig";
import { DelUpload } from "@/api/WaChatApi";
import { GetGrfb, GetWdfb, Grfbxx, EditGrfb, DelGrfb } from "@/api/secondLevelPage"
import {mapActions} from "vuex"
import { storage } from "@/js/until";

export default {
  components: {
    GmtInput,
  },
  data () {
    return {
      modelData: {type: 'text', placeholder: '请输入标题 (必填)', vaule: ''},
      content: '',
      title: '',
      WaChatConfigData: '',
      options: [],
      lx: '',
      showPages: false
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
      console.log(this.$store.state.UploadPicturesSrc)
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
    mkid () {
      return this.$route.params.mkid
    },
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    ...mapActions(['GetuserInfo']),
    // 返回输入框的值
    setTitle (item) {
      this.title = item
    },
    // 发布数据
    submitData () {
      if (!this.title) {
        this.changtoast ('请填写标题', 'warning')
        return
      }
      this.$indicator.open('正在提交数据，请稍等...')
      EditGrfb ({
        mkid: this.mkid,
        id: this.id,
        img_mainId: this.UploadPicturesId,
        Title: this.title,
        Content: this.content
      }).then (rps => {
        this.$indicator.close()
          if (rps.data.success) {

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
          let newUploadPicturesSrc = this.UploadPicturesSrc.filter(rps => {
            return rps.id != item.id;
          });
          this.$store.commit("SetUploadPicturesSrc", newUploadPicturesSrc);
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
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
    // 修改发布
    GetGrfbxx () {
      Grfbxx({
        mkid: this.mkid,
        id: this.id
      }).then(rps => {
        if (rps.data.success) {
          this.showPages = true
          this.modelData.vaule = rps.data.content.title
          this.title = rps.data.content.title
          this.content = rps.data.content.content
          this.$store.commit("SetUploadPicturesSrc", rps.data.content.img_urls);
          this.$store.commit("SetMainIdData", rps.data.content.img_mainId);
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    // 删除发布
    _DelGrfb () {
      DelGrfb({
        id: this.id,
        mkid: this.mkid
      }).then(rps => {
        if (rps.data.success) {
          this.changtoast("删除成功");
          this.$router.go(-1)
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  },
  created () {
    this._GetWechatConfig()
    this.GetGrfbxx()
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

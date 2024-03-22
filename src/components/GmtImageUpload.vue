<template>
  <div class="tpsc">
    <div class="tjtp" v-for="(item, index) in UploadPicturesSrc" :key="index">
      <div class="imgs" @click="loveImages(readonly, item, UploadPicturesSrc)">
        <img class="imgs" :src="readonly ? item : item.src" />
      </div>
      <div class="cloes" v-if="!readonly" @click="remove_imges(item, index)">
        <img src="/static/img_close.png" />
      </div>
    </div>
    <div
      class="tjtp"
      @click="waChatUploadImage"
      v-if="!readonly && UploadPicturesSrc.length < amount"
    >
      <img class="imgs" src="/static/FNT_IMAGES/add.png" />
    </div>
  </div>
</template>

<script>
import { WaChatUploadPictures } from "@/js/WaChatUploadImages";
import { WcChatPreviewImage } from "@/js/WeChatpreviewImage"
import { DelUpload } from "@/api/WaChatApi";
export default {
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    configData: {
      type: Object
    },
    value: {
      type: String,
      default: ''
    },
    onlyOne: { //只有一张图片
      type: Boolean,
      default: false
    },
    showExists: {
      type: Boolean,
      default: false
    },
    amount: {
      type: Number,
      default: 9
    },
    // 是否只能选择相册图片
    onlyAlbum: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      UploadPicturesSrc: []
    };
  },
  mounted () {
    if (this.value) {
      if (this.showExists) {
        this.$post('api/system/GetFileUrl', { name: this.value }).then(res => {
          if (res.data.success) {
            this.initPicData(res.data.content)
          } else {
            this.changtoast(res.data.message, 'error')
          }
        })
      } else if (this.onlyOne) {
        this.UploadPicturesSrc = [{ src: this.value }]
      }
    }
  },
  methods: {
    initPicData (uploadSrc) {
      this.UploadPicturesSrc = uploadSrc;
    },
    waChatUploadImage () {
      let amount = this.onlyOne ? 1 : (this.amount - this.UploadPicturesSrc.length)
      let mainId = this.onlyOne ? "" : this.value
      WaChatUploadPictures(this.configData, mainId, amount, this.onlyAlbum).then(res => {
        if (res.errCode === 446) this.UploadPicturesSrc = []
        if (this.onlyOne) {
          this.$emit('input', res.urlData[0].src)
        } else {
          this.$emit('input', res.mainId)
        }
        this.UploadPicturesSrc.push(...res.urlData)
      }, errorCode => {
        if (errorCode == 10) {
          this.$dialog.alert({
            title: "温馨提示",
            message: "配置环境失败,请刷新后再试"
          })
        }
      })
    },
    remove_imges (item, index) {
      if (this.readonly) return;
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "是否确认删除该图片?"
        })
        .then(() => {
          DelUpload({
            id: item.id
          }).then(rps => {
            if (rps.data.success || rps.data.message == '文件记录不存在') {
              this.UploadPicturesSrc.splice(index, 1);
              this.changtoast("删除成功");
            } else {
              this.changtoast(rps.data.message, "error");
            }
          });
        });
    },
    // 预览
    loveImages (readonly, item, data) {
      var image = ''
      var imageData = []
      if (readonly) {
        image = item
        imageData = imageData.push(item)
      } else {
        image = item.src
        data.forEach(img => {
          imageData.push(img.src)
        });
      }
      let url = `${window.location.protocol}//${window.location.host}${image}`
      let datas = []
      for (let index = 0; index < imageData.length; index++) {
        const element = imageData[index]
        let str = `${window.location.protocol}//${window.location.host}${element}`
        datas.push(str)
      }
      WcChatPreviewImage(url, datas)
    },
  }
};
</script>

<style lang="scss" scoped>
.tpsc {
  display: flex;
  flex-wrap: wrap;
  .tjtp {
    width: 190px;
    height: 190px;
    background: #cccccc;
    text-align: center;
    margin: 10px 36px 10px 0;
    position: relative;
    border-radius: 10px;
    .imgs {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
    .add {
      width: 50px;
      height: 50px;
      margin-top: 20px;
    }
    p {
      font-size: 30px;
      color: #ffffff;
      margin: 0;
    }
    span {
      font-size: 20px;
      color: #ffffff;
    }
    .cloes {
      width: 44px;
      height: 44px;
      position: absolute;
      top: -22px;
      right: -22px;
      z-index: 999;
      img {
        widows: 100%;
        height: 100%;
      }
    }
  }
}
</style>
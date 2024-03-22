<template>
  <div class="publicUploadPictures">
    <div class="upload-pictures-title" v-if="title">
      <span v-if="isNeed">*</span>
      {{ title }}
    </div>
    <div class="upload-pictures-title" v-if="name">{{ name }}</div>
    <ul class="upload-pictures-list">
      <li v-for="(item, index) in picturesList" :key="index">
        <div class="images">
          <img :src="readonly ? item : item.src" alt />
        </div>
        <i class="min-icon" v-if="!readonly" @click="delects(item)"></i>
      </li>
      <li
        @click="uploadPictures"
        v-if="!readonly && picturesList.length < amount"
      >
        <i class="icon"></i>
      </li>
      <div style="clear: both"></div>
    </ul>
  </div>
</template>

<script>
import { WaChatUploadPictures } from "@/js/WaChatUploadImages";
import { DelUpload } from "@/api/WaChatApi";
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    configData: {
      type: Object
    },
    state: {
      type: Number,
      default: ""
    },
    readonly: {
      //是否只读
      type: Boolean,
      default: false
    },
    loaclData: {
      //读取本地数据
      type: Boolean,
      default: true
    },
    isNeed: {
      //是否必填
      type: Boolean,
      default: false
    },
    ImagesKey: {
      type: String,
      default: 'ImagesKey'
    },
    amount: {
      type: Number,
      default: 9
    }
  },
  data () {
    return {
      mainId: "",
      picturesList: []
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.getStorageImage();
    });
  },
  methods: {
    uploadPictures () {
      if (this.readonly) {
        return;
      }
      let amount = this.amount - this.picturesList.length
      WaChatUploadPictures(this.configData, this.mainId, amount, true).then(val => {
        this.mainId = val.mainId;
        if (val.errCode === 446) {
          this.picturesList = val.urlData;
        } else {
          this.picturesList = this.picturesList.concat(val.urlData);
          val.urlData = this.picturesList
        }
        // this.$emit('input', this.mainId)
        this.setStorageImage(val);
      });
    },
    setPictures (list, id) {
      this.picturesList = list;
      this.mainId = id;
    },
    getMainId () {
      if (window.location.host === 'localhost:8080') return { mainId: 'ta20062905411258', number: 1 } //测试数据
      let data = { mainId: this.mainId, number: this.picturesList.length };
      return data;
    },
    delects (item) {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "是否确定删除图片?"
        })
        .then(() => {
          DelUpload({
            id: item.id
          }).then(res => {
            if (res.data.success || res.data.message === "文件记录不存在") {
              this.changtoast("删除成功");
              this.picturesList = this.picturesList.filter(el => {
                return el.id != item.id;
              });
              this.setStorageImage({
                mainId: this.mainId,
                urlData: this.picturesList
              });
            } else {
              this.changtoast(res.data.message);
            }
          });
        })
        .catch(() => { });
    },
    setStorageImage (val) {
      if (!this.loaclData) {
        return;
      }
      this.setImages(`${this.ImagesKey}${this.state}`, val);
    },
    removeStorageImage () {
      localStorage.removeItem(`${this.ImagesKey}${this.state}`);
    },
    setImages (key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    },
    getImages (key) {
      let data = localStorage.getItem(key);
      return JSON.parse(data);
    },
    getStorageImage () {
      if (!this.loaclData) {
        return;
      }
      let val = this.getImages(`${this.ImagesKey}${this.state}`);
      if (val) {
        this.mainId = val.mainId;
        this.picturesList = this.picturesList.concat(val.urlData);
        this.$emit("input", this.mainId);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.publicUploadPictures {
  background: #ffffff;
  margin-top: 30px;
  .upload-pictures-title {
    text-align: left;
    font-size: 28px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    span {
      color: red;
    }
  }
  .upload-pictures-list {
    margin-top: 41px;
    li {
      position: relative;
      margin-bottom: 10px;
      float: left;
      width: 230px;
      // display: flex;
      // align-items: center;
      // justify-content: center;
      .icon {
        display: flex;
        width: 171px;
        height: 171px;
        margin: 0 auto;
        background: url('/static/ybmimages/加.png') no-repeat;
        background-size: 100% 100%;
      }
      .images {
        width: 171px;
        height: 171px;
        // margin-top: 0 auto;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .state {
        margin-top: 10px;
        font-size: 30px;
        font-weight: bold;
        text-align: left;
        color: rgba(16, 16, 16, 1);
      }
      .min-icon {
        display: inline-block;
        position: absolute;
        width: 44px;
        height: 44px;
        top: -22px;
        right: 12px;
        background: url('/static/ybmimages/x.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
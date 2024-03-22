<!-- 我的反馈 -->
<template>
  <div class="myFeedback">
    <GmtInput  :modelData="nameModelData" @WatchInputModel="SetName"></GmtInput>
    <GmtInput  :modelData="phoneModelData" @WatchInputModel="SetPhone"></GmtInput>
    <div class="feedback-content">
      <div class="content-title">
        <textarea  placeholder="请简要描述您使用过程中遇到的问题" v-model="content"></textarea>
      </div>
      <div class="content-number">
        {{content.length}}/200
      </div>
      <div class="content-images">
        <div class="images-list">
          <div class="list-li" v-for="(item, index) in UploadPicturesSrc" :key="index" @click="remove(item)">
            <img :src="item.src" alt="" />
          </div>
          <div class="list-li" @click="GetUploadPictures"  v-if="UploadPicturesSrc.length < 9">
            <img src="/images/add.png" alt="">
          </div>
        </div>
      </div>
      <div class="tab" @click="submit">
        提交反馈
      </div>
    </div>
  </div>
</template>

<script>
import GmtInput from '@/components/GmtInput'
import { WaChatUploadPictures } from "@/js/WaChatUploadPictures";
import { DelUpload } from "@/api/WaChatApi";
import { WeChatGetLocation } from "@/js/WeChatGetLocation";
import { Getxtfk } from '@/api/secondLevelPage'

export default {
  props: ["WaChatConfigData"],
  components: {
    GmtInput
  },
  data () {
    return {
      nameModelData: {type: 'text', tost: '可不填', placeholder: '请输入姓名 (可不填)', border: true},
      phoneModelData: {type: 'number', tost: '可不填', placeholder: '请输入电话 (可不填)', border: true},
      name: '',
      phone: '',
      content: ''
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
  methods: {
    // 获取输入框文本
    SetName (item) {
      this.name = item
    },
    SetPhone (item) {
      this.phone = item
    },
    // 选取图片 9张
    GetUploadPictures() {
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
    // 提交反馈
    submit () {
      if (!this.content) {
        this.changtoast('请简要描述问题', 'warning')
        return
      }
      this.$indicator.open('正在提交数据，请稍等...')
      Getxtfk ({
        Tel: this.phone,
        Name: this.name,
        Content: this.content,
        MainId: this.UploadPicturesId,
      }).then (rps => {
        this.$indicator.close()
        if (rps.data.success) {
          this.$emit('changeTabState', 0)
          this.$store.commit("SetUploadPicturesSrc", ""); // 清空记录的图片路径
          this.$store.commit("SetMainIdData", ""); // 清空记录的图片id
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/style/components/secondLevelPages/PersonalCenter/myFeedback.scss';
</style>

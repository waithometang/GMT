<template>
  <div class="main">
    <div class="main-bottom">
      <div class="input-all">
        <div class="icon">
          <img src="/static/FNT_IMAGES/mane.png" alt />
        </div>
        <input v-model="name" type="text" name id class="input-nor" value placeholder="请输入您的真实姓名(可不填)" />
      </div>
    </div>
    <div class="main-bottom">
      <div class="input-all">
        <div class="icon">
          <img src="/static/FNT_IMAGES/phone.png" alt />
        </div>
        <input type="phone" name id class="input-nor" v-model="tel" value placeholder="请输入您的联系方式(可不填)" maxlength="11" />
      </div>
    </div>
    <div class="main-bottom">
      <div class="input-all">
        <div class="icon">
          <img src="/static/FNT_IMAGES/topic.png" alt />
        </div>
        <input type="text" v-model="xjzt" name id class="input-nor" value placeholder="请输入信件主题" />
      </div>
    </div>
    <div class="textarea-main">
      <div class="input-all-text">
        <div class="icon-text">
          <img src="/static/FNT_IMAGES/content.png" alt />
        </div>
        <textarea placeholder="请输入信件内容... " maxlength="200" @input="descInput" v-model="xjnr" class="textare-body-nor" />
        <span class="span-text">{{txtVal}}/200</span>
        </div>
      </div> 
      <div class="picture">
        <ul>
          <li v-for="(item, index) in UploadPicturesSrc" :key="index" >
            <img :src="item.src">
          </li>
          <li @click="waChatUploadImage" v-if="UploadPicturesSrc.length < 9">
            <img src="/static/FNT_IMAGES/add.png" alt="">
          </li>
          <div style="clear:both;"></div>
        </ul>
      </div>
      <button type="submit" @click="send" class="sqyy-button">发送信件</button>
  </div>
</template>
<script>
import { TjZxxx } from '@/api/FNTApi'
import { WaChatUploadPictures } from "@/js/WaChatUploadPictures";

export default {
  props: ["WaChatConfigData"],
  data() {
    return {
      name:'',
      tel:'',
      sfgk:'',
      xjzt:'',
      xjnr:'',
      txtVal: 0,
      selected:true
    };
  },
  computed: {
    UploadPicturesSrc() {
      return this.$store.state.UploadPicturesSrc;
    },
    UploadPicturesId() {
      return this.$store.state.MainIdData;
    },
  },
  methods: {
    descInput() {
      this.txtVal = this.xjnr.length;
    },
    waChatUploadImage () {
      let amount = 9 - this.UploadPicturesSrc.length
      WaChatUploadPictures(this.WaChatConfigData, amount);
    },
    send(){
      if (!this.xjzt) {
        this.changtoast('请输入信件主题', 'error')
        return
      }
      if (!this.xjnr) {
        this.changtoast('请输入信件内容', 'error')
        return
      }
      let that = this
      this.MessageBox({
        content: '是否确认发送信件',
        success: function () {
          that.submit()
        },
        failStata: true
      })
    },
    onselected(){
      this.selected=false
    },
    submit(){
      TjZxxx({
        title:this.xjzt,
        content:this.xjnr,
        name:this.name,
        mobile:this.tel,
        mainId: this.UploadPicturesId
      }).then (rps => {
        if (rps.data.success) {
          this.changtoast('发送成功')
          this.$store.commit("SetUploadPicturesSrc", ""); // 清空记录的图片路径
          this.$store.commit("SetMainIdData", ""); // 清空记录的图片id
          this.$emit('setState', 2)
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  },
};
</script>
<style lang="scss" scoped>
@import '../style/issueFrom.scss';
</style>

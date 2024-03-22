<template>
  <div class="main">
    <form>
      <div class="input-all">
        <div class="textarea-main">
          <div class="input-all-text">
            <textarea placeholder="请输入您的微心愿和现家庭情况 " maxlength="200" @input="descInput" v-model="desc" class="textare-body-nor" />
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
        <div class="input-title-body">
          <div class="input-title">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</div>
          <input v-model="name" type="text" placeholder="请输入您的真实姓名" class="input-body" />
        </div>
        <div class="input-title-body">
          <div class="input-title">联系地址:</div>
          <input v-model="dz" type="text" placeholder="请输入您的联系地址" class="input-body" />
        </div> 
        <div class="input-title-body">
          <div class="input-title">身份证号码:</div>
          <input v-model="sfzh" type="text" placeholder="请输入您的身份证号码" class="input-body" />
        </div>
        <div class="input-title-body">
          <div class="input-title">联系方式:</div>
          <input v-model="lxdh" type="Number" placeholder="请输入您的联系方式" class="input-body" />
        </div>
        <div class="input-title-body" v-if="false">
          <div class="input-title">验&nbsp;&nbsp;证&nbsp;&nbsp;码:</div>
          <input type="text" placeholder="请输入短信验证码" class="input-body" />
          <div class="yzm">获取验证码</div>
        </div>
      </div>
      <div class="input-button" @click="send">发布微心愿</div>
    </form>
  </div>
</template>
<script>
import { Tjsqrl } from '@/api/FNTApi'
import { mapActions } from 'vuex'
import { WaChatUploadPictures } from "@/js/WaChatUploadPictures";

export default {
  props: ["WaChatConfigData"],
  data() {
    return {
      lxdh:'',
      dz:'',
      name:'',
      zt:'',
      txtVal: 0,
      desc: "",
      sfzh:""
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
  created () {
    this.getGrxxData()
  },
  methods: {
    ...mapActions(['getGrxx']),
    send(){
      if (!this.desc) {
        this.changtoast('请输入微心愿内容', 'error')
        return
      }
      if (!this.name) {
        this.changtoast('请输入姓名', 'error')
        return
      }
      if (!this.dz) {
        this.changtoast('请输入联系地址', 'error')
        return
      }
      if (!this.sfzh) {
        this.changtoast('请输入身份证号码', 'error')
        return
      }
      if (!this.lxdh) {
        this.changtoast('请输入联系方式', 'error')
        return
      }
      let that = this
      this.MessageBox({
        content: '是否确认提交申请',
        success: function () {
          that.submit()
        },
        failStata: true
      })
    },
    descInput() {
      this.txtVal = this.desc.length;
    },
    getGrxxData () {
      this.getGrxx().then(val => {
        if (val.sfzh) {
          this.sfzh = val.sfzh
          this.name = val.mz
          this.lxdh = val.tel
        }
      })
    },
    submit(){
      Tjsqrl ({
        sqry:this.name,
        lxdh:this.lxdh,
        lxdz:this.dz,
        sfzh:this.sfzh,
        nr:this.desc,
        Xyfj: this.UploadPicturesId
      }).then (rps => {
        if (rps.data.success) {
          this.changtoast('申请成功')
          this.$store.commit("SetUploadPicturesSrc", ""); // 清空记录的图片路径
          this.$store.commit("SetMainIdData", ""); // 清空记录的图片id
          this.$emit('setState', 1)
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    waChatUploadImage () {
      let amount = 9 - this.UploadPicturesSrc.length
      WaChatUploadPictures(this.WaChatConfigData, amount);
    },
  },
  destroyed: function() {
    this.$store.commit("SetUploadPicturesSrc", "");
    this.$store.commit("SetMainIdData", "");
  },
};
</script>
<style lang="scss" scoped>
@import '../style/applyFrom.scss';
</style>

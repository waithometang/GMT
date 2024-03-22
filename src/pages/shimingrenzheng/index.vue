<template>
  <div class="smrz">
    <div class="input_list">
      <div class="input_tab">
        <div class="input_tab_name">身份证:</div>
        <div class="input_tab_inpu"><input type="text" v-model="sfz" readonly placeholder="请输入身份证号码"></div>
        <!-- <div class="input_tab_but" @click="recognitionPapers"><img src="/static/listFrom_image_icon.png" alt=""></div> -->
      </div>
      <div class="input_tab">
        <div class="input_tab_name">姓名:</div>
        <div class="input_tab_inpu"><input v-model="name" type="text" readonly placeholder="请输入姓名"></div>
      </div>
      <div class="input_tab">
        <div class="input_tab_name">手机号:</div>
        <div class="input_tab_inpu"><input v-model="sjh" maxlength="11" type="text" placeholder="请输入手机号"></div>
      </div>
    </div>
    <div class="but_tab">
      <div class="public_but" @click="submit">下一步</div>
    </div>
  </div>
</template>

<script>
import { sfgwry } from '@/api/secondLevelPage'
import { waChatDisposeImgaes } from '@/js/disposeImgaes'
import { GetMediaToMainId, IdCardOrcById, Bizlicense } from "@/api/WaChatApi"
import { GetWechatConfig } from "@/api/GetWechatConfig"
import wjutils from '@/js/WjSmrzUtil'

export default {
  data () {
    return {
      sfz: '', // 身份证
      name: '', // 姓名
      sjh: '', // 手机号
      infoData: {}, // 个人
      FileId: '', // 识别的身份证id
      WaChatConfigData: ''
    }
  },
  methods: {
    submit () {
      if (!this.sfz) {
        this.changtoast('请输入身份证号码', 'warning')
        return
      }
      if (!this.name) {
        this.changtoast('请输入姓名', 'warning')
        return
      }
      if (!this.sjh) {
        this.changtoast('请输入手机号码', 'warning')
        return
      }
      this.$indicator.open()
      sfgwry ({
        Identity: this.sfz,
        Name: this.name,
        tel:  this.sjh
      }).then(rps => {
        this.$indicator.close()
        if (rps.data.success) {
          let data = rps.data.content
          if (data.isGwy) { // 公务员
            this.infoData = {
              name: this.name,
              sfz: this.sfz,
              tile: this.sjh,
              bm: data.bm,
              sex: data.sex,
              zw: data.zw,
              FileId: this.FileId
            }
            this.$router.push('/gwyrz')
          } else { // 非公务员
            this.infoData = {
              name: this.name,
              sfz: this.sfz,
              sjh: this.sjh,
              FileId: this.FileId
            }
            this.$router.push('/Certification')
          }
          // this.$store.commit('SetinFoData', this.infoData)
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    // 识别身份证
    recognitionPapers () {
      this._IdCardOrcById ()
    },
    // 微信上传图片
    _GetMediaToMainId () {
      let dome = new Promise (resolve => {
        waChatDisposeImgaes(this.WaChatConfigData).then (val => {
          this.$store.commit('SetMedialdsList', []) // 清空本次选中记录
          this.$store.commit('SetpublicMessage', '上传失败')
          GetMediaToMainId ({
            MediaIds: val,
            mainId: this.$store.state.MainIdData
          }).then (rps => {
            this.$indicator.close()
            if (rps.data.success) {
              resolve (rps.data.content)
            } else {
              this.changtoast(rps.data.message, 'error')
            }
          })
        })
      })
      return dome
    },
    // 腾讯识别身份证
    _IdCardOrcById () {
      this._GetMediaToMainId().then (val => {
        let data = val.urlData[0]
        this.FileId = data.id
        IdCardOrcById({
          id: data.id
        }).then(rps => {
          if (rps.data.errcode === 0) {
            if (rps.data.type == 'Back') {
              this.changtoast('请上传身份证正面照片', "warning");
            } else {
              this.name = rps.data.name
              this.sfz = rps.data.id
            }
          } else {
            this.changtoast(rps.data.rps.data.errmsg, 'error')
          }
        })
      })
    },
    // 获取微信sdk 初始化参数
    _GetWechatConfig () {
      let url = window.location.href
      GetWechatConfig({
        url: url
      }).then(rps => {
        if (rps.data.success) {
          this.WaChatConfigData = rps.data.content
        } else {
          this.changtoast(rps.data.message, "error")
        }
      })
    }
  },
  computed: {
    certToken() {
      return this.$route.query.certToken
    }
  },
  created () {
    // this._GetWechatConfig()
    if (this.certToken) {
      wjutils.getSmxx(this.certToken).then(smxx => {
        this.sfz=smxx.sfzh
        this.name=smxx.xm
      })
      
    }else{
      this.$router.replace('/wd')
    }
  }
}
</script>

<style lang='scss' scoped>
@import './style/index.scss';
</style>
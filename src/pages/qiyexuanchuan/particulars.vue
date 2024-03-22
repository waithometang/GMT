<template>
  <div class="qyxcxq">
    <div class="head">
      <div class="head_title">{{listData.title}}</div>
      <div class="head_add">
        <div class="head_add_img">
          <img src="/static/qiye.png" alt="">
        </div>
        <div class="head_add_name">{{listData.fbr}}</div>
      </div>
      <div class="head_time_number">
        <div class="time_number">
          <div class="time_number_icon">
            <img src="/static/time@2x.png" alt="">
          </div>
          <div class="time_number_name">{{listData.publishTime}}</div>
        </div>
        <div class="time_number">
          <div class="time_number_icon">
            <img src="/static/read@2x.png" alt="">
          </div>
          <div class="time_number_name">{{listData.readedCount ? listData.readedCount : 0}}</div>
        </div>
      </div>
    </div>
    <div class="content" v-html="listData.content"></div>
    <div class="imgaes" v-if="listData.imgUrls">
      <img class="imgae_tab" :src="item" alt="" v-for="(item, index) in listData.imgUrls" :key="index" @click="previewImage(item, listData.imgUrls)">
    </div>
  </div>
</template>

<script>
import { Getqycxfbxx } from '@/api/secondLevelPage'
import { WcChatPreviewImage } from '@/js/WeChatpreviewImage'
import { GetWechatConfig } from "@/api/GetWechatConfig"

export default {
  computed: {
    state () {
      return this.$route.params.id
    }
  },
  data () {
    return {
      listData: '',
      WaChatConfigData: '',
    }
  },
  methods: {
    _Getqycxfbxx () {
      this.$indicator.open("")
      Getqycxfbxx({
        id: this.state
      }).then (rps => {
        this.$indicator.close()
        if (rps.data.success) {
          this.listData = rps.data.content
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    previewImage (item, data) {
      let url = 'http://gmt.gaoming.gov.cn' + item
      let datas = []
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let str = 'http://gmt.gaoming.gov.cn' + element
        datas.push(str)
      }
      WcChatPreviewImage(url,datas, this.WaChatConfigData)
    },
    // js-sdk 实例参数
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
  created () {
    this._Getqycxfbxx()
    this._GetWechatConfig()
  }
}
</script>

<style lang='scss' scoped>
@import './style/particulars.scss';
</style>
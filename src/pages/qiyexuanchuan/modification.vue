<template>
  <div class="publicityFrom">
    <div class="input_list">
      <div class="input_list_tab">
        <div class="tab_name">宣传标题: </div>
        <div class="tab_content"><input type="text"  v-model="name" placeholder="请输入标题（必填）"></div>
      </div>
    </div>
    <div class="text_list">
      <div class="text_tab">
        <textarea v-model="content"  placeholder="请输入详细宣传内容概述"></textarea>
      </div>
      <div class="text_number">0/1000</div>
    </div>
    <div class="images_list">
      <ul>
        <li class="images_tab" v-for="(item, index) in UploadPicturesSrc" :key="index" @click="remove(item)">
          <img :src="item.src">
        </li>
        <li class="images_tab" @click="UploadPictures" v-if="UploadPicturesSrc.length < 9">
          <img src="/images/add.png" alt="">
        </li>
        <div style="clear:both;"></div> 
      </ul>
    </div>
    <div class="base">
      <div class="public_but" @click="clickPublict()">修改宣传</div>
    </div>
  </div>
</template>

<script>
import { qycxxx, qycxedit, GetyrzqyList } from '@/api/secondLevelPage'
import { WaChatUploadPictures } from "@/js/WaChatUploadPictures"
import { GetWechatConfig } from "@/api/GetWechatConfig"

export default {
  data () {
    return {
      name: '',
      content: '',
      gsmc: '',
      gsid: '',
      popupVisible: false,
      qyListData: '',
      ValuesChange: '',
      slots: [
        {
          flex: 1,
          values: [],
          textAlign: 'center',
          defaultIndex: 1,
          className: 'picker_list',
        }
      ],
    }
  },
  computed: {
    UploadPicturesSrc() {
      return this.$store.state.UploadPicturesSrc;
    },
    UploadPicturesId() {
      return this.$store.state.MainIdData;
    },
    state () {
      return this.$route.params.id
    }
  },
  methods: {
    // 发布宣传
    clickPublict () {
      if (!this.name) {
        this.changtoast('请输入标题', 'warning')
        return
      }
      if (!this.content) {
        this.changtoast('请输入内容', 'warning')
        return
      }
      this.$indicator.open("")
      qycxedit ({
        Title: this.name,
        Content: this.content,
        qyrzId: this.gsid,
        img_mainId :this.UploadPicturesId,
        id: this.state
      }).then(rps => {
        this.$indicator.close("")
        if (rps.data.success) {
          this.changtoast('修改成功')
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    // 选取图片 9张
    UploadPictures() {
      let amount = 9 - this.UploadPicturesSrc.length
      WaChatUploadPictures(this.configData, amount);
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
    },
    Getqycxxx () {
      this.$indicator.open("")
      qycxxx({
        id: this.state
      }).then (rps => {
        this.$indicator.close("")
        if (rps.data.success) {
          this.content = rps.data.content.content
          this.name = rps.data.content.title
          this.$store.commit('SetUploadPicturesSrc', rps.data.content.img_urls)
          this.$store.commit('SetMainIdData', rps.data.content.img_mainId)
        }
      })
    }
  },
  created () {
    console.log(this.state)
    this._GetWechatConfig ()
    this.Getqycxxx ()
  }
}
</script>

<style lang='scss'>
@import './style/publicityFrom.scss';
.publicityFrom /deep/ .picker_list {
  .picker-slot-wrapper {
    width: 750px;
    .picker-item {
      font-size:34px;
      font-weight:bold;
    }
    .picker-selected {
      color:rgba(40,40,40,1);
    }
  }
}
</style>
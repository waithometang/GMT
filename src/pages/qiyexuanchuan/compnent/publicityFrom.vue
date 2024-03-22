<template>
  <div class="publicityFrom">
    <div class="input_list">
      <div class="input_list_tab">
        <div class="tab_name">请选择公司名称: </div>
        <div class="tab_content" @click="setSelectValue"><input type="text"  v-model="gsmc" placeholder="请选择公司名称 (必填)" readonly="readonly"></div>
      </div>
    </div>
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
      <div class="public_but" @click="clickPublict()">发布宣传</div>
    </div>
    <mt-popup v-model="popupVisible" position="bottom">
      <div class="affirm" @click="clickAffirm">确认</div>
      <mt-picker :slots="slots" :visibleItemCount="3" valueKey="name" @change="onValuesChange"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import { Getqycxfb, GetyrzqyList } from '@/api/secondLevelPage'
import { WaChatUploadPictures } from "@/js/WaChatUploadPictures"

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
  props: {
    configData: {

    }
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
    // 发布宣传
    clickPublict () {
      if (!this.gsmc) {
        this.changtoast('请选择公司名称', 'warning')
        return
      }
      if (!this.name) {
        this.changtoast('请输入标题', 'warning')
        return
      }
      if (!this.content) {
        this.changtoast('请输入内容', 'warning')
        return
      }
      this.$indicator.open("")
      Getqycxfb ({
        Title: this.name,
        Content: this.content,
        qyrzId: this.gsid,
        img_mainId :this.UploadPicturesId
      }).then(rps => {
        this.$indicator.close("")
        if (rps.data.success) {
          this.changtoast('发布成功')
          this.$emit('setTab', 0)
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
    // 获取企业认证列表
    getListData () {
      GetyrzqyList ().then (rps => {
        if (rps.data.success) {
          this.qyListData = rps.data.content
          if (this.qyListData.length === 1) {
            this.gsmc = this.qyListData[0].name
            this.gsid = this.qyListData[0].id
          }
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    // 开启弹出层
    setSelectValue () {
      if (this.qyListData.length <= 0) {
        this.changtoast ('你尚未绑定企业', 'warning')
        return
      }
      if (this.qyListData.length === 1) {
        return
      }
      this.slots[0].values = this.qyListData
      this.popupVisible = true
    },
    // 选择器事件
    onValuesChange (picker, values) {
      this.ValuesChange = values[0]
    },
    // 选择器确认事件
    clickAffirm () {
      this.gsmc = this.ValuesChange.name
      this.gsid = this.ValuesChange.id
      this.popupVisible = false
    }
  },
  created () {
    this.getListData()
  }
}
</script>

<style lang='scss'>
@import '../style/publicityFrom.scss';
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
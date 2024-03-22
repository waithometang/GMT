<template>
  <div class="needPhono">
    <div class="from">
      <div class="input">
        <vant-selector
          v-model="projectValue"
          :columns="columns"
          label="上报工程"
          :required="false"
        />
      </div>
    </div>
    <div class="textImages">
      <div class="text">
        <textarea placeholder="请输入上报情况" v-model="content"></textarea>
        <div class="tost">{{ content.length }}/200</div>
      </div>
      <div class="images">
        <ul>
          <li v-for="(item, index) in UploadPicturesSrc" :key="index">
            <img :src="item.src" />
            <div class="cloes" @click="remove(item)">
              <img src="/static/img_close.png" />
            </div>
          </li>
          <li @click="UploadPictures" v-if="UploadPicturesSrc.length < 9">
            <img src="/images/add.png" />
          </li>
          <div style="clear: both"></div>
        </ul>
      </div>
    </div>
    <!-- <div class="stie-list">
      <div class="list-li list-li-action">
        <div class="li_left" @click="_popupVisible(1)">
          <img src="/images/weizhi.png" alt />
          <span>{{ address ? address : '正在获取位置' }}</span>
        </div>
        <div class="li_middle" @click="shuaxin()">
          <img src="/images/shuaxin.png" alt />
        </div>
        <div class="li_middle" @click="_popupVisible(1)">
          <img src="/images/more.png" alt />
        </div>
      </div>
    </div> -->
    <div class="want-report">
      <div @click="submit">
        <span>发布进度</span>
      </div>
    </div>
  </div>
</template>

<script>
import { storage } from '@/js/until'
import { WaChatUploadPictures } from '@/js/WaChatUploadPictures'
import { DelUpload } from '@/api/WaChatApi'
import { mapActions } from 'vuex'
import BetterScroll from '@/components/BetterScroll'
import wjutils from '@/js/WjSmrzUtil'

export default {
  props: ['WaChatConfigData'],
  data() {
    return {
      name: '',
      showPersonal: false,
      showUser: false,
      phone: '',
      content: '',
      publicity: false,
      popupVisible: false,
      listData: [],
      address: '',
      siteError: false,
      popupType: 0,
      //   选择上报工程
      columns: [],
      projectValue: '',
      resArr: []
    }
  },
  components: {
    BetterScroll
  },
  watch: {
    content() {
      if (this.content.length > 200) {
        this.content = this.content.substring(0, 200)
      }
    }
  },
  computed: {
    longData() {
      return storage.fetch('longData').data
    },
    UploadPicturesSrc() {
      return this.$store.state.UploadPicturesSrc
    },
    UploadPicturesId() {
      return this.$store.state.MainIdData
    },
    WaChetLatitude() {
      return this.$store.state.WaChetLatitude
    },
    WaChetLongitude() {
      return this.$store.state.WaChetLongitude
    }
  },
  destroyed: function () {
    this.$store.commit('SetUploadPicturesSrc', '')
    this.$store.commit('SetMainIdData', '')
  },
  methods: {
    inputEv(val) {
      this.$emit('input', val)
    },

    ...mapActions(['getGrxx']),
    // 提交举报
    submit() {
      if (this.content == '') {
        this.$toast.fail('请输入内容详情...')
        return
      }
      if (!this.projectValue) {
        this.$toast.fail('请选择上报工程')
        return
      }
      let that = this
      this.$dialog
        .confirm({
          title: '是否确认提交该工程进度？',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        .then(() => {
          this._PublishShot()
        })
        .catch(() => {})
    },
    _PublishShot() {
      // const id = this.resArr.map(ele => {
      //   if(ele.name = this.projectValue) {
      //     return ele.id
      //   }
      // })
      let id
      for (let i = 0; i < this.resArr.length; i++) {
        if (this.resArr[i]['name'] === this.projectValue) {
          id = this.resArr[i]['id']
        }
      }
      if (!id) {
        this.$toast('请选择上报工程')
        return
      }
      this.$indicator.open('正在提交数据，请稍等...')
      this.$post('/api/gcjd/sbgczk', {
        title: this.content,
        name: this.name,
        Mobile: this.phone,
        villageId: this.longData.id,
        mainId: this.UploadPicturesId,
        pid: id
      }).then(rps => {
        this.$indicator.close()
        if (rps.data.success) {
          this.$store.commit('SetUploadPicturesSrc', '') // 清空记录的图片路径
          this.$store.commit('SetMainIdData', '') // 清空记录的图片id
          this.changtoast('发布成功！', 'success')
          this.$store.commit('Set_TopTagState', 1)
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    // 选取图片 9张
    UploadPictures() {
      let amount = 9 - this.UploadPicturesSrc.length
      WaChatUploadPictures(this.WaChatConfigData, amount)
    },
    _popupVisible(item) {
      if (item === 1) {
        if (!this.WaChetLatitude && !this.WaChetLongitude) {
          return
        }
      }
      this.popupType = item
      this.popupVisible = true
    },
    // 删除图片
    remove(item) {
      DelUpload({
        id: item.id
      }).then(rps => {
        if (rps.data.success) {
          this.changtoast('删除成功')
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
      let newUploadPicturesSrc = this.UploadPicturesSrc.filter(rps => {
        return rps.id != item.id
      })
      this.$store.commit('SetUploadPicturesSrc', newUploadPicturesSrc)
    },
    showGrzc() {
      this.showPersonal = true
    },
    showYhzc() {
      this.showUser = true
    }
  },

  // 初始化获取经纬度
  created() {
    this.$showSubscribe()
    wjutils.gotoSMRZIfNot(this)
    // 进展发布--上报工程
    this.$post('/api/gcjd/wdgclist').then(res => {
      const result = res.data.content.map(ele => {
        return ele.name
      })
      if (result.length === 1) {
        this.projectValue = result[0]
      }
      this.columns = result
      this.resArr = res.data.content
    })
  }
}
</script>

<style lang='scss' type="text/css" scoped>
@import './style/wantToReport.scss';
@import '@/style/components/secondLevelPages/ruralRevitalization/needPhono.scss';
.needPhono{
  position: relative;
  background-color:#ffffff;
}
.bigConfirm {
  /deep/ .van-dialog__message {
    text-align: left !important;
    span {
      color: #5dabff;
      cursor: pointer;
    }
  }
}
/deep/.BetterScroll .ScrollArea[data-v-62a92a8d] {
  position: absolute;
  top: 150px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
/deep/ .van-cell {
  padding: 0;
}
/deep/ .van-cell::after {
  border: none;
}
/deep/ .van-field__label {
  display: none;
}
/deep/ .van-icon-arrow-down::before {
  margin-left: 400px;
}

/deep/ .van-hairline--bottom {
  height: 0 !important;
}
/deep/ .van-hairline--bottom::after {
  border: none;
}
</style>

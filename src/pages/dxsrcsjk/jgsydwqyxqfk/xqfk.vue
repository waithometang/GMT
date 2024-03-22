<template>
  <div class="container">
    <div class="middle">
      <div class="middle-input">
        <van-form
          @submit="onSubmit"
          ref="form"
          label-align="right"
          :scroll-to-error="true"
        >
          <GmtField v-model="baseData.zt" label="主题" :readonly="isView" />
          <div class="spilt" />
          <GmtField v-model="baseData.dw" label="单位名称" :readonly="isView" />
          <div class="spilt" />
          <GmtField
            v-model="baseData.xydm"
            label="信用代码"
            :readonly="isView"
          />
          <div class="spilt" />
          <vant-selector
            v-model="baseData.lb"
            :columns="['企业', '机关事业单位']"
            label="单位类别"
            :readonly="isView"
          />
          <div class="spilt" />
          <addressSelector
            v-model="baseData.dwdz"
            label="单位地址"
            :readonly="isView"
          />
          <div class="spilt" />
          <GmtField
            v-model="baseData.zmdx"
            label="招募对象"
            :readonly="isView"
          />
          <div class="spilt" />
          <GmtField
            v-model="baseData.bmfs"
            label="报名方式"
            :readonly="isView"
          />
          <div class="spilt" />
          <GmtField
            v-model="baseData.gzsj"
            label="工作时间"
            :readonly="isView"
          />
          <div class="spilt" />
          <GmtField v-model="baseData.lxry" label="联系人" :readonly="isView" />
          <div class="spilt" />
          <GmtField
            v-model="baseData.lxdh"
            label="联系电话"
            type="tel"
            :readonly="isView"
            placeholder="请输入座机号码/手机号码"
          />
          <div class="spilt" />
          <div class="sxsj">
            <span class="label"><span>*</span>实习时间</span>
            <datetimeSelector
              :minDate="birthminDate"
              :maxDate="birthmaxDate"
              v-model="baseData.sxksrq"
              label=""
              :readonly="isView"
              :required="false"
            />
            <span class="zhi">至</span>
            <datetimeSelector
              :minDate="birthminDate"
              :maxDate="birthmaxDate"
              v-model="baseData.sxjsrq"
              label=""
              :readonly="isView"
              :required="false"
            />
          </div>
          <div class="spilt" />
          <addressSelector
            v-model="baseData.gzdd"
            label="实习地点"
            :readonly="isView"
          />
          <div class="spilt" />
          <GmtField
            v-model="baseData.zmrs"
            label="需求人数"
            :readonly="isView"
            :type="'tel'"
          />
          <div class="spilt" />
          <datetimeSelector
            :minDate="birthminDate"
            :maxDate="birthmaxDate"
            v-model="baseData.bmqxsj"
            label="报名期限"
            :readonly="isView"
          />
          <div class="spilt" />
          <GmtField
            v-model="baseData.sxdy"
            autosize
            show-word-limit
            type="textarea"
            :maxlength="100"
            label=""
            placeholder="请输入实习待遇"
            :readonly="isView"
          />
          <div class="spilt" />
          <GmtField
            v-model="baseData.jtyq"
            autosize
            show-word-limit
            type="textarea"
            :maxlength="300"
            label=""
            placeholder="请输入反馈的具体事项"
            :readonly="isView"
          />
          <div class="spilt" />
          <template v-if="isUpload">
            <div class="tips">请上传照片或视频</div>
            <div class="upload">
              <div class="tpsc" v-show="type === 0">
                <div class="tjtp" @click="handleConfirm">
                  <img class="imgs" src="/static/FNT_IMAGES/add.png" />
                </div>
              </div>
              <GmtImageUpload
                v-model="baseData.file_id"
                v-show="type === 1"
                ref="imgUpload"
              />
              <UploadVideo
                ref="videoUpload"
                v-model="baseData.spwj_id"
                v-show="type === 2"
              />
            </div>
          </template>
        </van-form>
      </div>
    </div>
    <div class="base">
      <div class="base-tab width">
        <div class="public-long-but" @click="nextStep">提交</div>
      </div>
    </div>
    <transition name="fade" appear>
      <div class="dialog" v-if="showDialog" @click.stop.prevent="closeMK">
        <div class="dialog-container" ref="mark">
          <div class="close">
            <van-icon
              name="cross"
              color="#000"
              size="20"
              @click="closeDialog"
            />
          </div>
          <div class="title">请选择上传类型</div>
          <div class="footer-btn">
            <div class="cancel" @click="uploadImg">图片</div>
            <div class="confirm" @click="uploadVideo">视频</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import addressSelector from "@/components/vantSelector/address"
import datetimeSelector from "@/components/vantSelector/datetime"
import mobile from "@/components/vantField/mobile"
import GmtField from "@/components/GmtField"
import GmtImageUpload from "@/components/GmtImageUpload"
import UploadVideo from "@/pages/mlgm/component/UploadVideo"

export default {
  components: {
    addressSelector,
    datetimeSelector,
    mobile,
    GmtField,
    GmtImageUpload,
    UploadVideo
  },
  computed: {
    isView () {
      //查看模式，不能修改
      return false
    },
    isUpload () {
      return this.baseData.lb === '企业'
    }
  },
  data () {
    return {
      birthminDate: new Date(1900, 0, 1),
      birthmaxDate: new Date(2023, 11, 31),
      baseData: {
        spwj_id: '', // 视频
        file_id: '' // 图片
      },
      type: 0, // 判断哪种类型
      showDialog: false // 显示提示框
    }
  },
  watch: {
    'baseData.spwj_id' (val) {
      if (!val) {
        this.type = 0
      }
    },
    'baseData.file_id' (val) {
      if (!val) {
        this.type = 0
      }
    }
  },
  created () {
    if (JSON.parse(localStorage.getItem("xqfk"))) {
      this.baseData = JSON.parse(localStorage.getItem("xqfk"))
    }
  },
  destroyed () {
    localStorage.setItem(
      "xqfk",
      JSON.stringify(this.baseData)
    )
  },
  methods: {
    nextStep () {
      this.$refs.form.submit()
    },
    onSubmit () {
      this.$indicator.open("加载中...")
      this.$post("api/Zx/dxsSxywTj", this.baseData).then(res => {
        this.$indicator.close()
        if (res.data.success) {
          this.$parent.gotoWdfk()
          localStorage.removeItem("xqfk")
        } else {
          this.changtoast(res.data.message, "error")
        }
      })
    },
    handleConfirm () {
      this.showDialog = true
    },
    closeDialog () {
      this.showDialog = false
    },
    uploadImg () {
      this.showDialog = false
      this.type = 1
      this.$refs.imgUpload && this.$refs.imgUpload.waChatUploadImage()
    },
    uploadVideo () {
      this.showDialog = false
      this.type = 2
      this.$refs.videoUpload.$refs.ipt_video.click()
    },
    closeMK (e) {
      let dom = this.$refs.mark
      if (dom) {
        if (!dom.contains(e.target)) {
          this.showDialog = false
        }
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import './style/xqfk.scss';
/deep/ .van-cell::after {
  border-bottom: 1px solid #fff;
}
/deep/ .van-hairline--bottom {
  display: none;
}
/deep/ .van-field__label {
  width: auto;
}
/deep/ .sxsj .van-cell,
.sxsj .van-cell--clickable,
.sxsj .van-field,
.sxsj .van-field--label-right {
  padding: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/deep/ .tjtp {
  &:nth-child(3n) {
    margin-right: 0px !important;
  }
}
</style>

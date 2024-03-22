<template>
  <div class="hdbm">
    <van-form label-align="right" label-width="100px">
      <van-field :value="hdInfo.bmzt" label="报名主题：" :readonly="true" />
      <van-field :value="hdInfo.bmsj" label="报名时间：" :readonly="true" />
      <!-- <van-field
        autosize
        type="textarea"
        :value="hdInfo.sm"
        label="报名说明："
        :readonly="true"
      /> -->
      <van-field :value="hdInfo.xm" label="姓名：" :readonly="true" />
      <van-field :value="hdInfo.lxdh" label="联系方式：" :readonly="true" />
      <van-field :value="hdInfo.sfzh" label="身份证号：" :readonly="true" />
    </van-form>
    <div class="formzy">
      <div class="introduce">
        <p class="label">活动说明：</p>
        <span v-html="hdInfo.sm"></span>
      </div>
      <div class="buttonDiv">
        <van-button v-if="hdInfo.isOver" round block disabled type="info"
          >活动已结束</van-button
        >
        <van-button v-else round block type="info" @click="submitFn"
          >我要报名</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import GmtField from "@/components/GmtField"
import yesnoF from "@/components/vantField/yesno"
export default {
  components: {
    GmtField,
    yesnoF
  },
  methods: {
    beginEditFn() {
      this.canNotEdit = false
      this.$refs.formZys1.tranToShow()
      this.$refs.formZys2.tranToShow()
      this.$refs.formZys3.tranToShow()
      this.$refs.formZys4.tranToShow()
    },
    checkHasSameZY() {
      let hasMap = {}
      hasMap[this.bmObj.dyzy_id] = true
      if (this.bmObj.dezy_id) {
        if (hasMap[this.bmObj.dezy_id]) return true
        else hasMap[this.bmObj.dezy_id] = true
      }
      if (this.bmObj.dszy_id) {
        if (hasMap[this.bmObj.dszy_id]) return true
        else hasMap[this.bmObj.dszy_id] = true
      }
      if (this.bmObj.dsgw_id) {
        if (hasMap[this.bmObj.dsgw_id]) return true
        else hasMap[this.bmObj.dsgw_id] = true
      }
      return false
    },
    submitFn() {
      this.$dialog
        .confirm({
          title: "确认报名",
          message: "是否确认报名？",
          confirmButtonColor: "#2E3092",
          className: "bigConfirm"
        })
        .then(() => {
          let hdid = this.hdInfo.id
          // this.$indicator.open("提交中...")
          let _params = {
            hdid
          }
          Object.assign(_params, this.pageObj)
          if (this.detailData) _params.id = this.detailData.id
          this.$post("api/ZX/dxshdynbm", _params).then(res => {
            if (res.data.success) {
              this.$toast("提交成功")
              if (!this.detailData) {
                this.bmObj = {}
                this.pageObj = {}
              }
              this.$emit("submitSc")
            } else {
              this.changtoast(res.data.message, "error")
            }
          })
        })
        .catch(() => {})
    }
  },
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    detailData: {
      type: Object
    }
  },
  created() {
    if (this.detailData) {
      this.readData = true
      this.$indicator.open("加载中...")
      this.$post("api/zx/dxshdbmxx", { id: this.detailData.id }).then(res => {
        if (res.data.success) {
          this.hdInfo = res.data.content
        } else {
          this.changtoast(res.data.message, "error")
        }
      })
    } else {
      let __data = this.$route.params.data
      if (!__data) {
        if (this.$route.query.id) {
          // this.$indicator.open('加载中...')
          // this.$post('api/zx/dxsbmCheck').then(res =>{
          //   if (res.data.success){
          //     this.hdInfo=res.data.content
          //   }else{
          //     this.$alert(res.data.message,'温馨提示')
          //   }
          // })
        } else {
          this.$router.replace("/dxs")
        }
      } else {
        this.hdInfo = __data
      }
    }
    if (this.readonly) this.canNotEdit = true
  },
  data() {
    return {
      readData: false,
      pageObj: {},
      editModel: false,
      canNotEdit: false,
      hdInfo: {
        id: 0,
        bmzt: "",
        bmsj: "",
        sm: "",
        zy1: null,
        zy2: null,
        zy3: null,
        zy4: null,
        isOver: false
      },
      bmObj: {}
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  padding: 0;
  margin: 0;
}
.hdbm {
  background-color: #eeeeee;
  height: calc(100vh - 394px);
  overflow-y: scroll;
  .formzy {
    margin-top: 12px;
    background-color: #fff;
    .introduce {
      padding: 30px;
      font-size: 28px;
      font-weight: 500;
      .label {
        color: #898989;
      }
    }
  }
  .buttonDiv {
    padding: 16px;
    background-color: #fff;
  }
}
</style>
<template>
  <div class="xxxzlx">
    <div class="middle">
      <div class="middle-title">上传资料照片</div>
      <div class="info-list">
        <div v-for="val in zmzllist" :key="val.id">
          <publicUploadPictures
            :ref="'uploadpic' + val.id"
            :title="val.desc"
            :loaclData="!isView && !bmid"
            :state="val.id"
            :isNeed="val.sfbx === 1"
          />
        </div>
      </div>
    </div>
    <div class="base" v-if="!isView">
      <div class="base-tab">
        <div class="public-long-but" @click="beforeStep">上一步</div>
      </div>
      <div class="base-tab" v-if="isView">
        <div class="public-long-but" @click="goback">返回</div>
      </div>
      <div class="base-tab" v-else>
        <div class="public-long-but" @click="nextStep">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
import publicUploadPictures from "@/components/publicUploadPictures"
export default {
  data() {
    return {
      baseData: {},
      zmzllist: [],
      rxlblxs: [],
      WaChatConfigData: "",
      tabState: 2
    }
  },
  methods: {
    beforeStep() {
      this.$router.go(-1)
    },
    nextStep() {
      let zkbmData = this.$store.state.zkbmData
      let zkgw_id = zkbmData.gwxx.id || zkbmData.baseData.zkgw_id
      if (this.bmid) {
        if (!zkbmData.baseData) {
          this.$toast("请勿刷新页面")
          this.$router.replace("/dwzk/wybm")
          return
        }
        zkbmData.baseData.bmid = this.bmid
      } else {
        if (!zkbmData.gwxx) {
          this.$toast("请勿刷新页面")
          this.$router.replace("/dwzk/wybm")
          return
        }
      }
      let picDoms = []
      let zlList = this.zmzllist,
        zlDatas = []
      for (let index = 0; index < zlList.length; index++) {
        const el = zlList[index]
        let dom = this.$refs["uploadpic" + el.id][0]
        let data = dom.getMainId()
        if (data.number === 0 || !data.mainId) {
          if (el.sfbx === 1) {
            this.changtoast("请上传" + el.desc, "warning")
            return
          }
        } else {
          zlDatas.push({ id: el.id, mainid: data.mainId })
          picDoms.push(dom)
        }
      }
      zkbmData.jtcys.forEach(jtcy => {
        jtcy.id = 0
      })
      let _params = {
        ...zkbmData.baseData,
        zls: zlDatas,
        jtcys: zkbmData.jtcys
      }
      _params.zkgw_id = zkgw_id
      this.$indicator.open("提交中...")
      this.$post("api/zkgl/dwzkbm", _params).then(res => {
        this.$indicator.close()
        if (res.data.success) {
          this.$store.commit("Clear_ZkbmData", zkgw_id) //清除报名数据
          picDoms.forEach(picdom => {
            picdom.removeStorageImage()
          })
          this.$toast("提交成功")
          this.$router.replace("zgcx")
        } else {
          this.changtoast(res.data.message, "error")
        }
      })
    }
  },
  created() {
    if (this.bmid) {
      this.$indicator.open("加载中...")
      this.$get("api/zkgl/bmzl?id=" + this.bmid).then(res => {
        this.$indicator.close()
        if (res.data.success) {
          this.zmzllist = res.data.content.zls
          this.$nextTick(() => {
            let zls = res.data.content.datas
            zls.forEach(el => {
              let _ref = this.$refs["uploadpic" + el.zlid]
              if (_ref && _ref.length > 0) {
                _ref[0].setPictures(el.idurls, el.main_id)
              }
            })
          })
        } else {
          this.changtoast(res.data.message, "error")
        }
      })
    } else {
      let zkbmData = this.$store.state.zkbmData
      if (!zkbmData.gwxx) {
        this.$toast.fail("获取报考岗位信息失败,请重新选择")
        this.$router.replace("wybm")
        return
      }
      this.zmzllist = zkbmData.gwxx.zls
    }
  },
  components: {
    publicUploadPictures
  },
  computed: {
    bmid() {
      return this.$route.query.bmid
    },
    isView() {
      //只看模式，不能修改
      return this.$route.query.m === "v"
    },
    isEdit() {
      //查看模式，待审查前
      return this.$route.query.m === "e"
    }
  }
}
</script>

<style lang='scss' scoped>
@import "../style/sczl.scss";
</style>

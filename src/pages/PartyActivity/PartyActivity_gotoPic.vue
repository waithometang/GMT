<template>
  <div class="PartyActivity_gotoPic">
    <div class="pic">
      <div class="ewm_pages">
        <div class="ewm_hread">
          <p>活动情况</p>
        </div>
        <div class="ewm_item">
          <div v-if="hasRecord" class="activity_detail_active_items">
            <div class="activity_detail_active1">{{ pageObj.hdqk }}</div>
          </div>
          <textarea
            v-else
            name
            v-model="pageObj.hdqk"
            placeholder="请输入活动情况"
          ></textarea>
        </div>
        <div class="tpsce">
          <GmtImageUpload
            v-model="pageObj.main_id"
            :readonly="hasRecord"
            ref="imgUploader"
          />
        </div>
        <template v-if="hasRecord">
          <div class="title">村（社区）评价</div>
          <div v-if="pageObj.pj" class="activity_detail_active_items">
            <div class="activity_detail_active">较好</div>
          </div>
          <div class="activity_detail_active_items">
            <div class="activity_detail_active1">暂未评价</div>
          </div>
        </template>
      </div>

      <div class="ewm_button" @click="submitFn" v-if="!hasRecord">提交</div>
      <div class="ewm_button" @click="gobackFn" v-else>返回</div>
    </div>
  </div>
</template>

<script>
import GmtImageUpload from "@/components/GmtImageUpload"
import { GetWechatConfig } from "@/api/GetWechatConfig"
import { WeChatGetLocation } from "@/js/WeChatGetLocation";
export default {
  data() {
    return {
      sfcy: false,
      hasRecord: false,
      pageObj: {},
      WaChatConfigData: ""
    }
  },
  inject: ["reload"],
  methods: {
    gobackFn() {
      this.$router.go(-1)
    },
    submitFn() {
      this.$indicator.open("加载中...")
      this.pageObj.hdid = this.$route.query.id
      this.$post("api/PartyBuilding/dyhdqktj", this.pageObj).then(res => {
        if (res.data.success) {
          this.changtoast("提交成功", "success")
          this.reload()
        } else {
          this.changtoast(res.data.message, "error")
        }
      })
    }
  },
  components: {
    GmtImageUpload
  },
  mounted() {
    this.$indicator.open("加载中...")
    this.$post("api/PartyBuilding/dyhdqkxx", { id: this.$route.query.id }).then(
      res => {
        if (res.data.success) {
          if (res.data.content) {
            this.pageObj = res.data.content
            this.hasRecord = !!res.data.content.hdqk
            if (this.hasRecord) {
              this.$refs.imgUploader.initPicData(res.data.content.pic)
            }
          }
        } else {
          this.changtoast(rps.data.message, "error")
        }
      }
    )
  },
  computed: {
    isXX() {
      if (this.$route.query.isXX) {
        return this.$route.query.isXX == "true"
      }
    }
  },
  created() {
    var u = navigator.userAgent
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1 //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
    let url = ""
    if (isAndroid) {
      url = location.href
    }
    if (isIOS) {
      url = location.href.split("#")[0] //hash后面的部分如果带上ios中config会不对
    }
    GetWechatConfig({
      url: url
    }).then(rps => {
      if (rps.data.success) {
        this.WaChatConfigData = rps.data.content
        WeChatGetLocation(this.WaChatConfigData, this)
      } else {
        this.changtoast(rps.data.message, "error")
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import "./style/PartyActivity_gotoPic.scss";
</style>
<template>
  <div class="yjfb">
    <van-form @submit="handleSubmit">
      <van-field
        v-model="formData.bt"
        label=""
        placeholder="请输入标题 "
        :rules="[{ required: true, message: '请输入标题' }]"
      />
      <van-field
        v-model="formData.yjnr"
        rows="10"
        autosize
        type="textarea"
        maxlength="1000"
        placeholder="请输入发布代表意见内容 "
        show-word-limit
        :rules="[{ required: true, message: '请输入发布代表意见内容' }]"
      />
      <GmtImageUpload
        v-model="formData.mainid"
        class="image-upload"
        ref="yjfbImg"
      />
      <div class="submit">
        <van-button type="primary" color="#379DEA" class="button">
          <span>发布意见</span>
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Dialog } from "vant"
import GmtImageUpload from "@/components/GmtImageUpload"
export default {
  data() {
    return {
      formData: {
        bt: "",
        yjnr: ""
      }
    }
  },
  components: {
    GmtImageUpload
  },
  methods: {
    handleSubmit() {
      let msg = `<img style="width: 50px;height: 50px;" src="/static/report/cg.png" /><p style="font-weight: bold;font-size: 18px;">意见发布提交成功！</p>`
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "是否确认发布?"
        })
        .then(() => {
          Dialog.alert({
            message: msg
          }).then(() => {
            var dbzsDlAsync = JSON.parse(sessionStorage.getItem("dbzsDlAsync"))
            this.formData.yhid = dbzsDlAsync.yhid
            this.formData.token = dbzsDlAsync.token
            this.$indicator.open("加载中...")
            this.$post("api/mlgm/dbzsfb", this.formData).then(res => {
              this.$indicator.close()
              if (res.data.success) {
                if (res.data.content) {
                  dbzsDlAsync.token = res.data.content.token
                  this.formData.token = dbzsDlAsync.token
                  sessionStorage.setItem(
                    "dbzsDlAsync",
                    JSON.stringify(dbzsDlAsync)
                  )
                  this.$post("api/mlgm/dbzsfb", this.formData).then(res => {
                    this.$indicator.close()
                    if (res.data.success) {
                      this.$router.go(0)
                    } else {
                      this.changtoast(res.data.message, "error")
                    }
                  })
                } else {
                  this.$router.go(0)
                }
              } else {
                this.changtoast(res.data.message, "error")
              }
            })
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
@import "./style/yjfb.scss";
</style>
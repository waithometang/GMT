<template>
  <div class="login">
    <div class="logo">
      <img src="./images/logo.png" />
    </div>
    <div class="input_div">
      <div class="input_box">
        <img src="./images/zh.png" />
        <input
          v-model="username"
          class="input"
          type="text"
          placeholder="请输入用户名"
        />
      </div>
      <div class="input_box">
        <img src="./images/mm.png" />
        <input
          v-model="password"
          class="input"
          type="password"
          placeholder="请输入密码"
        />
      </div>
    </div>
    <div class="button">
      <van-button round type="info" color="#a3312f" @click="login"
        >登录</van-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    login() {
      this.$indicator.open("加载中...")
      this.$post("/api/mlgm/dbzsDlAsync", {
        username: this.username,
        password: this.password
      }).then(res => {
        this.$indicator.close()
        if (res.data.success) {
          if (res.data.content) {
            sessionStorage.setItem(
              "dbzsDlAsync",
              JSON.stringify(res.data.content)
            )
            this.$router.push({
              path: "/dbzs"
            })
          }
        } else {
          this.changtoast(res.data.message, "error")
        }
      })
    }
  },
  created() {
    this.$indicator.open("加载中...")
    this.$post("api/mlgm/dbzsWx").then(res => {
      this.$indicator.close()
      if (res.data.success) {
      } else {
        this.changtoast(res.data.message, "error")
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import "./style/login.scss";
</style>
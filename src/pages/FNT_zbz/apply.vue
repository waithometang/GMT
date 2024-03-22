<template>
  <div class="main">
    <form>
      <div class="input-all">
        <div class="input-title-body">
          <div class="input-title">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</div>
          <input type="text" v-model="xm" placeholder="请输入您的真实姓名" class="input-body" />
        </div>
        <div class="input-title-body">
          <div class="input-title">认领类型:</div>
          <select v-model="rllx" class="select-body">
            <option :value="item.id" v-for="item in couponList" :key="item.id">{{item.name}}</option>
          </select>
        </div>
        <div class="input-title-body">
          <div class="input-title">联系方式:</div>
          <input v-model="lxdh" type="text" placeholder="请输入您的联系方式" class="input-body" />
        </div>
        <!-- <div class="input-title-body">
          <div class="input-title">验&nbsp;&nbsp;证&nbsp;&nbsp;码:</div>
          <input type="text" name id value placeholder="请输入短信验证码" class="input-body" />
          <div class="yzm">获取验证码</div>
        </div> -->
      </div>
      <div class="input-button" @click="submit">确认认领</div>
    </form>
  </div>
</template>
<script>
import { Rlwxy } from "@/api/FNTApi"
export default {
  data() {
    return {
      xm: "",
      rllx: "",
      lxdh: "",
      couponList: [ { id: "1", name: "匿名认领" }, { id: "2", name: "公开认领" } ],
      couponSelected: ""
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    submit() {
      if (!this.xm) {
        this.changtoast('请输入姓名', 'error')
        return
      }
      if (!this.rllx) {
        this.changtoast('请输入认领类型', 'error')
        return
      }
      if (!this.lxdh) {
        this.changtoast('请输入联系方式', 'error')
        return
      }
      let that = this
      this.MessageBox({
        content: '是否确认认领',
        success: function () {
          that.submits()
        },
        failStata: true
      })
    },
    submits(){
      Rlwxy({
        id: this.id,
        xm: this.xm,
        rllx: this.rllx,
        lxdh: this.lxdh
      }).then(rps => {
        if (rps.data.success) {
          this.changtoast('认领成功')
          this.$router.go(-1)
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  },
  created() {
    //如果没有这句代码，select中初始化会是空白的，默认选中就无法实现
    this.rllx = this.couponList[0].id;
  }
};
</script>
<style lang="scss" scoped>
@import './style/apply.scss';
</style>

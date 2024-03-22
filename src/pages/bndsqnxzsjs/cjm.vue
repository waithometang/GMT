<template>
  <div class="cjm">
    <div class="bg">
      <div class="title">
        <img src="./image/title.png" alt="" />
        <div class="title-text">我的抽奖码</div>
      </div>
      <div class="content">
        <div v-if="cjms.length > 0">
          <div v-for="(item, index) in cjms" :key="index" class="item">
            {{ item }}
          </div>
        </div>
        <div class="none" v-else>
          <img src="./image/nocjm.png" alt="" />
          <div>您还没有获得抽奖码哦~</div>
        </div>
        <div class="tips">开奖日期为：8月14号，请关注XXXXX</div>
      </div>
      <div class="btn" @click="retHdym">返回活动页面</div>
    </div>
  </div>
</template>
<script>
import { GetCjm } from "@/api/DsjsApi";
export default {
  data () {
    return {
      cjms: []
    }
  },
  created () {
    this.init()// 初始化页面数据
  },
  methods: {
    retHdym () {
      this.$router.push("/bndsqnx")
    },
    init () {
      this.$indicator.open('数据加载中...')
      GetCjm().then(t => {
        console.log(t);
        this.$indicator.close()
        // this.cjms=t. ????这里补充全代码
      });
      //     this.cjms = res.data.content
      //     this.cjms.forEach((element, index) => {
      //       this.cjms[index] = (Array(5).join(0) + element).slice(-5)
      //     });
    }
  },
}
</script>

<style lang="scss" scoped>
@import './style/cjm.scss';
</style>

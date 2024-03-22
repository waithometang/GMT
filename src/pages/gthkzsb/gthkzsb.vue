<template>
  <div class="gthkzsb" v-if="state">
    <div class="select">
			<div :class="{'cor1': $route.name === 'sbfrom'}" @click="select(1)">开始申购</div>
			<div :class="{'cor1': $route.name === 'sblist'}" @click="select(2)">申购记录</div>
		</div>
		<div class="content">
      <router-view />
		</div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import { Dialog } from 'vant';

export default {
  data () {
    return {
      state:  false
    }
  },
  methods: {
    ...mapActions(['getGrxx']),
    select (item) {
      if (item === 1) {
        Dialog.alert({
              title: '温馨提示',
              confirmButtonText:'确定',
              confirmButtonColor:'#00bede',
              message: '各个体工商户：目前市场上口罩等防疫物资供应已较为充足，个体工商户口罩申购平台于3月24日起暂停预约申请，请知悉。'
            }).then(() => {});
      return
        this.$router.push('/gthkzsb')
      } else {
        this.$router.push('/sblist')
      }
    }
  },
  created () {
    this.$indicator.open()
    this.getGrxx().then(grxx=>{
      this.$indicator.open('数据加载中')
      if(!grxx.hasWJ){
        Dialog.alert({
          title: '温馨提示',
          confirmButtonText:'知道了',
          confirmButtonColor:'#00bede',
          message: '您还没有通行证,请先获取通行证'
        }).then(() => {
          this.$router.replace('/ewm')
          return
        });
      } else {
        this.state = true
      }
    })
  }
}
</script>

<style lang='scss' scoped>
@import "@/style/FirstLevelPage/select.scss";
.gthkzsb {
	.content {
		position: absolute;
		top: 84px;
		bottom: 0;
		left: 0;
		right: 0;
	}
}
</style>
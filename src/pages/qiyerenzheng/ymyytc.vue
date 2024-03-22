<template>
  <div class="container">
    <transition name="fade">
      <div class="overlay" v-show="showDialog">
        <div class="dialog">
          <div class="icon" @click="close">
            <img src="./img/close.png" alt="" />
          </div>
          <div class="tips">温馨提示</div>
          <div class="title">暂无您的企业疫苗接种人员登记信息</div>
          <div class="mark">
            请联系您的企业认证负责人<br />获取企业二维码进行扫码登记
          </div>
          <div class="btn" @click="confirm">确定</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: '',
  components: {

  },
  props: {

  },
  data () {
    return {
      showDialog: true
    };
  },
  computed: {

  },
  watch: {

  },
  created () {

  },
  mounted () {

  },
  methods: {

  },
};
</script>

<style scoped lang="scss">
@import './style/ymyytc.scss';
</style>

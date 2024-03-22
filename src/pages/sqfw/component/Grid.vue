<template>
  <div class="container">
    <van-grid :border="false">
      <van-grid-item
        v-for="(item, index) in gridData"
        :key="index"
        :icon="item.img"
        :text="item.text"
        @click="goTo(item.url)"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  data () {
    return {
      gridData: [
        {
          img: require("../images/sqdt.png"),
          text: "社区动态",
          url: `/sqfw/sqdtlb/${this.$route.params.vid}`
        },
        {
          img: require("../images/sqhd.png"),
          text: "社区活动",
          url: "/PartyActivity_index"
        },
        {
          img: require("../images/xqfb.png"),
          text: "需求发布",
          url: `/sqfw/xqfb/${this.$route.params.vid}`
        },
        {
          img: require("../images/gxwp.png"),
          text: "共享物品",
          url: `/sqfw/gxwp/${this.$route.params.vid}`
        }
      ]
    }
  },
  props: ["vid"],
  methods: {
    goTo (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../style/grid.scss';
</style>
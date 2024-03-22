<!-- 全局滚动组件 阻止下拉暴露域名来源 -->
<template>
  <div class="BetterScroll">
    <!-- 滚动区域 -->
    <div class="ScrollArea" ref="BetterScroll">
      <div class="ScrollConent">
        <!-- 卡槽 用来插入文本 -->
        <slot name="BetterScroll"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  props: {
    /** 点击列表是否派发click事件 */
    click: {
      type: Boolean,
      default: true
    },
    /** 是否派发滚动到底部的事件，用于上拉加载 */
    pullup: {
      type: Boolean,
      default: false
    },
    /** 是否派发顶部下拉的事件，用于下拉刷新 */
    pulldown: {
      type: Boolean,
      default: false
    },
    /** 是否开启数据加载loading */
    loading: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      /** 列表数据 */
      ListData: [],
      /** 数据是否加载完毕 */
      NotData: false,
      /** 页面 */
      PageIndex: 1,
      /** 数量 */
      PageSize: 10,
      /** 是否显示数据加载loading */
      ShwoLoading: false
    }
  },

  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.SetBScroll();
      }, 0);
    });
  },

  methods: {
    /** 初始化better-scroll 实时派发事件 */
    SetBScroll() {
      /** 初始化better-scroll */
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.BetterScroll, {
          click: this.click,
          probeType: 2
        });
      }

      /** 是否派发顶部下拉事件 下拉刷新 */
      if (this.pulldown) {
        this.scroll.on("touchEnd", pos => {
          /** 下拉动作 */
          if (pos.y > 50) {
            console.log("下拉刷新");
          }
        });
      }

      /** 是否派发滚动到底部事件 上拉加载 */
      if (this.pullup) {
        this.scroll.on("scrollEnd", () => {
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            console.log("上拉加载");
          }
        });
      }

      /** 监听滚动区域开始滚动 */
      this.scroll.on("scroll", (pos) => {
        // this.$store.commit('Set_scolleTop', pos.y)
      })
    },

    /** 上拉刷新事件 */
    SetPulldown() {},

    /** 下拉加载事件 */
    Setpullup() {},

    /** 获取列表数据 */
    GetListData() {}
  }
};
</script>

<style lang='scss' scoped type="text/css">
.BetterScroll {
  .ScrollArea {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  } 
}
</style>

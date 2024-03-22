<template>
  <div class="dxs">
    <div class="zpzl">
      <img src="/static/zkbm/zpzlbanner.png" />
    </div>
    <div class="dxs_box">
      <div class="list">
        <dl
          v-for="(item, index) in dxlist"
          :key="index"
          @click="() => demo(index)"
        >
          <dt>
            <img :src="item.image" alt />
          </dt>
          <dd>
            <p>{{ item.title }}</p>
            <p>{{ item.bydate }}</p>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dxlist: [
        { image: "/static/zkbm/wybk.png", title: '村(社区)工作人员招聘报名', bydate: '点击进行报考' },
        { image: "/static/zkbm/jswybk.png", title: '教师招聘报名', bydate: '点击进行报考' },
        { image: "/static/zkbm/zpxx.png", title: '招聘信息', bydate: '点击查看各类招聘信息' },
      ]
    };
  },
  created () {
    this.$showSubscribe().then(res => {
    })
  },
  methods: {
    demo (i) {
      if (i === 0) {
        this.changtoast("系统维护中，请稍后", 'error')
      } else {
        let urls = ['/zkbm', '/jszp', '/xzgz']
        this.$router.push(urls[i])
      }
    }
  },
};
</script>

<style lang='scss' scoped>
@import '../dxs/style/dxs.scss';
.dxs {
  background-color: #308cfb;
}
.dxs_box {
  background-image: none;
  position: relative;
  z-index: 20;
  padding-top: 10px;
}
.zpzl {
  // position: fixed;
  z-index: 10;
  img {
    width: 100%;
  }
}
</style>
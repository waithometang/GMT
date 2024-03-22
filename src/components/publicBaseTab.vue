<template>
  <div class="publicBaseTab">
    <div class="base-tab-list">
      <div class="base-tab" v-for="(item, index) in listData" :key="index" @click="clickTab(item)">
        <div class="base-tab-icon"><img :src="$route.meta.baseTabState === item.state ? item.icon : item.icon_y" alt=""></div>
        <div class="base-tab-name" :class="{'base-tab-name-action': $route.meta.baseTabState === item.state}">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      listData: [
        {name: '首页', url: '/index', icon: '/static/newEditionIndex/base_icon_1.png', icon_y: '/static/newEditionIndex/base_icon_1_y.png', state: 1},
        {name: '互动', url: '/hd', icon: '/static/newEditionIndex/base_icon_2.png', icon_y: '/static/newEditionIndex/base_icon_2_y.png', state: 2},
        {name: '更多', url: '/gd', icon: '/static/newEditionIndex/base_icon_3.png', icon_y: '/static/newEditionIndex/base_icon_3_y.png', state: 3},
        {name: '我的', url: '/wd', icon: '/static/newEditionIndex/base_icon_4.png', icon_y: '/static/newEditionIndex/base_icon_4_y.png', state: 4}
      ]
    }
  },
  methods: {
    clickTab (item) {
      this.$router.push(item.url)
    }
  }
}
</script>
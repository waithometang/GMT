<template>
  <div class="vote">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <div class="voteTab">
      <div class="tab-list">
        <div class="tab" @click="clickTab(1)">
          <div class="icon">
            <img
              :src="
                tabState === 1
                  ? '/static/vote/home_yes.png'
                  : '/static/vote/home.png'
              "
              alt=""
            />
          </div>
          <div class="name" :class="{ 'name-action': tabState === 1 }">
            首页
          </div>
        </div>
        <div class="tab" @click="clickTab(2)">
          <div class="icon">
            <img
              :src="
                tabState === 2
                  ? '/static/vote/xiang_yes.png'
                  : '/static/vote/xiang.png'
              "
              alt=""
            />
          </div>
          <div class="name" :class="{ 'name-action': tabState === 2 }">
            详情
          </div>
        </div>
        <div class="tab" @click="clickTab(3)">
          <div class="icon">
            <img
              :src="
                tabState === 3
                  ? '/static/vote/pai_yes.png'
                  : '/static/vote/pai.png'
              "
              alt=""
            />
          </div>
          <div class="name" :class="{ 'name-action': tabState === 3 }">
            排名
          </div>
        </div>
      </div>
    </div>
    <vote v-if="voteMessage" />
    <icon v-if="showIcon" />
  </div>
</template>

<script>
import vote from './component/vote'
import icon from './component/icon'
export default {
  components: {
    vote,
    icon
  },
  computed: {
    tabState () {
      return this.$store.state.buttomTab
    },
    voteMessage () {
      return this.$store.state.voteMessage
    },
    showIcon () {
      return this.$store.state.showIcon
    },
    ruleInfo () {
      return this.$store.state.ruleInfo
    },
  },
  methods: {
    clickTab (item) {
      this.$store.commit('SetbuttomTab', item)
      switch (item) {
        case 1:
          this.$router.required
          this.$router.replace('/mlgm/votenew?t='+new Date().getTime())
          break;
        case 2:
          this.$router.replace('/mlgm/vote/particulars')
          break;
        case 3:
          this.$router.replace(`/mlgm/vote/ranking?hdxx_Id=${this.ruleInfo.hdxx_id}`)
          break;
        default:
          break;
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('SetmessageBut', false)
    this.$store.commit('SetvoteMessage', false)
    this.$store.commit('SetshowIcon', false)
    next()
  },
}
</script>

<style lang='scss' scoped>
@import './style/vote.scss';
</style>
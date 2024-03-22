<template>
  <div class="memberList">
    <div class="list">
      <div class="no-data" v-if="listData.length <= 0">暂无数据</div>
      <div class="list-tab" v-for="(item, index) in listData" :key="index" v-else>
        <div class="tab-top">
          <div class="ranking" v-if="showRanking">
            <img v-if="index == 0" src="/images/partyintegral/NO1.png" alt="">
            <img v-else-if="index == 1" src="/images/partyintegral/NO2.png" alt="">
            <img v-else-if="index == 2" src="/images/partyintegral/NO3.png" alt="">
            <span v-else>{{index+1}}</span>
          </div>
          <div class="top-icon" @click="changePages(item)">
            <img :src="item.photo ? item.photo :' /images/yuangong-ling_01.png'" alt="">
          </div>
          <div class="top-title">
            <div class="name-duty">
              <div class="name-tel">
                <div class="name" @click="changePages(item)">{{item.name}}</div>
                <div class="tel" v-if="showtels && showTel">
                  <a :href="'tel:' + item.tel">
                    <div class="tel-but">
                      联系他
                      <img src="/images/tel.png" alt="">
                    </div>
                  </a>
                </div>
              </div>
              <div class="duty" v-if="item.gzzw" @click="changePages(item)">职务:  {{item.gzzw}}</div>
              <div class="duty" v-if="item.dnzw" @click="changePages(item)">党内职务:  {{item.dnzw}}</div>
              <div class="duty" v-if="item.xzzw" @click="changePages(item)">村委职务:  {{item.xzzw}}</div>
              <div class="duty" v-if="showtels && showTel" @click="changePages(item)">联系电话: {{item.tel}}</div>
            </div>
            <div class="title-icon" @click="changePages(item)">
              <img src="/images/icon_enter@2x.png" alt="">
            </div>
          </div>
        </div>
        <div class="tab-bottom" v-if="item.wddt != null && item.wddt.length >= 1">
          <div class="bottom-title" :class="{'bottom-top': index > 0}" v-for="(item, index) in item.wddt.slice(0, 2)" :key="index" @click="skipPages(item)">{{item.title}}</div>
        </div>
        <div class="tab-bottom" v-else>
          <div class="bottom-title">最近暂无新发布</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex"

export default {
  props: {
    listData: {
      type: Array
    },
    showTel: {
      type: Boolean,
      default: false
    },
    showRanking: {
      type: Boolean,
      default: false
    },
    post: {
      type: String,
      default: '委'
    },
  },
  computed: {
    userinfo () {
      return this.$store.state.userinfo
    },
    vid () {
      return  Number(this.$route.params.vid)
    }
  },
  data () {
    return {
      showtels: false
    }
  },
  methods: {
    ...mapActions(['getGrxx']),
    changePages (item) {
      this.$emit('changePages', item)
    },
    skipPages (item) {
      this.$router.push(`/nrfbxx/${item.mk}/${item.fbid}`)
    }
  },
  created () {
    this.getGrxx().then (Grxx => {
      if (Grxx.isGwy) {
        this.showtels = true
      } else {
        if (Grxx.id == this.vid) {
          this.showtels = true
        }
      }
    })
  }
};
</script>

<style lang="scss" scoped type="text/css">
@import '@/style/components/secondLevelPages/homePage/memberList.scss';
</style>


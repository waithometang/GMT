<template>
  <div class="VillageSupervision">
    <BetterScroll>
      <template slot="BetterScroll">
        <div class="hread"></div>
        <div class="main">
          <div class="list">
            <div
              @click="goto(0)"
              @touchstart="changeType = 1"
              @touchend="changeType = 0"
              :class="{ action: changeType == 1 }"
            >
              <img src="/images/FirstLevelPage/FinancePublic_icon.png" />
              <span>财务公开</span>
            </div>
            <div
              @click="goto(1)"
              @touchstart="changeType = 2"
              @touchend="changeType = 0"
              :class="{ action: changeType == 2 }"
            >
              <img src="/images/FirstLevelPage/Funded_icon.png" />
              <span>集体三资管理</span>
            </div>
            <div
              @click="goto(2)"
              @touchstart="changeType = 3"
              @touchend="changeType = 0"
              :class="{ action: changeType == 3 }"
            >
              <img src="/images/FirstLevelPage/PovertyRelief_icon.png" />
              <span>涉农惠农资金</span>
            </div>
            <div
              @click="goto(3)"
              @touchstart="changeType = 4"
              @touchend="changeType = 0"
              :class="{ action: changeType == 4 }"
            >
              <img src="/images/FirstLevelPage/complaint_icon.png" />
              <span>我要投诉</span>
            </div>
            <div
              @click="goto(4)"
              @touchstart="changeType = 5"
              @touchend="changeType = 0"
              :class="{ action: changeType == 5 }"
            >
              <img src="./images/project_icon.png" />
              <span>工程监督</span>
            </div>
          </div>
        </div>
      </template>
    </BetterScroll>
  </div>
</template>
<script>
import BetterScroll from '@/components/BetterScroll'

export default {
  data() {
    return {
      changeType: 0
    }
  },
  components: {
    BetterScroll
  },
  methods: {
    goto(list) {
      if (list == 0) {
        this.$router.push({
          path: '/FinancePublic'
        })
      } else if (list == 1) {
        this.$router.push({
          path: '/Funded'
        })
      } else if (list == 2) {
        this.$router.push({
          path: '/PovertyRelief'
        })
      } else if (list == 3) {
        window.location = 'http://ygcwjd.gaoming.gov.cn/gmwx/Report/Create2'
      } else if (list == 4) {
        this.$router.push('/project')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.VillageSupervision {
  margin: 0;
  padding: 0;
  .hread {
    width: 749px;
    height: 397px;
    background-image: url('/images/FirstLevelPage/bg_01.jpg');
    background-size: 100% 100%;
  }
  .main {
    background-image: url('/images/FirstLevelPage/bg_02.jpg');
    background-size: 100% 100%;
    height: 934px;
    width: 750px;
    .list {
      margin-top: -105px;
      .action {
        background: #999999;
      }
      div {
        width: 670px;
        height: 140px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 20px 0px rgba(60, 205, 172, 0.35);
        border-radius: 10px;
        margin: auto;
        display: flex;
        align-items: center;
        margin-bottom: 24px;
        img {
          width: 82px;
          height: 82px;
          vertical-align: middle;
          margin-right: 27px;
          margin-left: 198px;
        }
        span {
          font-size: 32px;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
  }
}
</style>

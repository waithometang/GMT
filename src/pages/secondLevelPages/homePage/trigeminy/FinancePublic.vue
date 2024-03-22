<template>
  <div class="FinancePublic">
    <BetterScroll>
      <template slot="BetterScroll">
        <div class="hread">
          <img src="/images/FirstLevelPage/FinancePublic_banner.jpg">
        </div>
        <div class="main">
          <div class="title">
            <div></div>及时公开
          </div>
          <div class="item">
            <div @click="goto(0)" class="list">
              <span>征地款收入情况公布表</span>
              <img src="/images/secondLevelPages/guideIcon.png">
            </div>
            <div @click="goto(1)" class="list">
              <span>村集体资金分配情况公布表</span>
              <img src="/images/secondLevelPages/guideIcon.png">
            </div>
            <div @click="goto(2)" class="list">
              <span>一事一议筹资筹劳情况公布表</span>
              <img src="/images/secondLevelPages/guideIcon.png">
            </div>
          </div>
        </div>
        <div class="main">
          <div class="title">
            <div></div>月度公开
          </div>
          <div class="item">
            <div @click="goto(3)" class="list">
              <span>现金银行存款明细公布表</span>
              <img src="/images/secondLevelPages/guideIcon.png">
            </div>
            <div @click="goto(4)" class="list">
              <span>应收款明细公布表</span>
              <img src="/images/secondLevelPages/guideIcon.png">
            </div>
            <div @click="goto(5)" class="list">
              <span>应付款明细公布表</span>
              <img src="/images/secondLevelPages/guideIcon.png">
            </div>
            <div @click="goto(6)" class="list">
              <span>财务收支公布表</span>
              <img src="/images/secondLevelPages/guideIcon.png">
            </div>
            <div @click="goto(7)" class="list">
              <span>政府下拨专项经费收支情况公布表</span>
              <img src="/images/secondLevelPages/guideIcon.png">
            </div>
          </div>
        </div>
        <div class="main">
          <div class="title">
            <div></div>季度公开
          </div>
          <div class="item">
            <div @click="goto(8)" class="list">
              <span>公共服务支出情况分析表</span>
              <img src="/images/secondLevelPages/guideIcon.png">
            </div>
          </div>
        </div>
        <div class="main">
          <div class="title">
            <div></div>年度公开
          </div>
          <div class="item"></div>
        </div>
      </template>
    </BetterScroll>
  </div>
</template>
<script>
import {mapActions} from "vuex"
import BetterScroll from '@/components/BetterScroll'

export default {
  components: {
    BetterScroll
  },
  methods: {
    ...mapActions(['getGrxx']),
    async goto(t) {
      let grxx = await this.getGrxx()
      if (!grxx || !grxx.hasSM) {
        this.changtoast("请先实名认证", "info")
        this.$router.replace("Certification")
        return;
      }
      this.$router.push({
        path: "/Announcement",
        query: {
          type: t
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.FinancePublic {
  margin: 0;
  padding: 0;
  background: #ffffff;
  .hread {
    width: 750px;
    height: 200px;
    text-align: center;
    line-height: 200px;
    margin-bottom: 40px;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .main {
    width: 750px;
    .title {
      padding-top: 25px;
      width: 750px;
      height: 28px;
      font-size: 28px;
      font-weight: bold;
      color: rgba(55, 157, 234, 1);
      border-bottom: 1px solid;
      padding-bottom: 25px;
      border-color: #f4f4f4;
      display: flex;
      align-items:center;
      div {
        height: 28px;
        width: 8px;
        background: rgba(55, 157, 234, 1);
        border-radius: 8px;
        vertical-align: middle;
        margin-left: 22px;
        margin-right: 22px;
      }
    }
    .item {
      width: 750px;
      font-size: 27px;
      .list {
        border-bottom: 1px solid;
        border-color: #f4f4f4;
        padding-left: 25px;
        width: 725px;
        height: 90px;
        line-height: 90px;
        span {
          width: 650px;
          display: inline-block;
        }
        img {
          margin-left: 22px;
          height: 25px;
          vertical-align: middle;
          display: inline-block;
        }
      }
    }
  }
}
</style>

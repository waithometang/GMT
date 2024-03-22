<template>
  <div class="hdgz">
    <div class="bg">
      <div class="title">
        <img src="./image/title.png" alt="" />
        <div class="title-text">活动规则</div>
      </div>
      <div class="content">
        <div class="item">
          <span class="spot">1.</span>
          开始时间：2021年<span class="red">8月9日</span>00:00
        </div>
        <div class="item">
          <span class="spot">2.</span> 截止时间：2021年<span class="red"
            >8月19日</span
          >24:00
        </div>
        <div class="item">
          <span class="spot">3.</span> 开奖及推文<span class="red"
            >公布中奖人员时间</span
          >：2021年 8月20日
        </div>
        <div class="item">
          <span class="spot">4.</span> 通知中奖人员并代付订单时间：2021年
          8月20-23日
        </div>
        <div class="item">
          <span class="spot">5.</span> 参加者需关注<span class="red"
            >公众号“高明通”</span
          >，点击“进入高明”，进入“大学生人才”，在大学生人才信息平台<span
            class="red"
            >填报个人信息完成</span
          >“信息认证”，然后在“活动有你”页面参与“百年党史青年学”党史知识竞赛，完成答题后才可参与线上抽奖。已完成信息认证的大学生可直接参与答题。
        </div>
        <div class="item">
          <span class="spot">6.</span
          >答题题目从题库中随机抽取，若在答题过程中切换其它页面，则答题重新开始。
        </div>
        <div class="item">
          <span class="spot">7.</span>
          系统随机出10道题，答题时间为5分钟。答对一题得10分，总分为100分。完成答题后即可获得抽奖码进行抽奖，每人获得的抽奖码数量根据答题的正确率进行划分。
        </div>
        <div class="table-img">
          <div class="table-item">
            <span class="table-left">正确率</span
            ><span class="table-right">抽奖码数量</span>
          </div>
          <div class="table-item">
            <span class="table-left">90分-100分(9-10题)</span
            ><span class="table-right">5个</span>
          </div>
          <div class="table-item">
            <span class="table-left">60分-80分(6题-8题)</span
            ><span class="table-right">3个</span>
          </div>
          <div class="table-item">
            <span class="table-left">40分-50分(4题-5题)</span
            ><span class="table-right">1个</span>
          </div>
          <div class="table-item">
            <span class="table-left">40分以下</span
            ><span class="table-right">0个</span>
          </div>
        </div>
        <div class="item">
          <span class="spot">8.</span>
          抽奖结果公布后，中奖者依据所中的奖项，在任何可以代付的网购平台，根据个人喜好选择在中奖金额范围内（含邮费）的商品加入购物车，工作人员在核实其身份后，代付订单。奖项不能以现金形式发放，逾期让工作人员代付订单视为放弃。
        </div>
        <div class="item">
          <span class="spot">9.</span>
          <span class="red"
            >中奖名额共21个，其中500元惊喜奖1个，300元特等奖2个，200元一等奖3个，100元二等奖5个，50元三等奖10个</span
          >
        </div>
        <div class="item">
          <span class="spot last-spot">10</span>
          .如果遇到任何问题请拨打团务股电话:
          <span class="blue">88828986</span>，工作人员会及时为您解决
        </div>
      </div>
      <!-- <div class="btn" @click="toCompetition">我要参加答题</div> -->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  created () {

  },
  methods: {
    toCompetition () {
      this.$router.push("/bndsqnx/competition")
    }
  },
}
</script>

<style lang="scss" scoped>
@import './style/hdgz.scss';
</style>
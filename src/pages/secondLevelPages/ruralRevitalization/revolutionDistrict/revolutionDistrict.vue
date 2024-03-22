<!-- 精准帮扶首页 -->
<template>
  <div class="revolutionDistrict">
    <div class="haedIcon">
      <img src="/images/secondLevelPages/banner.png">
    </div>
    <div class="content">
      <div class="MyApplication" @click="switchoverPages">
        <div class="icon">
          <img src="/images/secondLevelPages/icon.png">
        </div>
        <div class="name">我的申请信息</div>
        <div class="guideIcon">
          <img src="/images/secondLevelPages/guideIcon.png">
        </div>
      </div>
      <div class="GroupProject">
        <div class="iconName">
          <div class="icon"></div>
          <div class="name">群团项目</div>
        </div>
        <div class="logoName">
          <ul>
            <li>
              <div class="logo">
                <img src="/images/secondLevelPages/Imgaes_02.png">
              </div>
              <div class="name">
                工会
              </div>
            </li>
            <li>
              <div class="logo">
                <img src="/images/secondLevelPages/Imgaes_02.png">
              </div>
              <div class="name">
                团委
              </div>
            </li>
            <li>
              <div class="logo">
                <img src="/images/secondLevelPages/Imgaes_03.png">
              </div>
              <div class="name">
                妇联
              </div>
            </li>
            <li>
              <div class="logo">
                <img src="/images/secondLevelPages/Imgaes_06.png">
              </div>
              <div class="name">
                残联
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="GroupProject">
        <div class="iconName">
          <div class="icon"></div>
          <div class="name">部门项目</div>
        </div>
        <div class="logoName">
          <ul>
            <li>
              <div class="logo">
                <img src="/images/secondLevelPages/Imgaes_01.png">
              </div>
              <div class="name">
                扶贫办
              </div>
            </li>
            <li v-for="(item, index) in 5" :key="index">
              <div class="logo">
                <img src="/images/secondLevelPages/Imgaes_04.png">
              </div>
              <div class="name">
                民族
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="NoticeBulletin">
        <div class="iconName">
          <div class="icon"></div>
          <div class="name">通知公告</div>
        </div>
        <div class="titleIcon">
          <div class="titmeimgaes" v-for="(item, index) in 3" :key="index">
            <div class="imgaes">
              <img src="/images/secondLevelPages/Imgaes_05.png">
            </div>
            <div class="titleTime">
              <div class="title">关于利成明日嘉园二区、三区单体建筑设...</div>
              <div class="time">[2018-08-15]</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    switchoverPages () {
      this.$router.push({
        path: '/revolutionDistrictparticulars'
      })
    }
  }
}
</script>

<style lang='scss'>
@import '@/style/pages/secondLevelPages/ruralRevitalization/revolutionDistrict.scss';
</style>

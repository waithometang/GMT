<!-- 建房管控 -->
<template>
  <div class="HousingManagement">
    <div class="head">
      <img src="/images/secondLevelPages/banner2.jpg">
    </div>
    <div class="tagList">
      <div class="list">
        <ul>
          <li>
            <div class="images">
              <img src="/images/secondLevelPages/images_04.png">
            </div>
          </li>
          <li>
            <div class="images">
              <img src="/images/secondLevelPages/images_01.png">
            </div>
          </li>
          <li>
            <div class="images">
              <img src="/images/secondLevelPages/images_02.png">
            </div>
          </li>
          <li>
            <div class="images">
              <img src="/images/secondLevelPages/images_05.png">
            </div>
          </li>
        </ul>
      </div>
      <div class="tag">
        <div class="buttom">
          <div class="but" :class="{'action': type == 1}" @click="chandeStata(1)">建房规定</div>
          <div class="but" :class="{'action': type == 2}" @click="chandeStata(2)">通知公告</div>
        </div>
      </div>
    </div>
    <div class="contentList">
      <div class="content">
        <div class="dataList" v-for="(item, index) in 6" :key="index">
          <div class="left">
            <img src="/images/secondLevelPages/images_03.png">
          </div>
          <div class="right">
            <div class="title">{{title}}</div>
            <div class="timeNumber">
              <div class="timeIcon">
                <div class="time">
                  <img src="/images/img_13.png">
                </div>2018-12-31
              </div>
              <div class="numberIcon">
                <div class="unmber">
                  <img src="/images/img_11.png">
                </div>1000 阅读
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 1,
      title: "高明[2018] 48号高明区规划局建房规..."
    };
  },
  methods: {
    chandeStata(item) {
      this.type = item;
      if (item == 1) {
        this.title = "高明[2018] 48号高明区规划局建房规...";
      } else {
        this.title = "高明2018年第48号建房管控通知公告....";
      }
    }
  }
};
</script>

<style lang='scss' type="text/css" scoped>
@import '@/style/pages/secondLevelPages/ruralRevitalization/HousingManagement.scss'
</style>

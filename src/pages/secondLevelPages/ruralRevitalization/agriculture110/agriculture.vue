<!-- 农技110 二级页面 -->
<template>
  <div class="agriculture">
    <head-images :ButtomTageState="6"></head-images>
    <div class="tag" v-if = 'false'>
      <div class="tagButtom">
        <div class="buttom" :class="{'action': stateType == 1}" @click="changeState(1)">技术指导</div>
        <div class="buttom" :class="{'action': stateType == 2}" @click="changeState(2)">农技专家</div>
      </div>
    </div>
    <div class="listData">
      <div class="guidance" v-for="(item, index) in 7" :key="index" v-show="stateType == 1">
        <div class="nameIcon">
          <div class="images">
            <img src="/images/FirstLevelPage/default.jpg">
          </div>
          <div class="titleTime">
            <div class="title">规模猪场如何合理的淘汰母猪规模猪场如何合理的淘汰母猪规模猪场如何合理的淘汰母猪</div>
            <div class="time">
              <div class="icon">
                <img src="/images/FirstLevelPage/time.png">
              </div>2018-08-14
            </div>
          </div>
        </div>
      </div>
      <div class="specialist" v-show="stateType == 2">
        <div class="content">
          <div class="synopsis" v-for="(item, index) in 5" :key="index">
            <div class="head">
              <div class="icons">
                <img src="/images/FirstLevelPage/Headportrait.png">
              </div>
              <div class="nameSpecialty">
                <div class="namePohone">
                  <div class="nameSex">徐明成
                    <span>男</span>
                  </div>
                  <div class="pohone">
                    <div class="title">联系他</div>
                    <div class="icon">
                      <img src="/images/FirstLevelPage/Contact.png">
                    </div>
                  </div>
                </div>
                <div class="Specialty">茶叶</div>
              </div>
            </div>
            <div class="base">
              1993年7月毕业于浙江农业大学茶叶专业，现任区经济特
              产站站长，从事经济特产工作20余年，在茶叶种植方面具
              有丰富的实践经验。
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadImages from "@/components/headImages";

export default {
  components: {
    HeadImages
  },
  data () {
    return {
      stateType: 1
    }
  },
  methods: {
    changeState(item) {
      this.stateType = item
    }
  }
};
</script>

<style lang="scss" scoped type="text/css">
@import "@/style/pages/secondLevelPages/agriculture110/agriculture.scss";
</style>

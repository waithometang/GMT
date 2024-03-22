<template>
  <div class="BottomTag" v-show="hidShow">
    <div class="list">
      <div class="iconName" @click="changeTagState(1)">
        <div class="icons">
          <img :src="ButtomTageState == 1 ? shouye_d : shouye">
        </div>
        <div class="name" :class="{'actios': ButtomTageState == 1}">首页</div>
      </div>
      <div class="iconName" @click="changeTagState(2)">
        <div class="icons">
          <img :src="ButtomTageState == 2 ? gaoming_d : gaoming">
        </div>
        <div class="name" :class="{'actios': ButtomTageState == 2}">走进高明</div>
      </div>
      <div class="iconName suqiu" @click="changeTagState(3)">
        <div class="icons">
          <img :src="ButtomTageState == 3 ? suqiu : suqiu_d">
        </div>
        <div class="name suqiu_font" :class="{'actios_suqiu': ButtomTageState == 3}">诉求反映</div>
      </div>
      <div class="iconName" @click="changeTagState(4)">
        <div class="icons"> 
          <img :src="ButtomTageState == 4 ? banshi_d:banshi">
        </div>
        <div class="name" :class="{'actios': ButtomTageState == 4}">我要办事</div>
      </div>
      <div   class="iconName" @click="changeTagState(5)">
        <div class="icons">
          <img :src="ButtomTageState == 5 ? geren_d : geren">
        </div>
        <div class="name" :class="{'actios': ButtomTageState == 5}">个人中心</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:["isblack"],
  data() {
    return {
      shouye: require("/images/shouye.png"),
      dangjian: require("/images/dangjian.png"),
      zhenxin: require("/images/zhenxin.png"),
      shouye_d: "/images/shouye-d.png",
      dangjian_d: "/images/dangjian-d.png",
      zhenxin_d: "/images/zhenxin-d.png",
      pingan: "/images/pingan.png",
      pingan_d: "/images/pingan-d.png",
      geren: require("/images/geren.png"),
      geren_d: "/images/geren-d.png",
      suqiu: "/images/suqiu.png",
      suqiu_d: "/images/suqiu-d.png",
      banshi: "/images/banshi.png",
      banshi_d: "/images/banshi_d.png",
      gaoming: "/images/gaoming.png",
      gaoming_d: "/images/gaoming_d.png",
      docmHeight: document.documentElement.clientHeight, // 默认屏幕高度
      showHeight: document.documentElement.clientHeight, // 实时屏幕高度
      hidShow: true // 显示或者隐藏footer
    };
  },

  computed: {
    ButtomTageState() {
      return this.$store.state.ButtomTageState;
    },
  },
  methods: {
    changeTagState(item) {
      this.$store.commit("Set_ButtomTageState", item);
      if(this.isblack==2){
        if (item != 2 && item != 4) {
          this.$router.go(-1);
        } else {
          if (item == 2) {
            window.location = "http://www.gaoming.gov.cn/lsgm/";
          }
        }
      } else {
        if (item == 2) {
          window.location = "http://www.gaoming.gov.cn/lsgm/";
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped type="text/css">
.BottomTag {
  background: #ffffff;
  position: fixed;
  bottom: 0px;
  z-index: 9999;
  .list {
    height: 120px;
    display: flex;
    .iconName {
      width: 155px;
      .icons {
        width: 100%;
        height: 65px;
        img {
          width: 46px;
          height: 46px;
          margin: 19px 0 0px 53px;
        }
      }
      .name {
        font-size: 28px;
        text-align: center;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(160, 160, 158, 1);
      }
      .suqiu_font {
        color: #ffffff;
      }
      .actios {
        color: #379dea;
      }
      .actios_suqiu {
        color: #ffffff;
      }
    }
    .suqiu {
      background: #379dea;
      border-radius: 50%;
      height: 120px;
      width: 130px;
      margin-top: -10px;
      padding-top: 10px;
      img {
        margin: 19px 0 9px 43px !important;
      }
    }
  }
}
</style>

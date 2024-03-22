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
          <img :src="ButtomTageState == 2 ? cunju_d : cunju">
        </div>
        <div class="name" :class="{'actios': ButtomTageState == 2}">村居通</div>
      </div>
      <div class="iconName" @click="changeTagState(3)">
        <div class="icons"> 
          <img :src="ButtomTageState == 3 ? qiye_d : qiye">
        </div>
        <div class="name" :class="{'actios': ButtomTageState == 3}">企业+</div>
      </div>
      <div   class="iconName" @click="changeTagState(4)">
        <div class="icons">
          <img :src="ButtomTageState == 4 ? wode_d : wode">
        </div>
        <div class="name" :class="{'actios': ButtomTageState == 4}">我的</div>
      </div>
    </div>
  </div>
</template>

<script>
import {storage} from "@/js/until";
export default {
  props:["isblack"],
  data() {
    return {
      shouye: "/images/shouye.png",
      shouye_d: "/images/shouye-d.png",
      cunju: '/images/cunju.png',
      cunju_d: '/images/cunju-d.png',
      qiye: '/images/qiye.png',
      qiye_d:'/images/qiye-d.png',
      wode: '/images/wode.png',
      wode_d:'/images/wode-d.png',
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
      if(item==2 && !storage.fetch('longData').data.id){
        this.$router.push({
          path: "/AreaSelection?from=cw"
        })
        return
      }
      this.$store.commit("Set_ButtomTageState", item);
      if(this.isblack==2){
        if (item != 2 && item != 4) {
          this.$router.go(-1);
					var href=window.location+""
				if(href.indexOf("index/001")!=-1){
				}else{
					this.$router.go(-1);
				}
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
      width: 187.5px;
      .icons {
        width: 100%;
        height: 65px;
		text-align: center;
        img {
          width: 46px;
          height: 46px;
          margin: 19px 0px 0px 0px;
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

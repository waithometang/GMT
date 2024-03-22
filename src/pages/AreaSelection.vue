<template>
  <div class="AreaSelection" v-if="list.length > 0">
    <img class="hread-img" src="/images/xuanz.jpg">
    <div class="title-font">请选择所在村居</div>
    <div class="pages" v-if="number==1">
      <div class="left-select">
        <div
          @click="select(index)"
          :class="{'cor1':type==index}"
          v-for="(item,index) in list"
          :key="index"
        >{{item.name}}</div>
      </div>
      <div class="right-select">
        <div
          v-for="(item,index) in list[type].children"
          :key="index"
          @click="selectVillage(item)"
          @touchstart="changeType = index"
          :class="{'action': index == changeType}"
        >{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { EntrancePageApi } from "@/api/FirstLevelPage";
import { storage, session_Storage } from "@/js/until";
import { mapActions } from "vuex";
export default {
  computed: {
    // 获取路径后return参数
    Isreturn() {
      return this.$route.query.Isreturn;
    },
    From() {
      return this.$route.query.from;
    }
  },
  data() {
    return {
      type: 0,
      list: [],
      projectName: {}, //选择组件的选择值改变而改变的值
      initData: "",
      istrue: true,
      number: 1,
      isdis: false,
      changeType: 99999
    };
  },
  created() {
    this._getEntrancePageData();
  },
  destroyed: function() {
    this.changeType = 99999;
  },
  methods: {
    ...mapActions(["GetuserInfo"]),
    // 获取镇街 村居数据
    _getEntrancePageData() {
      EntrancePageApi({}).then(rps => {
        // this.list = rps.data.content;
        rps.data.content.forEach(item => {
          if(item.id!==1870){
            this.list.push(item)
          }
        })
      });
    },
    // 切换镇街
    select(index) {
      this.type = index;
    },
    // 选择村居
    selectVillage(item) {
      let data = {
        name: item.name,
        id: item.id,
        type: 1
      };
      storage.save("longData", data);
      session_Storage.remove('NotReadNumber')
      this.$store.commit("Set_userinfo", storage.fetch("longData").data);
      this.$store.state.Main_wydsData = null; //清空未阅读数据
      if (this.Isreturn) {
        this.$store.state.V_Selected = {
          id: item.id,
          name: item.name
        };
      } else {
        if (this.From === "cw") this.$store.state.ButtomTageState = 2;
        this.$store.state.HeadImageBanner = null; //选择村居后清空banner，进入后重新获取
        this.$store.state.Temp_VillageIdChange = true; //临时变量，记录村居是否重新选择
			}
      this.GetuserInfo('get'); // 重新获取发布权限
      this.$router.back();
    },
    switchoverstate(item) {
      if (item == 2) {
        this.number = 2;
        window.location.href =
          "http://www.znzwoa.com/qyfw/weixin/Qyfw_Frame.aspx";
      }
      if (item == 1) {
        this.number = 1;
      }
    },
    goto() {
      window.location.href =
        "http://www.znzwoa.com/qyfw/weixin/Qyfw_Frame.aspx";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/FirstLevelPage/select.scss";
@import "@/style/Pages/AreaSelection.scss";
</style>

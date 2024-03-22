<!-- 精品体验 -->
<template>
  <div class="Boutique_experience">
    <div class="Boutique_experience_item">
      <div v-if="!data.videoSrc">
        <van-swipe :stop-propagation="false" :autoplay="3000" @change="onChange">
          <van-swipe-item
            v-for="(image, index) in imgList"
            :key="index"
            @click="()=>preview(imgList,index)"
          >
            <img v-lazy="image" />
            <!-- <van-image fit="none" :src="image" /> -->
          </van-swipe-item>
          <template slot="indicator">
            <div class="custom-indicator">{{ current + 1 }}/{{imgCount}}</div>
          </template>
        </van-swipe>
      </div>
      <div v-else>
        <video :src="data.videoSrc" controls></video>
      </div>
      <h4>{{data.xlzt}}</h4>
      <div class="line-one">
        <div class="tag">
          <van-tag
            plain
            v-for="(item,index) in getArr(data.xlbq)"
            :key="index"
            color="#e8e8e8"
            size="medium"
          >
            <span>{{item}}</span>
          </van-tag>
        </div>
      </div>
      <div class="line-two">
        <!-- 发布时间：{{data.fbsj}} -->
        <template v-if="data.sfyy===1">
          <span v-if="data.bmzt===3" class="successyy-color">
            <img src="../images/success.png" />本路线体验预约成功
          </span>
          <span v-else-if="data.bmzt===1" class="noyy-color">
            <img src="../images/感叹号.png" />您还没预约报名哦！
          </span>
          <span v-else-if="data.bmzt===2" class="successbm-color">本路线体验预约已报名</span>
          <span v-else-if="data.bmzt===4" class="failbm-color">本路线体验预约失败</span>
          <span class="view-appointment" v-if="data.bmzt===2||data.bmzt===3" @click="viewAppointment">点击查看预约详情>></span>
        </template>
      </div>
      <div class="line-three" v-if="data.sfyy===1">
        <span>
          <img src="../images/quota.png" />
          体验名额：{{data.tyme}}人
        </span>
        <span>
          <img src="../images/时钟.png" />
          活动日期：{{data.hdsj}}
        </span>
      </div>
      <!-- <div class="line-three" v-if="data.bmzt === 1">
        <p>
          <img src="../images/感叹号.png"/>
          体验预约报名截止时间：{{data.kssj}}至{{data.jssj}}
        </p>
      </div>-->

      <div class="line-four" v-if="data.bmzt===1 && data.sfyy===1">
        <p>
          <img src="../images/感叹号.png" />
          体验预约报名截止时间：{{data.kssj}}至{{data.jssj}}
        </p>
      </div>
      <div class="spilt" />
      <p class="content" v-html="data.xlms"></p>
    </div>
    <div
      class="appointment"
      v-if="data.sfyy===1 && data.bmzt ===1 && judgingTime(data.kssj,data.jssj) "
    >
      <van-button
        round
        type="info"
        size="large"
        color="rgba(255, 219, 37, 1)"
        :to="'/mlgm/jpty/wyyyty?id='+$route.params.id"
      >
        <span>
          <img src="../images/预约.png" />我要预约体验
        </span>
      </van-button>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import { WaChatrequireShare } from "@/js/WaChatrequireShare";
export default {
  data() {
    return {
      id: "",
      data: { xlfm: "", pics: [] },
      current: 0,
    };
  },
  methods: {
    getArr(val) {
      return (val || "").split(";");
    },
    onChange(index) {
      this.current = index;
    },
    //判断当前时间是否超出预约时间
    judgingTime(kssj, jssj) {
      // 获取当前时间
      let nowDate = new Date();
      let date = {
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
        hour: nowDate.getHours(),
        minu: nowDate.getMinutes(),
      };
      let systemDate;
      if (date.month < 10) {
        systemDate =
          "0" +
          date.month +
          "/" +
          date.date +
          " " +
          date.hour +
          ":" +
          date.minu;
      } else {
        systemDate =
          date.month + "/" + date.date + " " + date.hour + ":" + date.minu;
      }
      var allsystemDate = new Date(systemDate);
      if (kssj != null && kssj != undefined) {
        var allStartDate = new Date(kssj.replace(/-/g, "/"));
      }
      if (jssj != null && jssj != undefined) {
        var allEndDate = new Date(jssj.replace(/-/g, "/"));
      }
      if (allsystemDate < allStartDate || allsystemDate > allEndDate) {
        return false;
      } else {
        return true;
      }
    },
    preview(imgList, index) {
      ImagePreview({
        images: imgList,
        startPosition: index,
      });
    },
    viewAppointment(){
      this.$router.push("/mlgm/jpty/wyyyty?yy=1&id=" + this.$route.params.id);
    }
  },
  computed: {
    imgCount() {
      return this.imgList.length;
    },
    imgList() {
      return [this.data.xlfm.substr(2), ...this.data.pics];
    },
  },
  created() {
    let data = this.$route.params;
    if (!data.xlzt) {
      this.$indicator.open("加载中...");
      this.$post("api/mlgm/jplxDto", { id: data.id }).then((res) => {
        this.$indicator.close();
        if (res.data.success) {
          this.data = res.data.content;
          setTimeout(() => {
            WaChatrequireShare(
              this.data.xlzt,
              "美丽高明精品路线",
              window.location.pathname.substr(1),
              this.data.xlfm.substr(2)
            );
          }, 1500);
        } else {
          this.changtoast(res.data.message, "error");
        }
      });
    } else {
      this.data = data;
      setTimeout(() => {
        WaChatrequireShare(
          this.data.xlzt,
          "美丽高明精品路线",
          window.location.pathname.substr(1),
          this.data.xlfm.substr(2)
        );
      }, 1500);
    }
  },
};
</script>

<style lang="scss" type="text/css" scoped>
@import "./style/jptyxq.scss";
</style>

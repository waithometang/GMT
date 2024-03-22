<template>
  <van-skeleton title :row="16" :loading="loading">
    <div class="container">
      <div class="swiperList">
        <div v-if="form.videoSrc">
          <!-- :poster="getVideoBase64(form.videoSrc)" -->
          <video :src="form.videoSrc" controls controlslist="nodownload" :poster="form.file_fmid"></video>
        </div>
        <div v-else>
          <van-swipe @change="onChange" :autoplay="3000" :stop-propagation="false">
            <van-swipe-item
              v-for="(image, index) in imgList"
              :key="index"
              @click="() => preview(imgList,index)"
            >
              <!-- <img v-lazy="image" /> -->
              <van-image height="200" fit="cover" :src="image" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="name">{{form.zpzt}}</div>
        <div class="line"></div>
        <div class="wrap">
          <div class="tab_box">
            <div class="tag">
              <div class="label" v-for="item in labels" :key="item">{{item}}</div>
            </div>
          </div>
          <div class="date" v-if="form.shzt=='已通过' && form.fbsj">发布时间：{{form.fbsj}}</div>
          <div class="check" v-else-if="form.shzt=='未通过'">作品审核不通过</div>
          <div class="check" v-else-if="form.shzt=='待审核'">作品审核中</div>
        </div>
        <div class="item" v-if="form.shzt=='已通过'">
          <div class="likecount">
            <img src="../images/thumb.png" alt />
            <span>点赞数：</span>
            {{form.dzcs_ztp || 0}}
          </div>
          <div class="totalrank">
            <img src="../images/star.png" alt />
            <span>总排名：</span>
            {{form.zpm}}
          </div>
        </div>
        <!-- <div class="warn" v-if="!form.hasJF">
                <img src="../images/tips.png" alt="">
                <span class="tip">您还没上传加分项哦！请点击进入作品详情页上传加分项吧</span>
        </div>-->
      </div>
      <!-- 已审核并且是选择的奖品时候显示核销码 -->
      <!-- <div class="verCode" v-if="form.fbzt=='已发布' && form.mine">
            <img src="../images/tips.png" alt="" class="tips">
            恭喜您本作品获得小奖品一份，点击奖品核销码兑奖吧→
            <img src="../images/vercode.png" alt="" class="code">
      </div>-->

      <div class="contentwrap">
        <div class="content" v-html="form.zpms"></div>
        <div v-if="form.videoSrc" class="pic_detail">
          <div
            class="pic_list"
            v-for="(image, index) in getImgList(imgList)"
            :key="index"
            @click="() => preview(imgList,index)"
          >
            <img :src="image" alt />
          </div>
        </div>
      </div>
      <!-- 已审核 -->
      <template v-if="call!=='1'">
        <div class="group_ckbtn" v-if="form.shzt=='已通过'">
          <!-- 未上传加分项 -->
          <div v-if="!form.hasJF" class="notUp">
            <div class="box">
              <!-- <div class="up_grade" @click="addGrade">
                          <img src="../images/up.png" alt="">
                          上传加分项
              </div>-->
              <div class="call" @click="showTips" :class="{'call_btn':btnFlag}">
                <img src="../images/thumb_1.png" alt v-if="!btnFlag" />
                <img src="../images/good.png" alt v-else />
                {{!btnFlag ? '为路线打call' : '已打call'}}
              </div>
              <!-- <div class="call" @click="showTips" :class="{'call_btn':btnFlag}">
                <img src="../images/thumb_1.png" alt v-if="!btnFlag" />
                <img src="../images/good.png" alt v-else />
                {{!btnFlag ? '为他打call' : '已打call'}}
              </div> -->
            </div>
          </div>
          <!-- 已上传加分项 -->
          <div class="hasUp" v-else>
            <div
              class="grade_btn"
              @click="showTips"
              :class="{'call_btn':btnFlag, 'grade_btn': !btnFlag}"
            >
              <img src="../images/thumb_1.png" alt v-if="!btnFlag" />
              <img src="../images/good.png" alt v-else />
              {{!btnFlag ? '为路线打call' : '已打call'}}
            </div>
            <!-- <div
              class="grade_btn"
              @click="showTips"
              :class="{'call_btn':btnFlag, 'grade_btn': !btnFlag}"
            >
              <img src="../images/thumb_1.png" alt v-if="!btnFlag" />
              <img src="../images/good.png" alt v-else />
              {{!btnFlag ? '为他打call' : '已打call'}}
            </div> -->
          </div>
        </div>
      </template>

      <!-- 返回作品列表 -->
      <div class="back" @click="backList">
        <!-- <div class="back" @click="backList"> -->
        <img src="../images/back.png" alt />
        返回作品列表
      </div>
    </div>
  </van-skeleton>
</template>

<script>
import { WaChatrequireShare } from "@/js/WaChatrequireShare";
// import { WcChatPreviewImage } from "@/js/WeChatpreviewImage";
import { ImagePreview } from "vant";

export default {
  data() {
    return {
      form: { videoSrc: "" },
      current: 0,
      labels: [],
      isPic: true, // 图片还是视频
      videoSrc: "",
      imgList: [],
      loading: true,
      btnFlag: false,
      backPath: "",
      call: true, // 是否能打call
    };
  },
  computed: {
    imgCount() {
      return this.imgList.length;
    },
  },
  created() {
    this.$indicator.open("加载中...");
    this.$get("api/mlgm/WeeklyListDetail?id=" + this.$route.params.id).then(
      (res) => {
        this.btnFlag = res.data.content.btnFlag;
        this.$indicator.close();
        if (res.data.success) {
          this.form = res.data.content;
          setTimeout(() => {
            WaChatrequireShare(
              this.form.zpzt,
              "美丽高明参赛作品",
              "mlgm/qtcstg/" + this.$route.params.id,
              this.form.file_fmid,
              this.shareCallback
            );
          }, 1500);
          if (this.form.zpbq) {
            this.labels = this.form.zpbq.split(";");
          }
          this.imgList = [this.form.file_fmid, ...this.form.pics];
          this.loading = false;
        } else {
          this.changtoast(res.data.message, "error");
        }
      }
    );
    this.call = this.$route.params.call
  },
  methods: {
    backList() {
      if (this.backPath == "" || this.backPath == "/") {
        this.$router.push("/mlgm/tpdb");
      } else {
        this.$router.push(this.backPath);
      }
    },
    shareCallback(name) {
      this.$post("api/mlgm/jlzf", {
        id: this.$route.params.id,
        name,
      }).then((res) => {});
    },
    onChange(index) {
      this.current = index;
    },
    showTips() {
      this.$indicator.open("正在打call...");
      this.$post("api/mlgm/markcall", { id: this.$route.params.id }).then(
        (res) => {
          this.$indicator.close();
          if (res.data.success) {
            this.$toast("打call成功");
            this.form.btnFlag = true;
            this.btnFlag = true;
          } else if (res.data.errorCode === 405) {
            this.$alert(
              "明天再为您喜欢的作品打call吧~",
              "您今天的投票次数已用完 "
            );
          } else {
            this.changtoast(res.data.message, "error");
          }
        }
      );
    },
    addGrade() {
      this.$router.push({
        name: "mlgmscjfx",
        params: { jfid: this.form.jffile_id },
      });
    },
    preview(imgList, index) {
      ImagePreview({
        images: imgList,
        startPosition: index,
        closeable: true,
      });
    },
    getImgList(imgList) {
      // console.log(imgList);
      return imgList.slice(1);
    },
    // getVideoBase64(url) {
    //   console.log(url);
    //   return new Promise((resolve,reject) => {
    //         let dataURL = '';
    //         let video = document.createElement("video");
    //         video.setAttribute('crossOrigin', 'anonymous');//处理跨域
    //         video.setAttribute('src', url);
    //         video.setAttribute('width', 690);
    //         video.setAttribute('height', 360);
    //         console.log(video);
    //         video.addEventListener('loadeddata', function () {
    //             let canvas = document.createElement("canvas"),
    //             width = video.width, //canvas的尺寸和图片一样
    //             height = video.height;
    //             canvas.width = width;
    //             canvas.height = height;
    //             canvas.getContext("2d").drawImage(video, 0, 0, width, height); //绘制canvas
    //             dataURL = canvas.toDataURL('image/jpeg'); //转换为base64
    //             console.log('dataURL===' + dataURL);
    //             resolve(dataURL);
    //         });
    //   })
    // }
  },
  beforeRouteEnter(to, from, next) {
    console.log(from);
    next((vm) => {
      vm.backPath = from.path;
    });
  },
};
</script>

<style scoped lang="scss">
@import "../style/cstgDetail.scss";
.call {
  width: 600px !important;
}
.grade_btn {
  width: 600px !important;
}
/deep/ .custom-indicator[data-v-5a270784] {
  position: absolute;
  right: 0.667vw;
  bottom: 0.667vw;
  padding: 0.267vw 0.667vw;
  font-size: 36px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  opacity: 0.75;
  border-radius: 10px;
}
</style>

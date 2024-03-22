<template>
  <div class="container">
    <div class="container_box">
      <div class="type">
        <!-- <div v-if="data.spwj_id">
          <video
            :src="data.spwj_id"
            controls
            controlslist="nodownload"
            preload
          ></video>
        </div>
        <div class="swipe" v-else-if="data.file_id">
          <van-swipe :autoplay="3000">
            <van-swipe-item
              v-for="(image, index) in imgList"
              :key="index"
              @click="() => preview(imgList, index)"
            >
              <van-image height="200" fit="cover" :src="image" />
            </van-swipe-item>
          </van-swipe>
        </div> -->
        <div v-if="data.videoSrc">
          <video
            :src="data.videoSrc"
            controls
            controlslist="nodownload"
            preload
            class="video"
          ></video>
        </div>
        <div v-else-if="data.pics && data.pics.length > 0" class="imgList">
          <van-swipe autoplay="false" :stop-propagation="false">
            <van-swipe-item
              v-for="(image, index) in data.pics"
              :key="index"
              @click="() => preview(data.pics, index)"
            >
              <van-image height="200" fit="cover" :src="image" />
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="content">
        <div class="title_box">
          <img src="./image/sxxq.png" />
          <p class="title">{{ data.dw }}实习生招聘</p>
        </div>
        <div class="content_item">
          <span class="label">招募对象：</span>
          <span class="item">{{ data.zmdx }}</span>
        </div>
        <div class="content_item">
          <span class="label">招募人数：</span>
          <span class="item">{{ data.zmrs }}名</span>
        </div>
        <div class="content_item">
          <span class="label">工作时间：</span>
          <span class="item">{{ data.gzsj }}</span>
        </div>
        <div class="content_item">
          <span class="label">工作地点：</span>
          <span class="item">{{ data.gzdd }}</span>
        </div>
        <div class="content_item">
          <span class="label">联系人：</span>
          <span class="item">{{ data.lxry }}</span>
        </div>
        <div class="content_item">
          <span class="label">联系电话：</span>
          <span class="item">{{ data.lxdh }}</span>
        </div>
        <div class="content_item">
          <span class="label">实习时间：</span>
          <span class="item">
            {{ data.sxksrq }}&nbsp;至&nbsp;{{ data.sxjsrq }}
          </span>
        </div>
        <div class="content_item">
          <span class="label">报名期限：</span>
          <span class="item">{{ data.bmqxrq }}&nbsp;{{ data.bmqxsj }}</span>
        </div>
        <div class="content_item">
          <span class="label">报名方式：</span>
          <span class="item">{{ data.bmfs }}</span>
        </div>
        <div class="information">
          <div class="label_box">
            <img src="./image/sxxq_small.png" />
            <p class="label">具体要求：</p>
          </div>
          <p class="item" v-html="data.jtyq"></p>
        </div>
        <div class="information">
          <div class="label_box">
            <img src="./image/sxxq_small.png" />
            <p class="label">实习待遇：</p>
          </div>
          <p class="item">{{ data.sxdy }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from "vant";
export default {
  data () {
    return {
      data: {},
      imgList: []
    }
  },
  created () {
    this.$indicator.open("加载中...")
    this.$post("api/Zx/dxsXq", { type: 0, id: this.$route.params.id }).then(
      res => {
        this.$indicator.close()
        if (res.data.success) {
          this.data = res.data.content
        } else {
          this.changtoast(res.data.message, "error")
        }
      }
    )
  },
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  methods: {
    preview (imgList, index) {
      ImagePreview({
        images: imgList,
        startPosition: index,
        closeable: true,
      });
    },
  }
}
</script>
<style lang="scss" scoped>
@import './style/sxxq.scss';
</style>
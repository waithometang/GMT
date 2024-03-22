<template>
  <div class="container">
    <div class="container_box">
      <div class="content">
        <p class="title">{{ data.zt }}招聘</p>
        <div class="content_item">
          <span class="label">需求标题：</span>
          <span class="item">{{ data.zt }}</span>
        </div>
        <div class="content_item">
          <span class="label">信用代码：</span>
          <span class="item">{{ data.xydm }}</span>
        </div>
        <div class="content_item">
          <span class="label">类别：</span>
          <span class="item">{{ data.lb }}</span>
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
          <span class="label">联系人：</span>
          <span class="item">{{ data.lxry }}</span>
        </div>
        <div class="content_item">
          <span class="label">联系电话：</span>
          <span class="item">{{ data.lxdh }}</span>
        </div>
        <div class="content_item">
          <span class="label">工作地点：</span>
          <span class="item">{{ data.gzdd }}</span>
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
        <div class="content_item">
          <span class="label">发布时间：</span>
          <span class="item">{{ data.fbsj }}</span>
        </div>
        <div class="information">
          <p class="label">具体要求：</p>
          <p class="item" v-html="data.jtyq"></p>
        </div>
        <div class="information">
          <p class="label">实习待遇：</p>
          <p class="item">{{ data.sxdy }}</p>
        </div>
        <div class="information">
          <p class="label">审核状态：</p>
          <p class="item">{{ data.shzt }}</p>
        </div>
        <div class="information">
          <p class="label">审核意见：</p>
          <p class="item" v-if="data.shyj">{{ data.shyj }}</p>
          <p class="item" v-else>暂无审核意见</p>
        </div>
        <div class="information" v-if="data.lb === '企业'">
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
            <van-swipe :autoplay="3000" :stop-propagation="false">
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
      </div>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from "vant";

export default {
  data () {
    return {
      data: {}
    }
  },
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  created () {
    this.$indicator.open("加载中...")
    this.$post("api/Zx/dxsDwxqList", {
      xq: true,
      id: this.$route.params.id
    }).then(res => {
      this.$indicator.close()
      if (res.data.success) {
        this.data = res.data.content
      } else {
        this.changtoast(res.data.message, "error")
      }
    })
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
@import './style/xqfkxq.scss';
</style>
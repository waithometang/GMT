<template>
  <div class="voteParticlars">
    <voteHead ref="voteHead" />
    <div class="page-content">
      <div class="swiper">
        <van-swipe
          class="my-swipe"
          indicator-color="white"
          :autoplay="3000"
          :stop-propagation="false"
        >
          <van-swipe-item
            v-for="(image, index) in listData.fileArr"
            :key="index"
            @click="preview(listData.fileArr, index)"
          >
            <img :src="image" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="info">
        {{ listData.mc }}{{ listData.mc && listData.dw ? '，' : ''
        }}{{ listData.dw }}
      </div>
      <!-- <div class="logo" @click="lookOver(listData.fileArr)">
        <img :src="listData.fileArr[0]" alt="" />
      </div>
      <p class="text">单击图片可查看大图喔</p> -->
      <div class="describe" v-html="listData.xq"></div>
      <div class="info-tab">
        <div class="tab">
          <div class="number">{{ listData.ps }}</div>
          <div class="name">当前票</div>
        </div>
        <div class="tab tab-border">
          <div class="number">{{ listData.ph }}</div>
          <div class="name">排名</div>
        </div>
        <div class="tab">
          <div class="number">{{ listData.pc }}</div>
          <div class="name">距上一名</div>
        </div>
      </div>
    </div>
    <!-- <div class="but" @click="vote"><i class="icon"></i>投票</div> -->
    <div class="but but1" @click="goBack"><i class="icon icon1"></i>返回</div>
    <div class="toast">由佛山市高明区政务服务数据管理局提供技术支持</div>
  </div>
</template>

<script>
import voteHead from './component/voteHead'
import { tp, tpnrxx } from '@/api/secondLevelPage'
import { WaChatrequireShare } from '@/js/WaChatrequireShare'
import { mapActions } from "vuex"
import { WcChatPreviewImage } from '@/js/WeChatpreviewImage'
import { ImagePreview } from 'vant'

export default {
  data () {
    return {
      listData: { zpjj: '' },
    }
  },
  components: {
    voteHead
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    messageBut () {
      return this.$store.state.messageBut
    },
    // details () {
    //   return this.listData.zpjj.replace(/\n/g, '<br/>&emsp;&emsp;')
    // }
  },
  created () {
    this.gettpnrxx()
  },
  methods: {
    ...mapActions(['voteMessage']),
    goBack () {
      this.$router.go(-1)
    },
    lookOver (item) {
      let url = `${window.location.protocol}//${window.location.host}${item}`
      console.log(url)
      WcChatPreviewImage(url, [url])
    },
    vote () {
      let that = this
      this.voteMessage({
        id: this.id,
        success: function () {
          that.listData.ps = that.listData.ps + that.$store.state.increaseNumber
        }
      })
    },
    gettpnrxx () {
      this.$indicator.open()
      this.$post('api/mlgm/BmzjTpXq', {
        id: this.id
      }).then(rps => {
        this.$indicator.close()
        if (rps.data.success) {
          this.listData = rps.data.content
          this.$store.commit('SetvoteHasTj', this.listData.tpcj)
          this.waChatShara()
        } else {
          this.$indicator.close()
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    waChatShara () {
      let url = this.listData.dbtp
      let title = `我是${this.listData.tpbh}${this.listData.xm},正在参加${this.listData.hdmc}`
      WaChatrequireShare(title, this.listData.hdxq, `voteParticlars/${this.id}`, url)
    },
    // 查看图片
    preview (imgList, index) {
      ImagePreview({
        images: imgList,
        startPosition: index,
        closeable: true,
      });
    },
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.commit('SetbuttomTab', 1)
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$refs.voteHead.clos()
    this.$store.commit('SetmessageBut', false)
    this.$store.commit('SetvoteMessage', false)
    next()
  }
}
</script>
<style lang='scss' scoped>
@import './style/voteParticlars.scss';
</style>
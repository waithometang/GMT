<template>
  <div class="slide-tag-list">
    <div class="slide-tag" v-for="(item, index) in listData" :key="index">
      <div class="slide-tag-content" @touchmove="handleDragMove" @touchstart="handleDragStart" @click="clickTag(item)">
        <div class="content-left">
          <div class="content-title">
            <span>区级发布</span>首1小时3元！高明1000个路内停车位春节前将实施收费！含这些路段
          </div>
          <div class="content-icon">
            <div class="icon-tab">
              <i class="icon" :style='{"background-image":"url(/images/img_13.png)"}'></i>2019-10-08
            </div>
            <div class="icon-tab">
              <i class="icon" :style='{"background-image":"url(/images/img_13.png)"}'></i>1000
            </div>
            <div class="icon-tab">
              <i class="icon" :style='{"background-image":"url(/images/img_13.png)"}'></i>1000
            </div>
            <div class="icon-tab">
              <i class="icon" :style='{"background-image":"url(/images/img_13.png)"}'></i>1000
            </div>
          </div>
        </div>
        <div class="content-right" v-if="item%3">
          <img src="/gmt/pics/2019/8/08c9f204-399e-4f48-ad16-23cba95cf106_th.jpg" alt="">
        </div>
        <div class="track" :id="'dome' + index"></div>
      </div>
      <div class="slide-tag-hide" :id="'dome' + index + 'hide'" @click="deleteTag(index)">删除</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      startlocation: 0,
      hideId: '',
      listData: [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
    }
  },
  methods: {
    handleDragStart (e) {
      let id = e.target.id + 'hide'
      if (this.hideId != id && this.hideId) {
        document.getElementById(this.hideId).style.width = '0'
        document.getElementById(this.hideId).style.height = '0'
      }
      this.startlocation = e.clientX || e.changedTouches[0].clientX
    },
    handleDragMove (e) {
      let moveY = e.clientY || e.changedTouches[0].clientY
      let moveX = e.clientX || e.changedTouches[0].clientX
      let id = e.target.id
      this.hideId = id + 'hide'
      let dome = document.getElementById(this.hideId)
      if (this.startlocation - moveX > 0) {
        if (this.startlocation - moveX <= 30 || this.startlocation - moveX > 50) {
          return
        }
        dome.style.width = 50 + "px"
        dome.style.height = e.target.clientHeight + 'px'
      } else {
        if (moveX - this.startlocation <= 30 || moveX - this.startlocation > 50) {
          return
        }
        dome.style.width = 0 + "px"
        dome.style.height = 0 + 'px'
      }
    },
    deleteTag (item) {
      this.listData.splice(item,1)
      document.getElementById(this.hideId).style.width = 0
    },
    clickTag (item) {
      if (this.hideId) {
        document.getElementById(this.hideId).style.width = '0'
        document.getElementById(this.hideId).style.height = '0'
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/style/text.scss';
</style>
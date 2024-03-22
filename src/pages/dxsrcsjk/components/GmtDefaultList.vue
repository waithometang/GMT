<!-- 高明通默认列表 父件传递渲染需要数据, 父件定义列表点击事件 跳转详情 -->
<template>
  <div class="GmtDefaultList-pages">
    <div
      class="list"
      v-for="(item, index) in listData"
      :key="index"
      @click="viewDetails(item)"
    >
      <div class="list-right" v-if="item.fmtp || item.cover || item.fmvideo">
        <img
          v-if="item.fmtp || item.cover"
          :src="
            item.fmtp || item.cover
              ? SetImages(item.fmtp || item.cover)
              : '/static/mr-icon.png'
          "
          alt=""
        />
        <video :src="item.fmvideo" v-else-if="item.fmvideo"></video>
      </div>
      <div class="list-left">
        <div class="list-title">
          <!-- <span v-if="item.publishGrade != null && issueClass && item.publishGrade >= 0 && _GetGrade(item.publishGrade)">{{_GetGrade(item.publishGrade)}}</span> -->
          {{ item.zt || item.title }}
        </div>
        <div class="list-icon" :class="{ 'not-images': !item.cover }">
          <div class="list-icon-li time">
            <div class="icon">
              <img src="/images/img_13.png" alt="" />
            </div>
            <div class="name">
              {{ item.fbsj || item.publishTime || item.date || item.editTime }}
            </div>
          </div>
          <div class="list-icon-li yds" v-if="item.xsyd || showYuDu">
            <div class="icon">
              <img src="/images/img_11.png" alt="" />
            </div>
            <div class="name">{{ item.yds || item.readedCount }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 父件传递渲染需要数据, 父件定义列表点击事件 跳转详情
import { GetAddReaded, GetFblx } from "@/api/secondLevelPage"
import { PublishUtil, ImageUtil } from "@/js/businessUntil"
import { storage, session_Storage } from "@/js/until"
export default {
  props: {
    // 列表渲染数据
    listData: {
      type: Array
    },
    mkid: {
      // 发布类型 模块ID
      type: Number
    },
    // 显示阅读数图标
    showYuDu: {
      type: Boolean,
      default: false
    },
    // 显示发布登机
    issueClass: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: ""
    }
  },
  computed: {
    longData () {
      return storage.fetch("longData").data
    }
  },
  methods: {
    getImg: ImageUtil.getDefaultImg,
    // 点击查看详情
    viewDetails (item) {
      if (this.type === "sxxq") {
        this.$router.push(`/sxxq/${item.id}`)
      } else if (this.type === "hdhgxq") {
        if (item.linkage) {
          window.location.href = item.linkage
        } else {
          this.$router.push(`/hdyn/hdxq/${item.id}`)
        }
      } else {
        this.$emit("skipExternal")
        if (item.linkage) {
          if (item.xsyd || this.showYuDu) {
            GetAddReaded({
              id: item.id,
              lb: this.mkid
            })
          }
          let url = ""
          if (item.linkage.indexOf("?") === -1) {
            url = item.linkage + "?scene=4#wechat_redirect/"
          } else {
            url = item.linkage + "&scene=4#wechat_redirect/"
          }
          session_Storage.save(
            "ButtomTageState",
            this.$store.state.ButtomTageState
          )
          window.location.href = url
        } else {
          if (this.mkid) {
            let _mkid = this.mkid
            // if( _mkid === 5) _mkid = 2
            this.$router.push(`/nrfbxx/${_mkid}/${item.id}`)
          } else {
            if (item.mkid === 203 || item.mk === 203) {
              this.$router.push(`/zxdtxq/${item.id}`)
            } else {
              this.$router.push(`/nrfbxx/${item.mkid || item.mk}/${item.id}`)
            }
          }
        }
      }
    },
    // 设置图片
    SetImages (item) {
      if (item.indexOf("../") === 0) {
        // 自己上传的
        return "/gmt" + item.slice(2, item.length)
      } else {
        return item
      }
    },
    iconState (item) {
      if (this.mkid === 3 || item === 3) {
        return true
      }
    }
  }
}
</script>

<style lang='scss' scoped type='text/css'>
.yds {
  padding-left: 60px;
  justify-content: flex-start !important;
}
@import '@/style/GmtDefaultList.scss';
.list {
  height: 142px;
}
.list-right {
  height: 142px;
  width: 175px;
  margin-right: 20px;
  padding-left: 0 !important;
  img {
  }
}
.list-left {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
}
video {
  height: 142px;
  width: 175px;
  object-fit: cover;
}
</style>

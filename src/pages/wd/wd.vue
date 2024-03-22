<template>
  <div class="wd">
    <div class="page-head"></div>
    <div class="page-middle">
      <div class="middle-content">
        <div class="middle-head">
          <div class="icon">
            <img :src="userimages" alt="" />
          </div>
        </div>
        <div class="middle-site" @click="clickCyt">
          <i></i>{{ userInfo.name }} [切换]
        </div>
        <div class="middle-list">
          <div
            class="middle-list-tab"
            @click="clickCheck(item)"
            v-for="(item, index) in tabData"
            :key="index"
          >
            <div class="middle-list-tab-icon">
              <img :src="item.icon" alt="" />
            </div>
            <div class="middle-list-tab-name">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-base">
      <div class="base-list">
        <div
          class="base-list-tab"
          v-for="(item, index) in listData"
          :key="index"
          @click="clickCheck(item)"
        >
          <div class="list-tab-left">
            <img :src="item.icon" alt="" />
          </div>
          <div class="list-tab-middle">{{ item.name }}</div>
          <div class="list-tab-right"><i></i></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage } from '@/js/until';
import { GetAvatarUrl } from "@/api/FirstLevelPage";
import { mapActions } from 'vuex';
import wjutils from '@/js/WjSmrzUtil'

export default {
  data () {
    return {
      listData: '',
      tabData: [{ name: '我的反映', icon: '/static/newEditionIndex/tag_icon_8.png', url: '/randomlySnapPicture/2' }, { name: '我的点赞', icon: '/static/newEditionIndex/tag_icon_23.png', url: '/likeCollect/1' }, { name: '我的收藏', icon: '/static/newEditionIndex/tag_icon_28.png', url: '/likeCollect/2' }],
      hasSM: false
    }
  },
  computed: {
    userimages () {
      return storage.fetch('userimages').data
    },
    userInfo () {
      return this.$store.state.userinfo
    }
  },
  methods: {
    ...mapActions(['GetuserInfo', 'getGrxx']),
    clickCyt () {
      this.$router.push('/AreaSelection')
    },
    clickCheck (item) {
      if (item.state === 1) {
        this.getGrxx().then(el => {
          if (el.hasSM) {
            if (el.isGwy) {
              this.$router.push('/gwyrz')
            } else {
              this.$router.push('/Certification')
            }
          } else {
            // this.$router.push('/smrz')
            wjutils.gotoSMRZ(this, 'http://gmt.gaoming.gov.cn/smrz')
          }
        })
      } else {
        this.$router.push(item.url)
      }
    },
    // 获取头像
    _GetAvatarUrl () {
      GetAvatarUrl({}).then(rps => {
        if (rps.data.success) {
          if (rps.data.content) {
            this.defaultimages = rps.data.content;
            storage.save("userimages", rps.data.content);
          }
        } else {
          if (rps.dara.message) {
            this.changtoast(rps.dara.message, "error");
          }
        }
      });
    },
  },
  created () {
    this.getGrxx().then(el => {
      this.hasSM = el.hasSM
    })
    if (!this.userimages) {
      this._GetAvatarUrl()
    }
    this.GetuserInfo().then(val => {
      if (val.dyfb || val.lwfb || val.zlfb || val.zxkhfb) {
        this.listData = [{ name: `实名认证(${this.hasSM ? '已实名' : '未实名'})`, icon: '/static/newEditionIndex/wd_icon_1.png', url: '/certification', state: 1 }, { name: '企业认证', icon: '/static/newEditionIndex/wd_icon_2.png', url: '/qyrz' }, { name: '我的发布', icon: '/static/newEditionIndex/wd_icon_5.png', url: '/release' }, { name: '系统反馈', icon: '/static/newEditionIndex/wd_icon_3.png', url: '/systemFeedback' }, { name: '系统帮助', icon: '/static/newEditionIndex/wd_icon_4.png', url: '/systemHelp' }]
      } else {
        this.listData = [{ name: `实名认证(${this.hasSM ? '已实名' : '未实名'})`, icon: '/static/newEditionIndex/wd_icon_1.png', url: '/certification', state: 1 }, { name: '企业认证', icon: '/static/newEditionIndex/wd_icon_2.png', url: '/qyrz' }, { name: '系统反馈', icon: '/static/newEditionIndex/wd_icon_3.png', url: '/systemFeedback' }, { name: '系统帮助', icon: '/static/newEditionIndex/wd_icon_4.png', url: '/systemHelp' }]
      }
    })
  }
}
</script>

<style lang='scss' scoped>
@import './style/wd.scss';
</style>
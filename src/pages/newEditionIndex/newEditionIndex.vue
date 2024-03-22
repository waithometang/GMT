<template>
  <div class="newEditionIndex">
    <div class="page-head">
      <headImages />
    </div>
    <div class="page-tag-list">
      <publicListTag ref="publicList" :listData="tagListData" :numberData="readNumberData" />
    </div>
    <!-- <div class="page-inform">
      <pageInform />
    </div> -->
    <div class="page-content">
      <pageContent />
    </div>
    <div class="release" v-if="releaseState" @click="Gotorelease">发布</div>
    <div class="publicAttention" v-if="sfgz">
    <div class="attention-maike"></div>
    <div class="attention-content">
      <div class="clos" @click="clos"><img src="/static/ybmimages/close.png" alt=""></div>
      <div class="headIcon"><img src="/static/ybmimages/gm.png" alt=""></div>
      <div class="name">高明通</div>
      <div class="title">长按下方二维码关注高明通公众号，获取权限</div>
      <div class="icon"><img src="/static/ybmimages/gmt-url.jpg" alt=""></div>
    </div>
  </div>
  </div>
</template>

<script>
import publicListTag from './components/publicListTag';
import headImages from './components/headImage';
import pageInform from './components/pageInform';
import pageContent from './components/pageContent';
import { AppSetting } from '@/api/FirstLevelPage.js';
import { NotReadNumber } from '@/api/secondLevelPage';
import { session_Storage } from '@/js/until';
import { mapActions } from 'vuex';

export default {
  data () {
    return {
      tagListData: '',
      readNumberData: '',
      releaseState: false,
      sfgz:false
    }
  },
  components: {
    publicListTag,
    headImages,
    pageInform,
    pageContent
  },
  computed: {
    bottomTagState () {
      return this.$store.state.ButtomTageState
    },
    templateNumber () {
      if (this.bottomTagState === 1) {
        return 1
      } else if (this.bottomTagState === 2) {
        return 2
      } else if (this.bottomTagState === 3) {
        return 5
      }
    },
    homeType () {
      return this.$route.params.type
    },
    sessionStorage () {
      return session_Storage.fetch('ButtomTageState').data
    },
    userinfo () {
      return this.$store.state.userinfo.id
    }
  },
  methods: {
    ...mapActions(['GetuserInfo','getGrxx']),
    getAppSetting () {
      AppSetting (this.templateNumber).then(rps => {
        if (rps.data.success) {
          this.tagListData = rps.data.content
          this.$nextTick(()=>this.getNotReadNumber(rps.data.content))
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    async getNotReadNumber (item) {
      NotReadNumber({
        MenuIds: item.fblIds,
        vid: this.userinfo
      }).then(rps => {
        if (rps.data.success) {
          let NotReadNumberData = session_Storage.fetch('NotReadNumber').data
          let data = NotReadNumberData.data || []
          let key = NotReadNumberData.key || []
          data.push(...rps.data.content)
          key.push(this.$route.meta.baseTabState)
          session_Storage.save('NotReadNumber', {data, key})
          this.disposeReadNumber(rps.data.content, item.menus)
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    clos(){
      this.getGrxx(true).then(grxx => {
        if (grxx.sfgz) {
          this.sfgz=false
        }
      })
    },
    // 处理未阅读数据
    disposeReadNumber (item,menus) {
      let data = item
      let menusData = menus
      for (let index = 0; index < menus.length; index++) {
        const element = menus[index]
        for (let indexs = 0; indexs < element.length; indexs++) {
          const dome = element[indexs]
          let ReadNumber = data.filter(val => {
            return val.id === dome.Id
          })
          if (ReadNumber.length > 0) {
            (menusData[index])[indexs].redNumber = ReadNumber[0].number
          }
        }
      }
      this.readNumberData = menusData
      this.$refs.publicList.$forceUpdate()
    },
    // 跳转发布页面
    Gotorelease () {
      this.$router.push('/release')
    }
  },
  created () {
    this.getGrxx().then (grxx => {
      if (!grxx.sfgz) {
        this.sfgz=true
      }
    })
  },
  activated () {
    this.getAppSetting ()
    this.GetuserInfo().then(val => {
      if (val.dyfb || val.lwfb || val.zlfb || val.zxkhfb) {
        this.releaseState = true
      }
    })
  }
}
</script>

<style lang='scss' scoped>
@import './style/newEditionIndex.scss';
</style>
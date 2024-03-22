<template>
  <div class="index"  v-if="tagListData && readNumberData">
    <div class="content">
      <div v-if="bottomTagState <= 3">
        <headImages />
        <publicListTag :listData="tagListData" :numberData="readNumberData" />
        <publicNotification v-show="bottomTagState <= 2" ref="notification"/>
        <div class="content_message" v-for="(item, index) in tagListData.showFbIds" :key="index">
          <pushMessage :GMT_TageState="templateNumber" :showFbIds="item" v-if="item"/>
        </div>
      </div>  
      <PersonalHomePage v-else/>
    </div>
    <BottomTag />
  </div>
</template>

<script>
import headImages from './component/headImage'
import publicListTag from './component/publicListTag'
import publicNotification from './component/publicNotification'
import pushMessage from './component/pushMessage'
import PersonalHomePage from '@/components/FirstLevelPage/PersonalHomePage'
import BottomTag from '@/components/BottomTag_v6'
import { AppSetting } from '@/api/FirstLevelPage.js'
import { NotReadNumber } from '@/api/secondLevelPage'
import { session_Storage } from '@/js/until'

export default {
  components: {
    headImages,
    publicListTag,
    publicNotification,
    pushMessage,
    BottomTag, 
    PersonalHomePage
  },
  data () {
    return {
      tagListData: '',
      readNumberData: ''
    }
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
  watch: {
    bottomTagState () {
      if (this.bottomTagState <= 3) {
        this.tagListData = []
        if (this.templateNumber === 1) {
          this.$refs['notification']._GetTzgg()
        }
        if (this.templateNumber === 2 && !this.homeType) {
          this.$refs['notification']._GetTzgg()
        }
        this.getAppSetting()
      }
    }
  },
  methods: {
    getAppSetting () {
      AppSetting (this.templateNumber).then(rps => {
        if (rps.data.success) {
          this.tagListData = rps.data.content
          this.getNotReadNumber(rps.data.content)
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    getNotReadNumber (item) {
      NotReadNumber({
        MenuIds: item.fblIds
      }).then(res => {
        if (res.data.success) {
          this.readNumberData = res.data.content
        }
      })
    },
  },
  created () {
    this.getAppSetting ()
    if (this.sessionStorage) {
      this.$store.commit("Set_ButtomTageState", this.sessionStorage)
    }
    session_Storage.remove('ButtomTageState')
  }
}
</script>

<style lang="scss" scoped>
.index {
  .content {
    padding-bottom: 120px;
  }
}
</style>
<!--发布类列表通用页面-->
<template>
  <div>
    <GmtSearchList
      url="api/Common/PulishList"
      :parms="{
        fblxId: 3,
        vid: this.$route.params.vid
      }"
    >
      <template slot="item" slot-scope="listData">
        <GmtDefaultList :listData="listData.data" :mkid='2'></GmtDefaultList>
      </template>
    </GmtSearchList>
  </div>
</template>
<script>
;(function () {
  var isPageHide = false
  window.addEventListener("pageshow", function () {
    if (isPageHide) {
      window.location.reload()
    }
  })
  window.addEventListener("pagehide", function () {
    isPageHide = true
  })
})(window)

import GmtSearchList from "@/components/GmtSearchList.vue"
import { PublishUtil } from "@/js/businessUntil"
import { GetAddReaded, GetFblx } from "@/api/secondLevelPage"
// import GmtDefaultList from "./component/GmtDefaultList"
import GmtDefaultList from "@/components/GmtDefaultList"
import { GetPulishList } from "@/api/FirstLevelPage"
import { storage } from "@/js/until"

export default {
  data() {
    return {
      listData: []
    }
  },
  props: {
    fblxId: {
      type: String
    },
    t: {
      type: String
    }
  },
  computed: {
    longData() {
      return storage.fetch("longData").data
    }
  },
  methods: {
    GetlistData() {
      //先有村居
      // if (!this.longData.id) {
      //   this.$router.push({
      //     path: "/AreaSelection"
      //   })
      //   return
      // }
      GetPulishList({
        fblxId: 3,
        vid: this.$route.params.vid,
        addReaded: false
      }).then(rps => {
        if (rps.data.success) {
          this.listData = rps.data.content
        } else {
          if (rps.data.message) {
            this.changtoast(rps.data.message, "error")
          }
        }
      })
    }
  },
  created() {
    this.GetlistData()
  },
  components: {
    GmtSearchList,
    GmtDefaultList
  }
}
</script>
<style lang="scss" scoped>
@import "@/style/components/villagePublishList.scss";
</style>

<template>
  <div class="qyrz">
    <div class="head">
      <div class="haed_but" @click="attestationFrom()">新增绑定</div>
    </div>
    <div class="content">
      <div class="content_name">我的企业认证</div>
      <div class="content_tab" v-if="listData.length === 0">
        <div class="content_tab_name content_tab_name_no">
          暂无企业认证, 请先新增绑定吧
        </div>
      </div>
      <div v-else>
        <div
          class="content_tab"
          v-for="(item, index) in listData"
          :key="index"
          @click="attestationFrom(item)"
        >
          <img src="/static/qiye.png" alt="" />
          <div class="content_tab_name">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetqyrzList } from '@/api/secondLevelPage'
import wjutils from "@/js/WjSmrzUtil"
import { mapActions } from 'vuex'
import { session_Storage, storage } from "@/js/until";

export default {
  data () {
    return {
      listData: []
    }
  },
  computed: {
    type () {
      return this.$route.params.type
    }
  },
  methods: {
    ...mapActions(['getGrxx']),
    attestationFrom (item) {
      if (item) {
        // this.$router.push(`/qyrzForm/${item.id}`)
        this.$router.push(`/qylb/${item.id}`)
      } else {
        this.$router.push(`/qyrzForm?type=${this.type}`)
      }

    },
    getListData () {
      GetqyrzList().then(rps => {
        if (rps.data.success) {
          this.listData = rps.data.content
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    init () {
      this.getGrxx().then(Grxx => {
        if (!Grxx.hasSM) {
          storage.save('path', this.$route.fullPath)
          wjutils.gotoSMRZ(this, 'http://gmt.gaoming.gov.cn/smrz')
        }
      })
    }
  },
  created () {
    this.$showSubscribe().then(() => {
      wjutils.gotoSMRZIfNot(this, this.init)
      this.getListData()
      // this._getYmData()
    })
  }
}
</script>

<style lang='scss' scoped>
@import './style/index.scss';
</style>
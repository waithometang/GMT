<template>
  <div class="PartyProfile-pages">
    <BetterScroll>
      <template slot="BetterScroll">
        <div class="head">
          <img src="/images/party/party-banner-04.png" alt="">
        </div>
        <GmtSelectTab :TabData="TabData" :TabStateData="TabStateData" @changeTabState="SetTabState" v-if="listData"></GmtSelectTab>
        <div class="content" v-if="listData" v-html="contentTitle"></div>
        <div class="notData" v-if="!contentTitle">暂无数据</div>
      </template>
    </BetterScroll>
  </div>
</template>

<script>
import BetterScroll from "@/components/BetterScroll"
import GmtSelectTab from '@/components/GmtSelectTab'
import { GetDjgk } from '@/api/PartyBuilding'

export default {
  components: {
    GmtSelectTab,
    BetterScroll
  },
  computed: {
    id () {
      return this.$route.params.vid
    },
    contentTitle () {
      if (this.TabStateData == 0) {
        return this.listData.qzzgk
      } else if (this.TabStateData == 1) {
        return this.listData.zzzgk
      } else {
        return this.listData.czzgk
      }
    }
  },
  data () {
    return {
      TabData: [{name: '区党组织概况', type: 0}, {name: '镇街党组织概况', type: 1}, {name: '村居党组织概况', type: 2}],
      TabStateData: 0,
      listData: ''
    }
  },
  methods: {
    _GetDjgk () {
      GetDjgk ({
        id: this.id
      }).then (rps => {
        if (rps.data.success) {
          this.listData = rps.data.content
          if (this.listData.czzgk) {
            this.TabData = [{name: '区党组织概况', type: 0}, {name: '镇街党组织概况', type: 1}, {name: '村居党组织概况', type: 2}]
            this.TabStateData = 2
          } else {
            this.TabData = [{name: '区党组织概况', type: 0}, {name: '镇街党组织概况', type: 1}]
            this.TabStateData = 0
          }
        } else {
          this.changtoast(res.data.message, "error");
        }
      })
    },
    SetTabState(item) {
      this.TabStateData = item.type
    }
  },
  created () {
    this._GetDjgk()
  }
}
</script>

<style lang='scss' scoped type="text/css">
.PartyProfile-pages{
  position: relative;
  min-height: 100vh;
  background: #ffffff;
  .head{
    width: 100%;
    height: 300px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .content {
    margin:22px;
    overflow: hidden;
    text-indent: 2em;
    word-wrap: break-word;
    font-size: 30px;
  }
  .notData {
    margin:22px;
    overflow: hidden;
    text-indent: 2em;
    word-wrap: break-word;
    font-size: 30px;
    text-align: center;
  }
}
</style>

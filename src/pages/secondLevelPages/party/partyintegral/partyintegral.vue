<template>
  <div class="partyintegral">
    <div class="hread">
      <div class="hread-main">
        <ul>
          <li>
            <img src="/images/partyintegral/img_02.png">
          </li>
          <li>
            <div class="top-font">
              <span class="name">{{selectDzb.name}}</span>
            </div>
            <p>党员人数： {{selectDzb.dyrs}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="title-select">
      <div class="title-tab">
        <div class="tab-icon"></div>
        积分排行榜
      </div>
      <div class="me-tab" @click="meTab" v-if="showGrxx">我的</div>
      <div class="select-tab" :class="{'select-tab-action': !showGrxx}">
        <div class="select-option">
          <GmtOption @SetselectTag="dzb_change" :listData="zbList" :selectState="zbList[0].id" v-if="zbList.length > 0"></GmtOption>
        </div>
      </div>
    </div>
    <div class="lits_content" v-if="zbList.length > 0">
      <GmtSearchList :url='url' :parms="{VillageId:this.selectDzb.id}" :useSearch="true" :autoFetchData="false" ref="mylist">
        <template slot="item" slot-scope="listData">
          <memberList :listData="listData.data" @changePages="goto" :showRanking="true" post="内"></memberList>
        </template>
      </GmtSearchList>
    </div>
    <div class="float" v-if="wdfbData">
      <div class="float-icon">
        <img :src="wdfbData.photo ? wdfbData.photo : '/images/yuangong-ling_01.png' " alt="">
      </div>
      <div class="float-title">
        <div class="float-title-name">{{wdfbData.name}}</div>
        <div class="float-title-content">
          <div class="content-zw">党务职务：{{wdfbData.zw}}</div>
          <div class="content-pm">积分排名: {{wdfbData.pm}}</div>
        </div>
      </div>
    </div>
    <div class="release" v-if="showGrxx" @click="Gotorelease()">发布</div>
  </div>
</template>

<script>
import GmtSearchList from "@/components/GmtSearchList";
import GmtOption from "@/components/GmtOption";
import memberList from '@/components/secondLevelPages/homePage/memberList'
import { Getdzbxx } from '@/api/PartyBuilding'
import { Getwdjfph } from '@/api/secondLevelPage'
import {mapActions} from "vuex"
export default {
  components : {
    GmtSearchList,
    memberList,
    GmtOption
  },
  data () {
    return {
      url: 'api/PartyBuilding/jfph',
      wdfbData: '',
      zbList: [],
      selectKey: '',
      selectDzb:'',
      myDzb:'',
      showGrxx: false,
    }
  },
  computed: {
    villageId () {
      return this.$route.params.vid
    },
  },
  methods: {
    ...mapActions(['GetuserInfo', 'getGrxx']),
    dzb_change(item){
      this.selectDzb = item
      this.$nextTick(()=>this.$refs["mylist"].updateListData())
    },
    _Getdzbxx (dyid) {
      this.$indicator.open()
      Getdzbxx ({
        VillageId: this.villageId,
        dyid
      }).then (rps => {
        this.$indicator.close()
        if (rps.data.success) {
          this.zbList = rps.data.content.items
          this.myDzb = rps.data.content.myDzb
          if(this.zbList.length>0){
            this.selectKey=0
            this.selectDzb=this.zbList[0]
            this.$nextTick(()=>this.$refs["mylist"].updateListData())
          }
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    // 显示发布图标
    shouPublished () {
      this.GetuserInfo().then(rps => {
        if (rps.dyfb) {
          this.showGrxx = true
        }
      })
    },
    meTab () {
      this.selectKey = '我的'
      this.selectDzb = this.myDzb
      this.$nextTick(()=>this.$refs["mylist"].updateListData())
    },
    _Getwdjfph (dyid) {
      Getwdjfph ({
        villageId: this.villageId,
        dyid
      }).then (rps => {
        if (rps.data.success) {
          this.wdfbData = rps.data.content
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    goto (item) {
      this.$router.push(
        {
          path: '/BranchPartyMemberDetails',
          query: {
            id: item.id
          }
        }
      )
    },
    // 跳转发布页面
    Gotorelease () {
      this.$router.push({
        path:`/release/2`
        //  path:`/personalPublished/${this.villageId}`
      })
    }
  },
  created () {
      this.shouPublished()
      this.getGrxx().then(Grxx => {
      this._Getdzbxx(Grxx.dy)
      this._Getwdjfph(Grxx.dy)
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/pages/secondLevelPages/party/partyintegral.scss";
.partyintegral /deep/ .el-input__inner {
	height: auto !important;
	padding: 15px 10px !important;
	line-height: 0;
}
</style>

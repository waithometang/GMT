<template>
  <div class="LeagueMember-dy">
    <div class="head">
      <div class="head-content">
        <div class="head-top">
          <div class="head-icon">
            <img :src="photo ? photo : '/images/yuangong-ling_01.png'" alt="">
          </div>
          <div class="head-title">
            <div class="name">{{name}}</div>
            <div class="duty">职务： {{gzzw}}</div>
          </div>
        </div>
        <div class="head-images">
          <div class="min-images min-images-action">
            日志篇数: {{rzCount}}
          </div>
          <div class="min-images">
            <div class="min-icon">
              <img src="/images/icon_dianzan@2x.png" alt="">
            </div>
           {{dzs ? dzs : 0}}
          </div>
          <div class="min-images">
            <div class="min-icon">
              <img src="/images/icon_cai@2x.png" alt="">
            </div>
            {{cps ? cps : 0}}
          </div>
          <!-- <div class="min-images">
            <div class="min-icon">
              <img src="/images/icon_shouc@2x.png" alt="">
            </div>
            0
          </div> -->
        </div>
      </div>
    </div>
    <div class="interval">
      <div></div>TA的发布
    </div>
    <div class="list">
      <GmtSearchList :useSearch='false'  url="api/VillageOpen/ZlrzGrList" :parms="{id:this.$route.query.id}">
        <template slot="item" slot-scope="listData">
          <div class="lits-tab" v-for="(item, index) in listData.data" :key="index" @click="gotoRz(item.id)">
            <div class="tab-left">
              <div class="left-title">{{item.title}}</div>
              <div class="left-content">{{item.content}}</div>
              <div class="left-date">{{item.date}}</div>
              <div class="left-icon">
                <div class="icon-number">
                 <img src="/images/icon_dianzan@2x.png" alt=""> {{item.dzs ? item.dzs : 0}}
                </div>
                <div class="icon-number">
                  <img src="/images/icon_cai@2x.png" alt=""> {{item.cps ? item.cps : 0}}
                </div>
                <!-- <div class="icon-number">
                  <img src="/images/icon_shouc@2x.png" alt=""> 0
                </div> -->
              </div>
            </div>
            <div class="tab-right">
              <img :src="getImgUrl(item.cover)" alt="">
            </div>
          </div>
        </template>
      </GmtSearchList>
    </div>
  </div>
</template>
<script>
import {ZlrzGr,ZlrzGrList} from "@/api/secondLevelPage.js"
import {mapActions} from "vuex"
import { ImageUtil } from "@/js/businessUntil"
import GmtSearchList from '@/components/GmtSearchList'
export default {
  data() {
    return {
      id:0,
      name:'',
      photo:'',
      gzzw:'',
      dwzw:'',
      rzCount:0,
      dzs:0,
      cps:0
    }
  },
  components: {
    GmtSearchList
  },
  methods: {
    ...mapActions(['showToast']),
    getImgUrl:ImageUtil.getDefaultImg,
    gotoRz(item){
      this.$router.push('/nrfbxx/202/'+item)
    }
  },
  created() {
    this.id=this.$route.query.id
    ZlrzGr({id:this.id}).then(res=>{
      if(res.data.success){
        this.name=res.data.content.name
        this.photo=res.data.content.photo
        this.gzzw=res.data.content.gzzw
        this.dwzw=res.data.content.dwzw
        this.rzCount=res.data.content.rzCount
        this.dzs = res.data.content.dzs
        this.cps = res.data.content.cps
      }else{
        this.showToast(res.data.message)
      }
    })
  },
}
</script>
<style lang="scss" scoped>
@import "@/style/pages/secondLevelPages/LeagueMember-dy.scss";
</style>

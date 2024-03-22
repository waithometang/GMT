<template>
  <div class="serch_help">
    <div class="serch_help_hread"></div>
    <div class="serch_help_hread_tab">
      <div v-for="(item,index) in hread_tab" :key="index" :style="{background:'url('+(item.img_url ? item.img_url:'#')+')','background-size':'100% 100%'}" @click="dreams(item)">
        <div class="number" v-if="index === 0 && number.number > 0">{{number.number}}</div>
      </div>
    </div>
    <div class="hr"></div>
    <div class="main_title">
      <img src="/static/FNT_IMAGES/main/zxrl.png" />
      <span @click="more">更多<img src="/static/FNT_IMAGES/gengduo.png"/></span>
    </div>
    <dreams v-if="listData !=''" :listData="listData" :type="'news'"></dreams>
  </div>
</template>
<script>
import dreams from "./conponents/dreams"
import { wxyList } from '@/api/FNTApi'
import { NotReadNumber, UpdateReadRecord } from '@/api/secondLevelPage';
export default {
  data() {
    return {
      hread_tab: [ { img_url: "/static/FNT_IMAGES/serch_help/wxyrl.png", url:"fntZbzrl" }, { img_url: "/static/FNT_IMAGES/serch_help/wxysq.png", url:"fntZbzsq" } ],
      listData:"",
      number: ''
    };
  },
  components:{
    dreams
  },
  created(){
    this.GetListData()
    this.getNotReadNumber()
  },
  methods:{
    renlin(sfrl, id) {
      if (!sfrl) {
        this.$router.push(`/wantclaim?id=` + id)
      }
    },
    getNotReadNumber () {
      NotReadNumber({
        MenuIds: [64]
      }).then (rps => {
        if (rps.data.success) {
          this.number = rps.data.content[0]
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    dreams(item){
      UpdateReadRecord ({
        menuId: this.number.id,
        vid: this.ButtomTageState === 2 ? this.$store.state.userinfo.id : 0
      })
      this.$router.push(`/${item.url}`)
    },
    more(){
      this.$router.push('/NewsDreams')
    },
    GetListData(done) {
      wxyList({
        pageIndex: 1,
        pageSize: 5,
        rl: 1 
      }).then(rps => {
        if (rps.data.success) {
          this.listData = rps.data.content
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
@import './style/index.scss';
</style>
<template>
  <div class="dreams_def">
    <div class="hread_title">
      <img :src="listData.photo" />
      <div class="name_time">
        <div class="name">{{listData.sqry}}</div>
        <div class="time"><img src="/static/FNT_IMAGES/img_13.png"/>{{listData.sqsj}}</div>
        <div class="time"><img src="/static/FNT_IMAGES/img_11.png"/>{{listData.yds}}</div>
      </div>
    </div>
    <div class="xy_cont">
      <div class="title">
        <div></div>心愿内容
      </div>
      <div class="contet">{{listData.jtqk}}</div>
    </div>
    <div class="hr"></div>
    <div class="xy_cont">
      <div class="title">
        <div></div>认领情况
      </div>
      <div v-if="!listData.sfrl" class="norl">
        <div>TA的心愿还未有人认领，点击实现TA的心愿吧</div>
        <div class="norl_but" v-if="isme === 'false'" @click="wantrl">我要认领</div>
      </div>
      <div v-else class="yesrl">
        <div>
          <span>认领人：</span>{{listData.rlry}}
        </div>
        <div>
          <span>联系电话：</span>{{listData.lxdh}}
        </div>
        <div>
          <span>认领时间：</span>{{listData.rlsj}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Wxyxx } from "@/api/FNTApi"
export default {
  data(){
    return{
      listData:""
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    isme() {
      return this.$route.params.isme;
    }
  },
  created(){
    this.init();
  },
  methods:{
    init(){
      Wxyxx({
        id: this.id,
        isme:this.isme
      }).then(rps => {
        if (rps.data.success) {
          this.listData = rps.data.content
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    wantrl(){
      this.$router.push(`/fntapply/${this.id}`)
    }
  }
}
</script>
<style lang='scss' scoped>
@import './style/wishParticulars.scss';
</style>
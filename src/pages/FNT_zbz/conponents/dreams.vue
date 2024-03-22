<template>
  <ul>
    <li v-for="(item, index) in listData" :key="index" @click="renlin(item)">
      <div class="title-receive">
        <div class="title-receive-left">
          <div class="receive-icon">
            <img :src="item.photo ? item.photo : '/static/FNT_IMAGES/wish.png'" alt />
          </div>
          <div class="dream-name">
            <div class="dream">{{type==="claim" || type==="news" ? item.name : item.sqr}}</div>
            <div class="name" v-if="type === 'apply'">{{!item.sfrl ? "不要着急，你的心愿总会实现的" : "你的心愿"+(item.sjjg ==="刚刚" ? item.sjjg : item.sjjg+"前")+"已被认领"}}</div>
            <div class="name" v-else-if="type==='claim' && !bot">{{item.date}}</div>
            <div class="name" v-else>{{type==='claim'?'您':'TA的微心愿'}}{{item.sjjg ==="刚刚" ? item.sjjg : item.sjjg+"前"}}{{type==='claim'?'认领了他的心愿':'被认领'}}</div>
          </div>
        </div>
        <div v-if="(type === 'claim' && !bot) || type === 'apply'" class="title-receive-right" :class="{'blue':item.rlzt=='已认领','hui':item.rlzt=='不通过','huang':item.rlzt=='待审核'}" @click.stop="wantrl(item)">
          <span v-if='type === "claim"'>{{"我要认领"}}</span>
          <span v-else>{{item.rlzt}}</span>
        </div>
      </div>
      <div class="family">
        <div class="family-body">
          {{type==="claim" || type==="news" ? item.jtqk : item.nr}}
        </div>
      </div>
      <div class="dream_state" v-if="bot" > 
          <div><img src="/static/FNT_IMAGES/img_13.png"/>{{item.date}}</div>
          <div><img src="/static/FNT_IMAGES/img_11.png"/>{{item.yds}}</div>
          <div v-if="item.sfrl && type === 'news'"><img src="/static/FNT_IMAGES/draw.png"/>
          {{item.rlr ? item.rlr : '匿名'}}<span v-if="type==='news'">帮助了TA</span>
          </div>
      </div>
      <div class="border-bottom"></div>
    </li>
    <div style="clear:both;"></div>
  </ul>
</template>
<script>
export default {
  props: {
    listData: {
      type: Array
    },
    type:{
      type: String
    },
    bot:{
      type:Boolean,
      default:true
    }
  },
  methods:{
    renlin(item){
      if(this.type === 'claim' && this.bot){
        this.$store.commit("Set_top_bottonType",2)
      }
      if(this.type==='apply' || (this.type === 'claim' && this.bot)){
        // this.$router.push("/dreams_def?id=" + item.id+"&isme=true")
        this.$router.push(`/fntZbzsqxq/${item.id}/true`)
      }else{
        // this.$router.push("/dreams_def?id=" + item.id+"&isme=false")
        this.$router.push(`/fntZbzsqxq/${item.id}/false`)
      }
        
    },
    wantrl(item){
      if(this.type != "apply"){
        this.$router.push(`/fntapply/${item.id}`)
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../style/dreams.scss';
</style>
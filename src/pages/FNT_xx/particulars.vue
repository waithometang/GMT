<template>
  <div class="main">
    <div class="id-massage">
      <div class="id-icon">
        <img :src="listData.photo ? listData.photo : '/static/FNT_IMAGES/head.png'" alt />
      </div>
      <div class="id-name-phone">
        <div class="id-name">{{listData.name ? listData.name : '匿名'}}</div>
        <!-- <div class="id-phone">女</div> -->
      </div>
    </div>
    <div class="yy-type-time">
      <div class="yy-types">
        <span class="yy-typename">信件主题:</span>
        <span class="yy-type">{{listData.xjbt}}</span>
      </div>
    </div>
    <div class="zx-themes zxnr-bottom border-bottom">
      <span class="zx-themename">信件内容:</span>
      <span class="zx-theme">{{listData.xjnr}}</span>
    </div>
    <div class="body-border"></div>
    <div class="zx-themes zxzt-bottom">
      <span class="zx-themename">回复内容:</span>
      <span class="zx-theme">{{listData.hfnr ? listData.hfnr : '待回复'}}</span>
    </div>
    <div class="reply-content" v-if="listData.files">
      <div class="reple-title">回复附件</div>
      <div class="reply-list">
        <div class="reply-accessory" v-for="(item_1, index_1) in listData.files" :key="index_1">
          <div class="accessory-icon">
            <img src="/images/word_icon@2x.png" alt="">
          </div>
          <div class="accessory-name">
            <a :href="item_1.wj_url" @click="clickTagA(item_1.wj_url)" :download="item_1.wjmc">
              {{item_1.wjmc}}
            </a>
          </div>
          <a :href="item_1.wj_url" @click="clickTagA(item_1.wj_url)" :download="item_1.wjmc">
            <div class="download-icon">
              <img src="/images/download_icon@2x.png" alt="">
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="zx-themes">
      <span class="zx-themename">回复时间:</span>
      <span class="zx-theme">{{listData.hfsj ? listData.hfsj : '待回复'}}</span>
    </div>
  </div>
</template>
<script>
  import { Zxxxnr } from '@/api/FNTApi'
  export default {
    data() {
      return {
        listData: ''
      }
    },
    computed: {
      id() {
        return this.$route.params.id
      },
      bottonType() {
        return this.$route.params.bottonType
      },
      isall() {
        return this.bottonType*1 === 1 ? true : false
      }
    },
    methods:{
      init(){
        Zxxxnr({
          id: this.id,
          isall:this.isall
        }).then(rps => {
          if (rps.data.success) {
            this.listData = rps.data.content
          } else {
            this.changtoast(rps.data.message, 'error')
          }
        })
      },
      clickTagA (item) {
        window.location.href = `${window.location.protocol}//${window.location.host}${item}`
      }
    },
    mounted(){
      this.init()
    },
  };
</script>
<style lang="scss" scoped>
@import './style/particulars.scss';
</style>

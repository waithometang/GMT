<template>
  <div class="main" v-if="listData">
    <div class="id-massage">
      <div class="id-icon">
        <img :src="listData.photo ? listData.photo : '/static/FNT_IMAGES/head.png'" alt />
      </div>
      <div class="id-name-phone">
        <div class="id-name">{{listData.name ? listData.name : 'null' }}</div>
        <div class="id-phone">{{listData.lxdh}}</div>
      </div>
    </div>
    <div class="yy-type-time">
      <div class="yy-types">
        <span class="yy-typename">咨询类型:</span>
        <span class="yy-type">{{listData.zxlx}}</span>
      </div>
      <div class="yy-types">
        <span class="yy-typename">预约时间:</span>
        <span class="yy-type">{{listData.yysj}}</span>
      </div>
    </div>
    <div class="zx-themes zxzt-bottom">
      <span class="zx-themename">咨询主题:</span>
      <span class="zx-theme">{{listData.zxzt}}</span>
    </div>
    <div class="zx-themes zxnr-bottom border-bottom">
      <span class="zx-themename">咨询内容:</span>
      <span class="zx-theme">{{listData.zxnr}}</span>
    </div>
    <div class="body-border"></div>
    <div class="zx-themes zxzt-bottom">
      <span class="zx-themename">回复内容:</span>
      <span class="zx-theme">
        {{listData.hfnr ? listData.hfnr : '待回复'}}
      </span>
    </div>
    <div class="zx-themes">
      <span class="zx-themename">回复时间:</span>
      <span class="zx-theme">{{listData.hfsj ? listData.hfsj : '待回复'}}</span>
    </div>
  </div>
</template>

<script>
  import { yyzxx } from '@/api/FNTApi'
  export default {
    data() {
      return {
        listData: ''
      }
    },
    computed: {
      id() {
        return this.$route.params.id
      }
    },
    methods: {
      init(){
        yyzxx({
          id: this.id
        }).then(rps => {
          if (rps.data.success) {
            this.listData = rps.data.content
          } else {
            this.changtoast(rps.data.message, 'error')
          }
        })
      }
    },
    created () {
      this.init()
    }
  };
</script>
<style lang="scss" scoped>
@import './style/particulars.scss';
</style>

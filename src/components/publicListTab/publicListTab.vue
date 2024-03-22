<template>
  <div class="publicListTab">
    <div class="public_list" v-for="(item, index) in listData" :key="index" @click="public_list_click(item)">
      <div class="public_list_left" v-if="listType != 'organization'" >
        <div class="public_list_head" :class="{'public_list_head_mailbox_not': listType != 'mailbox'}">
          <div class="public_list_head_name"  :class="{'public_list_head_name_mailbox_not': listType != 'mailbox'}">
            <!-- <span v-if="listType === 'consult'" class="lx_span">{{item.lx}}</span> -->
            <span v-if="listType === 'list' || listType ==='PolicyInformation'">{{item.title}}</span>
            <span v-else>{{item.bt}}</span> 
          </div>
          <div class="public_list_head_but" :class="{'public_list_head_but_action': item.zt === '待回复'}" v-if="listType === 'mailbox' && !whetherOpen">{{item.zt}}</div>
        </div>
        <div class="public_list_middle" v-if="listType === 'mailbox'">
          {{item.nr}}
        </div>
        <div class="public_list_base" :class="{'public_list_base_consult': listType === 'consult'}">
          <div class="public_list_base_li public_list_base_time">
            <img  v-if="listType != 'organization'" src="/static/FNT_IMAGES/time.png" alt="">
            <span v-if="listType === 'list' || listType ==='PolicyInformation'">{{item.date}}</span>
            <span v-else>{{item.rq}}</span>
          </div>
          <div class="public_list_base_li public_list_base_time"  v-if="listType === 'consult'">
            <img src="/static/FNT_IMAGES/img_12.png" alt="">
            <span>{{item.lx}}</span>
          </div>
          <div class="public_list_base_li" v-if="listType === 'mailbox'">
            <img src="/static/FNT_IMAGES/draw.png" alt="">
            {{item.name}}
          </div>
          <div class="public_list_base_li public_list_base_but" v-if="listType === 'consult'">
            <div class="public_list_base_li_but" :class="{'public_list_base_li_but_action': item.zt === '待回复'}">{{item.zt}}</div>
          </div>
          <div v-if="listType === 'list' && item.sszj" class="public_list_reading">
            <img src="/static/FNT_IMAGES/img_14.png" alt="">
            {{item.sszj}}街道
          </div>
          <div v-if="listType === 'list'" class="public_list_state" :class="{'public_list_state_blue':item.hdjz==='报名中','public_list_state_yellow':item.hdjz==='进行中','public_list_state_gray':item.hdjz==='已结束','public_list_state_red':item.hdjz==='报名结束','public_list_state_gray':item.hdjz==='报名准备'}">
            {{item.hdjz}}
          </div>
        </div>
      </div>
      <div class="public_list_right" v-if="(listType === 'list' || listType === 'PolicyInformation' && if_img) && item.cover">
        <img  :src="item.cover" alt="">
      </div>
      <div class="list_organization" v-if="listType === 'organization'">
        <div class="list_organization_left">
          <img :src="item.img ? item.img : '/static/FNT_IMAGES/zhd.png'"/>
        </div>
        <div class="list_organization_right">
          <div class="list_organization_right_font">
            <span class="list_organization_right_title">{{item.sqfl}}</span>
            <div class="list_organization_right_div">
              <span>{{item.sszj}}街道</span>
              <span>活动数:<span>{{item.hds}}</span></span>
            </div>
          </div>
          <div class="list_organization_right_goto">
            <img src="/static/FNT_IMAGES/serch_organization/organization_more.png"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      listType: { // 父件传入, 列表类型: consult: 预约咨询, mailbox: 信箱,  list: 普通发布列表
        type: String,
        // default: 'mailbox'
      },
      whetherOpen: { // 仅列表类型为 mailbox (信箱) 父件传入, true: 公开的, false: 我的
        type: Boolean,
        // default: true
      },
      listData: {
        // type:Array
      },
      if_img: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      public_list_click(item) {
        this.$emit('public_list_click', item)
      },
    },
  }
</script>
<style lang="scss" scoped>
@import "style";
</style>
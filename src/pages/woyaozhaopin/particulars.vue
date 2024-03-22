<template>
  <div class="particulars">
    <div class="particulars_head">
      <div class="particulars_head_name">{{listData.zwmc}}</div>
      <div class="particulars_head_info">{{listData.gznx}} | {{listData.zdxl}} | {{listData.gzxz}} | {{listData.zprs}}人</div>
      <div class="particulars_head_pay">
        <div class="particulars_head_pay_nuber">{{listData.yxfw}}</div>
        <div class="particulars_head_pay_time">{{listData.fbsj}}</div>
      </div>
      <!-- <div class="particulars_head_site">
        <div class="particulars_head_site_icon">
          <img src="/static/location@2x.png" alt="">
        </div>
        <div class="particulars_head_site_name">{{listData.mxdz}}</div>
        <div class="particulars_head_site_select">
          <img src="/static/right@2x.png" alt="">
        </div>
      </div> -->
    </div>
    <div class="particulars_describe_info">
      <div class="particulars_describe_info_head">
        <div class="head_icon">
          <img src="/static/square@2x.png" alt="">
        </div>
        <div class="head_name">职位描述</div>
        <div class="head_wire"></div>
      </div>
      <div class="particulars_describe_info_middle">
        <div class="middle_content">{{listData.zwms}}</div>
      </div>
    </div>
    <div class="particulars_describe_info">
      <div class="particulars_describe_info_head">
        <div class="head_icon">
          <img src="/static/square@2x.png" alt="">
        </div>
        <div class="head_name">公司信息</div>
        <div class="head_wire"></div>
      </div>
      <div class="particulars_describe_info_middle">
        <div class="info_tab">
          <div class="info_tab_name info_tab_name_action">{{listData.gsmc}}</div>
        </div>
        <div class="info_tab">
          <div class="info_tab_name">联系人:</div>
          <div class="info_tab_content">{{listData.lxr}}</div>
        </div>
        <div class="info_tab">
          <div class="info_tab_name">联系方式:</div>
          <div class="info_tab_content">{{listData.lxdh}}</div>
        </div>
        <!-- <div class="info_tab">
          <div class="info_tab_name">面试地点:</div>
          <div class="info_tab_content">{{listData.mxdz}}</div>
        </div> -->
        <div class="info_tab">
          <div class="info_tab_name">工作地点:</div>
          <div class="info_tab_content">{{listData.gzdz}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Getwdzpfbxx } from '@/api/secondLevelPage'
export default {
  data () {
    return {
      listData: ''
    }
  },
  computed: {
    state () {
      return this.$route.params.id
    }
  },
  methods: {
    _Getwdzpfbxx () {
      Getwdzpfbxx ({
        id: this.state
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
    this._Getwdzpfbxx()
  }
}
</script>

<style lang="scss" scoped>
@import './style/particulars.scss';
</style>
<template>
  <div class="progress-detail">
    <div class="top-tab">
      <div class="select">
        <div
          @click="changeState(item.state)"
          :class="{ cor1: tagState === item.state }"
          v-for="(item, index) in tagData"
          :key="index"
        >
          {{ item.name }}
        </div>
      </div>
    </div>

    <!-- 工程信息 -->
    <template v-if="tagState === 1">
      <div class="project-name">
        <!-- 工程名称：{{ pageData.xmmc }} -->
        <div class="title">工程名称：{{ pageData.xmmc }}</div>
        <!-- <div class="name">{{ pageData.xmmc }}</div> -->
        <!-- <div class="money">总投资：205.00万元</div> -->
      </div>

      <div class="project-place">
        <div class="place">
          业主单位：<span>{{ pageData.yzdw }}</span>
        </div>
        <div class="leader">
          工程地点：<span>{{ pageData.gcdd }}</span>
        </div>
        <div class="leader">
          工程工期：<span>{{ pageData.gcgq }}</span>
        </div>
        <div class="contact-person">
          项目负责人：<span>{{ pageData.xmfzr }}</span>
        </div>
        <!-- <div class="phone-num">
          <img src="./images/phone.png" alt="" />
          {{ pageData.lxfs }}
        </div> -->
      </div>
      <div class="project-content">
        <!-- <div class="title">责任科室：</div>
        <div class="content">
          荷城街道经济促进局招商部；荷城街道经济促进局规划
          部；荷城街道经济促进局开发部
        </div> -->

        <div class="title">工程内容：</div>
        <div class="content">
          {{ pageData.xmnr }}
        </div>
      </div>
    </template>
    <!-- 工程进度 -->
    <template v-else-if="tagState === 2">
      <div class="need-list">
        <randomly-snap-picture-list
          :stateType="tagState"
          :gcxxid="gcxxid"
          :WaChatConfigData="WaChatConfigData"
        ></randomly-snap-picture-list>
      </div>
    </template>
  </div>
</template>

<script>
import randomlySnapPictureList from './components/reportInformation'
import { GetWechatConfig } from '@/api/GetWechatConfig'
import { storage } from '@/js/until'
export default {
  data() {
    return {
      tagState: 1,
      tagData: [
        { name: '工程信息', state: 1 },
        { name: '工程进度', state: 2 }
      ],
      pageData: {},
      WaChatConfigData: ''
    }
  },
  computed: {
    gcxxid() {
      return Number(this.$route.params.id)
    }
  },
  created() {
    this.$indicator.open('加载中...')
    this.$post('api/gcjd/gcxx', { id: this.gcxxid }).then(res => {
      this.$indicator.close()
      if (res.data.success) {
        this.pageData = res.data.content
      } else {
        this.changtoast(res.data.message, 'error')
      }
    })
  },
  components: {
    randomlySnapPictureList
  },
  methods: {
    changeState(item) {
      this.tagState = item
    }
  }
}
</script>

<style scoped lang="scss">
@import './style/select.scss';
@import './style/project-detail.scss';
.progress-detail {
  /* padding: 24px; */
  padding-top: 0;
  background: #efefef;
  height: 100vh;
  .top-tab {
    /* background-color: #fff;
    padding: 24px;
    margin-bottom: 18px; */
    .select {
      background-color: #fff;
      padding: 24px;
      margin-bottom: 18px;
      /* background-color: #f00; */
      position: fixed;
      width: 94%;
    }
  }
  .need-list {
    position: absolute;
    height: 93%;
    /* height: 100%; */
    top: 100px;
  }
}
</style>
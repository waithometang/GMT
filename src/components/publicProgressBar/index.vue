<template>
  <div class="publicProgressBar">
    <div class="icon-content content-padding">
      <div class="progress-bar-tab" v-for="(item, index) in tagData.length" :key="index">
        <div class="tab-head">
          <div class="tab-head-icon" :class="{'tab-head-icon-action': state >= index}">{{item}}</div>
          <div class="tab-head-bar"></div>
        </div>
      </div>
    </div>
    <div class="icon-content text-content">
      <div class="progress-bar-tab" v-for="(item, index) in listData" :key="index">
        <div class="tab-base" :class="{'tab-base-action': state >= index}">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    state: {
      default: 0
    },
    tagData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      listData: [],
    }
  },
  created () {
    this.listData = this.tagData
  }
};
</script>

<style lang="scss" scoped>
.publicProgressBar {
  background: #ffffff;
  .icon-content {
    display: flex;
    .progress-bar-tab {
      flex: 1;
      .tab-head {
        display: flex;
        align-items: center;
        .tab-head-icon {
          flex: 0 0 auto;
          width:50px;
          height:50px;
          background: url('/static/ybmimages/img_06.png') no-repeat;
          background-size: 100% 100%;
          text-align: center;
          font-size:32px;
          font-weight: 500;
          color:rgba(255,255,255,1);
          line-height: 50px;
        }
        .tab-head-icon-action {
          background: url('/static/ybmimages/img_05_2.png') no-repeat;
          background-size: 100% 100%;
          color:rgba(51,51,51,1);
        }
        .tab-head-bar {
          flex: 1;
          border-bottom: 1px solid rgba(222,222,222,1);
        }
      }
      .tab-base {
        margin-top: 20px;
        text-align: left;
        font-size:28px;
        font-weight:500;
        color:rgba(222,222,222,1);
      }
      .tab-base-action {
        color:rgba(70,113,109,1);
      }
    }
    .progress-bar-tab:last-child {
      flex: 0 0 auto;
      .tab-head {
        .tab-head-bar {
          display: none;
        }
      }
    }
  }
  .text-content{
    .progress-bar-tab:nth-of-type(2){
      padding-left: 30px;
    }
  }
  .content-padding {
    padding: 0 35px;
    padding-right:65px;
  }
}
</style>
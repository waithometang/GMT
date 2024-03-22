<template>
  <div class="route">
    <div class="route-head">
      <span class="route-title">{{path.name}}：</span>
      <van-checkbox
        :name="path.type"
        label-position="left"
        checked-color="#65B7F3"
        class="route-radio"
        v-show="!isDetail"
      >
        <!-- <span class="blue" v-if="radio==path.type">已选</span> -->
      </van-checkbox>
    </div>
    <div class="route-content">
      <div class="activity-time">
        <span>活动时间：</span>
        <span>{{path.hdsj}}</span>
      </div>
      <div class="activity-route">
        <span>线路介绍：</span>
        <span>{{path.hdjs}}</span>
      </div>
      <div id="time-line" class="time-line">
        <div class="item" v-for="(item,index) in path.periods" :key="index">
          <div class="item-index">
            <span>{{item.time}}</span>
            <span>{{item.addr}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="spilt" />
  </div>
</template>

<script>
import { CheckboxGroup } from "vant";
export default {
  props: {
    path: {
      type: Object,
      required: true,
    },
    isDetail: {
      type: Boolean,
      default: false,
    },
    radio: {
      type: Number,
    },
  },
  // components: {
  //   "van-radio": Radio,
  // },
  methods: {
    // clickFn(event){
    //     console.log('clickFn')
    //     if (!this.path.checked) {
    //     }
    //     event.stopPropagation()
    //     this.$emit('change')
    // }
  },
  mounted() {
    // this.$refs.dotted.style.left =
    //   this.$refs.circular[0].offsetLeft - 12 + "px";
  },
};
</script>

<style lang="scss" scoped>
.route {
  width: 100%;
  .route-head {
    padding: 40px 28px 34px 30px;
    .route-title {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    .route-radio {
      font-size: 28px;
      float: right;
      font-family: PingFang SC;
      font-weight: 500;
      .blue {
        color: #65b7f3;
      }
    }
  }
  .route-content {
    padding: 30px 0px 30px 57px;
    font-size: 28px;
    color: #333333;
    padding-top: 30px;
    padding-bottom: 30px;
    .activity-time {
      padding-bottom: 25px;
      span {
        display: inline-block;
      }
      span:first-child {
        width: 150px;
      }
      span:last-child {
        width: 480px;
      }
    }
    .activity-route {
      span {
        display: inline-block;
      }
      span:first-child {
        vertical-align: top;
        width: 150px;
      }
      span:last-child {
        width: 480px;
      }
    }
    .time-line {
      padding-top: 39px;
      padding-left: 180px;
      .item {
        width: calc(
          100% - 30px
        ); /*因为左边部分用于显示时间线，所以右边部分减去30px*/
        height: auto; /*高度由内容决定*/
        position: relative;
        margin-bottom: 10px;
        cursor: pointer;
        .item-index {
          line-height: 26px;
          font-size: 26px;
          padding-left: 10px;
          padding-bottom: 21px;
          display: flex;
          span:first-child {
            width: 151px;
            color: #898989;
            padding-right: 15px;
          }
          span:last-child {
            flex: 1;
            color: #333333;
          }
        }
      }
      .item::before {
        content: "";
        width: 8px;
        height: 8px;
        background: rgba(101, 183, 243, 1);
        border-radius: 50%;
        position: absolute;
        left: -15px;
        top: 6px;
      }
      .item:not(:last-child)::after {
        content: "";
        width: 3px;
        height: calc(100% + 10px);
        background-color: rgba(101, 183, 243, 1);
        position: absolute;
        top: 6px;
        left: -13px;
      }
    }
  }
  .spilt {
    width: 100vw;
    height: 12px;
    background: rgba(238, 238, 238, 1);
  }
}
</style>
<template>
  <overlay :show="isshow">
    <div class="box-tab commitment" :style="'margin-top:' + top">
      <div class="commitment_title" v-html="title"></div>
      <slot />
      <div @click="affirm" class="commitment_button" v-if="count === 0">
        我已认真阅读并承诺
      </div>
      <div class="commitment_button_no" v-else>
        我已认真阅读并承诺<span v-if="count !== 0">({{ count }})</span>
      </div>
    </div>
  </overlay>
</template>

<script>
import { Overlay } from "vant"
export default {
  watch: {
    value(val) {
      if (val) {
        let key = "ltreadKey:" + this.readKey
        if (localStorage.getItem(key)) {
          // this.affirm()
          this.isshow = true
        } else {
          this.isshow = true
          localStorage.setItem(key, "1")
        }
      }
    }
  },
  components: {
    Overlay
  },
  methods: {
    affirm() {
      this.$emit("confirm")
    },
    countFn() {
      //倒数
      this.count--
      if (this.count === 0) {
        this.cannotClick = false
      } else {
        setTimeout(this.countFn, 1000)
      }
    }
  },
  data() {
    return {
      isshow: false,
      count: 10
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    readKey: {
      type: String,
      required: true
    },
    top: {
      type: String,
      required: true
    }
  },
  created() {
    setTimeout(this.countFn, 1000)
  }
}
</script>

<style lang="scss" scoped>
.commitment {
  width: 684px;
  padding: 53px 35px;
  box-sizing: border-box;
  text-align: center;
  font-weight: 400;
  max-height: 80vh;
  overflow-y: scroll;
  .commitment_title {
    font-size: 32px;
    margin-bottom: 50px;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 56px;
  }
  .commitment_content {
    margin-top: 40px;
    text-indent: 2em;
    font-size: 26px;
    color: rgba(101, 101, 101, 1);
    line-height: 39px;
    text-align: left;
  }
  .commitment_button {
    width: 565px;
    height: 82px;
    background: rgba(50, 150, 234, 1);
    border-radius: 10px;
    margin-top: 65px;
    line-height: 82px;
    display: inline-block;
    font-size: 30px;
    color: rgba(255, 255, 255, 1);
  }
  .commitment_button_no {
    width: 565px;
    height: 82px;
    background: rgba(137, 137, 137, 1);
    border-radius: 10px;
    margin-top: 65px;
    line-height: 82px;
    display: inline-block;
    font-size: 30px;
    color: rgba(255, 255, 255, 1);
  }
}
.box-tab {
  width: 640px;
  background: #ffffff;
  border-radius: 10px;
  padding: 80px 21px;
  padding-bottom: 10px;
  margin-left: 60px;
  .tab-head {
    padding-top: 18px;
    display: flex;
    justify-content: flex-end;
    .head-title {
      flex: 1;
      text-align: center;
      font-size: 30px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    .head-icon {
      flex: 0 0 auto;
      display: inline-block;
      width: 24px;
      height: 24px;
      background: url("/static/ybmimages/叉-1.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .tab-middle {
    margin-top: 26px;
    padding: 0 25px;
    .middle-title {
      font-size: 26px;
      font-weight: normal;
      color: rgba(137, 137, 137, 1);
      text-align: center;
    }
    .middle-phone {
      font-size: 34px;
      color: #101010;
      text-align: center;
      font-weight: bold;
      padding-bottom: 65px;
    }
  }
  .tab-icon {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      display: inline-block;
      width: 71px;
      height: 71px;
      background: url("/static/ybmimages/remind.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .tab-base {
    padding: 0 9px;
    margin-top: 22px;
    .base-tag {
      height: 80px;
      border: 1px solid rgba(238, 238, 238, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-weight: normal;
      color: rgba(51, 51, 51, 1);
      padding-bottom: 14px;
      margin-top: 30px;
    }
  }
  .confirm {
    display: block;
    text-align: right;
    color: #0099ff;
    font-size: 28px;
    margin: 10px 10px 0 0;
  }
  .Studentradio {
    margin: 30px 0;
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    .van-radio {
      margin: 30px;
    }
  }
}
</style>
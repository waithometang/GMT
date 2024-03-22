<template>
  <div class="ydxz">
    <div class="header">佛山市高明区中小学教师报考细则</div>
    <div class="content">
      <div>{{ gwxx.gwmc }}&nbsp;&nbsp;&nbsp;&nbsp;{{ gwxx.dm }}</div>
      <!-- <div>年龄要求：<span class="detail">{{getWord(gwxx.nlyq)}}</span></div> -->
      <!-- <div>学历要求：<span class="detail">{{getWord(gwxx.xlyq)}}</span></div> -->
      <div>
        招聘人数：<span class="detail">{{ getWord(gwxx.zkrs) }}</span>
      </div>
      <div>
        招考对象：<span class="detail">{{ getWord(gwxx.zkdx) }}</span>
      </div>
      <div>专业名称及代码：</div>
      <div class="detail">{{ getWord(gwxx.zymc) }}</div>
      <div>其他条件：</div>
      <div class="detail">{{ getWord(gwxx.qttj) }}</div>
      <div class="detail read">
        <van-checkbox
          v-model="checked"
          icon-size="4vw"
          :disabled="cannotClick"
        ></van-checkbox
        ><span @click="readFn"
          >本人已经认真阅读过招考公告，所填报的个人信息和提供的资格条件全部属实，若有不实之处，本人愿负取消考录资格等后果及承担有关责任。</span
        >
      </div>
      <!-- <div class="tip">请下载打印《报名表》填写后，用于拍照上传资料</div>
            <a download="高明区事业单位公开招聘工作人员报名表.doc" href="/files/template/jszp/baoming.doc">
                <van-row>
                    <van-col><div class="wordimg"><img src="/static/zkbm/wendang.png"/></div></van-col>
                    <van-col :span="18">
                        <div class="filename">高明区事业单位公开招聘工作人员报名表.doc</div>
                        <div class="filesize">37K</div>
                    </van-col>
                </van-row>
            </a> -->
      <div class="base">
        <div class="base-tab width">
          <div
            class="public-long-but"
            :class="{ noEdit: cannotClick }"
            @click="nextStep"
          >
            我已认真阅读并承诺<span v-if="cannotClick">（{{ count }}）</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      gwxx: {},
      checked: false,
      count: 30,
      cannotClick: true,
    }
  },
  created () {
    if (!this.$store.state.jszpData.gwxx) {
      this.$toast.fail('获取报考岗位信息失败,请重新选择')
      this.$router.replace('wybm')
      return
    }
    this.gwxx = this.$store.state.jszpData.gwxx
    setTimeout(this.countFn, 1000)
  },
  methods: {
    countFn () {  //倒数
      this.count--
      if (this.count === 0) {
        this.cannotClick = false
      } else {
        setTimeout(this.countFn, 1000)
      }
    },
    readFn () {
      this.checked = !this.checked
    },
    getWord (content) {
      return content || '无'
    },
    nextStep () {
      if (this.cannotClick) {
        return
      }
      if (!this.checked) {
        this.$toast.fail('请确认阅读招考公告')
      } else {
        this.$router.push("txxx" + window.location.search)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ydxz {
  .header {
    margin-top: 40px;
    height: 31px;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    text-align: center;
    color: rgba(51, 51, 51, 1);
    line-height: 56px;
  }
  .content {
    padding: 50px 50px 10px 50px;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 48px;
    .detail {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 48px;
    }
    .read {
      padding-top: 40px;
      .van-checkbox {
        display: inline-block;
        margin-right: 10px;
      }
    }
    .wordimg {
      width: 80px;
      height: 90px;
      img {
        width: 100%;
      }
    }
    .tip {
      height: 26px;
      font-size: 28px;
      padding: 50px 0;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(16, 16, 16, 1);
      line-height: 37px;
    }
    .filename {
      padding-left: 28px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 35px;
    }
    .filesize {
      width: 50px;
      padding-left: 28px;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(137, 137, 137, 1);
      line-height: 37px;
    }
    .public-long-but {
      background-color: #3296ea;
      margin-top: 30px;
      color: #fff;
    }
    .noEdit {
      background-color: rgba(137, 137, 137, 1);
    }
  }
}
</style>
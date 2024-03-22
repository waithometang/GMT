<template>
  <div class="ydxz">
    <div class="header">重要提醒</div>
    <div class="content">
      <div>
        一、请于5月21日下午5:30前打印准考证，逾期系统关闭将无法打印准考证。本准考证是考生参加面谈和面试环节的重要凭据，考生必须妥善保管。一旦遗失，无法补办。
      </div>
      <div>
        二、在面谈或专业试现场，须向工作人员提交齐全的纸质应聘材料（详见公告附件2）。在规定时间内未按要求当场提交纸质应聘材料的，视为自动放弃面谈或专业试资格。纸质资料审核通过后，方可参加面谈或专业试。
      </div>
      <div>
        三、考生必须提前准备本人的健康码，并在粤省事健康申报功能中如实登记个人近期旅居史、接触史、身体健康状况、来粤方式等情况。
      </div>
      <div>
        四、考生在进入考点时，应主动出示粤康码等电子健康码绿码，接受体温检测，并全程佩戴一次性医用口罩。如粤康码等电子健康码为红码、黄码或体温≥37.3℃，不得进入考场。
      </div>
      <div class="detail read">
        <van-checkbox
          v-model="checked"
          icon-size="4vw"
          :disabled="cannotClick"
        ></van-checkbox
        ><span @click="readFn">本人已仔细阅读且知悉，确认打印报名表</span>
      </div>
      <div class="base">
        <div class="base-tab width">
          <div
            v-if="!checked || cannotClick"
            @click="xzbtFn"
            class="public-long-but"
            :class="{ noEdit: cannotClick }"
          >
            下载报名表<span v-if="cannotClick">（{{ count }}）</span>
          </div>
          <!-- <a
            v-else
            download="报名表.docx"
            :href="bmbUrl"
            class="public-long-but"
          >
            下载报名表</a
          > -->
          <div v-else class="public-long-but down" @click="downBmb">
            下载报名表
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
      count: 60,
      cannotClick: true,
      bmbUrl: '',
    }
  },
  created () {
    if (!this.$route.params.bmbUrl) {
      this.$router.go(-1)
      return
    }
    this.bmbUrl = this.$route.params.bmbUrl
    setTimeout(this.countFn, 1000)
  },
  methods: {
    downBmb () {
      // 禁用点击事件
      document.querySelector(".down").classList.add("disable");
      // 提交业务
      const a = document.createElement('a'); // 创建a标签
      a.setAttribute('download', '报名表.docx');// download属性
      a.setAttribute('href', this.bmbUrl);// href链接
      a.click();// 自执行点击事件
      // 5秒后启用点击事件
      setTimeout(function () {
        document.querySelector(".down").classList.remove("disable");
      }, 5000);
    },
    countFn () {  //倒数
      this.count--
      if (this.count === 0) {
        this.cannotClick = false
        this.checked = false
      } else {
        setTimeout(this.countFn, 1000)
      }
    },
    xzbtFn () {
      if (!this.checked) {
        this.$toast.fail('请确认阅读细则')
      }
    },
    readFn () {
      this.checked = !this.checked
    },
    getWord (content) {
      return content || '无'
    },
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
    .base {
      width: 600px;
      position: absolute;
      bottom: 50px;
      left: 50%;
      margin-left: -300px;
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
      display: block;
    }
    .noEdit {
      background-color: rgba(137, 137, 137, 1);
    }
  }
}
.disable {
  pointer-events: none;
}
</style>

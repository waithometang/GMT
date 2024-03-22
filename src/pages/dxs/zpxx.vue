<template>
  <div class="mstz">
    <div class="top"></div>
    <div class="main">
      <div class="content">
        <div class="time">
          <div class="title">
            <img src="./images/title1.png" alt="" />
            <p>招聘单位</p>
          </div>
          <div class="contents">
            <img class="spot" src="./images/spot.png" alt="" />
            <span>{{ data.zmdw }}</span>
          </div>
        </div>
        <div class="time">
          <div class="title">
            <img src="./images/title1.png" alt="" />
            <p>招募对象</p>
          </div>
          <div class="contents">
            <img class="spot" src="./images/spot.png" alt="" />
            <span>{{ data.zmdx }}</span>
          </div>
        </div>
        <div class="time">
          <div class="title">
            <img src="./images/title1.png" alt="" />
            <p>招募人数</p>
          </div>
          <div class="contents">
            <img class="spot" src="./images/spot.png" alt="" />
            <span>{{ data.zmrs }}人</span>
          </div>
        </div>
        <div class="time">
          <div class="title">
            <img src="./images/title1.png" alt="" />
            <p>工作时间</p>
          </div>
          <div class="contents">
            <img class="spot" src="./images/spot.png" alt="" />
            <span>{{ data.gzsj }}</span>
          </div>
        </div>
        <div class="time">
          <div class="title">
            <img src="./images/title1.png" alt="" />
            <p>工作地点</p>
          </div>
          <div class="contents">
            <img class="spot" src="./images/spot.png" alt="" />
            <span>{{ data.gzdd }}</span>
          </div>
        </div>
        <div class="time">
          <div class="title">
            <img src="./images/title1.png" alt="" />
            <p>实习时长</p>
          </div>
          <div class="contents">
            <img class="spot" src="./images/spot.png" alt="" />
            <span>{{ data.sxsc }}</span>
          </div>
        </div>
        <div class="time">
          <div class="title">
            <img src="./images/title1.png" alt="" />
            <p>实习待遇</p>
          </div>
          <div class="contents">
            <img class="spot" src="./images/spot.png" alt="" />
            <span>{{ data.sxdy }}</span>
          </div>
        </div>
        <div class="time">
          <div class="title">
            <img src="./images/title1.png" alt="" />
            <p>发布类型</p>
          </div>
          <div class="contents">
            <img class="spot" src="./images/spot.png" alt="" />
            <span>{{ data.fblx }}</span>
          </div>
        </div>
        <div class="time">
          <div class="title">
            <img src="./images/title1.png" alt="" />
            <p>发布人</p>
          </div>
          <div class="contents">
            <img class="spot" src="./images/spot.png" alt="" />
            <span>{{ data.fbr }}</span>
          </div>
        </div>
        <div class="time">
          <div class="title">
            <img src="./images/title1.png" alt="" />
            <p>具体要求</p>
          </div>
          <div class="contents">
            <img class="spot" src="./images/spot.png" alt="" />
            <span>{{ data.jtyq }}</span>
          </div>
        </div>
        <div class="time">
          <div class="title">
            <img src="./images/title1.png" alt="" />
            <p>报名方式</p>
          </div>
          <div class="contents">
            <img class="spot" src="./images/spot.png" alt="" />
            <span v-html="data.bmfs"></span>
          </div>
        </div>
        <div class="time">
          <div class="title">
            <img src="./images/title1.png" alt="" />
            <p>备注</p>
          </div>
          <div class="contents">
            <img class="spot" src="./images/spot.png" alt="" />
            <span>{{ data.bz }}</span>
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
      data: {
      },
    }
  },
  created () {
    this.$indicator.open('加载中...')
    this.$post('api/zx/zpxx', { id: this.$route.params.id }).then(res => {
      this.$indicator.close()
      if (res.data.success) {
        this.data = res.data.content
      } else {
        this.changtoast(res.data.message, 'error')
      }
    })
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.mstz {
  background: url('./images/bg2.png') center center no-repeat;
  background-size: cover;
  .top {
    width: 100%;
    height: 400px;
    background: url('./images/top1.png') center center no-repeat;
    background-size: cover;
  }
  .main {
    width: 100%;
    margin-top: -80px;
    .content {
      // height: 3000px;
      width: 700px;
      background: url('./images/bg1.png') center center no-repeat;
      background-size: cover;
      margin: 0 auto;
      padding-bottom: 50px;
      .time {
        margin-bottom: 20px;
        .title {
          width: 100%;
          padding-top: 20px;
          padding-bottom: 30px;
          position: relative;
          img {
            width: 500px;
            margin-left: 100px;
          }
          p {
            font-size: 32px;
            font-weight: bold;
            color: #fff;
            text-align: center;
            margin: 0;
            position: absolute;
            top: 25px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
        .contents {
          width: 551px;
          margin: 0 auto;
          margin-top: -60px;
          background: #ecf5ff;
          border: 1px solid #8ec1ff;
          border-radius: 20px;
          padding: 20px 40px;
          span {
            font-size: 32px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #484848;
            line-height: 60px;
            &:nth-child(3) {
              font-size: 36px;
              font-weight: 700;
              color: #0b78fe;
            }
          }
        }
      }
    }
  }
  .spot {
    width: 18px;
    margin-bottom: 4px;
  }
}
</style>
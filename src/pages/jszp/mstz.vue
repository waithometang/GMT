<template>
  <div class="mstz">
    <div class="top"></div>
    <div class="main">
      <div class="content">
        <div class="time">
          <div class="title">
            <img src="./image/title1.png" alt="" />
            <p>面试时间</p>
          </div>
          <div class="contents">
            <img class="spot" src="./image/spot.png" alt="" />
            <span>5月29日（星期六）全天请考生于当天早上</span
            ><span>7时30分前报到</span><span>（迟到者视为放弃面试资格）</span>
          </div>
        </div>
        <div class="place">
          <div class="title">
            <img src="./image/title1.png" alt="" />
            <p>面试地点</p>
          </div>
          <div class="contents">
            <img class="spot" src="./image/spot.png" alt="" />
            <span>西江新城第一小学</span
            ><span>（高明区荷城街道明湖南路338号），其中报到地点为润华堂</span>
          </div>
        </div>
        <div class="require">
          <div class="title">
            <img src="./image/title1.png" alt="" />
            <p>面试要求</p>
          </div>
          <div class="contents">
            <img class="spot" src="./image/spot.png" alt="" />
            <span
              >1.考生必须凭本人身份证原件、准考证、3日内（5月26日0时后进行的检测）有效的核酸检测阴性证明、“粤康码”绿码和《考生个人健康状况承诺书》（详见公告附件）进入考场。<br /><br />
              <img class="spot" src="./image/spot.png" alt="" />
              2.考生报到后采用全封闭方式管理，考生在离开考场前不得与外界联系，请提前知会家人。中午考场将提供简餐。<br /><br />
              <img class="spot" src="./image/spot.png" alt="" />
              3.面试方式为授课，面试时备考30分钟，授课不超过15分钟。</span
            >
          </div>
        </div>
        <div class="prevention">
          <div class="title">
            <img src="./image/title1.png" alt="" />
            <p>疫情防控要求</p>
          </div>
          <div class="contents">
            <img class="spot" src="./image/spot.png" alt="" />
            <span
              >根据我区防疫要求和招聘安排，请进入面试环节的考生，必须提供</span
            ><span>3日内（5月26日0时后进行的检测）有效的核酸检测阴性证明</span
            ><span
              >，并如实填写《考生个人健康状况承诺书》。14天内有国内高、中风险区域居旅史，且未能配合属地完成健康管理或核酸检测等防疫措施的考生或未按要求提供有关材料的考生，不得参加面试。考生须提前在粤省事健康申报功能中如实登记个人状况、来粤方式等情况，未如实报告的考生，不予面试或录用。如因疫情防控需要有所变动的，以最新通知为准。<br /><br />
              <img class="spot" src="./image/spot.png" alt="" />
              结合当前疫情防控要求，考生须全程佩戴一次性医用外科口罩，且在进入考场时，考生应主动出示本人“粤康码”绿码并接受体温检测（为缩短进场时间，请提前准备本人“粤康码”）。无法出示本人“粤康码”，或“粤康码”为红码、黄码的，或体温≥37.3℃的，不能参加考试。</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.mstz {
  background: url('./image/bg2.png') center center no-repeat;
  background-size: cover;
  .top {
    width: 100%;
    height: 400px;
    background: url('./image/top1.png') center center no-repeat;
    background-size: cover;
  }
  .main {
    width: 100%;
    margin-top: -80px;
    .content {
      // height: 3000px;
      width: 700px;
      background: url('./image/bg1.png') center center no-repeat;
      background-size: cover;
      margin: 0 auto;
      padding-bottom: 340px;
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
            font-size: 40px;
            font-family: Microsoft YaHei;
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
      .place {
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
            font-size: 40px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #fff;
            text-align: center;
            margin: 0;
            position: absolute;
            top: 24px;
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
            &:nth-child(2) {
              font-size: 36px;
              font-weight: 700;
              color: #0b78fe;
            }
          }
        }
      }
      .require {
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
            font-size: 40px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #fff;
            text-align: center;
            margin: 0;
            position: absolute;
            top: 24px;
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
          }
        }
      }
      .prevention {
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
            font-size: 40px;
            font-family: Microsoft YaHei;
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
  .bottom {
    width: 100%;
    height: 370px;
    margin-top: -370px;
    background: url('./image/bot1.png') center center no-repeat;
    background-size: cover;
  }
  .spot {
    width: 18px;
    margin-bottom: 4px;
  }
}
</style>
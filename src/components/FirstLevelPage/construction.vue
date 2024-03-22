<template>
  <div class="construction">
    <div class="content">
      <div class="auto" v-for="(item, index) in 7" :key="index">
        <div class="fl">
          <div class="title">佛山市文化广电新闻出版局 佛山市体育局 佛山市旅游局关于进...</div>
          <div class="time">
            <div class="icons">
              <img src="/images/FirstLevelPage/time.png">
            </div>
            <div class="times">2018-12-17</div>
          </div>
        </div>
        <div class="ft">
          <img src="/images/FirstLevelPage/tacitlyapprove.jpg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
};
</script>

<style lang='scss' scoped type='text/css'>
.construction {
  margin-bottom: 120px;
  .content {
    background: #ffffff;
    .auto {
      height: 174px;
      width: 699px;
      margin: 0 28px 0 23px;
      border-bottom: 1px dotted  #cccccc;
      .fl {
        padding-top: 20px;
        width: 487px;
        float: left;
        .title {
          height: 92px;
          overflow: hidden;
          span {
            width: 150px;
            height: 50px;
            background: rgba(253, 233, 218, 1);
            border-radius: 10px;
            font-size: 28px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(255, 143, 3, 1);
            line-height: 50px;
            text-align: center;
          }
          font-size: 28px;
          font-family: PingFang-SC-Heavy;
          font-weight: 800;
          color: rgba(51, 51, 51, 1);
        }
        .time {
          height: 61px;
          .icons {
            float: left;
            height: 61px;
            width: 26px;
            margin-right: 11px;
            img {
              margin-top: 17px;
              margin-bottom: 19px;
              width: 26px;
              height: 26px;
            }
          }
          .times {
            height: 61px;
            line-height: 61px;
            font-size: 20px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }
      }
      .ft {
        float: right;
        width: 174px;
        height: 134px;
        margin-top: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>

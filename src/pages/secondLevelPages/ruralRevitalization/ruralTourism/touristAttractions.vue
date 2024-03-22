<!-- 乡村旅游详情 旅游景点 -->
<template>
  <div class="TouristAttractions">
    <div class="search">
      <input placeholder="请输入关键字" type="text">
      <div>
        <img src="/images/secondLevelPages/search.png">搜索
      </div>
    </div>
    <div class="pages">
      <div class="item" v-for="(item,index) in 5" :key="index">
        <div class="top">
          <ul>
            <li>
              <img src="/images/secondLevelPages/img_01..jpg">
            </li>
            <li>佛山盈香生态园
              <p>
                <img src="/images/secondLevelPages/addres.png">佛山市高明区荷城街道西安冼村
              </p>
            </li>
          </ul>
        </div>
        <div class="fot">
          盈香生态园，坐落于有珠三角九寨沟之称的佛山市高
          明区凌云山麓下，距离广明高速沧江出口600米，处在广
          州、佛山、肇庆、江门地区1小时生活圈内...
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.TouristAttractions {
  margin: 0;
  padding: 0;
  background: #f2f9ff;
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: rgba(102, 102, 102, 1);
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: rgba(102, 102, 102, 1);
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: rgba(102, 102, 102, 1);
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: rgba(102, 102, 102, 1);
  }
  .search {
    width: 750px;
    height: 88px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px -1px 0px 0px rgba(218, 218, 218, 1);
    display: flex;
    input {
      width: 566px;
      height: 88px;
      border: none;
      font-size: 28px;
      padding-left: 24px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
    }
    div {
      width: 160px;
      height: 88px;
      background: rgba(64, 157, 226, 1);
      border-radius: 0px 4px 4px 0px;
      line-height: 88px;
      text-align: center;
      font-size: 28px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
        margin-right: 14px;
      }
    }
  }
  .pages {
    margin-top: 20px;
    .item {
      margin-bottom: 20px;
      background: #ffffff;
      .top {
        padding: 24px 0px 24px 0px;
        width: 706px;
        margin-left: 24px;
        display: flex;
        border-bottom: 1px dotted ;
        border-color: rgba(204, 204, 204, 1);
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          li {
            float: left;
            font-size: 32px;
            font-family: PingFang-SC-Bold;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            img {
              width: 160px;
              height: 120px;
              margin-right: 24px;
            }
            p {
              font-size: 28px;
              font-family: PingFang-SC-Medium;
              font-weight: 500;
              color: rgba(153, 153, 153, 1);
              margin: 0;
              margin-top: 50px;
              img {
                width: 22px;
                height: 30px;
                margin-right: 12px;
              }
            }
          }
        }
      }
      .fot {
        padding-top: 24px;
        width: 698px;
        height: 125px;
        font-size: 28px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        text-indent: 2em;
        margin-left: 20px;
      }
    }
  }
}
</style>

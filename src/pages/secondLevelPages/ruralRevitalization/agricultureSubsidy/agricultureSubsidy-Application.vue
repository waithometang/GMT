<!-- 涉农补助申请 页面 -->
<template>
  <div class="AgriculturalApplication-online">
    <div class="title">
      <img src="/images/secondLevelPages/minzhu.png">事项名称
    </div>
    <div class="pages">{{pageData.xmmc}}</div>
    <div class="title">
      <img src="/images/secondLevelPages/minzhu.png">{{lb == 6 ? '补贴' : '帮助'}}对象
    </div> 
    <div class="pages">{{pageData.bzdx}}</div>
    <div class="title">
      <img src="/images/secondLevelPages/minzhu.png">政策依据
    </div>
    <div class="pages">{{pageData.zcyj}}</div>
    <div class="title">
      <img src="/images/secondLevelPages/minzhu.png">项目说明
    </div>
    <div class="pages">{{pageData.xmsm}}</div>
    <div class="title">
      <img src="/images/secondLevelPages/minzhu.png">办理流程
    </div>
    <div class="pages">{{pageData.bllc}}</div>
    <div class="title">
      <img src="/images/secondLevelPages/minzhu.png">联系部门
      <a :href="'tel:'+pageData.lxdh">拨打热线</a>
    </div>
    <div class="pages">{{pageData.lxbm}}</div>
    <div class="title">
      <img src="/images/secondLevelPages/minzhu.png">备注
    </div>
    <div class="pages">{{pageData.bzsm}}</div>
    <!-- <div class="but">我要申请</div> -->
  </div>
</template>

<script>
import { Snbt } from '@/api/secondLevelPages/ruralRevitalization'
export default {
  computed: {
    lb () {
      return this.$route.query.lb
    }
  },
  data () {
    return {
      pageData: ''
    }
  },
  methods: {
    _GetSnbt () {
      Snbt ({
        lb: this.lb
      }).then (rps => {
        if (rps.data.success) {
          if (rps.data.content) {
            this.pageData = rps.data.content
          } else {
            this.changtoast('暂未发布补助信息', "error");
          }
        } else {
          this.changtoast(rps.data.message, "error");
        }
      })
    }
  },
  created () {
    this._GetSnbt()
  }
};
</script>

<style lang="scss" type="text/css" scoped>
.AgriculturalApplication-online {
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: scroll;
  background: #f2f9ff;
  .title {
    height: 67px;
    padding-left: 23px;
    padding-right: 23px;
    font-size: 28px;
    font-weight: 400;
    color: rgba(24, 130, 214, 1);
    line-height: 67px;
    border-bottom: 1px dotted ;
    background: white;
    img {
      width: 16px;
      height: 16px;
      margin-right: 11px;
      vertical-align: middle;
    }
    a {
      float: right;
      text-decoration: none;
      color: #1882d6;
    }
  }
  .pages {
    padding: 24px 40px 23px 50px;
    font-size: 30px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 24px;
    background: white;
    .tou {
      color: rgba(24, 130, 214, 1);
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      width: 100%;
      overflow: hidden;
      li:first-child {
        width: 70%;
      }
      li:last-child {
        width: 30%;
      }
      li {
        float: left;
        .template {
          text-align: right;
          font-size: 30px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(24, 130, 214, 1);
        }
        img {
          width: 28px;
          height: 32px;
          vertical-align: middle;
          margin-left: 9px;
        }
      }
    }
  }
  .but {
    width: 706px;
    height: 98px;
    background: rgba(24, 130, 214, 1);
    margin-left: 22px;
    text-align: center;
    line-height: 98px;
    font-size: 30px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
</style>

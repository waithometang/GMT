<!-- 企业认证列表 -->
<template>
  <div class="companiesList">
    <div class="companiesList-content">
      <BetterScroll>
        <template slot="BetterScroll">
          <div class="serch">
            <div>
              <input placeholder="请输入搜索内容" type="text" v-model="key"/>
              <img src="/images/secondLevelPages/search.png" @click="search ()"/>
            </div>
          </div>
          <div class="list">
            <div class="list-tab" v-if="listData.length >= 1">
              <div class="tab" v-for="(item, index) in listData" :key="index" @click="chakan(item)">
                <div class="name">{{item.name}}</div>
                <div class="time">
                  <div class="icon">
                    <img src="/images/img_13.png">
                  </div>
                  <div class="title">{{item.sqrq}}</div>
                  <div class="state">{{item.zt}}</div>
                </div>
              </div>
            </div>
            <div class="notData" v-if="listData.length <= 0">您还没有认证企业<span @click="authentication(1)">立即认证</span> </div>
          <div class="fasong" v-if="listData.length >= 1" @click="authentication(1)">继续认证</div>
          </div>
        </template>
      </BetterScroll>
    </div>

  </div>
</template>

<script>
import BetterScroll from '@/components/BetterScroll'
import { GetQyrzList } from '@/api/secondLevelPage'

export default {
  data () {
    return {
      key: '',
      listData: [],
    }
  },
  components: {
    BetterScroll
  },
  methods: {
    search () {
      this.GetListData()
    },
    authentication (item) {
      this.$router.push({
        path: '/enterpriseCertification/'+item
      })
    },
    GetListData () {
      GetQyrzList ({
        pageIndex: 1,
        PageSize: 10,
        search: this.key
      }).then(rps => {
        if (rps.data.success) {
          this.listData = rps.data.content
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    chakan (item) {
      this.$router.push({
        path: '/enterpriseCertification/'+ 2 +'/' +item.id
      })
    }
  },
  created () {
    this.GetListData()
  }
}
</script>

<style lang='scss' scoped type="text/css">
@import "@/style/components/GmtSearchList.scss";
.companiesList {
  background: #f2f2f2;
  .companiesList-content {
    position: absolute;
    top: 92px;
    bottom: 0;
    right: 0;
    left: 0;
    background: #f2f2f2;
    .list{
      .list-tab {
        .tab {
          background: #ffffff;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #cccccc;
          .name {
            flex: 1;
            font-size:28px;
            font-family:PingFang-SC-Heavy;
            font-weight:800;
            color:rgba(51,51,51,1);
          }
          .time {
            display: flex;
            align-items: center;
            flex: 0 0 auto;
            .icon{
              height: 30px;
              width: 30px;
              display: flex;
              margin-right: 10px;
              flex: 0 0 30px;
              img{
                height: 100%;
                width: 100%;
              }
            }
            .title{
              flex: 0 0 auto;
              font-size:24px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(153,153,153,1);
            }
            .state{
              flex: 0 0 auto;
              margin-left: 40px;
              font-size:28px;
              font-family:MicrosoftYaHei;
              font-weight:bold;
              color:red;
            }
          }
        }
      }
      .notData {
        display: flex;
        padding: 50px 0;
        align-items: center;
        justify-content: center;
        font-size:30px;
        font-family:PingFang-SC-Heavy;
        font-weight:bold;
        color:rgba(51,51,51,1);
        span{
          display: inline-block;
          margin-left: 30px;
          color:rgba(55,157,234,1);
        }
      }
      .fasong{
        width: 706px;
        height: 80px;
        overflow: hidden;
        zoom: 1;
        background: rgba(24, 130, 214, 1);
        margin-left: 22px;
        margin-top: 40px;
        color: #ffffff;
        font-size: 30px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>

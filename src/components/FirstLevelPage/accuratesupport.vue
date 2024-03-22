<!-- 革命老区 -->
<template>
  <div class="accuratesupport">
   <div class="hread-title">
      <div></div>涉农政策
      <div @click="goto()" class="more">更多<img src="/images/gengduo.png"/></div>
    </div>
    <div class="content">
      <releaseContentList :GMT_FBLB="2" :listData="listData" :url='detailsUrl'></releaseContentList>
      <!-- <loadingState :loadingStateData='2' v-if="!loadingState"></loadingState> -->
    </div>
  </div>
</template>

<script>
import releaseContentList from '@/components/releaseContentList'
// import loadingState from '@/components/loadingState' 
import { storage } from '@/js/until'
import { GetFbList } from '@/api/secondLevelPages/ruralRevitalization' 

export default {
  components: {
    releaseContentList,
    // loadingState
  },
  data () {
    return {
      pageIndex: 1,
      pageSize: 5,
      lx: 2,
      listData: [],
      type: 2,
      detailsUrl: '/xczxfbxq',
      loadingState: false
    }
  },
  computed: {
    longData () {
      return storage.fetch('longData').data
    }
  },
  methods: {
    _GetFbList () {
      this.loadingState = false
      GetFbList ({
        villageId: this.longData.id,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        lx: this.lx
      }).then(rps => {
        this.loadingState = true
        if (rps.data.success) {
          this.listData = rps.data.content
        } else {
          this.changtoast (rps.data.message, 'error')
        }
      })
    },
        goto() {
        this.$router.push({
          path: "/xczxfb/2"
        });
  }
  },
  created () {
    this._GetFbList()
  }
};
</script>
<style lang='scss' scoped type='text/css'>
.accuratesupport {
  // margin-bottom: 120px;
  padding-top: 20px;
  background: #f2f9ff;
  .hread-title{
    font-size: 28px;
    display: flex;
    align-items: center;
    background: #ffffff;
    padding: 15px 0px 15px 28px;
    border-bottom: 1px solid;
    border-color: #f4f4f4;
     div{
       height: 30px;
       width: 8px;
       background: #379dea;
       border-radius: 5px;
       margin-right: 22px;
     }
     .more{
      float: right;
      font-size: 28px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: #999999;
      width: auto;
      background: #ffffff;
      display: flex;
      align-items: center;
      margin-left: auto;
        img{
          height: 30px;;
        }
     }
  }
  .content {
    background: #ffffff;
  }
}
</style>

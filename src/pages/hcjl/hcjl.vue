<template>
  <div class="hcjl">
		<GmtSearchList url="api/zx/hctjjl" :useSearch='false'>
			<template slot="item" slot-scope="listData">
        <div class="hcjl-list">
          <div class="hcjl-list-tab" v-for="(item, index) in listData.data" :key="index">
            <div class="list-tab-left">
              <div class="tab-left-head"></div>
              <div class="tab-left-base"></div>
            </div>
            <div class="list-tab-right" @click="getDetails(item)">
              <div class="tab-right-head">
                <div class="head-time">{{item.rq}}</div>
                <div class="head-but">详情 ></div>
              </div>
              <div class="tab-right-base">
                <div class="right-base-tab">
                  <div class="tab-tag">
                    <div class="icon"><img src="/static/yq-icon-2.png" alt=""></div>
                    <div class="name">核查：{{item.zrs}}人</div>
                  </div>
                  <div class="tab-tag">
                    <div class="icon"><img src="/static/yq-icon-1.png" alt=""></div>
                    <div class="name">体温异常：{{item.ycrs}}人</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
			</template>
		</GmtSearchList>
  </div>
</template>

<script>
import GmtSearchList from '@/components/GmtSearchList';

export default {
  components: {
    GmtSearchList
  },
  methods: {
	  getTw (item) {
      if (item === '正常') {
        return '正常37.3℃以下'
      } else if (item === '低热') {
        return '低热37.3~37.9℃'
      } else if (item === '中热') {
        return '中热38~39℃'
      } else if (item === '高热') {
        return '高热 39℃以上'
      }
    },
    getDetails (item) {
      this.$router.push(`/hcjlxq/${item.rq}`)
    }
  },
}
</script>

<style lang='scss' scoped>
@import './style/hcjl.scss';
.hcjl /deep/.MissiveList {
	background:rgba(238,238,238,1);
}
</style>
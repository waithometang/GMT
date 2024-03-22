<template>
  <div class="hcjlxq">
    <!-- <GmtSearchList url="api/zx/hctjxxjl" :useSearch='false' :parms="{rq: $route.params.rq}">
      <template slot="item" slot-scope="listData"> -->
        <div class="hcxq-list">
          <div class="xq-list-tab" v-if="listData">
            <div class="list-tab-left">
              <div class="list-tab-left-head"></div>
              <div class="list-tab-left-base"></div>
            </div>
            <div class="list-tab-right">
              <div class="list-tab-right-head">{{listData.rq}}</div>
              <div class="list-tab-right-middle">核查:{{listData.zrs}}人   体温异常:{{listData.ycrs}}人</div>
              <div class="list-tab-right-base" v-for="(item, index) in listData.list" :key="index">
                <div class="right-base-head">
                  <div class="base-head-left"><i></i>{{item.cxr}}</div>
                  <div class="base-head-right">{{item.twzt}}</div>
                </div>
                <div class="right-base-middle">{{item.jcdd}}</div>
                <div class="right-base-base">备注：{{item.bz}}</div>
                <div class="right-base-base">{{item.sj}}</div>
              </div>
            </div>
          </div>
        </div>
      <!-- </template>
    </GmtSearchList> -->
  </div>
</template>

<script>
import GmtSearchList from "@/components/GmtSearchList";
import { hctjxxjl } from '@/api/secondLevelPage';

export default {
  data () {
    return {
      listData: ''
    }
  },
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
    getListData () {
      hctjxxjl ({
        rq: this.$route.params.rq
      }).then (rps => {
        if (rps.data.success) {
          this.listData = rps.data.content
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  },
  created () {
    this.getListData()
  }
};
</script>

<style lang="scss" scoped>
@import "./style/hcjlxq.scss";
.hcjlxq /deep/ .MissiveList {
	background:rgba(238,238,238,1);
}
</style>
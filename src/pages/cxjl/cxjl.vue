<template>
  <div class="cxjl">
	  <GmtSearchList url="api/zx/cxjl" :useSearch=false>
      <template slot="item" slot-scope="listData">
   		 <div class="public-yq-list">
			<div class="public-yq-list-tab" v-for="(item, index) in listData.data" :key="index">
				<div class="yq-list-tab-left">
					<div class="yq-list-tab-left-icon"></div>
					<div class="yq-list-tab-left-border"></div>
				</div>
				<div class="yq-list-tab-right">
					<div class="yq-list-tab-right-head">{{item.rq}}</div>
					<div class="yq-list-tab-right-middle" v-for="(item, index) in item.list" :key="index">
						<div class="yq-list-tab-content">
							<div class="yq-list-tab-content-left">核查时间</div>
							<div class="yq-list-tab-content-middle">{{item.sj}}</div>
							<div class="yq-list-tab-content-right">{{item.tw}}</div>
						</div>
						<div class="yq-list-tab-content">
							<div class="yq-list-tab-content-left">核查地点</div>
							<div class="yq-list-tab-content-middle">{{item.jcdd}}</div>
						</div>
						<div class="yq-list-tab-content">
							<div class="yq-list-tab-content-left">体温情况</div>
							<div class="yq-list-tab-content-middle">{{getTw(item.twzt)}}</div>
						</div>
						<div class="yq-list-tab-content">
							<div class="yq-list-tab-content-left">备 注</div>
							<div class="yq-list-tab-content-middle">{{item.bz}}</div>
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
import GmtSearchList from "@/components/GmtSearchList";
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
  }
};
</script>
<style lang="scss" scoped>
.cxjl /deep/ .MissiveList {
		background:rgba(238,238,238,1);
}
</style>
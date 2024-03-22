<template>
  <div class="bjxx">
		<div class="head">
			<div class="head-top">{{listData.nj}}</div>
			<div class="head-base">总人数:{{listData.zrs}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;累计打卡天数:{{listData.ljts}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;累计异常:{{listData.ljyc}}</div>
		</div>
		<div class="middle">
			<GmtSearchList url="api/yq/bjlsdkList" :useSearch="false">
				<template slot="item" slot-scope="listData">
				<div class="bjxx-item" v-for="(item,index) in listData.data" :key="index" @click="particulars(item)">
					<div class="item-hread">
						<div class="time">
							<span>{{item.rq}}</span>
						</div>
						<div class="jindu">
							<span>打卡进度{{getDkjd(item.ydk,item.zrs)}}%（{{item.ydk}}/{{item.zrs}}）</span>
						</div>
						<img src="/static/jkdk/箭头.png"/>
					</div>
					<div class="item-main">
						<div><img src="/static/jkdk/正常.png"/>正常：{{item.zcrs}}</div>
						<div><img src="/static/jkdk/异常.png"/>异常：{{item.ydk-item.zcrs}}</div>
					</div>
				</div>
				</template>
			</GmtSearchList>
		</div>
  </div>
</template>

<script>
import GmtSearchList from '@/components/GmtSearchList';
import { bjlsdktj } from '@/api/secondLevelPage';
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
		getDkjd(dkrs,zrs){
			return Math.floor((dkrs/zrs)*100)
		},
		particulars (item) {
			this.$router.push(`/xsxx/${item.rq}`)
		},
		getListData () {
			this.$indicator.open()
			bjlsdktj().then(rps => {
				this.$indicator.close()
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
}
</script>

<style lang="scss" scoped>
@import "./style/bjxx.scss";
</style>
<template>
  <div class="fgsbList">
		<GmtSearchList url="api/qy/qyfglist">
			<template slot="item" slot-scope="listData">
				<div class="list">
					<div class="list-tab" v-for="(item, index) in listData.data" :key="index">
						<div class="list-tab-left" @click="chek(item.id)">
							<div class="tab-left-head">
								<span>企业名称:</span> {{item.qymc}}
							</div>
							<div class="tab-left-base">
								<span>申报时间:</span>{{item.tjrq}}
							</div>
						</div>
						<div class="list-tab-right">
							<div class="tab-right-tab" @click="chek2(item.id)">再次申购</div>
						</div>
					</div>
				</div>
			</template>
		</GmtSearchList>
	</div>
</template>

<script>
import { qyfglist } from '@/api/secondLevelPage';
import GmtSearchList from '@/components/GmtSearchList';
export default {
	data () {
		return {
			listData: ''
		}
	},
	components: {
		GmtSearchList,
	},
	methods: {
		chek (item) {  //详情
			this.$router.push(`/fgsbxx/${item}?m=e`)
		},
		chek2 (item) {
			this.$router.push(`/fgsbxx/${item}`)
		}
	}
}
</script>

<style lang='scss' scoped>
@import './style/fgsbList.scss';
</style>
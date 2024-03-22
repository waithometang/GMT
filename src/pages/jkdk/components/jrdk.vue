<template>
  <div class="jrdk">
    <div class="middle">
			<div class="select">
				<div class="select-left">{{listData.date}}</div>
				<div class="select-right" @click="setActions">{{downMenuState}}<i></i></div>
			</div>
			<div class="info">{{listData.nj}} &nbsp;&nbsp;&nbsp;&nbsp;进度：{{listData.jd}}%({{listData.dkrs}}/{{listData.zrs}})&nbsp;&nbsp;&nbsp;&nbsp; 正常：{{listData.zc}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;异常：{{listData.yc}}</div>
		</div>
		<div class="base">
			<div class="base-content">
				<div class="content-list">
					<div class="list-tag">
						<div class="list-tag-tab">姓名</div>
						<div class="list-tag-tab">时间</div>
						<div class="list-tag-tab">次数</div>
						<div class="list-tag-tab">打卡人</div>
						<div class="list-tag-tab">情况</div>
						<div class="list-tag-tab">状态</div>
					</div>
					<div class="list-tag" :class="{'list-tag-action': index%2 !== 0}" v-for="(item, index) in tagData" :key="index">
						<div class="list-tag-tab" @click="particulars(item)">{{item.xm}}</div>
						<div class="list-tag-tab" @click="particulars(item)">{{item.sj ? item.sj : '/'}}</div>
						<div class="list-tag-tab" @click="particulars(item)">{{item.dkcs ? item.dkcs : 0}}</div>
						<div class="list-tag-tab" @click="particulars(item)">{{item.dkr ? item.dkr : '/'}}</div>
						<div class="list-tag-tab" @click="particulars(item)" :class="{'list-tag-tab-zc': item.zt === '正常', 'list-tag-tab-yc': item.zt === '异常'}">{{item.zt}}</div>
						<div class="list-tag-tab" @click="check(item)"><span :class="{'span-action': item.shzt === '待审核'}" v-if="item.shzt">{{item.shzt === '待审核' ? '审核' : '通过'}}</span></div>
					</div>
				</div>
				<!-- <GmtSearchList url="api/yq/bjjrdkList" :parms='{lb: downMenuState}' :useSearch="false" ref="searchList">
					<template slot="item" slot-scope="listData"> -->
						<!-- <div class="content-tag" :class="{'content-tag-action': index%2 !== 0 }" v-for="(item, index) in tagData" :key="index" @click="check(item)">
							<div class="content-tag-name">{{item.xm}}</div>
							<div class="content-tag-name">{{item.sj}}</div>
							<div class="content-tag-name">打卡{{item.dkcs}}次</div>
							<div class="content-tag-name" :class="{'content-tag-name-yc': item.zt != '正常'}">{{item.zt}}</div>
							<div class="content-tag-name" :class="{'content-tag-name-sh': item.shzt === '待审核'}">{{item.shzt ? item.shzt === '待审核' ? '审核' : '通过' : ''}}</div>
						</div> -->
					<!-- </template>
				</GmtSearchList> -->
			</div>
			<div class="base-but">
				<div v-if="hasSH" class="but-tag" @click="checkAll">一键审核上报</div>
				<div v-else class="but-tag ysb">已审核上报</div>
			</div>
		</div>
		<GmtDownMenu :actions="downMenuData" v-model="downMenuState" :show="shows" @setActions="setActions"/>
  </div>
</template>

<script>
import GmtSearchList from '@/components/GmtSearchList';
import GmtDownMenu from '@/components/GmtDownMenu';
import { dkjlsh, dkjlshall, bjjrdktj, bjjrdkList } from '@/api/secondLevelPage';
import { Dialog } from 'vant';

export default {
	data () {
		return {
			hasSH:false,//是否有待审核的记录
			tagData: '',
			listData: '',
			downMenuData: [{name: '全部'}, {name: '未打卡'}, {name: '正常'}, {name: '异常'}],
			downMenuState: '全部',
			shows: false
		}
	},
  components: {
		GmtSearchList,
		GmtDownMenu
	},
	inject: ["reload"],
	watch: {
		downMenuState () {
			this.getTagData()
		}
	},
	methods: {
		particulars (item) {
			if (item.zt !== '未打卡') {
				this.$router.push(`/dkxq/${item.id}`)
			} else {
				// this.changtoast('该学生尚未打卡')
			}
		},
		check (item) {
			if (item.shzt !== '待审核') {
				return
			}
			if (item.shzt === '已审核') {
				this.changtoast('该记录已审核', 'error')
				return
			}
			Dialog.confirm({
				title: '提示',
				message: '请确认已完成学生审核'
			}).then(() => {
				this.$indicator.open()
				dkjlsh({
					id: item.id
				}).then (rps => {
					this.$indicator.close()
					if (rps.data.success) {
						item.shzt = '已审核'
						this.changtoast('审核成功')
					} else {
						this.changtoast(rps.data.message, 'error')
					}
				})
			})
		},
		getTagData () {
			this.$indicator.open()
			bjjrdkList({
				lb: this.downMenuState
			}).then (rps => {
				this.$indicator.close()
				if (rps.data.success) {
					this.tagData = rps.data.content
					this.checkHasSH()
				} else {
					this.changtoast(rps.data.message, 'error')
				}
			})
		},
		checkAll () {
			Dialog.confirm({
				title: '提示',
				message: '请确认已完成学生审核'
			}).then(() => {
				this.$indicator.open()
				dkjlshall().then (rps => {
					this.$indicator.close()
					if (rps.data.success) {
						this.changtoast('审核成功')
						// this.$refs.searchList.updateListData()
						this.reload()
					} else {
						this.changtoast(rps.data.message, 'error')
					}
				})
			})
		},
		getListData () {
			this.$indicator.open()
			bjjrdktj().then(rps => {
				this.$indicator.close()
				if (rps.data.success) {
					this.listData = rps.data.content
				} else {
					this.changtoast(rps.data.message, 'error')
				}
			})
		},
		checkHasSH(){
			let arr=this.tagData
			if(!arr) return
			let len=arr.length
			for(let i=0;i<len;i++){
				if(arr[i].shzt === '待审核'){
					this.hasSH=true
					return
				}
			}
		},
		setActions () {
			this.shows = !this.shows
		}
	},
	created () {
		this.getListData()
		this.getTagData()
	}
}
</script>

<style lang='scss' scoped>
@import '../style/jrdk.scss';
</style>
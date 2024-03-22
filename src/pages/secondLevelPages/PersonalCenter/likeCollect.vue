<!-- 点赞 收藏 -->

<template>
	<div class="likeCollect">
		<!-- <div class="serch">
			<div>
				<input placeholder="请输入搜索内容" type="text" v-model="key" />
				<img src="/images/secondLevelPages/search.png" @click="search" />
			</div>
		</div> -->
		<div class="tag" ref="tag">
			<div class="tag_li" @click="changeType(0)" :class="{'action': stateType == 0}">
				<span>全部</span>
			</div>
			<div class="tag_li" @click="changeType(1)" :class="{'action': stateType == 1}">
				<span>首页</span>
			</div>
			<div class="tag_li" @click="changeType(2)" :class="{'action': stateType == 2}">
				<span>村情通</span>
			</div>
			<div class="tag_li" @click="changeType(3)" :class="{'action': stateType == 3}">
				<span>智慧党建</span>
			</div>
			<div class="tag_li" @click="changeType(4)" :class="{'action': stateType == 4}">
				<span>乡村振兴</span>
			</div>
			<div class="tag_li" @click="changeType(5)" :class="{'action': stateType == 5}">
				<span>企业+</span>
			</div>
			<div class="tag_li" @click="changeType(201)" :class="{'action': stateType == 201}">
				<span>工作动态</span>
			</div>
			<div class="tag_li" @click="changeType(202)" :class="{'action': stateType == 202}">
				<span>直联日志</span>
			</div>
			<div class="tag_li" @click="changeType(301)" :class="{'action': stateType == 301}">
				<span>党员实事</span>
			</div>
		</div>
		<div v-if="isselect" class="lists" ref="lists">
			<scroller  :on-infinite='infinite' :on-refresh="refresh" ref="myScroller">
				<GmtDefaultList :listData='listData'></GmtDefaultList>
			</scroller>
		</div>
	</div>
</template>

<script>
	import {
		storage
	} from "@/js/until";
	import {Wdjl} from '@/api/secondLevelPages/ruralRevitalization'
	import releaseContentList from '@/components/releaseContentList'
	import GmtDefaultList from '@/components/GmtDefaultList'

	let refreshing = false

	export default {
		components: {
			releaseContentList,
			GmtDefaultList
		},
		data() {
			return {
				key: '',
				pageIndex: 1,
				pageSize: 10,
				listData: [],
				typeData: [],
				lx: '',
				stateType: 0,
				data: [],
				jiekou:'',
				mkid:'',
				isselect:true,
				updatedState: false
			}
		},
		computed: {
			longdata() {
				return storage.fetch('longData').data
			}
		},
		mounted () {
      if (!this.updatedState) {
        let str = this.$refs.tag.clientHeight
        this.$refs.lists.style.top = str + 'px'
        this.updatedState = true
      }
		},
		methods: {
			infinite(done) {
				this._GetJszdList(done)
			},
			refresh(done) {
				this.pageIndex = 1
				this._GetJszdList(done)
				this.$refs.myScroller.finishInfinite(false)
			},
			changeType(item) {
				this.stateType = item
				this.mkid=item
				if(item==0){
					this.mkid=''
				}
				this.listData = []
				this.pageIndex = 1
				this.$refs.myScroller.finishInfinite(false)
			},
			search() {
				this.pageIndex = 1
				this.$refs.myScroller.finishInfinite(false)
			},
			_GetJszdList(done) {
				if (refreshing) return
				refreshing = true
				Wdjl({
				    villageId: this.longdata.id,
				    pageIndex: this.pageIndex,
				    pageSize: this.pageSize,
						type:this.$route.params.state,
						mkid:this.mkid
				  }).then (rps => {
						if (rps.data.success) {
							refreshing=false
							if(this.pageIndex===1) this.listData=rps.data.content
							else this.listData.push(...rps.data.content)
							this.pageIndex++
							if(!this.initFlag) this.initFlag=true
							if(done) done()
							if (rps.data.content.length < this.pageSize && this.$refs['myScroller']) {
								this.$refs.myScroller.finishInfinite(true)
							}
						} else {
							this.changtoast(rps.data.message,'error')
							this.$refs.myScroller.finishInfinite(true)
						}
				  })
				}
			},
		created() {
			let documentTitle = ''
			if (this.$route.params.state == 1) {
				documentTitle = '我的点赞'
			} else {
				documentTitle = '我的收藏'
			}
			document.title = documentTitle
		}
	}
</script>

<style lang='scss' scopde>
	@import "@/style/components/GmtSearchList.scss";
	@import '@/style/pages/secondLevelPages/PersonalCenter/likeCollect.scss';
</style>

 

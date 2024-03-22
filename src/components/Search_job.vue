<!-- 找工作 -->
<template>
	<div class="red_blackboard">
		<div class="head">
			<img src="/images/zhaogz.png" alt="">
		</div>
		<div class="select">
			<div class="select-tab sleset-tab-left" @click="changeState(2)">{{select_1}}</div>
			<div class="select-tab select-tab-action" @click="changeState(1)">{{select_2}}</div>
		</div>
		<div class="content">
			<GmtSearchList v-if="isselect" url="api/Common/PulishList" :parms="{mkId:this.mkid,fblxId:this.fblxId}">
				<template slot="item" slot-scope="listData">
					<GmtDefaultList :listData="listData.data" :mkid='1'></GmtDefaultList>
				</template>
			</GmtSearchList>
		</div>
	</div>
</template>
<script>
	import GmtDefaultList from "@/components/GmtDefaultList";
	import { PublishUtil } from "@/js/businessUntil";
	import {GetAddReaded,GetFblx} from '@/api/secondLevelPage'
	import GmtSearchList from "@/components/GmtSearchList";

	export default {
		data() {
			return {
				StateFlag: 1,
				isselect:true,
				select_1:'',
				select_2:'',
				mkid:1,
				fblxId:'',
			}
		},
		components: {
			GmtDefaultList,
			GmtSearchList
		},
		methods: {
			changeState(item) {
				if (item == 2) {
					window.location.href = 'http://www.gaoming.gov.cn/zwgk/rsxx/gwykl/index_29377.html?scene=4#wechat_redirect'
				}
			}
		},
		computed: {
		  Ser_type () {
		    return (this.$route.params.type)*1
		  }
		},
		created() {
		  switch (this.Ser_type) {
		    case 1:
		      document.title='点赞'
					this.select_1='最新热事'
					this.select_2='城市热点'
					this.fblxId=21
		      break;
		    case 2:
		      document.title='找工作'
					this.select_1='政府招考'
					this.select_2='社会招聘'
					this.fblxId=20
		      break;
		  }
		}
	};
</script>

<style lang="scss" scoped>
	.red_blackboard {
		background: #F2F9FF;
		padding-bottom: 20px;
		.head {
			width:750px;
			height:200px;
			img{
				width:750px;
				height:200px;
			}
		}
		.select {
			background:rgba(255,255,255,1);
			padding: 0 20px;
			display: flex;
			align-items: center;
			padding: 23px 20px;
			.select-tab {
				flex: 1;
				background:rgba(255,255,255,1);
				border:2px solid rgba(55, 157, 234, 1);
				border-radius:4px;
				font-size:32px;
				padding: 10px 0;
				font-weight:400;
				text-align: center;
				color:rgba(55,157,234,1);
			}
			.select-tab-action {
				background:rgba(55,157,234,1);
				color:rgba(255,255,255,1);
			}
			.sleset-tab-left {
				margin-right: 20px; 
			}
			.select-tab:active{
				background: #cccccc;
			}
		}
		.content {
			position: absolute;
			top: 320px;
			bottom: 0;
			left: 0;
			right: 0;
			overflow-y: scroll;
		}
	}
</style>

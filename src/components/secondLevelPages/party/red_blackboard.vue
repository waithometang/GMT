<!-- 两委成员 二级页面 -->
<template>
	<div class="red_blackboard">
		<BetterScroll>
			<template slot="BetterScroll">
				<div class="headImages">
					<!-- <img src="/images/hhb-top.png" alt=""> -->
					<img src="/static/hhb-top_v1.jpg" alt="">
				</div>
				<div class="head-tab">
					<div class="tab-li" :class="{'tab-li-action':zjState===1}" @click="changeState(1)">荷城</div>
					<div class="tab-li" :class="{'tab-li-action':zjState===2}" @click="changeState(2)">杨和</div>
					<div class="tab-li" :class="{'tab-li-action':zjState===3}" @click="changeState(3)">明城</div>
					<div class="tab-li" :class="{'tab-li-action':zjState===4}" @click="changeState(4)">更合</div>
				</div>
				<div class="head-title">
					<div class="title">
						<div class="title-icon"></div>
							{{this.zjState == 1 ? '荷城' : this.zjState == 2 ? '杨和' : this.zjState == 3 ? '明城': '更合'}}红黑榜第{{qc}}期
					</div>
					<div class="dropdown">
						<div class="Option">
							<GmtOption :listData='qcList' v-if="qcList.length > 0" :selectState="TabStateData"  @SetselectTag="SetQCState"></GmtOption>
						</div>
					</div>
				</div>
				<div class="list">
					<div class="list-li list-li-red">
						<div class="images">红榜</div>
						<div class="list-li-tab"  v-for="(item, index) in redItems" :key="index">
							<div class="li-tab-icon" :class="{'li-tab-icon-red': index !=0}">
								<img v-if="index ==0" src="/images/icon_hong_zan@2x.png" alt="">
								<span v-else>{{index+1}}</span>
							</div>
							<div class="li-tab-title">
								<div class="name ranking-red">{{item.name}}</div>
								<div class="ranking ranking-red">{{item.p_name}}</div>
							</div>
						</div>
					</div>
					<div class="list-li list-li-black">
						<div class="images images-hei">黑榜</div>
						<div class="list-li-tab"  v-for="(item, index) in blackItems" :key="index">
							<div class="li-tab-icon" :class="{'li-tab-icon-black': index != 0}">
								<img v-if="index ==0" src="/images/icon_hei_cai@2x.png" alt="">
								<span v-else>{{index+1}}</span>
							</div>
							<div class="li-tab-title">
								<div class="name">{{item.name}}</div>
								<div class="ranking">{{item.p_name}}</div>
							</div>
						</div>
					</div>
				</div>
				<div class="explain">
					<div class="explain-title">红黑榜考评说明:</div>
					<div class="explain-content">
						&nbsp;&nbsp;村居考评是由区城管执法局对村(居)以村容村貌、环境卫生为主要内容进行
						考核，涵盖园林绿化、市政及公共设施、户外广告等方面
					</div>
				</div>
			</template>
		</BetterScroll>
	</div>
</template>
<script>
	import GmtDefaultList from "@/components/GmtDefaultList";
	import GmtSelectTab from '@/components/GmtSelectTab';
	import GmtOption from "@/components/GmtOption";
	import { Gethhb,GethhbQc } from '@/api/secondLevelPage';
	import {mapActions} from "vuex";
	import BetterScroll from "@/components/BetterScroll";

	export default {
		data() {
			return {
				TabData: [{name: '红榜', type: 0}, {name: '黑榜', type: 1}],
				pageIndex: 1,
				hhb: 0,
				pageSize: 10,
				qc: 0,
				zq: '',
				zjState:1,
				redItems: [],
				blackItems: [],
				qcList:[],
				TabStateData: ''
			}
		},
		components: {
			GmtDefaultList,
			GmtSelectTab,
			BetterScroll,
			GmtOption
		},
		computed: {
			userInfo() {
				return this.$store.state.userinfo
			},
			GmtLoadingState () {
				return this.$store.state.GmtLoadingState
			}
		},
		methods: {
			...mapActions(['getGrxx']),
			SetQCState (item) {
				this.qc = item.name
				this.TabStateData = item.id
				this._Gethhb()
			},
			// 顶部导航改变
			changeState(i) {
				this.zjState = i
				this._Gethhb()
			},
			// 获取列表数据
			_Gethhb () {
				this.$store.commit('Set_GmtLoadingState', true)
				Gethhb ({
					zj:this.zjState,
					qc:this.qc
				}).then (rps => {
					this.$store.commit('Set_GmtLoadingState', false)
					if (rps.data.success) {
						this.zq = rps.data.content.zq
						this.redItems = rps.data.content.redItems
						this.blackItems = rps.data.content.blackItems
					} else {
						this.changtoast(rps.data.message, 'error')
					}
				})
			},
			async init(){
				let grxx = await this.getGrxx()
				let zjArr=[872,874,875,876]
				if (grxx.hasSM) {
					this.zjState=zjArr.indexOf(grxx.sszjid)+1
				}
				GethhbQc().then(rps=>{
					if (rps.data.success) {
						let dome = rps.data.content
						for (let index = 0; index < dome.length; index++) {
							const element = {name: dome[index], id: index}
							this.qcList.push(element)
						}
							this.qc=this.qcList[0].name
							this.TabStateData = this.qcList[0].id
							this._Gethhb()
						} else {
							this.changtoast(rps.data.message, 'error')
						}
				})
			}
		},
		created () {
			this.init()
		}
	};
</script>

<style lang="scss" scoped type="text/css">
.red_blackboard /deep/ .el-input__inner {
	height: auto !important;
	padding: 10px 10px !important;
	line-height: 0;
}
.red_blackboard {
	position: relative;
	min-height: 100vh;
	.headImages {
		height:210px;
		img{
			height: 210px;
		}
	}
	.head-tab{
		display: flex;
		align-items: center;
		padding: 20px 0;
		.tab-li{
			flex: 1;
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius:8px;
			background:rgba(235,239,242,1);
			font-size:30px;
			font-family:PingFang-SC-Regular;
			font-weight:bold;
			color:rgba(74,74,74,1);
			margin: 0 30px;
		}
		.tab-li-action {
      background:rgba(58,154,240,1);
      color:rgba(255,255,255,1);
    }
	}
	.head-title{
    font-size: 28px;
    display: flex;
    align-items: center;
    padding: 15px 0px 15px 28px;
		.title {
			display: flex;
			align-items: center;
			flex: 0 0 auto;
			.title-icon{
				height: 30px;
				width: 8px;
				background: #379dea;
				border-radius: 5px;
				margin-right: 22px;
			}
		}
		.dropdown {
			flex: 1;
			padding: 0 20px;
			padding-left: 40px;
			display: flex;
			justify-content: flex-end;
			.Option {
				width: 260px;
			}
		}
	}
	.list {
		display: flex;
		align-items: flex-start;
		padding: 25px 53px 21px 52px;
		.list-li-red {
			background:linear-gradient(0deg,rgba(253,197,195,1),rgba(255,245,244,1));
			box-shadow:0px 8px 8px 0px rgba(182,181,181,0.4), 0px -4px 4px 0px rgba(255,6,0,0.1);
			border-radius:10px;
			margin-right: 45px;
		}
		.list-li-black {
			background:linear-gradient(0deg,rgba(211,212,211,1),rgba(249,249,249,1));
			box-shadow:0px 4px 4px 0px rgba(182,181,181,0.5), 0px -4px 4px 0px rgba(4,0,0,0.1);
			border-radius:10px;
		}
		.list-li{
			flex: 1;
			height: 100%;
			display: flex;
			flex-direction: column;
			.images{
				display: flex;
				align-items: center;
				justify-content: center;
				font-size:32px;
				font-family:PingFang-SC-Heavy;
				font-weight:bold;
				color:rgba(255,1,0,1);
				margin-top: 34px;
				margin-bottom: 60px;
			}
			.images-hei{
				color:rgba(40,40,40,1);
			}
			.list-li-tab {
				display: flex;
				align-items: center;
				margin-bottom: 45px;
				margin-left: 37px;
				.li-tab-icon {
					width:66px;
					height:66px;
					margin-right: 17px;
					flex: 0 0 66px;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size:40px;
					font-weight:bold;
					color:rgba(255,255,255,1);
					img{
						height: 66px;
						width: 66px;
					}
				}
				.li-tab-icon-red {
					color:rgba(255,17,16,1);
				}
				.li-tab-icon-black {
					color:rgba(74,74,74,1);
				}
				.li-tab-title {
					flex: 1;
					.name {
						font-size:28px;
						font-weight:bold;
						color:rgba(74,74,74,1);
					}
					.ranking {
						margin-top: 10px;
						font-size:24px;
						font-weight:bold;
						color:rgba(150,150,150,1);
					}
					.ranking-red {
						color:rgba(255,84,0,1);
					}
				}
			}
		}
		.list-li-lef{
			border-right: 1px solid #cccccc;
		}
	}
	.explain {
		padding: 10px 30px;
		.explain-title {
			font-size:24px;
			font-weight:bold;
			color:rgba(40,40,40,1);
			margin-bottom: 19px;
			text-align: center;
		}
		.explain-content {
			font-size:20px;
			font-weight:bold;
			color:rgba(74,74,74,1);
			text-align: center;
		}
	}
}
</style>

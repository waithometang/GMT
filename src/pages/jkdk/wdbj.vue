<template>
  <div class="wdbj">
		<div class="head">
			<div class="head-tab" @click="selectTab(1)">
				<div class="head-tab-name" :class="{'head-tab-name-action': tabState === 1}">今日打卡</div>
			</div>
			<div class="head-tab" @click="selectTab(2)">
				<div class="head-tab-name"  :class="{'head-tab-name-action': tabState === 2}">历史打卡</div>
			</div>
		</div>
		<jrdk v-if="tabState === 1"/>
		<bjxx v-if="tabState === 2"/>
  </div>
</template>
<script>
import jrdk from './components/jrdk';
import bjxx from './bjxx';
import { dkqkList } from  '@/api/secondLevelPage';
import {mapActions} from "vuex";
export default {
	data () {
		return {
			listData: '',
			tabState: 1,
		}
	},
	components: {
		jrdk,
		bjxx
	},
	methods: {
    	...mapActions(['getGrxx']),
		selectTab (item) {
			this.tabState = item
		}
	},
	created(){
		this.getGrxx().then(grxx=>{
			this.$indicator.open('数据加载中')
			if(!grxx.hasWJ){
				this.$router.push('/ewm')
			}
		})
	},
	beforeRouteEnter (to, from, next) {
		next(val => {
			if (from.name === 'xsxx') {
				val.tabState = 2
			} else {
				val.tabState = 1
			}
		})
	}
}
</script>
<style lang="scss" scoped>
@import "./style/wdbj.scss";
</style>
<template>
  <div class="index">
		<div class="select">
			<div :class="{'cor1': $route.name === 'fgdj'}" @click="select(1)">返岗申报</div>
			<div :class="{'cor1': $route.name === 'fgdjList'}" @click="select(2)">申报记录</div>
		</div>
		<div class="content">
      <router-view/>
		</div>
  </div>
</template>

<script>
import GmtSelectTab from '@/components/GmtSelectTab';
export default {
	methods: {
		select (item) {
			if (item === 1) {
				this.$router.push('/fgdjIndex')
			} else {
				this.$router.push('/fgdjList')
			}
		}
	},
}
</script>

<style lang='scss' scoped type="text/css">
@import "@/style/FirstLevelPage/select.scss";
.index {
	.content {
		position: absolute;
		top: 84px;
		bottom: 0;
		left: 0;
		right: 0;
	}
}
</style>
<template>
  <div class="index">
		<div class="select">
			<div :class="{'cor1': $route.name === 'fgsb'}" @click="select(1)">企业申报</div>
			<div :class="{'cor1': $route.name === 'fgsbList'}" @click="select(2)">申报记录</div>
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
				this.$router.push('/fgsbindex')
			} else {
				this.$router.push('/fgsbList')
			}
		}
	},
	mounted() {
		document.title = '企业口罩申购'
	}
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
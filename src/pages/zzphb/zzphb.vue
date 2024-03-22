<template>
  <div class="zzphb">
    <div class="head_images">
      <img src="/static/banner@2x.png" alt="">
    </div>
    <div class="list_tab">
      <div class="tab">
        <div class="name">荷城</div>
      </div>
      <div class="tab">
        <div class="name">杨和</div>
      </div>
      <div class="tab">
        <div class="name">明城</div>
      </div>
      <div class="tab">
        <div class="name">更合</div>
      </div>
    </div>
    <div class="name_time">
      <div class="name_time_icon"></div>
      <div class="name_time_name">杨和镇整治排行榜 <span>更新时间：2019-07-02</span></div>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      redItems: [{name: '下泽', p_name: '尼教村委会'},{name: '下泽', p_name: '尼教村委会'},{name: '下泽', p_name: '尼教村委会'},{name: '下泽', p_name: '尼教村委会'},{name: '下泽', p_name: '尼教村委会'}],
      blackItems: [{name: '下泽', p_name: '尼教村委会'},{name: '下泽', p_name: '尼教村委会'},{name: '下泽', p_name: '尼教村委会'},{name: '下泽', p_name: '尼教村委会'},{name: '下泽', p_name: '尼教村委会'}]
    }
  }
}
</script>

<style lang="scss">
@import './style/index.scss';
</style>
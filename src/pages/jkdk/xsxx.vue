<template>
  <div class="xsxx">
		<div class="head">
			<div class="select">
				<div class="select-left">{{listData.date}}</div>
				<div class="select-right" @click="setActions">{{downMenuState}}<i></i></div>
			</div>
			<div class="info">{{listData.nj}}&nbsp;&nbsp;&nbsp;&nbsp;进度:{{listData.jd}}%({{listData.dkrs}}/{{listData.zrs}})&nbsp;&nbsp;&nbsp;&nbsp;正常:{{listData.zc}}&nbsp;&nbsp;&nbsp;&nbsp;异常:{{listData.yc}}</div>
		</div>
		<div class="middle">
      <GmtSearchList url="api/yq/bjjrdkList" :parms="listparms" :useSearch="false">
				<template slot="item" slot-scope="listData">
          <div class="xsxx-item" v-for="(item,index) in listData.data" :key="index" @click="particulars(item)">
            <div>{{item.xm}}</div>
            <div>{{item.sj}}</div>
            <div>{{item.zt}}</div>
          </div>
				</template>
      </GmtSearchList>
    </div>
  <GmtDownMenu :actions="downMenuData" v-model="downMenuState" @select="onSelect" :show="show" @setActions="setActions"/>
  </div>
</template>

<script>
import GmtSearchList from '@/components/GmtSearchList';
import GmtDownMenu from '@/components/GmtDownMenu';
import { bjjrdktj } from '@/api/secondLevelPage';

export default {
  data () {
    return {
      listparms:{date: this.$route.params.date, lb: this.downMenuState},
      listData: '',
      downMenuData: [{name: '全部'}, {name: '正常'}, {name: '异常'}],
			downMenuState: '全部',
			show: false
    }
  },
  components: {
    GmtSearchList,
    GmtDownMenu
  },
  methods: {
    setActions () {
      this.show = !this.show
    },
    getListData () {
			this.$indicator.open()
			bjjrdktj({
        date: this.$route.params.date
      }).then(rps => {
				this.$indicator.close()
				if (rps.data.success) {
					this.listData = rps.data.content
				} else {
					this.changtoast(rps.data.message, 'error')
				}
			})
    },
    onSelect(val){
      this.listparms={date: this.$route.params.date, lb: val}
    },
    particulars (item) {
      this.$router.push(`/dkxq/${item.id}`)
    }
  },
  created () {
    this.getListData()
  }
}
</script>

<style lang="scss" scoped>
@import "./style/xsxx.scss";
</style>
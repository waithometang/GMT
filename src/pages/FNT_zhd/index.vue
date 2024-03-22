<template>
  <div class="serch_activity">
    <div class="serch_activity_hread">
      <div class="search-all">
        <input v-model="value" type="text" name id class="search-input" placeholder="请输入搜索内容" />
        <div class="search-icon">
          <img src="/static/FNT_IMAGES/search.png" alt />
        </div>
      </div>
    </div>
    <div class="serch_activity_select">
      <div class="addr">
      <GmtOption :listData="site" :selectState="siteStart"  @SetselectTag="SiteStart"/>
      </div>
      <div class="gang"></div>
      <div class="statr">
        <GmtOption :listData="state" :selectState="stateStart"  @SetselectTag="Setstate"/>
      </div>
    </div>
    <div class="serch_activity_label">
      <div :class="{'islable':islable==0}" @click="islables(itemss,-1)">全部</div>
      <div :class="{'islable':islable==index+1}" v-for="(item,index) in label" :key="index" @click="islables(item, index)" >{{item}}</div>
    </div>
    <div class="conent" ref="content" :style="styleData" v-if="label">
      <GmtSearchList url="fapi/fb/hdfbList" :useSearch="false" :parms="{lx:lxs,hdzt:stateStart,hddd:siteStart,search:value}" :pageSize="10">
        <template slot="item" slot-scope="listData">
          <public-List-Tab :listData="listData.data" :listType="'list'" @public_list_click="goReply"></public-List-Tab>
        </template>
      </GmtSearchList>
    </div>
  </div>
</template>

<script>
import { Hdfblb } from '@/api/FNTApi'
import GmtOption from '@/components/GmtOption'
import GmtSearchList from '@/components/GmtSearchList'
export default {
  data() {
    return {
      value: '',
      lxs:"全部",
      itemss: "全部",
      label:"",
      islable: 0,
      type: 1,
      styleData: {},
      site: [ { name: "全区", id: 0 }, { name: "荷城", id: 1 }, { name: "杨和", id: 2 }, { name: "明城", id: 3 }, { name: "更合", id: 4 } ],
      siteStart: 0,
      state: [ { name: "全部", id: 0 },{ name: "报名准备", id: 5 }, { name: "报名中", id: 1 }, { name: "报名结束", id: 2 }, { name: "进行中", id: 3 }, { name: "已结束", id: 4 } ],
      stateStart: 0,
      hread_tab: [ { img_url: "/static/FNT_IMAGES/acticity/fjhd.png", url: "/nearby_activity" }, { img_url: "/static/FNT_IMAGES/acticity/bzhd.png" }
      ],
    }
  },
  components: {
    GmtOption,
    GmtSearchList
  },
  methods: {
    SiteStart (item) {
      this.siteStart = item.id
    },
    Setstate (item) {
      this.stateStart = item.id
    },
    goReply (item) {
        this.$router.push(`/fntZhdxq/${item.id}`)
    },
    islables (item, index) {
      this.islable = index +1
      this.lxs = item
    },
    getlistData () {
      Hdfblb().then (rps => {
        if (rps.data.success) {
          let data=rps.data.content.fblx.split(';');
          data.splice(data.length-1);
          this.label=data
          this.$nextTick(val => {
            let dome = this.$refs.content
            this.styleData = {
              position: 'absolute',
              top: this.$refs.content.offsetTop +'px',
              bottom:0,
              left: 0,
              right: 0,
            }
          })
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  },
  created () {
    this.getlistData()
  }
}
</script>

<style lang='scss' scoped>
@import './style/index.scss';
</style>
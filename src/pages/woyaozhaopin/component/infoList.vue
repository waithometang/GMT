<template>
  <div class="infoList" ref="infoList" :style="styleData">
    <GmtSearchList url="api/qy/wdzpfbList">
      <template slot="item" slot-scope="listData">
        <div class="infoList_list_tab" v-for="(item, index) in listData.data" :key="index" @click="lookOver(item.id)">
          <div class="infoList_list_tab_head">
            <div class="infoList_list_tab_head_tab">
              <div class="infoList_list_tab_head_icon">
                <img src="/static/bule@2x.png" alt="">
              </div>
              {{item.zwmc}}
            </div>
            <div class="infoList_list_tab_head_yx">{{item.yxfw}}</div>
          </div>
          <div class="infoList_list_tab_middle">{{item.zwms}}</div>
          <div class="infoList_list_tab_base">
            <div class="infoList_list_tab_base_tab">
              <img src="/static/time@2x.png" alt="">
              {{item.date}}
            </div>
            <div class="infoList_list_tab_base_tab">
              <img src="/static/see@2x.png" alt="">
              {{item.yds ? item.yds : 0}}
            </div>
          </div>
        </div>
      </template>
    </GmtSearchList>
  </div>
</template>

<script>
import GmtSearchList from "@/components/GmtSearchList.vue"
export default {
  components: {
    GmtSearchList
  },
  data () {
    return {
      styleData: {},
    }
  },
  methods: {
    lookOver (item) {
      console.log(item)
      this.$router.push(`/qyzpxq/${item}`)
    }
  },
  mounted () {
    this.$nextTick(rps => {
      setTimeout(() => {
        let dome = this.$refs.infoList
        let domeTop = dome.offsetTop
        this.styleData = {
          position: 'absolute',
          top: domeTop + "px",
          bottom: 0,
          left: 0,
          right: 0,
        }
      }, 100);
    })
  }
}
</script>

<style lang='scss' scoped>
@import '../style/infoList.scss';
</style>
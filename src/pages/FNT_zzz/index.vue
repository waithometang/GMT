<template>
  <div class="serch_organization">
    <div class="hread_img">
      <img src="/static/FNT_IMAGES/serch_organization/serch_organization.png" />
    </div>
    <div class="button-tab">
      <div class="button-nor button-nor-margin" :class="{'on': bottonType == 1}" @click="BottonType(1)">妇女组织</div>
      <div class="button-nor button-nor-margin" :class="{'on': bottonType == 2}" @click="BottonType(2)" >服务阵地</div>
    </div>
    <div class="conent" ref="content" :style="styleData">
      <GmtSearchList url="fapi/qzhd/ZzzList" :pageSize="10" :useSearch="true" :parms="{TypeId:bottonType, sszj: '全部'}" v-if="bottonType > 0">
        <template slot="item" slot-scope="listData">
          <public-List-Tab :listData="listData.data" :listType="type" @public_list_click="goReply" ></public-List-Tab>
        </template>
      </GmtSearchList>
    </div>
  </div>
</template>

<script>
import GmtSearchList from '@/components/GmtSearchList'
export default {
  data () {
    return {
      bottonType: 0,
      styleData: {},
      type: 'organization'
    }
  },
  components: {
    GmtSearchList
  },
  methods: {
    BottonType (item) {
      this.bottonType = item
    },
    goReply (item) {
      this.$router.push(`/fntZzzxx/${item.id}/${this.bottonType}`)
    }
  },
  mounted () {
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
  },
  beforeRouteEnter (to, from, next) {
    next(val => {
      let state = from.params.type*1
      if (state === 1) {
        val.bottonType = 1
      } else if (state === 2) {
        val.bottonType = 2
      } else {
        val.bottonType = 1
      }
    })
  }
}
</script>

<style lang='scss' scoped>
@import './style/index.scss';
</style>
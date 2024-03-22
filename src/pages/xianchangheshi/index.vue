<template>
  <div class="xianchangheshi">
    <GmtSearchList url="api/Common/PulishList" :parms="{mkId:4,fblxId:this.$route.params.fblxid}">
      <template slot="item" slot-scope="listData">
        <GmtDefaultList :listData="listData.data" :mkid="4"></GmtDefaultList>
      </template>
    </GmtSearchList>
    <div v-if="showRelease" class="release_button" @click="clickRelease">发布</div>
  </div>
</template>

<script>
import GmtDefaultList from '@/components/GmtDefaultList'
import GmtSearchList from '@/components/GmtSearchList'
import {mapActions} from 'vuex'
export default {
  components: {
    GmtSearchList,
    GmtDefaultList
  },
  data () {
    return {
      showRelease: false
    }
  },
  methods: {
    ...mapActions(['GetuserInfo']),
    clickRelease () {
      this.$router.push('/release/3')
    },
    setShowRelease () {
      this.GetuserInfo().then (rps => {
        if (rps.zxkhfb) {
          this.showRelease = true
        }
      })
    }
  },
  created () {
    this.setShowRelease()
  }
}
</script>

<style lang='scss' scoped>
.xianchangheshi {
  .release_button {
    position: fixed;
    right: 30px;
    top: 670px;
    z-index: 99999;
    width:80px;
    height:80px;
    background:rgba(58,154,240,1);
    border-radius:50%;
    font-size:28px;
    font-weight:bold;
    color:rgba(255,255,255,1);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
}
</style>
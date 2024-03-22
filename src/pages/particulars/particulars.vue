<template>
  <div class="particulars">
    <GmtSearchList :url='"api/common/PycPulishList"' :pageSize="3" :useSearch="true" :parms='{mkid: this.mkid}'>
      <template slot="item" slot-scope="listData">
        <listParticulars :listData="listData.data" :userInfoType="1"></listParticulars>
      </template>
    </GmtSearchList>
  </div>
</template>

<script>
import GmtSearchList from '@/components/GmtSearchList';
import listParticulars from '@/components/secondLevelPages/homePage/listParticulars';

export default {
  components: {
    GmtSearchList,
    listParticulars
  },
  computed: {
    mkid () {
      return parseInt(this.$route.params.mkid)
    }
  },
  created () {
    switch (this.mkid) {
      case 202:
        document.title = '直联动态'
        break;
      case 201:
        document.title = '干部风采'
        break;
      case 301:
        document.title = '党员实事'
        break
      default:
        break;
    }
  }
}
</script>

<style>

</style>
<!-- 乡村振兴发布列表 -->
<template>
  <div class="publishList">
    <GmtSearchList :url="url" :parms="{villageId: longData.id , lx: Type*1}">
      <template slot="item" slot-scope="listData">
        <releaseContentList :GMT_FBLB="2" :listData="listData.data" :url='detailsUrl'></releaseContentList>
      </template>
    </GmtSearchList>
  </div>
</template>

<script>
import GmtSearchList from  '@/components/GmtSearchList'
import releaseContentList from '@/components/releaseContentList'
import { storage } from '@/js/until'

export default {
  components: {
    GmtSearchList,
    releaseContentList
  },
  data () {
    return {
      url: 'api/zx/fb',
      detailsUrl: '/xczxfbxq'
    }
  },
  computed: {
    Type () {
      return this.$route.params.type
    },
    longData () {
      return storage.fetch('longData').data
    }
  },
  created () {
    switch (this.Type) {
      case '0':
        document.title = '垃圾分类'
        break;
      case '2':
        console.log('123')
        document.title = '涉农政策'
        break;
    }
  }

}
</script>

<style>

</style>

<template>
  <div>
    <GmtSearchList url="api/VillageOpen/GetNewsList" :title="titleData" :parms="{newsType:this.newsType,VillageId:this.villageId}" >
      <template slot="item" slot-scope="listData">
        <div v-for="(item, index) in listData.data" :key="index" @click="checkParticulars(item)">
          <div class="content">
            <div class="auto" :class="{'bor':index+1==listData.data.length}">
              <div class="fl">
                <div class="title">
                  <span
                    style="display:inline-block"
                    v-if="item.publishGrade"
                  >{{GetGrade(item.publishGrade)}}</span>
                  {{item.title}}
                </div>
                <div class="timeNumber">
                  <div class="time">
                    <div class="icon">
                      <img src="/images/FirstLevelPage/time.png">
                    </div>
                    {{item.publishTime}}
                  </div>
                  <div class="number">
                    <div class="icon">
                      <img src="/images/FirstLevelPage/ReadedCount.jpg">
                    </div>
                    {{item.readedCount}} 阅读
                  </div>
                </div>
              </div>

              <div class="ft">
                <img src="/images/FirstLevelPage/tacitlyapprove.jpg">
              </div>
            </div>
          </div>
        </div>
      </template>
    </GmtSearchList>
  </div>
</template>
<script>
(function () {
  var isPageHide = false
  window.addEventListener('pageshow', function () {
    if (isPageHide) {
      window.location.reload()
    }
  });
  window.addEventListener('pagehide', function () {
   isPageHide = true
  })
})(window)
import GmtSearchList from "@/components/GmtSearchList.vue";
import { storage } from "@/js/until"; 
import { PublishUtil } from "@/js/businessUntil";
import { GetAddReaded } from '@/api/secondLevelPage'
export default {
  data() {
    return {
      titleData: ""
    };
  },
  computed: {
    newsType() {
      return Number(this.$route.query.type);
    },
    villageId() {
      return storage.fetch("longData").data.id;
    }
  },
  methods: {
    // 查看详情
    checkParticulars (item) {
      if (item.linkage) {
        GetAddReaded ({
          id: item.id,
          lb: 0
        }).then (rps => {

        })
        window.location.href = item.linkage
      } else {
        this.$router.push(`/cjfb/${item.id}`)
      }
    },
    GetGrade(id) {
      return PublishUtil.getGrade(id);
    },
    getTitle(id) {}
  },
  created() {
    this.titleData = PublishUtil.getTypeName(this.newsType);
    document.title = this.titleData
  },
  components: {
    GmtSearchList
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/components/villagePublishList.scss"
</style>

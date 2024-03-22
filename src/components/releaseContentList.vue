<!-- 发布类型列表 -->
<template>
  <div class="GMT_releaseContentList">
    <div class="GMT_list">
      <div class="GMT_content" v-for="(item, index) in listData" :key="index" @click="checkParticulars(item)">
        <div class="GMT_left">
          <div class="GMT_title">
            <span style="display:inline-block" v-if="item.publishGrade != null">{{_GetGrade(item.publishGrade)}}</span>
            {{item.title}}
          </div>
          <div class="GMT_timeNumber">
            <div class="GMT_time" :class="{'GMT_time_Type': item.lb}">
              <div class="GMT_images">
                <img src="/images/img_13.png">
              </div>{{item.publishTime || item.date || item.editTime}}
            </div>
            <div class="GMT_time" :class="{'GMT_time_Type GMT_time_Type_left': item.lb}">
              <div class="GMT_images">
                <img src="/images/img_11.png">
              </div>{{item.readedCount}} 阅读
            </div>
            <div v-if="item.lb" class="GMT_time" :class="{'GMT_time_Type GMT_time_Type_left GMT_time_color': item.lb}">{{item.lb}}</div>
          </div>
        </div>
        <div class="GMT_right">
          <img v-if="item.cover" :src="item.cover">
          <img v-else src="/images/FirstLevelPage/tacitlyapprove.jpg">
        </div>
      </div>
    </div>
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
import { GetAddReaded } from '@/api/secondLevelPage'

export default {
  props: ["listData", 'url', 'titleData', 'GMT_FBLB'],
  methods: {
    // 获取发布等级
    _GetGrade (item) {
      if (item == 0) {
        return '区级发布'
      }
      if (item == 1) {
        return '镇街发布'
      }
      if (item == 2) {
        return '村居发布'
      }
      if (item == 3) {
        return '党员发布'
      }
      if (item == 4) {
        return '群众发布'
      }
    },
    // 查看详情
    checkParticulars (item) {
      let url;
      if (item.linkage) {
        GetAddReaded ({
          id: item.id,
          lb: this.GMT_FBLB
        })
        this.$indicator.open('正在跳转...')
        window.location.href = item.linkage
      } else {
        if(this.titleData) url=`${this.url}/${item.id}/${this.titleData}`
        else url=`${this.url}/${item.id}`
        this.$router.push(url)
      }
    }
  },
}; 
</script>

<style lang='scss' type="text/css" sccoped>
@import "@/style/releaseContentList.scss";
</style>

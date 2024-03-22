<template>
  <div class="sjgk">
    <div class="content-tab" v-for="(iten, index) in 4" :key="index">
      <div class="tab-head">
        <div class="head-left">村居通</div>
        <div class="head-right">发布量：1623</div>
      </div>
      <ul class="tab-base">
        <li class="base-tag" v-for="(item, index) in 4" :key="index">
          <div class="tag-content">
            <div class="content-icon">
              <img src="/static/sjtj/tz.png" alt="">
            </div>
            <div class="content-right" :class="{'content-right-action': index === 0 || index === 2}">
              <div class="number">259</div>
              <div class="name">通知公告</div>
            </div>
          </div>
        </li>
        <div style="clear:both;"></div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
@import './style/sjgk.scss';
</style>
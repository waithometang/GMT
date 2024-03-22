<template>
  <div class="hd">
    <div class="page-haed">
      <div class="tag-list">
        <div class="tag" :class="{'tag-action': selectState === item.state}" @click="clickTag(item)" v-for="(item, index) in tagData" :key="index">{{item.name}}</div>
      </div>
    </div>
    <div class="content">
      <div class="content-tab" v-if="selectState === 4">
        <randomlySnapPictureList :stateType="1"/>
      </div>
      <div class="content-tab" v-if="selectState === 3">
        <GmtSearchList :url='"api/common/PycPulishList"' :pageSize="3" :useSearch="false" :parms='{mkid:202}'>
          <template slot="item" slot-scope="listData">
            <listParticulars :listData="listData.data" :userInfoType="2"></listParticulars>
          </template>
        </GmtSearchList>
      </div>
      <div class="content-tab" v-if="selectState === 2">
        <GmtSearchList :url='"api/common/PycPulishList"' :pageSize="3" :useSearch="false" :parms='{mkid:201}'>
          <template slot="item" slot-scope="listData">
            <listParticulars :listData="listData.data" :userInfoType="1"></listParticulars>
          </template>
        </GmtSearchList>
      </div>
      <div class="content-tab" v-if="selectState === 1">
        <GmtSearchList :url='"api/common/PycPulishList"' :pageSize="3" :useSearch="false" :parms='{mkid:301 }'>
          <template slot="item" slot-scope="listData">
            <listParticulars :listData="listData.data" :userInfoType="1"></listParticulars>
          </template>
        </GmtSearchList>
      </div>
    </div>
  </div>
</template>

<script>
import GmtSearchList from '@/components/GmtSearchList';
import randomlySnapPictureList from "@/components/secondLevelPages/ruralRevitalization/appeal";
import listParticulars from '@/components/secondLevelPages/homePage/listParticulars';
import dyss from './components/dyss';

export default {
  data () {
    return {
      selectState: 4,
      tagData: [ {name: '网格管理', state: 4}, {name: '干部风采', state: 2}, {name: '直联动态', state: 3}]
    }
  },
  components: {
    GmtSearchList,
    randomlySnapPictureList,
    listParticulars,
    dyss
  },
  computed: {
    userInfo () {
      return this.$store.state.userinfo.id
    }
  },
  methods: {
    clickTag (item) {
      this.selectState = item.state
    }
  }
}
</script>

<style lang='scss' scoped>
@import './style/hd.scss';
</style>
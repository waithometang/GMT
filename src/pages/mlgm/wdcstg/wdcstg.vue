<template>
  <div class="container">
    <GmtSearchList ref="commonList" class="commonList" url="api/mlgm/wdcszpList" :parms="{mkId:1}">
      <div class="nocontent" slot="empty">
        <img src="../images/null.png" alt />
        这里暂时还没有你的参赛投稿哦
      </div>
      <div class="wrapContent" slot="item" slot-scope="listData">
        <div class="wrapItem">
          <div class="itemContent" v-for="(item, index) in listData.data" :key="index" @click="gotoDetail(item.id)">
            <div class="box" >
              <img :src="item.cover" alt class="cover" />
              <!-- <van-image :src="item.cover" alt fit="cover" :radius="10" height="180"/> -->
              <div class="title">{{item.title}}</div>
              <div class="bar" v-if="item.fbzt == '已发布'">
                <div class="left">
                  <img src="../images/thumb.png" alt />点赞数
                  <div class="count">{{getVal(item.likeCount)}}</div>
                </div>
                <div class="right">
                  <img src="../images/star.png" alt />总排名
                  <div class="rank">{{getVal(item.zpm)}}</div>
                </div>
              </div>
            </div>
            <div class="tags">
              <div class="tab_box">
                <div class="tag" v-for="(item1,index) in getArr(item.zpbq)" :key="index">
                  <span class="label">{{item1}}</span>
                </div>
              </div>
              <div v-if="item.shzt==='待审核'" class="loading">作品审核中</div>
              <div v-else-if="item.shzt == '未通过'" class="fail">作品未通过</div>
              <div v-else-if="item.shzt == '已通过' && item.fbsj" class="success">发布时间：{{item.fbsj}}</div>
            </div>
            <div class="grade" v-if="item.shzt == '已通过' && !item.jfx">
              <img src="../images/tips.png" alt />
              您还没上传加分项哦！请点击进入作品详情页上传加分项吧
            </div>
          </div>
        </div>
      </div>
    </GmtSearchList>
    <div class="footer" @click="gotoPublish" v-if="!isOver">
      <img src="../images/edit.png" alt />
      我要参赛投稿
    </div>
  </div>
</template>

<script>
import GmtSearchList from "@/components/GmtSearchList.vue";
export default {
  data() {
    return {
      isContribution: false,
      searchVal: "",
      isOver:false
    };
  },
  created() {
    if (new Date().getTime() > Date.parse('2020-11-8 12:00')) {
      this.isOver=true
    }
  },
  methods: {
    getVal(val) {
      return val ? val : "-";
    },
    gotoPublish() {
      this.$router.push("/mlgm/cstg");
    },
    gotoDetail(id) {
      this.$router.push(`/mlgm/cstg/${id}`);
    },
    getArr(arr) {
      let newarr = arr.split(';');
      if(newarr[0] == '') {
        return newarr.slice(1);
      } else {
        return newarr;
      }
    },
  },
  components: {
    GmtSearchList,
  },
};
</script>

<style scoped lang="scss">
@import "../style/wdcstg.scss";
</style>
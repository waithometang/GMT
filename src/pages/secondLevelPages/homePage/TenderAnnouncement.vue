<template>
  <div class="TenderAnnouncement">
    <div class="select">
      <div :class="{'cor1':serchtype==1}" @click="serchtypecha(1)">招标公告</div>
      <div :class="{'cor1':serchtype==2}" @click="serchtypecha(2)">中标公告</div>
    </div>
    <div class="serch">
      <div>
        <input placeholder="请输入搜索内容" type="text" v-model="searchTxt">
        <div class="imagesss"  @click="beginSearch">
          <img src="/images/secondLevelPages/search.png"/>
        </div>
      </div>
    </div>
    <div class="tag">
      <div v-if="hasSM" :class="{'action':tagtype==0}" @click="tagtypecha(0,'')" class="tag_li">
        <span>我的</span>
      </div>
      <div :class="{'action':tagtype==1}" @click="tagtypecha(1,'')" class="tag_li">
        <span>全部</span>
      </div>
      <div v-for="(item, index) in zjlist" :key="index" :class="{'action':tagtype==(index+2)}" @click="tagtypecha(index+2,item.code)" class="tag_li">
        <span>{{item.name}}</span>
      </div>
    </div>
    <div class="tender">
      <GmtCommonList ref="commonList" url="api/sl/ZbggList" :autoFetchData="false" :parms="{Type:this.serchtype,code:this.orgCode,search:this.searchKey,showMy:this.showMy}" >
        <template slot="item" slot-scope="listData">
          <div class="item" v-for="(item, index) in listData.data" :key="index" @click="viewDetail(item.fid)" :class="{'bor':index+1==listData.data.length}" >
            <div class="list">
              <div class="left">
                <span class="main">{{item.title}}</span>
                <div class="time">
                    <img src="/images/img_13.png">
                    {{item.date}}
                  <span class="bor" v-if="item.zj">{{item.zj}}</span>
                </div>
              </div>
              <div class="right" v-if="item.cover">
                <img  :src="item.cover">
              </div>
            </div> 
          </div>
        </template>
      </GmtCommonList>
    </div>
  </div>
</template>
<script>
import { Syzj } from "@/api/SanLian.js";
import GmtCommonList from "@/components/GmtCommonList.vue";
import {mapActions} from "vuex"
export default {
  data() {
    return {
      serchtype: 1, //招标公告 = 1, 中标公告 = 2
      tagtype: 1,
      zjlist: [],
      orgCode: "",
      searchKey: "",
      searchTxt: "",
      myOrgCode:"",
      hasSM:false,
      showMy:false
    };
  },
  methods: {
    ...mapActions(['getGrxx']),
    serchtypecha(item) {
      //切换类型
      this.serchtype = item;
      this.updateList();
    },
    tagtypecha(i, code) {
      //切换镇街
      if(i===0){
        this.orgCode = this.myOrgCode
        this.showMy=true
      }else{
        this.orgCode = code
        this.showMy=false
      }
      this.tagtype = i;
      this.updateList();
    },
    beginSearch() {
      this.searchKey = this.searchTxt;
      this.updateList();
    },
    viewDetail(fid) {
      this.$router.push("/TenderDetail/" + fid);
    },
    updateList() {
      this.$nextTick(() => this.$refs.commonList.updateListData());
    },
    async init(){
      Syzj().then(res => {
        if (res.data.success) {
          this.zjlist = res.data.content;
        } else {
          this.changtoast(res.data.message, "error");
        }
      });
      let grxx = await this.getGrxx()
      this.hasSM = grxx.hasSM
      this.myOrgCode=grxx.orgCode
      this.orgCode=grxx.orgCode
      if(this.hasSM) {
        this.tagtype=0
        this.showMy=true
      }
      this.updateList();
    }
  },
  created() {
    this.init()
  },
  components: {
    GmtCommonList
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/FirstLevelPage/select.scss";
@import "@/style/components/GmtSearchList.scss";
.TenderAnnouncement {
  margin: 0;
  padding: 0;
  background: #ffffff;
  .tag {
    height: auto;
    padding: 0 20px;
    display: flex;
    z-index: 999;
    position: relative;
    flex-wrap: wrap;
    background: #ffffff;
    .tag_li {
      height: auto;
      min-width: 80px;
      background: #ebeff2;
      text-align: center;
      margin: 20px 10px;
      border-radius: 30px;
      font-size: 30px;
      color: #1f2326;
      span {
        display: inline-block;
        height: auto;
        width: auto;
        padding: 6px 18px;
      }
    }
    .action {
      background: #379dea;
      color: white;
    }
  }
  .item {
    margin: 0px 20px 0px 20px;
    border-bottom: 1px dotted  rgba(204, 204, 204, 1);
    .list {
      padding: 20px 0px 10px 0px;
      width: 100%;
      display: flex;
      min-height: 150px;
      .left {
        flex: 1;
        margin-right: 10px;
        .title {
          padding: 10px 10px 10px 10px;
          border-radius: 4px;
          font-size: 20px;
          color: rgba(255, 255, 255, 1);
        }
        .tit_cor1 {
          background: rgba(131, 194, 242, 1);
        }
        .tit_cor2 {
          background: rgba(242, 191, 131, 1);
        }
        .main {
          font-size: 28px;
          font-weight: bold;
          color: #333333;
          line-height: 40px;
          overflow: hidden;
          text-overflow: -o-ellipsis-lastline;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          height: 80px;
        }
        .time {
          font-size: 24px;
          color: #999999;
          display: inline-flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 30px;
          img {
            width:26px;
            height:26px;
            margin-right: 10px;
          }
          .bor{
            padding: 5px 10px 5px 10px ;
            border-radius:30px;
            text-align: center;
            border: 1px solid #999999;
            max-width: 100px;
            margin-left: 150px;
          }
        }
      }
      .right {
        width: 250px;
        height: 100%;
        flex:  0 0 auto;
        img {
          width: 200px;
        }
      }
    }
  }
  .bor{
      border: none;
    }

  .tender {
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    top: 220px;
    background: #ffffff;
  }
}
</style>

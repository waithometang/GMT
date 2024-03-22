<template>
  <div class="SelectVillagers">
    <div class="serch">
      <div>
        <input placeholder="请输入搜索内容" type="text" v-model="searchTxt">
        <div class="imagesss"  @click="Search()">
          <img src="/images/secondLevelPages/search_blue_1.png"/>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="list" v-for="(item,index) in zjlist" :key="index" @click="Select(item)">
        <img src="/images/secondLevelPages/right_cunmin.png">
        <span>{{item.name}}</span>
      </div>
      <div class="list" @click="Select(false)" v-if="zjlist.length >=1 ">
        <img src="/images/secondLevelPages/right_cunmin.png">
        <span>无</span>
      </div>
    </div>
    <transition name="fade">
      <div class="black" v-if="closealert">
        <div class="alert">
          <div class="al-tit">
            <p>是否选择{{listname.name}}</p>
          </div>
          <div class="sleset">
            <div @click="close_alert">取消</div>
            <div @click="confirm">确定</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { Kxzzrc } from "@/api/Member.js";

export default {
  data() {
    return {
      zjlist: [],
      searchTxt: "",
      searchKey: "",
      closealert: false,
      listname: "",
    };
  },
  methods: {
    Select(item) {
      if (!item) {
        this.$store.state.ZV_Selected = {id: '', name: '无'}
        this.$router.back()
        return
      }
      this.closealert = true;
      this.listname = item;
    },
    confirm () {
      this.$store.state.ZV_Selected={id:this.listname.id,name:this.listname.name}
      this.$router.back()
    },
    Search() {
      this.searchKey = this.searchTxt;
      this.getData();
    },
    close_alert(){
      this.closealert=false;
    },
    getData() {
      let vid = this.$route.query.vid;
      Kxzzrc({ id: vid, search: this.searchKey }).then(res => {
        if (res.data.success) {
          this.zjlist = res.data.content;
        } else {
          this.changtoast(res.data.message, "error");
        }
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/components/GmtSearchList.scss";
@import "@/Style/Certification.scss";
.SelectVillagers {
  margin: 0;
  padding: 0;
  background: #f2f9ff;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 750px;
  overflow: hidden;
  .item {
    background: #ffffff;
    position: absolute;
    top: 140px;
    bottom: 0px;
    width: 750px;
    overflow-y: scroll;
    overflow-x: hidden;
    .list {
      display: flex;
      align-items: center;
      height: 50px;
      padding: 20px 20px 20px 20px;
      border-bottom: 1px solid #f4f4ff;
      &:active {
        background: #f2f9ff;
      }
      img {
        width: 35px;
        height: 35px;
        margin-right: 20px;
      }
      span {
        font-size: 30px;
        width: 600px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .black {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba($color: black, $alpha: 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    .alert {
      width: 600px;
      height: 300px;
      background: #ffffff;
      border-radius: 20px;
      margin-bottom: 40px;
        .al-tit {
          margin-top: 80px;
          text-align: center;
          font-size: 30px;
      }
      .sleset{
        margin-top: 80px;
        display: flex;
        justify-content: space-around;
        div{
          font-size: 30px;
          width: 250px; 
          height: 60px;
          background: rgba(24, 130, 214, 1);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
        }
      } 
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>

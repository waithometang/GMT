<template>
  <div class="SelectCity">
    <div class="serch_top">
      <div v-if="ISserch==1" @click="serch(1)" class="flase_serch">
        输入省名、城市名或拼音查询
      </div>
      <div v-show="ISserch==2" class="true_serch">
        <input v-focus type="text" placeholder="输入省名、城市名或拼音查询">
      </div>
      <span v-if="ISserch==2" @click="serch(2)">取消</span>
    </div>
    <div  v-if="ISserch==1" class="main">
      <div class="title">定位到的位置</div>
      <div class="item">
        <div class="list">
          <img class="weizhi" src="/images/weizhi.png">
          定位城市:安徽
        </div>
      </div>
    </div>
    <div v-if="ISserch==1" class="main">
      <div class="title">常用城市</div>
      <div class="common">
        <div class="sev">北京</div>
        <div>北京</div>
        <div>北京</div>
      </div>
    </div>
    <div class="main">
      <div class="title">按行政区选择</div>
      <div class="item">
        <div class="list" v-for="(item,index) in 20 " :key="index">
          安徽
          <img class="more" src="/images/more.png">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ISserch: 1
    };
  },
  methods: {
    serch(item) {
      if (item == 1) {
        this.ISserch = 2;
        this.focusState = true;
        Vue.directive("focus", {
          inserted: function(el) {
            el.focus();
          }
        });
      } else {
        this.ISserch = 1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.SelectCity {
  margin: 0;
  padding: 0;
  background: #EBEBED;
  .serch_top {
    padding: 10px 30px 10px 30px;
    height: 70px;
    display: flex;
    align-items: center;
    .flase_serch {
      width: 100%;
      height: 60px;
      border: 0.1px;
      border-radius: 10px;
      background: #ffffff;
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999999;
      img {
        height: 30px;
        width: 30px;
      }
    }
    .true_serch {
      width: 85%;
      height: 60px;
      border: 0.1px;
      border-radius: 10px;
      background: #ffffff;
      font-size: 30px;
      display: flex;
      align-items: center;
      color: #999999;
      img {
        height: 30px;
        width: 30px;
      }
      input {
        width: 100%;
        height: 60px;
        border: 0.1px;
        border-radius: 10px;
      }
    }
    span {
      color: rgb(71, 165, 42);
      font-size: 30px;
      margin-left: 20px;
    }
  }
  .main {
    margin-top: 30px;
    .title {
      font-size: 28px;
      padding-left: 30px;
      color: #999999;
      height: 40px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
    }
    .item {
      background: #ffffff;
      padding: 0px 30px 0px 30px;
      .list {
        height: 80px;
        display: flex;
        align-items: center;
        font-size: 30px;
        border-bottom: 1px solid #f4f4f4;
        .more {
          width: 35px;
          height: 35px;
          margin-left: auto;
        }
        .weizhi{
          width: 35px;
          height: 35px;
          margin-right:20px;;
        }
      }
    }
    .common{
      padding: 0px 30px 0px 30px;
      display: flex;
      height: 80px;
      font-size: 30px;
      justify-content: space-around;
      background: #ffffff;
        div{
          border-right: 1px solid #f4f4f4;
          line-height: 80px;
          text-align: center;
          flex: 1;
           &:last-child{
             border:none;
           }
        }
    }
    .sev{
      color:rgb(71, 165, 42);
      
    }
  }

}
</style>


<template>
  <div class="systemHelp">
    <div class="head">
      <img src='/static/systemHelp.jpg' alt='' />
    </div>
    <div class="list_tab">
      <div class="tab" @click="getChaek(item.type)" v-for="(item, index) in listData" :key="index">
        <div class="text">{{item.name}}</div>
        <img src='/static/systemHelp_icon.png' alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      key: '',
      listData: [
        {name: '群众如何反映诉求', type: '1'},
        {name: '个人如何实名认证', type: '2'},
        {name: '实名认证能干什么', type: '3'},
        {name: '企业如何反映诉求', type: '4'},
        {name: '如何反馈系统问题', type: '5'}
      ]
    }
  },
  methods: {
    search () {

    },
    
    getChaek (item) {
      // this.changtoast('功能开发中')
      this.$router.push(`/systemHelpDetail/${item}`)
    }

  }

}
</script>

<style lang='scss' scoped>
  .systemHelp {
    min-height: 100vh;
    background: #ffffff;
    .head {
      height: 200px;
      width: 750px;
      img{
        height: 200px;
        width: 750px;
      }
    }
    .serch {
      height: 80px;
      border-bottom: 1px solid;
      border-color: #ffffff;
      padding: 20px 20px 20px 20px;
      background: #ffffff;
      div{
        height: 80px;
        display: flex;
        align-items: center;
        background: #f4f4f4;
        border-radius: 15px 15px 15px 15px;
        input{
          border-radius: 15px 15px 15px 15px;
          flex: 1;
          border:none;
          margin-right: 7px;
          background: #f4f4f4;
          padding-left: 20px;
          font-size: 30px;
        }
        .imagesss {
          flex: 0 0 auto;
          img{
            height: 45px;
            width: 45px;
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      }
    }
    .list_tab{
      padding: 0 20px;
      .tab{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #cccccc;
        padding: 40px 20px;
        font-size: 32px;
        color: #000000;
        font-weight: 500;
        .text {
          flex: 1;
          text-align: left;
        }
        img{
          width: 19px;
          height: 28px;
          flex: 0 0 auto;
        }
      }
    }
  }
</style>

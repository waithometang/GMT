<template>
  <div class="container">
    <div class="header-wrapper">
      <div class="banner-img">
        <img src="./images/banner-change.png" alt="" />
      </div>
      <div class="nav-btn">
        <div
          class="btn-item"
          v-for="(item, index) in navData"
          :key="index"
          @click="handleJump(item.url)"
        >
          <img :src="item.img" alt="" />
          <p class="title">{{ item.title }}</p>
        </div>
      </div>
      <div class="img-link" @click="handleJumpQygs">
        <img src="./images/baner.png" alt="" />
      </div>
    </div>

    <!-- <div class="content-wrapper">
      <div class="content-img">
        <img src="./images/intro.png" alt="" />
      </div>
      <div class="item-wrapper">
        <div
          class="item-list"
          v-for="(item, index) in contentData"
          :key="index"
          @click="handleGoDetail(item.id)"
        >
          <img :src="item.imgUrl" alt="" class="img-banner" />
          <div class="info">
            <img :src="item.icon" alt="" class="img-icon" />
            <div class="team-name">{{ item.teamName }}</div>
            <div class="address">{{ item.address }}</div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="content-wrapper">
      <div class="content-top">
        <div class="left"><i></i> 今日赛程</div>
        <div class="right" @click="handleCheckAll">查看全部&nbsp;></div>
      </div>
      <template v-if="todayList.length">
        <div class="content" v-for="(item, index) in todayList" :key="index">
          <div class="item" v-for="(list, index) in item.listData" :key="index">
            <div class="left">
              <img :src="list.icon1" alt="" />
              <div class="team-name">{{ list.teamName1 }}</div>
            </div>
            <div class="middle">
              <div
                class="score"
                :class="{ 'not-start': list.score == '未开始' }"
              >
                {{ list.score }}
              </div>
              <div class="time">{{ list.time }}</div>
            </div>
            <div class="right">
              <img :src="list.icon2" alt="" />
              <div class="team-name">{{ list.teamName2 }}</div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="tips">
          <img src="./images/wsc.png" alt="" />
          暂无赛程信息
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // contentData: [
      //   {
      //     id: 1,
      //     imgUrl: require('./images/img1.jpg'),
      //     icon: require('./images/icon1.png'),
      //     teamName: '飞鹰队',
      //     address: '金华社区'
      //   },
      //   {
      //     id: 2,
      //     imgUrl: require('./images/img3.jpg'),
      //     icon: require('./images/icon2.png'),
      //     teamName: '猎豹队',
      //     address: '王臣村'
      //   },
      //   {
      //     id: 3,
      //     imgUrl: require('./images/img2.png'),
      //     icon: require('./images/icon3.png'),
      //     teamName: '火星队',
      //     address: '石洲村'
      //   },
      //   {
      //     id: 4,
      //     imgUrl: require('./images/img4.jpg'),
      //     icon: require('./images/icon4.png'),
      //     teamName: '猛虎队',
      //     address: '中山社区'
      //   }
      // ],
      navData: [
        {
          img: require('./images/scjg.png'),
          title: '赛程结果',
          url: '/bczqs/matchresult'
        },
        {
          img: require('./images/jfpm.png'),
          title: '积分排名',
          url: '/bczqs/jfpm'
        },
        {
          img: require('./images/gjjc.png'),
          title: '冠军竞猜',
          url: '/bczqs/championguess'
        }
      ],
      todayList: [
        // {
        //   listData: [
        //     {
        //       icon1: require('./images/icon1.png'),
        //       icon2: require('./images/icon2.png'),
        //       teamName1: '飞鹰队',
        //       teamName2: '猎豹队',
        //       time: '2020-10-17 10:00',
        //       score: '未开始'
        //     },
        //     {
        //       icon1: require('./images/icon3.png'),
        //       icon2: require('./images/icon4.png'),
        //       teamName1: '猛虎队',
        //       teamName2: '明日之星队',
        //       time: '2020-10-16 10:00',
        //       score: '3 : 2'
        //     }
        //   ]
        // }
      ]
    }
  },
  created() {
    // todo 获取数据
    // this.$indicator.open("加载中...");
    // this.$post("").then((res) => {
    //   this.$indicator.close();
    //   if (res.data.success) {
    //     this.todayList = res.data.content;
    //   } else {
    //     this.changtoast(res.data.message, "error");
    //   }
    // });
  },
  methods: {
    // 导航跳转
    handleJump(url) {
      this.changtoast('暂无赛程信息', 'error')
      return
      this.$router.push(url)
    },
    // 点击跳转详情
    // handleGoDetail(id) {
    //   this.$router.push(`/bczqs/qdjjDetail?id=` + id)
    // },
    // 点击跳转到球员公示
    handleJumpQygs() {
      this.$router.push('/bczqs/qygs')
    },
    // 点击查看全部
    handleCheckAll() {
      this.changtoast('暂无赛程信息', 'error')
      return
      this.$toast('功能未实现')
    }
  }
}
</script>


<style scoped lang="scss">
@import './styles/bczqs.scss';
</style>
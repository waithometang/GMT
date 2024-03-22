<template>
  <div class="container">
    <div class="tab">
      <van-tabs v-model="activeIndex" @click="handleTabClick">
        <van-tab
          :title="item.title"
          v-for="(item, index) in tabData"
          :key="index"
        >
          <div class="item-wrapper" v-if="tabListData.length > 0">
            <div class="content" v-for="item in tabListData" :key="item.group">
              <div class="group-name">{{ item.group }}组</div>
              <div
                class="item"
                v-for="(list, index) in item.listData"
                :key="index"
              >
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
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 0,
      tabData: [
        {
          title: '小组赛'
        },
        {
          title: '1/8决赛'
        },
        {
          title: '1/4决赛'
        },
        {
          title: '半决赛'
        },
        {
          title: '决赛'
        }
      ],
      tabListData: [
        {
          group: 'A',
          listData: [
            {
              icon1: require('./images/icon1.png'),
              icon2: require('./images/icon2.png'),
              teamName1: '飞鹰队',
              teamName2: '猎豹队',
              time: '2020-10-17 10:00',
              score: '未开始'
            },
            {
              icon1: require('./images/icon3.png'),
              icon2: require('./images/icon4.png'),
              teamName1: '猛虎队',
              teamName2: '明日之星队',
              time: '2020-10-16 10:00',
              score: '3 : 2'
            }
          ]
        },
        {
          group: 'B',
          listData: [
            {
              icon1: require('./images/icon1.png'),
              icon2: require('./images/icon2.png'),
              teamName1: '飞鹰队',
              teamName2: '猎豹队',
              time: '2020-10-17 10:00',
              score: '未开始'
            },
            {
              icon1: require('./images/icon3.png'),
              icon2: require('./images/icon4.png'),
              teamName1: '猛虎队',
              teamName2: '明日之星队',
              time: '2020-10-16 10:00',
              score: '3 : 2'
            }
          ]
        },
        {
          group: 'C',
          listData: [
            {
              icon1: require('./images/icon1.png'),
              icon2: require('./images/icon2.png'),
              teamName1: '飞鹰队',
              teamName2: '猎豹队',
              time: '2020-10-17 10:00',
              score: '未开始'
            },
            {
              icon1: require('./images/icon3.png'),
              icon2: require('./images/icon4.png'),
              teamName1: '猛虎队',
              teamName2: '明日之星队',
              time: '2020-10-16 10:00',
              score: '3 : 2'
            }
          ]
        }
      ]
    }
  },
  created() {
    // todo 获取数据
    // this.$indicator.open("加载中...");
    // this.$post("").then((res) => {
    //   this.$indicator.close();
    //   if (res.data.success) {
    //     this.tabListData = res.data.content;
    //   } else {
    //     this.changtoast(res.data.message, "error");
    //   }
    // });
  },
  methods: {
    //   tab栏切换
    handleTabClick(name) {
      //  todo 发送请求，获取数据
      // this.$indicator.open("加载中...");
      // this.$post(""+name).then((res) => {
      //   this.$indicator.close();
      //   if (res.data.success) {
      //     this.tabListData = res.data.content;
      //   } else {
      //     this.changtoast(res.data.message, "error");
      //   }
      // });
    }
  }
}
</script>

<style scoped lang="scss">
@import './styles/matchresult.scss';
/deep/.van-tab--active {
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #0041a5;
}
</style>
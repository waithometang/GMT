<template>
  <div class="container">
    <div class="head-img">
      <van-swipe
        class="my-swipe"
        indicator-color="white"
        :autoplay="3000"
        :stop-propagation="false"
      >
        <van-swipe-item
          v-for="(image, index) in teamData.imgList"
          :key="index"
          @click="preview(teamData.imgList, index)"
        >
          <img :src="image" />
          <!-- <van-image height="320" fit="cover" :src="image.imgUrl" /> -->
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="info">
      <div class="icon">
        <img :src="teamData.icon" alt="" />
      </div>
      <div class="intro">
        <div class="team-name">{{ teamData.teamName }}</div>
        <div class="address">{{ teamData.address }}</div>
      </div>
    </div>
    <div class="content">
      <div class="content-title">{{ teamData.title }}</div>
      <div class="content-info" v-html="teamData.content"></div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
export default {
  data() {
    return {
      teamData: {
        imgList: [
          'https://i.loli.net/2020/10/23/VyWnlYmw1fziHT3.jpg',
          ' https://i.loli.net/2020/10/23/WnI58VB1ROx2k4A.jpg',
          'https://i.loli.net/2020/10/23/CiDnFX13heQ2fbr.png',
          'https://i.loli.net/2020/10/23/qwkrO4z96syXBJ1.jpg'
        ],
        icon: require('./images/icon1.png'),
        teamName: '飞鹰队',
        address: '荷城街道金华社区',
        title: '飞鹰足球队',
        content:
          '飞鹰足球队成立于2005年，由喜欢并且坚足球运动的教职工自发组成，以增进教职工友谊、促进足球运动交流、加强身体锻炼为宗旨。球队接受重庆大学工会的管理。球队目前有40余名成员，既有在教学科研一线的教授、讲师，也有在管理后勤保障服务战线奋斗的职工，年龄跨度从27岁到55岁不等。球队有较为健全的组织架构和较为完善的训练组织计划。球队设立由领队、教练、队长、组织委员、宣传委员等组成的队委会，负责球队的日常管理训练；球队建立了定期的训练制度，每周四、六与校内各单位的师生足球队进行运动交流，不定时地与政府部门、兄弟院校、企事业等单位的足球队进行友谊赛。球队口号：以球会友、强身健体、健康重大、足球先行'
      }
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  created() {
    //   todo 通过id获取详情数据
    // this.$indicator.open("加载中...");
    // this.$post("..."+this.id).then((res) => {
    //   this.$indicator.close();
    //   if (res.data.success) {
    //     this.teamData = res.data.content;
    //   } else {
    //     this.changtoast(res.data.message, "error");
    //   }
    // });
  },
  methods: {
    // handleImagePreview(imgList, index) {
    //   console.log(imgList)
    //   ImagePreview({
    //     images: imgList,
    //     startPosition: index
    //   })
    // },
    preview(imgList, index) {
      ImagePreview({
        images: imgList,
        startPosition: index,
        closeable: true
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import './styles/qdjjDetail.scss';
</style>
<template>
  <!-- <div class="select_Study">
    <div class="power" @click="goto(1)"></div>
    <div class="range" @click="goto(3)"></div>
  </div> -->
  <div class="public_list_tag">
    <div class="list_tag_list" v-for="(item_1, index_1) in listData" :key="index_1">
      <ul>
        <li class="list_tag_list_tab" v-for="(item, index) in item_1" :key="index" @click="clickTag(item)">
          <div class="list_tab_icon">
            <img class="list_tab_icon_qy" :src="item.icon_url" alt="">
          </div>
          <div class="list_tab_name">{{item.name}}</div>
        </li>
        <div style="clear:both;"></div> 
      </ul>
    </div>
  </div>
</template>
<script>
import { storage, session_Storage } from "@/js/until"
import {mapActions} from "vuex"
export default {
  data () {
    return {
      listData: [
        [
          {name: "我要反映", id: 0, icon_url: '/static/31@2x.png', type: 1, url: '/enterpriseReflect/2'},
          {name: "我要招聘", id: 1, icon_url: '/static/32@2x.png', type: 1, url: '/qyzp'},
          {name: "我要宣传", id: 3, icon_url: '/static/34@2x.png', type: 1, url: '/qyxc'},
          {name: "优惠政策", id: 2, icon_url: '/static/33@2x.png', type: 0, url: '/qjfb_Tag/5/16/yh'},
        ]
      ],
      qyrz: false
    }
  },
  methods : {
    ...mapActions(['getGrxx']),
    goto(item) {
      if (item == 1) {
        session_Storage.save('ButtomTageState', this.$store.state.ButtomTageState)
        window.location = "http://www.gdzwfw.gov.cn/portal/legal/hot?region=440608";
      } else if (item == 3) {
        this.$router.push({
          path: '/enterpriseReflect/2'
        })
      }
    },
    clickTag (item) {
      this.$router.push(item.url)
      // if (item.type === 1) {
      //   if (item.id === 1 || item.id === 3) {
      //     if (this.qyrz) {
      //       this.$router.push(item.url)
      //     } else {
      //       this.$router.push(`/qyrz/${item.id}`)
      //     }
      //   } else {
      //     this.$router.push({
      //       path: item.url
      //     })
      //   }
      // } else {
      //   this.$router.push('/qjfb_Tag/5/16/yh')
      // }
    }
  },
  created () {
    this.getGrxx().then(Grxx => {
      if (Grxx.hasQY) {
        this.qyrz = true
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.select_Study {
  height: 120px;
  padding: 24px;
  display: flex;
  background: #ffffff;
  margin-top: 22px;
  margin-bottom: 22px;
  div {
    width: 330px;
    display: flex;
    align-items: center;
    color: #ffffff;
    font-size: 36px;
    font-weight: 500;
    justify-content: center;
    &:last-child {
      margin-left: auto;
    }
  }
  .power {
    background-image: url("/images/study_1.jpg");
    background-size: 100% 100%;
  }
  .power:active {
    background: #cccccc;
  }
  .range {
    background: url("/images/study_2.jpg");
    background-size: 100% 100%;
  }
  .range:active{
    background: #cccccc;
  }
}
</style>

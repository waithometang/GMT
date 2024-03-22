<template>
  <div class="dxs">
    <img class="xxzs" src="../../dxsrcllz/images/斜线装饰.png" />
    <div class="dxs_box">
      <div class="list">
        <dl
          v-for="(item, index) in dxlist"
          :key="index"
          @click="() => demo(index)"
        >
          <dt>
            <img :src="item.image" alt />
          </dt>
          <dd>
            <p>{{ item.title }}</p>
            <p>{{ item.bydate }}</p>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant"
export default {
  data () {
    return {
      dxlist: [
        // {
        //   image: require("../images/syymw.png"),
        //   title: "明撑大学生·笋野益埋我",
        //   bydate: "团团帮您清空购物车线上活动"
        // },
        // {
        //   image: require("../images/fjqcd.png"),
        //   title: "明撑大学生·放假齐充电",
        //   bydate: "2020年暑假走读高明活动报名"
        // },
        {
          image: require("../images/dsjs.png"),
          title: "“百年党史青年学”知识竞赛",
          bydate: "2021年党史知识竞赛大学生报名入口"
        },
        {
          image: require("../images/dxssjsxhd.png"),
          title: "大学生暑假实习活动",
          bydate: "2021年大学生暑假实习活动报名入口"
        },
        {
          image: require("../images/hdhg.png"),
          title: "活动回顾",
          bydate: "查阅青年汇关于大学生活动的推文"
        }
      ]
    }
  },
  created () {
    this.$showSubscribe().then(grxx => {
      console.log(grxx);
    })
    // this.$showSubscribe()
  },
  methods: {
    demo (i) {
      // if (i === 0) {
      //   this.$indicator.open("加载中...")
      //   this.$post("api/zx/dxshdynbmCheck").then(res => {
      //     if (res.data.success) {
      //       this.$router.push({
      //         name: "syymw",
      //         params: { data: res.data.content }
      //       })
      //     } else {
      //       Dialog.alert({
      //         title: "温馨提示",
      //         message: res.data.message
      //       }).then(() => {
      //         this.$router.push("/dxs")
      //       })
      //     }
      //   })
      // } else if (i === 1) {
      //   this.$indicator.open("加载中...")
      //   this.$post("api/zx/dxsmccb").then(res => {
      //     if (res.data.success) {
      //       this.$router.push("/dxszdhd")
      //     } else {
      //       Dialog.alert({
      //         title: "温馨提示",
      //         message: res.data.message
      //       }).then(() => {
      //         this.$router.push("/dxs")
      //       })
      //     }
      //   })
      // } 
      if (i === 0) {
        console.log('bndsqnx');
        this.$get('/api/Dsjs/hqhdxx').then(res => {
          console.log(res);
        })
        this.$router.push("/bndsqnx")
      }
      else if (i === 1) {
        this.$indicator.open("加载中...")
        this.$post("api/zx/dxsbmCheck").then(res => {
          if (res.data.success) {
            if (this.dateCheck(res.data.content.bmsj)) {
              this.$router.push({
                name: "dxshdbm",
                params: { data: res.data.content }
              })
            } else {
              Dialog.alert({
                title: "温馨提示",
                message: '报名时间:' + res.data.content.bmsj
              })
            }
          } else {
            Dialog.alert({
              title: "温馨提示",
              message: res.data.message
            }).then(() => {
              this.$router.push("/dxs")
            })
          }
        })
      } else if (i === 2) {
        this.$router.push("/hdyn/hdhg")
      }
    },
    dateCheck (datestr) {
      //判断当前时间是否在报名时间内
      var aaa = datestr.split("至")
      aaa.forEach((item, index) => {
        aaa[index] = aaa[index].replace(/(月)/g, '/');
        aaa[index] = aaa[index].replace(/日/g, '');
        aaa[index] = new Date().getFullYear() + '/' + aaa[index]
      });
      if (Date.parse(new Date()) >= Date.parse(aaa[0]) && Date.parse(new Date()) <= Date.parse(aaa[1])) {
        return 1
      } else {
        return 0
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import './style/index.scss';
</style>
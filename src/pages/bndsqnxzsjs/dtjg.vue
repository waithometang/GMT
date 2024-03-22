<template>
  <div class="competition">
    <div class="bg">
      <div class="clock" id="show">
        <div class="time1"><span>4</span>:<span>00</span></div>
        <!-- <div class="time2">.<span></span></div> -->
      </div>
      <div class="content" v-if="load">
        <div v-for="(item, index) in examList" :key="index" class="item">
          <div class="subject">
            题{{ index + 1 }}.{{ item.tmbt }}({{ item.tmlb }})
          </div>
          <div class="options">
            <van-radio-group
              :disabled="showAnswer"
              v-if="item.tmlb == '单选'"
              v-model="item.radio"
            >
              <van-radio
                :name="index + 1"
                v-for="(item, index) in item.dtxx"
                :key="index"
                >{{ item.dtxx }}</van-radio
              >
            </van-radio-group>
            <van-checkbox-group
              :disabled="showAnswer"
              v-else
              v-model="item.radio"
            >
              <van-checkbox
                :name="index + 1"
                v-for="(item, index) in item.dtxx"
                :key="index"
                >{{ item.dtxx }}</van-checkbox
              >
            </van-checkbox-group>
          </div>
          <div class="answer">
            <span class="uAnswer">您的答案是{{ SetOption(item.radio) }}</span>
            <span v-if="userTrueList[index] === 1" class="rAnswer"
              >恭喜你，答对了！</span
            >
            <span v-else class="rAnswer"
              >正确答案是{{ SetOption(trueList[index]) }}哦~</span
            >
          </div>
        </div>
      </div>
      <div class="btns" v-if="load">
        <div class="btn" @click="toCjm">
          你共答对{{ fraction / 10 }}题，获得{{ cjmNum }}个抽奖码
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Wcdt, GetDtxx } from "@/api/DsjsApi";
export default {
  data () {
    return {
      tkxx: {},//获取的题库信息
      showAnswer: false,
      minute: '',
      second: '',
      psecond: '',
      examList: [],
      trueList: [],
      userTrueList: [],
      returnList: {},
      fraction: 0,
      cjmNum: 0,
      hasCompetition: false,
      load: false,
      kssj: '',
      jssj: ''
    }
  },
  created () {
    this.init()
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    init () {// 初始化页面
      //1、获取作答题目
      GetDtxx().then(
        (t) => {// 成功
          console.log(t.data);
          // this.examList = t.data.content.tmlist
          // console.log(this.examList);
          // this.load = true
        },
        (f) => {// 失败

        }
      );
    },
    wcdt () {// 完成答题
      //1、提交数据格式
      // {"kssj":"2021-08-03-14:24:30",
      //  "jssj":"2021-08-03-14:24:30",
      //  "dtlist":[
      //    tmid:1,
      //    tmxxids:"12,13" 多选,号分隔
      //  ]
      // }
      //2、数据返回，后台会判断成绩，然后直接把所得的投资码数组返回  这里可以调整，先走业务
    },
    SetOption (item) {
      //根据选项数字返回选项字母
      var str = ['', 'A', 'B', 'C', 'D', 'E', 'F']
      if (item && item.length > 1) {
        let strs = ''
        item.sort((a, b) => { return a - b })
        item.forEach(element => {
          strs += `${str[element]},`
        });
        return strs
      } else if (item) {
        return str[item]
      }
    },
    // async submit () {
    //   //提交按钮，判断正确错误，生成展示数据的列表，
    //   // this.showAnswer = true
    //   await this.getReturnList()
    //   //提交答题信息接口
    //   Wcdt(this.returnList).then(
    //     (t) => {// 成功
    //       console.log(t.data);
    //     },
    //     (f) => {// 失败

    //     }
    //   )
    // },
    // getReturnList () {
    //   //组装生成返回后端的数据格式
    //   // this.returnList.hdry_id = this.hdry_id
    //   var date = new Date();

    //   this.returnList.kssj = this.kssj
    //   this.returnList.jssj = date
    //   this.returnList.dtlist = []
    //   this.examList.forEach((item) => {
    //     var Dtxxitem = {}
    //     Dtxxitem.tmid = item.id
    //     if (item.radio) {
    //       if (item.radio.length > 1) {
    //         item.radio.sort((a, b) => { return a - b })
    //         Dtxxitem.tmxxids = item.radio.toString()
    //       } else {
    //         Dtxxitem.tmxxids = `${item.radio}`
    //       }
    //     } else {
    //       Dtxxitem.tmxxids = '0'
    //     }
    //     this.returnList.dtlist.push(Dtxxitem)
    //   })
    //   console.log(this.returnList);
    // },
    toCjm () {
      this.$router.push("/bndsqnx/cjm")
    },
    // getExamedList () {
    //   this.$indicator.open('数据加载中...')
    //   //已经答题后，获取答题详情
    //   // this.$post("/api/Dsjs/hqdtxx", { "hdxx_id": 1, }).then(res => {
    //   this.$post("/api/Dsjs/hqdtxx").then(res => {
    //     if (res.status === 200) {
    //       this.$nextTick(() => {
    //         this.fraction = res.data.content.dtcj
    //         this.cjmNum = res.data.content.zjms
    //         // console.log(res.data.content);
    //         this.examList = res.data.content.dtxqDtos
    //         // console.log(this.examList);
    //         this.examList.forEach((item, index) => {
    //           this.examList[index].radio = Number(item.hdrda_ids)
    //           if (item.sfzq) {
    //             this.userTrueList.push(1)
    //           } else {
    //             this.userTrueList.push(0)
    //           }
    //           this.trueList.push(item.zqda_ids)
    //         })
    //         this.$indicator.close()
    //         this.load = true
    //       })
    //     }
    //   })
    // },
    // getHasCompetition () {
    //   //答题状态接口，是否已经答题
    //   // this.$post("/api/Dsjs/sfdtw", { "hdxx_id": 1 }).then(res => {
    //   this.$post("/api/Dsjs/sfdtw").then(res => {
    //     if (res.status === 200) {
    //       // console.log(res.data);
    //       if (res.data.success) {
    //         this.hasCompetition = false
    //         this.getExamList()
    //         this.$dialog.alert({
    //           title: "温馨提示",
    //           message: "答题时间为4分钟"
    //         }).then(() => {
    //           this.countDown()
    //         })
    //       } else {
    //         this.hasCompetition = true
    //         this.showAnswer = true
    //         this.getExamedList()
    //         // this.getExamList()
    //       }
    //     }
    //   })
    // },
    //倒计时


  }
}
</script>

<style lang="scss" scoped>
@import './style/competition.scss';
</style>

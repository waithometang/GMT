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
            <van-radio-group v-if="item.tmlb == '单选'" v-model="item.radio">
              <van-radio
                :name="item.id"
                v-for="(item, index) in item.dtxx"
                :key="index"
                >{{ item.dtxx }}</van-radio
              >
            </van-radio-group>
            <van-checkbox-group v-else v-model="item.radio">
              <van-checkbox
                :name="index + 1"
                v-for="(item, index) in item.dtxx"
                :key="index"
                >{{ item.dtxx }}</van-checkbox
              >
            </van-checkbox-group>
          </div>
        </div>
      </div>
      <div class="btns" v-if="load">
        <div class="btn" @click="submit">提交</div>
      </div>
      <div v-if="!load" class="load"></div>
    </div>
  </div>
</template>
<script>
import { Wcdt, GetTmxx } from "@/api/DsjsApi";
export default {
  data () {
    return {
      minute: '',
      second: '',
      psecond: '',
      examList: [],
      returnList: {},
      hasCompetition: false,
      load: false,
      kssj: '',
      jssj: ''
    }
  },
  created () {
    // this.getHasCompetition()
    this.init()
  },
  computed: {
  },
  mounted () {
  },
  beforeDestroy () {
    clearInterval(this.timer);
  },
  methods: {
    init () {// 初始化页面
      //1、获取作答题目
      this.$indicator.open('数据加载中...')
      GetTmxx().then(
        (t) => {// 成功
          this.examList = t.data.content.tmlist
          // this.examList.forEach((item, index) => {
          //   this.examList[index].radio = 1
          // })
          this.kssj = t.data.content.kssj
          this.load = true
          this.$indicator.close()
          this.$dialog.alert({
            title: "温馨提示",
            message: "答题时间为4分钟"
          }).then(() => {
            this.countDown()
          })
        },
        (f) => {// 失败

        }
      );
    },
    // 完成答题
    //1、提交数据格式
    // {"kssj":"2021-08-03-14:24:30",
    //  "jssj":"2021-08-03-14:24:30",
    //  "dtlist":[
    //    tmid:1,
    //    tmxxids:"12,13" 多选,号分隔
    //  ]
    // }
    //2、数据返回，后台会判断成绩，然后直接把所得的投资码数组返回  这里可以调整，先走业务
    async submit () {
      await this.getReturnList()
      //提交答题信息接口
      console.log(this.returnList);
      if (!this.returnList.dtlist.every((item) => {
        return item.tmxxids !== '0'
      })) {
        this.$dialog.alert({
          title: "温馨提示",
          message: "存在未答题目"
        })
        return
      }
      this.$dialog.confirm({
        message: "是否确认提交"
      }).then(() => {
        this.toWcdt()
      }).catch(() => { })
    },
    async toWcdt () {
      await this.getReturnList()
      // console.log('111');
      Wcdt(this.returnList).then(
        (t) => {// 成功
          this.$router.push("/bndsqnx/dtjg")
        },
        (f) => {// 失败
          this.$dialog.alert({
            title: "温馨提示",
            message: `${f.data.message}`
          })
        }
      )
    },
    getReturnList () {
      //组装生成返回后端的数据格式
      this.returnList.kssj = this.kssj
      this.returnList.jssj = new Date()
      this.returnList.dtlist = []
      this.examList.forEach((item) => {
        var Dtxxitem = {}
        Dtxxitem.tmid = item.id
        if (item.radio) {
          if (item.radio.length > 1) {
            item.radio.sort((a, b) => { return a - b })
            Dtxxitem.tmxxids = item.radio.toString()
          } else {
            Dtxxitem.tmxxids = `${item.radio}`
          }
        } else {
          Dtxxitem.tmxxids = '0'
        }
        this.returnList.dtlist.push(Dtxxitem)
      })
    },
    //倒计时
    countDown () {
      var data = new Date().getTime() + 5 * 60 * 1000
      var show = document.getElementById("show").getElementsByTagName("span");
      var that = this
      this.timer = setInterval(function () {
        var data2 = new Date(data - new Date().getTime())
        this.minute = data2.getMinutes();
        this.second = data2.getSeconds();
        this.psecond = Math.floor(data2.getMilliseconds() / 10);
        if (second <= 9) second = '0' + second;
        if (psecond <= 9) psecond = '0' + psecond;
        show[0].innerHTML = this.minute;
        show[1].innerHTML = this.second;
        // show[2].innerHTML = this.psecond;
        if (data - new Date().getTime() <= 0) {
          this.minute = '0'
          this.second = '00'
          this.psecond = '00'
          show[0].innerHTML = this.minute;
          show[1].innerHTML = this.second;
          // show[2].innerHTML = this.psecond;
          clearInterval(this.timer);
          that.$dialog.alert({
            message: "时间已到，是否提交"
          }).then(() => {
            this.toWcdt()
          })
        }
      }, 80);
    },
  }
}
</script>

<style lang="scss" scoped>
@import './style/competition.scss';
</style>

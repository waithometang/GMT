<template>
  <div class="main">
    <div class="img">
      <img src="./image/img1.png" alt="" />
    </div>

    <div class="input" @click="eject">
      <div class="btn">请写下评论</div>
    </div>
    <div class="scroll">
      <div class="info" v-if="sffj" @click="toLjtz">
        <span>{{ ljTitle }}</span>
      </div>
      <template v-if="mine.length !== 0">
        <div class="my-pl" v-for="item in mine" :key="item.id">
          <div class="xinxi">
            <div class="left">
              <img :src="item.photo" />
            </div>
            <div class="right">
              <div class="head">
                <span class="name">{{ item.nikname }}</span>
                <span class="r">
                  <span @click="delpl(item.id)">删除</span>
                  <i>|</i>
                  <!-- <span class="select" v-if="selected">已精选</span> -->
                  <!-- <span class="select" v-else>未精选</span> -->
                  <span class="select">未审核</span>
                </span>
              </div>
              <div class="content">
                <p>{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="line">
          <p>—— 以上评论被审核后，将对所有人可见 ——</p>
        </div>
      </template>

      <div class="item" v-for="(item, index) in pl_List" :key="index">
        <div class="xinxi">
          <div class="left">
            <img :src="item.photo" />
          </div>
          <div class="right">
            <div class="head">
              <span class="name">{{ item.nikname }}</span>
              <span class="r">
                <van-icon
                  name="good-job-o"
                  class="icon"
                  @click="goodJob(item.id, $event)"
                />
                <span class="num">{{ item.dzs }}</span>
              </span>
            </div>
            <div class="content">
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="plus-icon">
      <div class="pl" v-if="plShow">
        <div class="head">
          <van-icon name="cross" class="cross" @click="plShow = false" />
          <span class="title">写评论</span>
          <span class="btn" @click="submit()">提交</span>
        </div>
        <textarea
          v-model="pl_text"
          placeholder="请写下您的评论，精选评论有机会抽大奖哦~"
          ref="textarea"
        ></textarea>
      </div>
    </transition>
  </div>
</template>
<script>
import wjutils from "@/js/WjSmrzUtil"
import { storage } from "@/js/until";
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      pl_List: [], //评论列表
      mine: [],
      ljTitle: '',
      plShow: false, //评论页显示
      pl_text: '', //评论内容
      // selected: false, //是否被精选
      // twbh: '2104001', //推文编号
      sffj: '',
      hasSM: false // 是否实名
    }
  },
  computed: {
    twbh () { // //推文编号
      return this.$route.params.id
    }
  },
  watch: {
  },
  created () {
    this._GetList()
    this.$showSubscribe().then(() => {
      wjutils.gotoSMRZIfNot(this, this.init)
    })
  },
  methods: {
    ...mapActions(['getGrxx']),

    toLjtz () {
      this.$router.push(`/ljtz/${this.twbh}`)
    },
    eject () {
      this.plShow = true
      this.pl_text = ''
      this.$nextTick(() => {
        this.$refs.textarea && this.$refs.textarea.focus()
      })
    },
    init () {
      this.getGrxx().then(Grxx => {
        this.hasSM = Grxx.hasSM
      })
    },
    submit () {
      if (this.pl_text.trim().length == 0) {
        this.$toast({
          message: '请输入内容',
        })
      } else {
        if (!this.hasSM) {
          storage.save('path', this.$route.fullPath)
          wjutils.gotoSMRZ(this, 'http://gmt.gaoming.gov.cn/smrz')
        } else {
          this.plShow = false
          this.$post('/plcj/Plcj/Fbpl', { twbh: this.twbh, content: this.pl_text }).then(res => {
            if (res.data.success) {
              this._GetList()
            } else {
              console.log(res.data.message);
            }
          })
          this.$toast({
            message: '评论成功',
            icon: require("./image/icon1.png"),
          })
        }
      }
    },
    delpl (plid) {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "是否确认删除该评论?"
        }).then(() => {
          this.$post('/plcj/Plcj/Scpl', { twbh: this.twbh, plid: plid }).then(res => {
            this._GetList()
          })
        })

      this.$toast({
        message: '删除成功',
      })

    },
    _GetList () {
      this.$indicator.open("加载中...");
      this.$post('/plcj/Plcj/Pllb', { twbh: this.twbh }).then(res => {
        this.$indicator.close();
        this.mine = res.data.content.mine
        this.pl_List = res.data.content.list
        if (res.data.content.sffj == '是') {
          if (res.data.content.djzt == '已兑奖') {
            this.sffj = true
            this.ljTitle = '中奖奖品已兑奖'
          } else {
            this.sffj = true
            this.ljTitle = '已中奖，点击此处兑奖'
          }
        } else {
          this.sffj = false
        }
      })
    },
    goodJob (plid, event) {
      var el = event.currentTarget
      this.$post('/plcj/Plcj/Pldz', { twbh: this.twbh, plid: plid }).then(res => {
        this._GetList()
      })

    }
  },
}
</script>
<style lang='scss' scoped>
@import './style/plcj.scss';
</style>
<template>
  <div class="vote-frame">
    <div class="obscuration"></div>
    <div class="frame" v-if="true">
      <div class="close">
        <i class="close-icon" @click="close"></i>
      </div>
      <div class="text">投票确认</div>
      <div class="vote-list" v-if="!voteMode">
        <div class="tab" :class="{'tab-select': tabStart === 1}" @click="selectTab(1)">1票</div>
        <div class="tab" :class="{'tab-select': tabStart === 2}" @click="selectTab(2)">{{infoData.zptpxz}}票</div>
        <div class="tab" :class="{'tab-select': tabStart === 3}" @click="selectTab(3)">自定义</div>
      </div>
      <div class="vote-number" v-if="voteMode">
        <span>投票数量</span>
        <div class="tag">
          <div class="tag-but" @click="reduce">-</div>
          <div class="tag-number">{{voteNumber}}</div>
          <div class="tag-but" @click="increase">+</div>
        </div>
        <span>票</span>
      </div>
      <div class="vote-rule">
        <p>{{`1. 在未关注“高明通”微信公众号的情况下，每个微信号每天最多可投${this.infoData.mrzdps ? this.infoData.mrzdps : 0}票，对同一作品每天最多投${this.infoData.mrzdps ? this.infoData.mrzdps : 0}票；`}}</p>
        <p>{{`2.已关注“高明通”微信公众号后可以获得每天多投1张票的奖励，即每个微信号每天最多可投${this.infoData.mrzdps ? this.infoData.mrzdps+1 : 0}票，对同一作品最多投${this.infoData.mrzdps ? this.infoData.mrzdps+1 : 0}票；`}}</p>
        <p>{{`3. 每个微信号每天每个组别最多可以投${this.infoData.zbtpxz ? this.infoData.zbtpxz : 0}个作品。`}}</p>
      </div>
      <div class="vote-but">
        <div class="but but-border" @click="close">取消</div>
        <div class="but" @click="settp">确认</div>
      </div>
    </div>
    <message v-if="messageBut" :message="messages" :state="states"/>
  </div>
</template>

<script>
import { tp, tpxq } from  '@/api/secondLevelPage'
import message from "./message"

export default {
  data() {
    return {
      tabStart: 1,
      voteMode: false,
      voteNumber: 1,
      messages: '',
      states: '',
      infoData: '',
      show_url: false
    }
  },
  components: {
    message
  },
  computed: {
    voteContent () {
      return this.$store.state.voteContent
    },
    messageBut () {
      return this.$store.state.messageBut
    },
  },
  created () {
    this.gettpxq()
  },
  methods: {
    // 关闭弹窗
    close () {
      this.$store.commit('SetvoteMessage', false)
    },
    // 增加投票数
    increase () {
      if (this.voteNumber < this.infoData.zptpxz) {
        this.voteNumber++
      }
    },
    // 减少投票数
    reduce () {
      if (this.voteNumber > 1) {
        this.voteNumber--
      }
    },
    // 选择tab
    selectTab (item) {
      switch (item) {
        case 1:
          this.tabStart = item
          this.voteMode = false
          this.voteNumber = 1
        break;
        case 2:
          this.tabStart = item
          this.voteMode = false
          this.voteNumber = 10
        break;
        case 3:
          this.tabStart = item
          this.voteMode = true
          this.voteNumber = 1
        break;
        default:
          break;
      }
    },
    // 投票
    settp () {
      this.$store.commit('SetincreaseNumber', this.voteNumber)
      tp ({
        id: this.voteContent,
        ps: this.voteNumber
      }).then (rps => {
        if (rps.data.success) {
          this.$store.state.increase()
          if (rps.data.content.kycj) {
            this.$store.commit('SetvoteMessage', false)
            if (rps.data.content.sfgz) {
              if (this.$store.state.voteHasTj) {
                this.$router.push(`/draw/${this.voteContent}`)
              }else{
                this.$toast.success('投票成功')
                this.close()
              }
            } else {
              let that = this
              this.MessageBox ({
                content: '投票成功，关注公众号，还可以进行抽取电影票喔。具体抽奖活动规则请查看“高明通”微信公众号推文',
                success: function () {
                  that.$store.commit('SetshowIcon', true)
                },
                failStata: true
              })
            }
          } else {
            this.messages = '投票成功'
            this.states = 1
            this.$store.commit('SetmessageBut', true)
          }
        } else {
          this.states = 2
          this.messages = rps.data.message
          this.$store.commit('SetmessageBut', true)
        }
      })
    },
    // 投票详情
    gettpxq () {
      tpxq({
        id: this.voteContent
      }).then (rps => {
        if (rps.data.success) {
          this.infoData = rps.data.content
          this.$store.commit('SetvoteHasTj',this.infoData.tpcj)
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "../style/voteFrame.scss";
</style>
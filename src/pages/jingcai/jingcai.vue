<template>
  <div class="jingcai" v-if="hdxxData">
    <div class="head">
      <div class="head-team-logo">
        <div class="team-logo">
          <div class="logo">
            <img :src="getTeamIcon(leftInfo)" alt />
          </div>
          <div class="name">{{getTeamName(leftInfo)}}</div>
        </div>
        <div class="team-logo">
          <div class="logo">
            <img :src="getTeamIcon(rightInfo)" alt />
          </div>
          <div class="name">{{getTeamName(rightInfo)}}</div>
        </div>
      </div>
      <div class="head-score">
        <div class="score-left" :style="leftStyle">{{getTeamNumber(leftInfo)}}</div>
        <div class="score-right" :style="rightStyle">{{getTeamNumber(rightInfo)}}</div>
      </div>
      <div class="head-select">
        <div
          class="select-tab"
          :class="{'select-tab-action': selectState === leftInfo}"
          @click="select(leftInfo)"
        ></div>
        <div
          class="select-tab"
          :class="{'select-tab-action': selectState === rightInfo}"
          @click="select(rightInfo)"
        ></div>
      </div>
      <div class="head-but" @click="vote">
        <i></i>投票
      </div>
    </div>
    <div class="content">
      <div class="content-rule">
        <div class="content-rule-icon"></div>
        <div class="content-rule-list">
          <div class="content-rule-tab">
            <div class="tab-left">活动主题：</div>
            <div
              class="tab-right"
              :class="{'text_hidden':text_hidden.zhuti}"
            >2019佛山农商杯高明区第二届村际（百村）足球赛问鼎之战</div>
          </div>
          <div class="content-rule-tab">
            <div class="tab-left">活动介绍：</div>
            <div
              class="tab-right"
              :class="{'text_hidden':text_hidden.jieshao}"
              v-html="hdxxData.hdxq"
            ></div>
          </div>
          <div class="content-rule-tab">
            <div class="tab-left">活动规则：</div>
            <div class="tab-right" :class="{'text_hidden':text_hidden.guize}">{{this.hdxxData.hdgz}}</div>
          </div>
          <div class="hidden" v-if="span_hidden.guize">
            <span @click="text(2)">{{text_hidden.guize?'查看全部':'收起'}}</span>
          </div>
        </div>
      </div>
      <div class="content-condition">
        <div class="content-condition-icon"></div>
        <div class="content-condition-list">
          <div class="content-condition-tab" v-for="(item, index) in listData.tplist" :key="index">
            <div class="content-condition-left">
              <img :src="item.tx" alt />
            </div>
            <div class="content-condition-right">
              <div class="right-name">
                {{item.xm}}
                <span>支持了{{item.tpzp}}</span>
              </div>
              <div class="right-icon">
                <img :src="item.img" alt />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="base" ref="base" v-if="false">
      <div class="notData" v-if="listData.zjlist.length === 0">暂无中奖纪录</div>
      <div class="base-tab" v-for="(item, index) in listData.zjlist" :key="index" v-else>
        <div class="base-tab-icon"></div>
        <div class="base-tab-name">张三获得了一张电影票</div>
      </div>
    </div>
    <messageBox v-if="showMessage" :sfgz="sfgz" @setclos="setMessage"/>
  </div>
</template>

<script>
import { jchdxx, tp, jchdtpxq } from "@/api/secondLevelPage";
import { mapActions } from 'vuex'
import messageBox from '@/components/messageBox';

export default {
  data() {
    return {
      countDownDome: "",
      selectState: "",
      hdxxData: "",
      leftInfo: "",
      rightInfo: "",
      leftStyle: {},
      rightStyle: {},
      listData: "",
      span_hidden: {
        zhuti: false,
        jieshao: false,
        guize: false
      },
      text_hidden: {
        zhuti: false,
        jieshao: false,
        guize: false
      },
      showMessage:false,
      sfgz:false
    };
  },
  components: {
    messageBox
  },
  computed: {
    showIcon() {
      return this.$store.state.showIcon;
    }
  },
  methods: {
    ...mapActions(['getGrxx']),
    select(item) {
      this.selectState = item;
    },
    scroll() {
      let dome = this.$refs.base;
      this.countDownDome = setInterval(() => {
        let dome = this.$refs.base;
        if (dome) {
          if (dome.scrollWidth >= dome.clientWidth) {
            dome.scrollLeft = dome.scrollLeft + 2;
            if (dome.scrollLeft + dome.clientWidth === dome.scrollWidth) {
              dome.scrollLeft = 0;
            }
          } else {
            clearInterval(this.countDownDome);
          }
        } else {
          clearInterval(this.countDownDome);
        }
      }, 100);
    },
    getjchdxx() {
      this.$indicator.open();
      jchdxx({
        id: 4
      }).then(rps => {
        this.$indicator.close();
        if (rps.data.success) {
          rps.data.content.hdxq = rps.data.content.hdxq.replace(/\n/g, "<br/>");
          this.hdxxData = rps.data.content;
          this.leftInfo = rps.data.content.dwxx[0].id;
          this.rightInfo = rps.data.content.dwxx[1].id;
          this.getSchedule(rps.data.content.dwxx);
          setTimeout(() => {
            this.set_hidden()
          }, 100);
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    },
    getListaData() {
      jchdtpxq({
        hdid: 4,
        tps: 10,
        zjs: 10
      }).then(rps => {
        if (rps.data.success) {
          this.listData = rps.data.content;
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    },
    getsffz(){
      this.getGrxx(true).then (val => {
        if (!val.sfgz) {
          this.sfgz=true
        } else {
          this.sfgz=false
        }
        this.showMessage = true
      })
    },
    vote() {
      if (!this.selectState) {
        this.changtoast("请选择支持的队伍", "error");
        return;
      }
      this.$indicator.open();
      tp({
        id: this.selectState,
        ps: 1
      }).then(rps => {
        this.$indicator.close();
        if (rps.data.success) {
          this.getsffz();
          // if (rps.data.content.kycj) {
          //   if (rps.data.content.sfgz) {
          //     this.$router.push(`/draw/${this.selectState}`)
          //   } else {
          //     let that = this
          //     this.MessageBox ({
          //       content: '投票成功，关注公众号，还可以进行抽取电影票喔。具体抽奖活动规则请查看“高明通”微信公众号推文',
          //       success: function () {
          //         that.$store.commit('SetshowIcon', true)
          //       },
          //       failStata: true
          //     })
          //   }
          // } else {
          //   this.changtoast('投票成功')
          // }
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    },
    getTeamIcon(item) {
      let data = this.hdxxData.dwxx.filter(val => {
        return val.id === item;
      });
      return data[0].tp;
    },
    getTeamName(item) {
      let data = this.hdxxData.dwxx.filter(val => {
        return val.id === item;
      });
      return data[0].name;
    },
    getTeamNumber(item) {
      let data = this.hdxxData.dwxx.filter(val => {
        return val.id === item;
      });
      return data[0].ps;
    },
    getSchedule(item) {
      let leftNumber = this.getTeamNumber(this.leftInfo);
      let rightNumber = this.getTeamNumber(this.rightInfo);
      if (leftNumber === rightNumber) {
        this.leftStyle = {
          width: "50%"
        };
        this.rightStyle = {
          width: "50%"
        };
      } else {
        if (leftNumber === 0 || rightNumber === 0) {
          if (leftNumber === 0) {
            this.leftStyle = {
              display: "none"
            };
            this.rightStyle = {
              width: `${(rightNumber / (leftNumber + rightNumber)) * 100}%`,
              "border-radius": "4vw"
            };
          }
          if (rightNumber === 0) {
            this.leftStyle = {
              width: `${(leftNumber / (leftNumber + rightNumber)) * 100}%`,
              "border-radius": "4vw"
            };
            this.rightStyle = {
              display: "none"
            };
          }
        } else {
          this.leftStyle = {
            width: `${(leftNumber / (leftNumber + rightNumber)) * 100}%`
          };
          this.rightStyle = {
            width: `${(rightNumber / (leftNumber + rightNumber)) * 100}%`
          };
        }
      }
    },
    text(num) {
      if (num == 0) {
        if (this.text_hidden.zhuti) {
          this.text_hidden.zhuti = false;
        } else {
          this.text_hidden.zhuti = true;
        }
      } else if (num == 1) {
        if (this.text_hidden.jieshao) {
          this.text_hidden.jieshao = false;
        } else {
          this.text_hidden.jieshao = true;
        }
      } else if (num == 2) {
        if (this.text_hidden.guize) {
          this.text_hidden.guize = false;
        } else {
          this.text_hidden.guize = true;
        }
      }
    },
    set_hidden() {
      let text = document.getElementsByClassName("tab-right");
      for (let i = 0; i < text.length; i++) {
        if(text[i].clientHeight>60){
          if(i==0){this.span_hidden.zhuti=true;this.text_hidden.zhuti=true}
          else if(i==1){this.span_hidden.jieshao=true;this.text_hidden.jieshao=true}
          else if(i==2){this.span_hidden.guize=true;this.text_hidden.guize=true}
        }
      }
    },
    setMessage(){
      this.showMessage = false
    }
  },
  created() {
    this.getjchdxx();
    this.getListaData();
  },
  mounted() {
    this.$nextTick(val => {
      // this.scroll()
    });
  }
};
</script>

<style lang='scss'>
@import "./style/jingcai.scss";
</style>
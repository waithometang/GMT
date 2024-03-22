<template>
  <div class="draw"   v-if="info && !sfycj" >
    <div class="consequence">
      <canvas id="mycanvas" @touchmove="handleDragMove" @touchstart="handleDragStart"></canvas>
      <div class="draw-result" id="draw-result">{{info.sfzj ? '恭喜！获得一张电影票' : '很遗憾，未中奖'}}</div>
    </div>
    <div class="explain">
      <div class="text1">关注高明通公众号</div>
      <div class="text2">参与刮一刮抽奖活动</div>
      <!-- <div class="text1">并可获得每日多投5票哦</div> -->
      <div class="phone" v-if="info.sfzj && show"><input placeholder="请输入手机号进行领取"  v-model="phone"/></div>
    </div>
    <div class="draw-but" @click="affrim">确定</div>
    <!-- <div class="draw-rule">
      <div class="text">抽奖规则</div>
      <div class="tab">1.每天参与投票后且关注“高明通”微信公众号即可获得一次抽奖机会（每个微信号每天最多可参加1次抽奖）；抽奖资格从当天起保留至当日24：00。活动期间每个微信号最多只能中奖一次。</div>
      <div class="tab">2.关注“高明通”微信公众号可以获得每天多投5张票的奖励。</div>
      <div class="tab">3.本次抽奖活动中奖奖励为一张电影票。若参与人中奖，请参与人及时按照提示输入手机号码，如未填写手机号码视为放弃领奖资格。平台将会发送短信通知中奖人领奖时间和领奖地点。领奖时需凭短信作为领奖依据，请勿删除中奖短信</div>
      <div class="tab">4.本次抽奖活动截止时间等于投票活动截止时间。</div>
      <div class="tab">5.本次抽奖活动最终解释权 归佛山市高明区政务服务数据管理局所有。</div>

    </div> -->
  </div>
  <div v-else-if="info">
    <div>
      <div class="Badluck">
        <div class="Badluck_img">
          <img :src="!info.sfzj ? '/static/vote/wz_nor.png' : '/static/vote/z_yes.png'"/>
          <h1 v-if="info.sfzj" class="zjH1">恭喜！获得一张电影票</h1>
          <h1 v-else>很遗憾，未中奖</h1>
        </div>
        <div class="Badluck_font">
          <span v-if="!info.sfzj">敬请关注高明通接下来的活动，赢取丰富奖品。</span>
          <span v-else>恭喜，你通过参与“高明区足球竞猜”抽奖活动，已中得电影票一张，请凭微信公众号中奖通知。<p>于12月24日（周二）~ 12月29日（周日）每天20：00~21：00到高明区荷城广场志愿者驿站领取奖品。逾期未领视为放弃领取。</p><p>敬请关注高明通下一次的活动，赢取丰富奖品!</p></span>
        </div>
        <div class="Badluck_but" :class="{'zjl' : info.sfzj}">
          <div @click="tjlxdh" v-if="!info.sfzj ">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { tpcj, djzjlxdh } from "@/api/secondLevelPage";
export default {
  data() {
    return {
      startX: 0,
      startY: 0,
      sfycj: true,  //是否已经抽过奖
      info: {sfzj:true},
      phone: '',
      show: false,
      showcanvas: true
    };
  },
  created () {
    // tpcj({
    //   id: this.$route.params.id,
    //   hdid: this.$route.params.hdid,
    // }).then (rps => {
    //   if (rps.data.success) {
    //     this.info = rps.data.content
    //     this.sfycj=this.info.sfycj
    //     if (!this.sfycj) {
    //       this.$nextTick(val => {
    //         this.init();
    //       })
    //     }
    //   } else {
    //     this.$nextTick(val => {
    //       this.init();
    //     })
    //     this.changtoast(rps.data.message, 'error')
    //   }
    // })
  },
  methods: {
    // 生成刮奖
    init() {
      let w = document.getElementById("draw-result").clientWidth;
      let h = document.getElementById("draw-result").clientHeight;
      let x = document.getElementById("draw-result").offsetLeft
      let y = document.getElementById("draw-result").offsetTop
      var canvas = document.getElementById("mycanvas");
      var context = canvas.getContext("2d");
      context.fillStyle = "#d1d1d1";
      context.fillRect(x, 0, w, h);
      context.globalCompositeOperation = "destination-out";
    },
    handleDragStart(e) {
      this.startX = e.clientX || e.changedTouches[0].clientX;
      this.startY = e.clientY || e.changedTouches[0].clientY;
    },
    tjlxdh(){
      if (!this.info.sfzj) {
        WeixinJSBridge.call('closeWindow')
        return
      }
      djzjlxdh({id:this.info.cjjlid,tel:this.info.lxdh}).then (res => {
        if(res.data.success){
          this.changtoast('登记号码成功','success')
        }else{
          this.changtoast(res.data.message,'error')
        }
      })
    },
    handleDragMove(e) {
      let x = e.clientX || e.changedTouches[0].clientX;
      let y = e.clientY || e.changedTouches[0].clientY;
      var canvas = document.getElementById("mycanvas");
      var context = canvas.getContext("2d");
      context.beginPath();
      context.arc(x - e.target.offsetLeft, y-e.target.offsetTop, 20, 0, Math.PI *2)
      context.closePath();
      context.fillStyle = "#dddddd";
      context.fill();
      this.checkComplete();
    },
    // 计算刮奖刮开区域
    checkComplete() {
      let w = document.getElementById("draw-result").clientWidth;
      let h = document.getElementById("draw-result").clientHeight;
      var canvas = document.getElementById("mycanvas");
      var context = canvas.getContext("2d");
      var imgData = context.getImageData(0, 0, w, h);
      var pxData = imgData.data; // 获取字节数据
      var len = pxData.length; // 获取字节长度
      var count = 0; // 记录透明点的个数
      // 主要的思想是 一个像素由四个数据组成，每个数据分别是 rgba() 所以第四个数据 a 表示alpha透明度
      for (var i = 0; i < len; i += 4) {
        var alpha = pxData[i + 3]; // 获取每个像素的透明度
        if (alpha < 10) {
          // 透明度小于10
          count++;
        }
      }
      var percent = count / (len / 4); // 计算百分比
      // 如果百分比大于0.8 则表示成功
      if (percent >= 0.6) {
        this.showcanvas = false
        this.show = true
      }
    },
    affrim () {
      if (!this.show) {
        this.$router.replace('/jc')
        return
      }
      if (!this.info.sfzj) {
        this.$router.replace('/jc')
        return
      }
      if (!this.phone) {
        this.changtoast('请输入手机号码', 'error')
        return
      }
      djzjlxdh({
        id: this.info.cjjlid,
        tel: this.phone
      }).then (rps => {
        if (rps.data.success) {
          let that = this
          this.MessageBox ({
            content: '恭喜，你通过参与“猜冠军赢大奖”投票抽奖活动，已中得电影票一张，中奖奖品将在投票结束后另行短信通知具体领取时间和地点。感谢你的参与。',
            success: function () {
              that.$router.replace('/jc')
            },
            // failStata: true
          })
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  }
};
</script>

<style lang='scss' scoped>
@import "./style/draw.scss";
</style>
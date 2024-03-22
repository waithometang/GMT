<template>
  <div class="xxzgcxxq">
    <van-skeleton title avatar :row="10" :loading="!show">
      <div class="list">
        <div class="listHead">报名信息</div>
        <div class="item">
          <div class="tximgs"><img src="/static/ybmimages/touxiang.png" /></div>
          <div class="message">
            <span>{{ thisData.xm }}</span>
            <p>性别:{{ thisData.xb }}</p>
            <p>证件号:{{ thisData.sfzh }}</p>
          </div>
        </div>
      </div>
      <i></i>
      <div class="list">
        <div class="listHead">查询结果</div>
        <div class="item">
          <div class="bzimgs"><img src="/static/zkbm/bmsq.png" /></div>
          <div class="message">
            <span>报考申请</span>
            <p>你已完成报名</p>
            <p class="time">{{ thisData.bmsj }}</p>
          </div>
        </div>
        <div class="item" v-if="stepIndex > 0">
          <div class="bzimgs"><img src="/static/zkbm/bmsh.png" /></div>
          <!-- <div class="message">
            <span>资格审查</span>
            <p v-if="thisData.sczt === '待审查'">资格审查中</p>
            <template v-else-if="thisData.scjg === '通过'">
              <p>资格审查已通过！</p>
              <p class="cor">准考证号：{{ thisData.bmbh }}</p>
            </template>
            <p class="cor cor2" v-else>资格审查不通过</p>
            <p class="time" v-if="thisData.scbz">{{ thisData.scbz }}</p>
            <p class="time">{{ thisData.scsj }}</p>
          </div> -->
          <div class="message">
            <span>资格审查</span>
            <template v-if="thisData.sczt === '已审查'">
              <template v-if="thisData.scjg === '通过'">
                <p>资格审查已通过！</p>
                <p class="cor">准考证号：{{ thisData.bmbh }}</p>
              </template>
              <p class="cor cor2" v-else>资格审查不通过</p>
              <p class="time" v-if="thisData.scbz">{{ thisData.scbz }}</p>
              <p class="time">{{ thisData.scsj }}</p>
            </template>
            <p v-else>资格审查中</p>
          </div>
        </div>
        <template v-if="thisData.kscj">
          <div class="item" v-if="thisData.kscj.zcj_1">
            <div class="bzimgs"><img src="/static/zkbm/mscj1.png" /></div>
            <div class="message">
              <span>面谈（专业试）成绩</span>
              <p>报考岗位：{{ thisData.gwmc }}</p>
              <p>岗位代码：{{ thisData.dm }}</p>
              <p>成&emsp;&emsp;绩：{{ thisData.kscj.zcj_1 }}</p>
              <p v-if="thisData.kscj.pm_1 != '无'">
                名&emsp;&emsp;次：{{ thisData.kscj.pm_1 }}
              </p>
              <p class="cor">是否进入面试：{{ thisData.kscj.sfrw_1 }}</p>
            </div>
          </div>
          <div class="item" v-if="thisData.kscj.zcj_2">
            <div class="bzimgs"><img src="/static/zkbm/mscj2.png" /></div>
            <div class="message">
              <span>面试成绩</span>
              <p>报考岗位：{{ thisData.gwmc }}</p>
              <p>岗位代码：{{ thisData.dm }}</p>
              <p>成&emsp;&emsp;绩：{{ thisData.kscj.zcj_2 }}</p>
              <p v-if="thisData.kscj.pm_2 != '无'">
                名&emsp;&emsp;次：{{ thisData.kscj.pm_2 }}
              </p>
              <p class="cor">是否进入面试：{{ thisData.kscj.sfrw_2 }}</p>
            </div>
          </div>
        </template>
        <!-- <template  v-if="stepIndex > 1 && thisData.zys">
            <div class="item" v-for="(item,index) in thisData.zys" :key="index">
              <div class="bzimgs"><img v-if="index==0" src="/static/ybmimages/yryzgcx_03.png"/></div>
              <div class="message" :class="index==0 ? 'border': ''">
                <span v-if="index==0">志愿填报</span>
                  <p> 报名学校:{{item.mc}}</p>
                  <p> 阶段:{{item.jd}}</p>
                  <p class="time">{{item.rq}} </p>
              </div>
            </div>
          </template> -->
      </div>
    </van-skeleton>
    <div class="base">
      <div class="base-tab">
        <div class="public-long-but" @click="gotoXZBmb">下载报名表</div>
      </div>
<!--      <div class="base-tab">-->
<!--        <div class="public-long-but" @click="gotoYD">下载准考证</div>-->
<!--      </div>-->
      <div class="base-tab">
        <div class="public-long-but" @click="gotoSY">返回列表</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false,
      listData: [
        { name: "基本信息", state: 1 },
        { name: "证明材料", state: 2 },
        { name: "进度结果", state: 3 }
      ],
      tabState: 3,
      stepIndex: 0,
      thisData: {
        xm: ""
      },
      bmbUrl: "",
      zkzUrl: ""
    }
  },
  computed: {
    isView () {
      //查看模式，不能修改
      return this.$route.query.m === "v"
    }
  },
  methods: {
    gotoXZBmb () {
      if (this.thisData.zkbmb != 'OK') {
        this.$toast.fail(this.thisData.jszp_zkzot)
      } else {
        this.$router.push({ name: 'dwzkxzbmb', params: { bmbUrl: this.bmbUrl } })
      }
    },
    gotoYD () {
      if (this.thisData.zkbmb != 'OK') {
        this.$toast.fail(this.thisData.jszp_zkzot)
      } else {
        this.$router.push({ name: 'dwzkxzzkz', params: { zkzUrl: this.zkzUrl } })
      }
    },
    gotoSY () {
      this.$router.push("/dwzk/wdbm/list")
    }
  },
  created () {
    this.$get("api/zkgl/Jdcx?id=" + this.$route.query.bmid).then(rps => {
      if (rps.data.success) {
        this.show = true
        this.thisData = rps.data.content
        this.stepIndex = 6
        this.bmbUrl = '/api/Zkgl/DownLoadBmb?id=' + this.$route.query.bmid + '&openid=' + this.thisData.openId
        this.zkzUrl = '/api/Zkgl/DownLoadZkz?id=' + this.$route.query.bmid + '&openid=' + this.thisData.openId
      } else {
        this.changtoast(rps.data.message, "error")
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import '../style/xxzgcxxq.scss';
.base {
  background: #ffffff;
  margin-top: 17px;
  padding: 0px;
  padding-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    display: block;
  }
  .base-tab {
    flex: 0 0 auto;
    width: 190px;
  }
  .width {
    width: 690px;
  }
  .base-but {
    padding: 45px;
  }
}
</style>

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
          <div class="message">
            <span>资格审查</span>
            <p v-if="thisData.sczt === '待审查'">资格审查中</p>
            <template v-else-if="thisData.scjg === '通过'">
              <p>资格审查已通过！</p>
              <p class="cor">准考证号：{{ thisData.bmbh }}</p>
              <!-- <p class="time">备注：考试包括笔试、面试，参加每场考试都必须携带身份证，具体考试时间和地点在“高明通”、“荷城微新闻”微信公众号公布。</p> -->
            </template>
            <p class="cor cor2" v-else>资格审查不通过</p>
            <p class="time" v-if="thisData.scbz">{{ thisData.scbz }}</p>
            <p class="time">{{ thisData.scsj }}</p>
          </div>
        </div>
        <template v-if="thisData.kscj">
          <div class="item">
            <div class="bzimgs"><img src="/static/zkbm/mscj1.png" /></div>
            <div class="message">
              <span>成绩</span>
              <p>报考岗位：{{ thisData.gwmc }}</p>
              <p>岗位代码：{{ thisData.dm }}</p>
              <p v-if="thisData.kscj.zyscj">专业试成绩：{{ thisData.kscj.zyscj.toFixed(2) }}</p>
              <p v-if="thisData.kscj.mscj">面试成绩：{{ thisData.kscj.mscj.toFixed(2) }}</p>
              <p v-if="thisData.kscj.zcj">最终成绩：{{ thisData.kscj.zcj.toFixed(2) }}</p>
              <p v-if="thisData.kscj.pm">名次：{{ thisData.kscj.pm }}</p>
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
    <div
      class="yellow-btn2"
      v-if="
        thisData.sczt === '已审查' &&
        thisData.scjg === '通过' &&
        thisData.mcss_id
      "
    >
      <div class="base-tab">
        <div class="public-long-but" @click="gotoXZBmb">下载报名表</div>
      </div>
      <div class="base-tab">
        <!-- <a download="准考证.docx" :href="zkzUrl" class="public-long-but">
          下载准考证</a> -->
        <div class="public-long-but" @click="gotoYD">下载准考证</div>
      </div>
      <div class="base-tab">
        <div class="public-long-but" @click="gotoSY">返回列表</div>
      </div>
    </div>
    <div class="base" v-else>
      <div class="base-tab width">
        <div class="public-long-but" @click="gotoSY">点击返回列表</div>
      </div>
    </div>
  </div>
</template>
<script>
import { downLoadByUrl } from '@/js/until.js'
export default {
  data () {
    return {
      show: false,
      listData: [{ name: '基本信息', state: 1 }, { name: '电子照片', state: 2 }, { name: '进度结果', state: 3 }], tabState: 3,
      stepIndex: 0,
      thisData: {
        xm: '',
      },
      zkzUrl: '',
      bmbUrl: ''
    }
  },
  computed: {
    isView () {  //查看模式，不能修改
      return this.$route.query.m === 'v'
    },
  },
  methods: {
    gotoSY () {
      this.$router.push('/jszp/wdbm/list')
    },
    gotoXZBmb () {
      if (this.thisData.jszp_zkbmb != 'OK') {
        this.$toast.fail(this.thisData.jszp_zkbmb)
      } else {
        this.$router.push({ name: 'jszpxzbmb', params: { bmbUrl: this.bmbUrl } })
      }
    },
    gotoYD () {
      if (this.thisData.jszp_zkzot != 'OK') {
        this.$toast.fail(this.thisData.jszp_zkzot )
      } else {
        this.$router.push({ name: 'jszpxzzkz', params: { zkzUrl: this.zkzUrl } })
      }
    },
    downloadFn () {
      let that = this
      this.$indicator.open('下载中...')
      downLoadByUrl('/api/jszp/DownLoadZkz?id=' + this.$route.query.bmid, '准考证.docx',
        () => {
          that.$indicator.close()
        },
        err => {
          that.changtoast(err, 'error')
        })
    }
  },
  mounted () {
    this.$get('api/jszp/Jdcx?id=' + this.$route.query.bmid).then(rps => {
      if (rps.data.success) {
        this.show = true
        this.thisData = rps.data.content
        this.stepIndex = 6
        this.zkzUrl = '/api/jszp/DownLoadZkz?id=' + this.$route.query.bmid + '&openid=' + this.thisData.openId
        this.bmbUrl = '/api/jszp/DownLoadBmb?id=' + this.$route.query.bmid + '&openid=' + this.thisData.openId
      } else {
        this.changtoast(rps.data.message, "error")
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import '../../zkbm/style/xxzgcxxq.scss';
.yellow-btn2 {
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

<template>
  <div class="xxbtg">
    <van-skeleton title :row="10" :loading="!xsData">
      <template v-if="xsData">
        <div class="module-tag">
          <div class="yx_type">
            <p class="line_one">已选择类型</p>
            <p class="line_two">{{ xsData.lx }}</p>
            <p class="line_three">{{ xsData.xq }}</p>
          </div>
          <div class="module-title">资料照片</div>
          <div
            class="list-tab"
            v-for="(item, index) in xsData.zmzlDto.zls"
            :key="index"
          >
            <div class="publicUploadPictures">
              <div class="upload-pictures-title">
                <span>*</span>
                {{ item.desc }}
              </div>
              <div class="state" v-if="item.sczt === '已审查'">
                结果:
                <span :class="{ color1: item.scjg === '通过' }">{{
                  item.scjg
                }}</span>
                &nbsp;&nbsp;&nbsp;&nbsp; 审核时间:{{ item.scsj }}
              </div>
              <div class="state" v-if="item.scsm">备注: {{ item.scsm }}</div>
              <ul class="upload-pictures-list">
                <li v-for="(val, key) in item.urls" :key="key" @click="getimg(item.urls, key)">
                  <div class="images">
                    <img :src="val" alt />
                  </div>
                  <!-- <template v-if="item.sczt==='已审查'">
                    <div class="state">状态:{{item.sczt}}</div>
                    <div class="state">结果:<span>{{item.scjg}}</span></div>
                    <div class="state">时间:{{item.scsj}}</div>
                  </template>-->
                </li>
                <div style="clear: both"></div>
              </ul>
            </div>
          </div>
        </div>
      </template>
    </van-skeleton>
    <div class="base">
      <div class="base-tab width">
        <div class="public-long-but" @click="gotoIndex">点击返回列表</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  data () {
    return {
      xsData: "",
      isView: true,
      tabState: 2,
      ImagePr: ""
    };
  },
  methods: {
    changeTab (item) {
      if (item.state == 2) {
        this.$router.push("/czbtg" + window.location.search);
      } else if (item.state == 3) {
        this.$router.push("/czzgcxxq" + window.location.search);
      } else if (item.state == 1) {
        this.$router.push("/cztxck" + window.location.search);
      }
    },
    gotoIndex () {
      this.$router.push("/jszp/wdbm/list");
    },
    getimg (item, index) {
      this.ImagePr = ImagePreview({
        images: item,
        showIndex: true,
        loop: false,
        startPosition: index,
        closeOnPopstate: true,
      });
    },
  },
  beforeRouteLeave (to, from, next) {
    if (this.ImagePr) {
      this.ImagePr.close();
      this.ImagePr = ''
      next(false)
    } else {
      next(true)
    }
  },
  created () {
    this.$indicator.open('加载中...')
    this.$get('api/jszp/getzmcl?id=' + this.$route.query.bmid).then(rps => {
      this.$indicator.close()
      if (rps.data.success) {
        this.xsData = rps.data.content;
        if (this.xsData.sbnf) {
          this.xsData.sbnx = this.xsData.sbnf + '年' + this.xsData.sbyf + '月'
        }
        if (this.xsData.jzznf) {
          this.xsData.jzznx = this.xsData.jzznf + '年' + this.xsData.jzzyf + '月'
        }
      } else {
        this.changtoast(rps.data.message, 'error');
      }
    });
  }
};
</script>

<style lang='scss' scoped>
@import '../../zkbm/style/xxbtg.scss';
p {
  padding: 0;
  margin: 0;
}
.xxbtg {
  background-color: #f5f5f5 !important;
}
.module-title{
  font-size: 32px;
}
.yx_type {
  margin-bottom: 10px;
  .line_one {
    font-size: 32px;
    font-weight: bold;
    color: #333333;
    padding-top: 31px;
  }
  .line_two {
    padding-top: 23px;
    font-size: 32px;
    font-weight: bold;
    color: #333333;
  }
  .line_three {
    padding-top: 10px;
    font-size: 28px;
    color: #333333;
  }
}
</style>

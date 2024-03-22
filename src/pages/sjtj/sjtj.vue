<template>
  <div class="sjtj" v-if="listData">
    <div class="head">
      <div class="head-name">在线用户累计</div>
      <div class="head-number">{{listData.zxrs}}</div>
    </div>
    <div class="statistics-content">
      <div class="content-tab">
        <div class="content-head">
          <div class="content-head-tab">
            <div class="content-head-tab-name">
              <i></i>个人认证
            </div>
            <div class="content-head-tab-number">{{listData.grrz}}</div>
          </div>
          <div class="content-head-tab">
            <div class="content-head-tab-name">
              <i></i>企业认证
            </div>
            <div class="content-head-tab-number">{{listData.qyrz}}</div>
          </div>
        </div>
        <div class="content-base">
          <div class="content-base-tab">
            <div class="content-base-tab-name">
              <div class="tab-left-name">个人诉求</div>
              <div class="tab-right-name">{{listData.grsq.count}}</div>
            </div>
            <div class="content-base-tab-name">
              <div class="tab-left-name">已办结</div>
              <div class="tab-right-name">{{listData.grsq.ybj}}</div>
            </div>
            <div class="content-base-tab-name">
              <div class="tab-left-name">办结率</div>
              <div class="tab-right-name">{{listData.grsq.bjl}}%</div>
            </div>
          </div>
          <div class="content-base-tab">
            <div class="content-base-tab-name">
              <div class="tab-left-name">企业诉求</div>
              <div class="tab-right-name">{{listData.qysq.count}}</div>
            </div>
            <div class="content-base-tab-name">
              <div class="tab-left-name">已办结</div>
              <div class="tab-right-name">{{listData.qysq.ybj}}</div>
            </div>
            <div class="content-base-tab-name">
              <div class="tab-left-name">办结率</div>
              <div class="tab-right-name">{{listData.qysq.bjl}}%</div>
            </div>
          </div>
        </div>
      </div> 
    </div>
    <div class="general-situation">
      <div class="situation-name">数据概况</div>
      <div class="content-list">
        <div class="list-tab">
          <div class="list-tab-icon"></div>
          <div class="lsit-tab-name">
            <div class="tab-head-number">{{listData.dyss}}</div>
            <div class="tab-head-name">党员实事</div>
          </div>
        </div>
        <div class="list-tab list-tab-right">
          <div class="list-tab-icon"></div>
          <div class="lsit-tab-name">
            <div class="tab-head-number">{{listData.gzdt}}</div>
            <div class="tab-head-name">工作动态</div>
          </div>
        </div>
      </div>
    </div>
    <div class="ranking-list">
      <div class="ranking-list-head">
        <i></i>本月活跃镇街排行
      </div>
      <div class="ranking-list-content">
        <div class="ranking-list-tag" v-for="(item, index) in listData.pm" :key="index">
          <div class="tag-left">
            <img v-if="index === 0" src="/static/sjtj/jiang.png" alt="">
            <span v-else>{{index+1}}</span>
          </div>
          <div class="tag-right">
            <div class="tag-right-head">
              <div class="right-head-left">{{item.zj}}</div>
              <div class="right-head-right">总发布：{{item.count}}</div>
            </div>
            <div class="tag-right-base">
              <div class="tag-right-base-name">实名认证：{{item.smrz}}</div>
              <div class="tag-right-base-name">村务动态：{{item.cw}}</div>
            </div>
            <div class="tag-right-base">
              <div class="tag-right-base-name"> 智慧党建：{{item.dj}}</div>
              <div class="tag-right-base-name">乡村振兴：{{item.zx}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sjtj } from '@/api/secondLevelPage';

export default {
  data () {
    return {
      listData: ''
    }
  },
  methods: {
    getsjtj () {
      this.$indicator.open("正在加载数据，请稍等...")
      sjtj().then (rps => {
        this.$indicator.close()
        if (rps.data.success) {
          this.listData = rps.data.content
        } else {
          this.changtoast(rps.data.message, 'error')
        }   
      })
    }
  },
  created () {
    this.getsjtj()
  }
}
</script>

<style lang='scss' scoped>
@import './style/sjtj.scss';
</style>
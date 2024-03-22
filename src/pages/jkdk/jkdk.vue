<template>
  <div class="jkdk" v-if="listData">
    <div class="jkdk_hread">
      <p>已有<span>{{listData.zrs}}</span>人次完成健康打卡</p>
      <div class="wdbj"><span>每日健康打卡</span><div class="wd" @click="checkClass" v-if="listData.isBzr"><img src="/static/jkdk/班级.png"/>我的班级</div></div>
      <div class="chengyuan">
      	<div class="cy-item" v-for="(item, index) in listData.dkry" :key="index">
          <div class="item-left">
             <div class="item-tag">{{`${item.xm}（${item.gx}）`}}</div>
          </div>
          <div class="item-middle">
            <div class="item-tag">今日{{item.jtdk ? '已' : '未'}}打卡</div>
          </div>
          <div class="item-right">
            <i @click="deletes(item)" :class="{'remove':item.gx!=='本人'}"></i>
            <div class="dk" @click="punchCard(item.id)">立即打卡</div>
          </div>
      	</div>
      	<div class="cy-xz" v-if="listData && listData.dkry.length != 3" @click="xzcy"><img src="/static/jkdk/添加.png"/>添加家庭成员</div>
      </div>
    </div>
    <div class="jkdk-tab">
      <div class="tab-th">
        <div class="name">姓名</div>
        <div class="data">打卡日期</div>
        <div class="num">打卡次数</div>
        <div class="case">健康情况</div>
      </div>
      <div class="tab-th tab-tr" v-for="(item,index) in listData.dkjl" :key="index">
        <div class="name">{{item.xm}}</div>
        <div class="data">{{item.rq}}</div>
        <div class="num">{{item.cs}}次</div>
        <div class="case" :class="{'case-action': item.qk === '异常'}">{{item.qk}}</div>
      </div>
    </div>
    <div class="but" v-if="listData && listData.dkjl.length > 9" @click="viewMore"> 查看更多>> </div>
    <div class="more" v-else>没有更多数据</div>
  </div>
</template>
<script>
import GmtRadio from "@/components/GmtRadio";
import { jkdksy, dkjcbd } from '@/api/secondLevelPage';
import {mapActions} from "vuex";
import { Dialog } from 'vant';

let retry=0 //第几次重次
let maxRetry=2//最大重试次数

export default {
  data () {
		return {
			listData: ''
		}
	},
	methods: {
    ...mapActions(['getGrxx']),
		checkClass () {
			this.$router.push('/wdbj')
		},
		punchCard (item) {
			this.$router.push(`/dkxx/${item}`)
    },
    viewMore () {
      this.$router.push('/dkjl')
    },
    xzcy () {
      this.$router.push(`/xzcy`)
    },
    deletes (item) {
      if (item.gx==='本人') {
        return
      }
      Dialog.confirm({
        title: '提示',
        message: '您确定解除绑定吗？'
      }).then(() => {
        this.$indicator.open()
        dkjcbd({
          id: item.id
        }).then (rps => {
          this.$indicator.close()
          if (rps.data.success) {
            this.changtoast('解除绑定成功')
            this.listData.dkry = this.listData.dkry.filter(val =>{
              return val.id != item.id
            })
          } else {
            this.changtoast(rps.data.message, 'error')
          }
        })
      }).catch(() => {
          this.$indicator.close()
      });
    },
    getListData () {
      jkdksy({
        pageSize: 10
      }).then (rps => {
        this.$indicator.close()
        if (rps.data.success) {
          this.listData = rps.data.content
        } else {
          if (rps.data.errorCode === '410') {
            this.$router.push('/ewm')
          } else {
            if (retry++<maxRetry) {
              this.$indicator.open('数据加载中')
              this.getListData()
            }else{
              this.changtoast(rps.data.message, 'error')
            }
          }
        }
      })
    }
  },
  created () {
    this.$indicator.open()
    this.getGrxx().then(grxx=>{
      this.$indicator.open('数据加载中')
      if(!grxx.hasWJ){
        this.$router.push('/ewm')
      }else{
        this.getListData()
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import "./style/jkdk.scss";
</style>
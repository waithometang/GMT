<template>
  <div class="xxbm">
    <div class="head">
        <van-search
            v-model="searchKey"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            >
            <template slot="action">
                <div @click="onSearch">搜索</div>
            </template>
            </van-search>
    </div>
    <div class="middle">
      <div class="middle-title">我的报考</div>
      <div class="middle-tab" v-for="(item, index) in list" :key="index" @click="viewDetails(item)">
        <div class="tab-left"><i></i></div>
        <div class="tab-right">
          <div class="right-head">
            <div class="head-left">{{item.xm}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.xb}}</div>
            <!-- <div class="head-right" @click="copyNew(item)">复制新增<i></i></div> -->
          </div>

          <div class="right-tab">应聘岗位:<span>{{item.gwmc}}</span></div>
          <div class="right-tab">职位代码:{{item.dm}}</div>
          <div class="right-tab">准考证号:<span v-if="item.bmbh">{{item.bmbh}}</span><span class="span_cor" v-else>(暂无准考证号)</span></div>
          <div class="right-base">
            <div class="base-left"><i></i> {{item.rq}}</div>
            <div class="base-right" v-if="item.sczt==='待审查'">审查中></div>
            <div class="base-right" v-else><span :class="item.scjg == '不通过' ? 'cor' : ''">审查{{item.scjg}}></span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Search} from "vant"
export default {
  data(){
    return {
      searchKey:'',
      list:[],
      showEndDialog:false,
      kssj:'',
      jssj:'',
      errorMes:'',
      zjhm:'',
    }
  },
  components:{
      'van-search':Search
  },
  methods: {
    onSearch(){
      this.getListData()
    },
    viewDetails(item){  
        this.$router.push('/zkbm/jbxx?m=v&bmid='+item.id)
    },
    closeFn(action,done) {
      if (action==='confirm') {
        if(!this.zjhm){
          this.errorMes='请输入证件号码'
          done(false)
          return
        }
        this.loading();
        this.$post('ybm/xxapi/IsInPBMD',{name:this.zjhm}).then(res => {
          this.closeLoading()
          if (res.data.success){
            if (res.data.content) {
              done()
              this.$router.push({name:'bmbzxxtxxx',params:{zjhm:this.zjhm}})
            }
            else this.errorMes='您未提交补报名申请，如有疑问请致电88282386咨询'
          }else{
            this.changtoast(res.data.message,'error')
          }
        })
        done(false)
      }else{
        done()
      }
    },
    getListData () {
      let _params={}
      if(this.searchKey) _params.search=this.searchKey
      _params.lb = 1
      this.$indicator.open('加载中...')
      this.$post('api/zkgl/wdbm',_params).then(rps=>{
        this.$indicator.close()
        if(rps.data.success){
          this.list= rps.data.content
        }else{
          this.changtoast(rps.data.message,'error')
        }
      })
    }
  },
  created () {
    this.getListData()
  }
}
</script>

<style lang='scss' scoped>
@import '../style/bm.scss';
</style>
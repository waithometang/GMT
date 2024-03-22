<template>
  <div class="publicVanList">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" offset="30" :immediate-check="false" :error.sync="error" error-text="请求失败，点击重新加载" @load="onLoad">
        <slot name="publicVanList" :data="listData"></slot>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Axios from '@/api/axios';

export default {
  data () {
    return {
      error: false,
      loading: false,
      finished: false,
      refreshing: false,
      pageIndex: 1,
      listData: [],
    }
  },
  props:{
    url:{
      type: String,
      required: true
    },
    pageSize:{
      type: Number,
      default: 10
    },
    parms:{
      type: Object
    },
    useSearch:{
      type: Boolean,
      default: true
    }
  },
  methods: {
    onLoad () {
      this.$indicator.open('数据加载中...')
      this.getlistData().then(rps => {
        this.$indicator.close()
        if (rps.data.success) {
          if (this.refreshing) {
            this.refreshing = false
          }
          let data = rps.data.content
          if (this.pageIndex === 1) this.listData = data
          else this.listData.push(...data)
          this.loading = false
          this.pageIndex++
          if (data.length < this.pageSize) {
            this.finished = true
          }
          this.listData = this.listData.filter(val => {
            return val != ''
          })
        } else {
          this.loading = false
          this.error = true
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    onRefresh () {
      if (this.loading) {
        return
      }
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      this.onLoad()
    },
    getlistData () {
      let url = this.url
      let _parms = {pageIndex: this.pageIndex, pageSize: this.pageSize, search: this.searchKey }
      let data = Object.assign(_parms,this.parms)
      return Axios({
        url,
        data
      })
    }
  },
  created () {
    this.onLoad()
  }
}
</script>

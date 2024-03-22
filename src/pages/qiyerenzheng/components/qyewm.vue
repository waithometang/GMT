<template>
  <div class="qyewm">
    <div class="qyewm_wraper" v-if="listData.length > 0">
      <div
        class="qyewm_item"
        v-for="(item, index) in listData"
        :key="index"
        @click="showErcode(item)"
      >
        <div class="qyewm_item_left">
          <img src="../img/icon.png" alt="" />
        </div>
        <div class="qyewm_item_right">
          <div class="qyewm_item_right_title">{{ item.qymc }}</div>
          <div class="qyewm_item_right_code">信用代码：{{ item.qydm }}</div>
          <div class="qyewm_item_right_cmp">企业部门：{{ item.bmmc }}</div>
          <div class="qyewm_item_right_date">
            <div class="qyewm_item_right_time">
              {{ item.fi_new_time | date }}
            </div>
            <div class="qyewm_item_right_detail">
              <img src="../img/ercode.png" alt="" />
              <span>二维码详情 ></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="nodata" v-else>
      <div class="img">
        <img src="../img/nodata.png" alt="" />
      </div>
      <div class="tip">暂无数据<br />请新增部门二维码</div>
    </div>
    <div class="but" @click="addErCode">新增部门二维码</div>
    <!-- 弹出框 -->
    <transition name="fade">
      <div class="overlay" v-show="showDialog">
        <div class="dialog">
          <div class="icon" @click="close">
            <img src="../img/close.png" alt="" />
          </div>
          <div class="title">请输入部门名称</div>
          <div class="ipt">
            <input type="text" v-model="iptVal" />
          </div>
          <div class="btn" @click="confirm">确定</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Getqyrzxx } from '@/api/secondLevelPage'
export default {
  filters: {
    date (val) {
      return new Date(val).toLocaleString()
    }
  },
  name: '',
  components: {

  },
  props: {

  },
  data () {
    return {
      listData: [],
      showDialog: false,
      iptVal: '',
      rzzt: ''
    };
  },
  computed: {
    id () {
      return parseInt(this.$route.params.id)
    }
  },
  watch: {

  },
  created () {
    this._getList()
    this._Getqyrzxx()
  },
  mounted () {

  },
  methods: {
    _getList () {
      this.$indicator.open()
      this.$post('api/qy/qyjzmList', {
        qyid: this.id
      }).then(res => {
        this.$indicator.close()
        if (res.data.success) {
          this.listData = res.data.content
        } else {
          this.changtoast(res.data.message, 'error')
        }
      })
    },
    showErcode (item) {
      let data = JSON.stringify(item)
      this.$router.push({
        path: '/qyewmxq',
        query: {
          data
        }
      })
      // 页面刷新数据会丢失
      // this.$router.push({
      //   name: 'qyewmxq',
      //   params: {
      //     data: item
      //   }
      // })
    },
    addErCode () {
      if (this.rzzt !== '已认证') {
        this.changtoast('企业认证中，请耐心等待！', 'error')
        return
      }
      this.showDialog = true
    },
    close () {
      this.showDialog = false
      this.iptVal = ''
    },
    confirm () {
      if (!this.iptVal.trim()) {
        this.changtoast('请输入部门名称', 'error')
        return
      }
      this.$indicator.open()
      this.$post('api/qy/qyscjzm', {
        qyid: this.id,
        bmmc: this.iptVal
      }).then(res => {
        this.$indicator.close()
        this.showDialog = false
        this.iptVal = ''
        if (res.data.success) {
          this.changtoast('添加部门成功')
          this._getList()
        } else {
          this.changtoast(res.data.message, 'error')
        }
      }).catch(err => {
        this.$indicator.close()
        this.changtoast(err)
      })
    },
    _Getqyrzxx () {
      this.$indicator.open("")
      Getqyrzxx({
        id: this.id
      }).then(rps => {
        this.$indicator.close()
        if (rps.data.success) {
          let data = rps.data.content
          this.rzzt = data.rzzt
        } else {
          this.changtoast(rps.data.message, "error")
        }
      })
    }
  },
};
</script>

<style scoped lang="scss">
@import '../style/qyewm.scss';
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

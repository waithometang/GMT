<template>
  <div class="apply">
    <div class="from">
      <div class="tab">
        <div class="tab_name">姓名:</div>
        <div class="tab_input"><input type="text" v-model="name" placeholder="请输入姓名"></div>
      </div>
      <div class="tab">
        <div class="tab_name">电话:</div>
        <div class="tab_input"><input type="Number" v-model="phone" placeholder="请输入联系电话"></div>
      </div>
    </div>
    <div class="base"><div class="but" @click="apply">签到</div></div>
  </div>
</template>

<script>
import { Ztqd } from '@/api/FNTApi'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      name: '',
      phone: '',
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    ...mapActions(['getGrxx']),
    getInfo () {
      this.getGrxx().then (val => {
        if (val.hasSM) {
          this.name = val.mz
        }
      })
    },
    apply () {
      if (!this.name) {
        this.changtoast('请输入姓名', 'error')
        return
      }
      if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
        this.changtoast('请输入正确联系电话', 'error')
        return
      }
      Ztqd({
        xm: this.name,
        hdid: this.id,
        lxdh: this.phone
      }).then (rps => {
        if (rps.data.success) {
          this.changtoast('报名成功')
          this.$router.go(-1)
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import './style/apply.scss';
</style>
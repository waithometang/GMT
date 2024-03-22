<template>
  <div class="apply">
    <div class="from">
      <div class="tab">
        <div class="tab_name">姓名:</div>
        <div class="tab_input"><input type="text" v-model="name" placeholder="请输入姓名"></div>
      </div>
      <div class="tab" v-if="isduble==1">
        <div class="tab_name">参加人数:</div>
        <div class="tab_input"><input type="Number" v-model="number" placeholder="请输入参加人数"></div>
      </div>
      <div class="tab">
        <div class="tab_name">电话:</div>
        <div class="tab_input"><input type="Number" v-model="phone" placeholder="请输入联系电话"></div>
      </div>
    </div>
    <div class="base"><div class="but" @click="apply">确认</div></div>
  </div>
</template>

<script>
import { Hdbm } from '@/api/FNTApi'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      name: '',
      phone: '',
      number: 1,
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    isduble () {
      return this.$route.params.isduble
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
      if (!this.number && isduble==1) {
        this.changtoast('请输入参加人数', 'error')
        return
      }
      Hdbm({
        xm: this.name,
        hdid: this.id,
        lxdh: this.phone,
        cjrs: this.number,
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
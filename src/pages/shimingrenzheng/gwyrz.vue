<template>
  <div class="gwyrz">
    <div class="input_list">
      <div class="input_tab">
        <div class="input_tab_name">个人头像:</div>
        <div class="input_tab_image"><img :src="headPortrait" alt=""></div>
      </div>
      <!-- <div class="input_tab">
        <div class="input_tab_name">昵称:</div>
        <div class="input_tab_input"><input type="text" placeholder="请填写昵称"></div>
      </div> -->
      <div class="input_tab">
        <div class="input_tab_name">身份证:</div>
        <div class="input_tab_input"><input v-model="sfz" readonly="readonly" type="text" placeholder="请填写身份证号码"></div>
      </div>
      <div class="input_tab">
        <div class="input_tab_name">姓名:</div>
        <div class="input_tab_input"><input v-model="name" readonly="readonly" type="text" placeholder="请填写姓名"></div>
      </div>
      <!-- <div class="input_tab">
        <div class="input_tab_name">姓别:</div>
        <div class="input_tab_input"><input v-model="sex" readonly="readonly" type="text" placeholder="请填写姓别"></div>
      </div> -->
      <div class="input_tab">
        <div class="input_tab_name">手机号:</div>
        <div class="input_tab_input"><input v-model="sjh" readonly="readonly" type="text" placeholder="请填写手机号"></div>
      </div>
      <div class="input_tab">
        <div class="input_tab_name">所属部门:</div>
        <div class="input_tab_input"><input v-model="ssbm" readonly="readonly" type="text" placeholder="请填写所属部门"></div>
      </div>
      <div class="input_tab">
        <div class="input_tab_name">职务:</div>
        <div class="input_tab_input"><input v-model="zw" readonly="readonly" type="text" placeholder="请填写职务"></div>
      </div>
    </div>
    <div class="affirmInfo"  @click="affirmInfo">
      <div class="affirmInfo_icon"><img :src="affirmInfoState ? '/static/affirmInfo_x.png' : '/static/affirmInfo.png' " alt=""></div>
      <div class="affirmInfo_name">确认是否本人信息</div>
    </div>
    <div class="content">
      <div class="content_state">
        <div class="name">认证状态</div>
        <div class="name">{{rzzt}}</div>
      </div>
      <div class="state_info">说明：请您确定提交的信息真实有效，平台将于公安部门提供的信息进行比对确认。</div>
    </div>
    <div class="but">
      <div class="public_but" @click="submit" v-if="rzzt != '已认证'">确认提交</div>
    </div>
  </div>
</template>

<script>
import { GwySmrzSq } from '@/api/secondLevelPage'
import { RzxxDetail } from "@/api/Member";
import { storage } from '@/js/until'
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      affirmInfoState: false,
      sfz: '',
      name: '',
      sex: '',
      sjh: '',
      ssbm: '',
      zw: '',
      rzzt: '未认证'
    }
  },
  computed: {
    infoData () {
      return this.$store.state.inFoData
    },
    headPortrait () {
      return storage.fetch('userimages').data
    },
  },
  methods: {
    ...mapActions(['getGrxx']),
    affirmInfo () {
      if (this.rzzt === '已认证') {
        return
      }
      this.affirmInfoState = !this.affirmInfoState
    },
    submit () {
      if (!this.sfz) {
        this.changtoast('请输入身份证', 'warning')
        return
      }
      if (!this.name) {
        this.changtoast('请输入真实姓名', 'warning')
        return
      }
      if (!this.sex) {
        this.changtoast('请输入性别', 'warning')
        return
      }
      if (!this.sjh) {
        this.changtoast('请输入手机号码', 'warning')
        return
      }
      if (!this.ssbm) {
        this.changtoast('请输入所属部门', 'warning')
        return
      }
      if (!this.zw) {
        this.changtoast('请输入职务', 'warning')
        return
      }
      if (!this.affirmInfoState) {
        this.changtoast('请确认是否是本人', 'warning')
        return
      }
      this.$indicator.open()
      GwySmrzSq ({
        Name: this.name,
        Tel: this.sjh,
        Identity: this.sfz,
        FileId: this.infoData.FileId,
        bm: this.ssbm,
        zw: this.zw
      }).then (rps => {
        this.$indicator.close()
        if (rps.data.success) {
          this.changtoast('提交成功')
          this.rzzt = rps.data.content.rzzt
          this.getGrxx(true)
          this.$router.push('/index')
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    getInfo () {
      this.$indicator.open()
      RzxxDetail ().then (rps => {
        this.$indicator.close()
        if (rps.data.success) {
          let data = rps.data.content
          this.sfz = data.sfzhm
          this.name = data.name
          this.sex = data.sex
          this.sjh = data.mobile
          this.ssbm = data.bm
          this.zw = data.zw 
          this.rzzt = data.rzzt
          data.rzzt === '已认证' ? this.affirmInfoState = true : this.affirmInfoState = false
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  },
  created () {
    this.getGrxx().then (val => {
      this.rzzt = val.smrzzt
      if (val.hasSM) { // 实名认证过
        this.getInfo ()
      } else { // 未实名
        if (this.infoData) {
          this.sfz = this.infoData.sfz
          this.name = this.infoData.name
          this.sex = this.infoData.sex
          this.sjh = this.infoData.sjh
          this.ssbm = this.infoData.bm
          this.zw = this.infoData.zw
        } else {
          this.$router.replace('/smrz')
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import './style/gwyrz.scss';
</style>
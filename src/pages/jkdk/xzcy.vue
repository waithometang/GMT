<template>
  <div class="ewm">
    <div class="ewm_pages">
      <div class="ewm_hread">
        <p>
          基本信息
          <!-- <span class="smallRed">(已通过认证)</span> -->
        </p>
      </div>
      <div class="ewm_item">
        <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>
        <input v-model="thisData.xm" type="text" placeholder="请输入您的家庭成员姓名" />
      </div>
      <div class="ewm_item">
        <span>身份证号</span>
        <input v-model="thisData.sfzh" type="text" placeholder="请输入您的家庭成员身份证号" />
      </div>
      <!-- <div class="ewm_item">
        <span>关联身份证号</span>
        <input v-model="thisData.glzh" type="text" placeholder="请输入关联身份证号" />
      </div> -->
      <div class="ewm_item">
        <span>关系</span>
        <input type="text" v-model="thisData.glgx" readonly="readonly" placeholder="请选择关联关系" />
      </div>
    </div>
    <div class="ewm_pages">
      <div class="qksm">
        <textarea v-model="thisData.bz" placeholder="请输入其他情况说明"></textarea>
      </div>
    </div>
    <div class="ewm_button" @click="submit">添加</div>
    <GmtDownMenu :actions="actions" v-model="thisData.glgx" :show="show" @setActions="setActions"/>
  </div>
</template>
<script>
import GmtDownMenu from '@/components/GmtDownMenu';
import { adddkry } from '@/api/secondLevelPage';
export default {
  data() {
    return {
      actions: [{name: '家属'}],
      show: false,
      thisData:{
        xm: '',
        sfzh: '',
        // glzh: '',
        glgx:'家属',
        bz: '',
      },
    };
  },
  components: {
    GmtDownMenu
  },
  methods: {
    setActions () {
      this.show = !this.show
    },
    submit () {
      let data = [
        {name: 'name', data: this.thisData.xm, msg: '请输入姓名'},
        {name: 'ckad', data: this.thisData.sfzh, msg: '请输入您的身份证号'},
        // {name: 'ckad', data: this.thisData.glzh, msg: '请输入关联身份证号'},
        {name: 'name', data: this.thisData.glgx, msg: '请选择关联关系'},
      ]
      if (this.checkForm (data)) {
        return
      }
      this.$indicator.open()
      adddkry(this.thisData).then (rps => {
        this.$indicator.close()
        if (rps.data.success) {
          this.changtoast('提交成功')
          this.$router.push('/jkdk')
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../ewm/style/index.scss";
.ewm {
  height: 100vh;
  overflow: hidden;
  padding: 0px 0 0 0;
}
</style>
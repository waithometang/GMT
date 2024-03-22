<template>
  <div class="amendphone">
    <div class="phone">
      <div class="name">手机号码:</div>
      <div class="content"><input v-model="phone" type="Number" placeholder="请输入新手机号码"></div>
    </div>
    <div class="base">
      <div class="but" @click="affirm">确认</div>
    </div>
  </div>
</template>

<script>
import { xggrxx } from '@/api/secondLevelPage'
export default {
  data () {
    return {
      phone: '',
    }
  },
  methods: {
    affirm () {
      xggrxx ({
        mobile: this.phone
      }).then (rps => {
        if (rps.data.success) {
          this.changtoast('修改成功')
          this.$router.replace('/Certification')
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.amendphone {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f2f2f2;
  overflow: hidden;
  .phone {
    height: 90px;
    background: #ffffff;
    display: flex;
    align-items: center;
    padding: 5px 20px;
    .name {
      flex: 0 0 auto;
      font-size:32px;
      font-weight:400;
      color:rgba(0,0,0,1);
    }
    .content{
      flex: 1;
      margin-left: 20px;
      input {
        height: 90px;
        width: 100%;
      }
    }
  }
  .base {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    .but {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80px;
      overflow: hidden;
      zoom: 1;
      background: rgba(24, 130, 214, 1);
      color: #ffffff;
      font-size: 30px;
      border-radius: 15px;
    }
  }
}
</style>
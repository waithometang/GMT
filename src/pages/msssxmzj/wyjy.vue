<template>
  <div class="wyjy">
    <van-form @submit="handleSubmit">
      <div class="line"><span class="col">*</span>项目名称：</div>
      <van-field
        v-model="formData.xmmc"
        label=""
        placeholder="请输入项目名称 "
        :readonly="isReadOnly"
        :rules="[{ required: true, message: '请输入项目名称' }]"
      />
      <div class="line"><span class="col">*</span>项目实施内容：</div>
      <van-field
        v-model="formData.ssnr"
        rows="10"
        autosize
        type="textarea"
        maxlength="1000"
        placeholder="请输入项目实施内容 "
        show-word-limit
        :readonly="isReadOnly"
        :rules="[{ required: true, message: '请输入项目实施内容' }]"
      />
      <div class="bg-line"></div>
      <div class="line"><span class="col">*</span>理由及依据：</div>
      <van-field
        v-model="formData.lyyj"
        rows="10"
        autosize
        type="textarea"
        maxlength="1000"
        placeholder="请输入理由及依据 "
        show-word-limit
        :readonly="isReadOnly"
        :rules="[{ required: true, message: '请输入理由及依据' }]"
      />
      <div class="bg-line"></div>
      <van-field
        v-model="formData.jyr"
        label="建议人"
        placeholder="请输入您的姓名"
        :readonly="isReadOnly"
      />
      <van-field
        v-model="formData.lxfs"
        label="联系方式"
        placeholder="请输入您的联系电话"
        :readonly="isReadOnly"
      />
      <van-field
        v-model="formData.bz"
        label="备注"
        placeholder="请输入备注"
        :readonly="isReadOnly"
      />
      <div class="submit" v-if="showBtn">
        <van-button type="primary" color="#379DEA" class="button">
          <span>提交意见</span>
        </van-button>
      </div>
    </van-form>
    <div class="back-btn" v-if="!showBtn" @click="handleBack">返回</div>
  </div>
</template>

<script>
export default {
  props: {
    wdjy: {
      type: Object
    }
  },
  data() {
    return {
      formData: {},
      isReadOnly: false, // 是否只读
      showBtn: true // 显示按钮
    }
  },
  created() {
    this.formData = this.wdjy
    if (this.formData.id) {
      this.showBtn = false
      this.isReadOnly = true
    }
  },
  methods: {
    handleSubmit() {
      let urlImg = require('./images/warning.png')
      let msg = `<img style="width: 50px;height: 50px;" src="${urlImg}" /><p style="font-weight: bold;font-size: 16px;">
      提交后不可修改<br/>是否确认提交项目建议</p>`
      this.$dialog
        .confirm({
          message: msg,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        .then(() => {
          this.handleConfirm()
        })
        .catch(err => {
          console.log('点击了取消')
        })
    },
    handleConfirm() {
      this.$indicator.open('加载中...')
      this.$post('/api/gcjd/mssxtj', this.formData).then(res => {
        this.$indicator.close()
        if (res.data.success) {
          // 跳到我的建议
          this.$emit('changeState', 3)
        } else {
          this.changtoast(res.data.message, 'error')
        }
      })
    },
    handleBack() {
      this.$emit('backFn')
    }
  }
}
</script>

<style scoped lang="scss">
@import './style/wyjy.scss';
</style>
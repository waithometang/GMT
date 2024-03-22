<template>
  <div class="issueFrom">
    <form action="#">
      <div class="main-bottom">
        <div class="input-all">
          <div class="icon">
            <img src="/static/FNT_IMAGES/type.png" alt />
          </div>
          <select  class="input-nor select-nor" @click="onselected" :class="{'selected' : selected}" v-model="zxlx">
            <option value="" style="display: none;" disabled selected >请选择咨询类型</option>
            <option value="法律咨询">法律咨询</option>
            <option value="心理咨询">心理咨询</option>
            <option value="家庭教育">家庭教育</option>
          </select>
          <div class="icon-right">  
            <img src="/static/FNT_IMAGES/xl.png" alt />
          </div>
        </div>
      </div>
      <div class="main-bottom">
        <div class="input-all">
          <div class="icon">
            <img src="/static/FNT_IMAGES/mane.png" alt />
          </div>
          <input type="text" v-model="zxry" name id class="input-nor" value placeholder="请输入您的真实姓名" />
        </div>
      </div>
      <div class="main-bottom">
        <div class="input-all">
          <div class="icon">
            <img src="/static/FNT_IMAGES/phone.png" alt />
          </div>
          <input type="phone" v-model="lxdh" name id class="input-nor" value placeholder="请输入您的联系方式" maxlength="11" />
        </div>
      </div>
      <div class="main-bottom">
        <div class="input-all">
          <div class="icon">
            <img src="/static/FNT_IMAGES/topic.png" alt />
          </div>
          <input type="text" v-model="zxzt" name id class="input-nor" value placeholder="请输入咨询主题" />
        </div>
      </div>
      <div class="textarea-main">
        <div class="input-all-text">
          <div class="icon-text">
            <img src="/static/FNT_IMAGES/content.png" alt />
          </div>
          <textarea placeholder="请输入咨询内容... " maxlength="200" @input="descInput" v-model="zxnr" class="textare-body-nor" />
          <span class="span-text">{{txtVal}}/200</span>
        </div>
      </div>
      <div  class="sqyy-button" @click="sqyy">提交咨询</div>
    </form>
  </div>
</template>

<script>
import { Tjyyzx } from '@/api/FNTApi'
export default {
  data() {
    return {
    zxlx:'',
    zxry:'',
    lxdh:'',
    zxzt:'',
    zxnr:'',
    pickerValue: "",
    chickTime:"",
    startDate: new Date(),
    txtVal: 0,
    fanhui:1,
    selected:true,
    istrue:"false",
    types:[{id:1,name:"法律咨询"},{id:2,name:"心理咨询"},{id:3,name:"家庭教育"}]
    };
  },
  methods: {
    onselected(){
      this.selected=false
    },
    descInput(){
      this.txtVal = this.zxnr.length;
    },
    sqyy () {
      if (!this.zxlx) {
        this.changtoast('请选择咨询类型', 'error')
        return
      }
      if (!this.zxry) {
        this.changtoast('请输入咨询人员', 'error')
        return
      }
      if (!this.lxdh) {
        this.changtoast('请输入联系电话', 'error')
        return
      }
      if (!this.zxzt) {
        this.changtoast('请输入咨询主题', 'error')
        return
      }
      if (!this.zxnr) {
        this.changtoast('请输入咨询内容', 'error')
        return
      }
      let that = this
      this.MessageBox({
        content: '是否确认提交咨询',
        success: function () {
          that.submit()
        },
        failStata: true
      })
    },
    submit () {
      Tjyyzx ({
        zxlx:this.zxlx,
        zxry:this.zxry,
        lxdh:this.lxdh,
        zxzt:this.zxzt,
        zxnr:this.zxnr,
        yysj: this.chickTime
      }).then (rps => {
        if (rps.data.success) {
          this.changtoast('提交成功')
          this.$emit('childFn')
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../style/issueFrom.scss';
</style>
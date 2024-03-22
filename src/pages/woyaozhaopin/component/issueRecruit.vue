<template>
  <div class="issueRecruit">
    <div class="input_list_tab">
      <div class="input_list_tab_name">公司名称:</div>
      <div class="input_list_tab_input" @click="setSelectValue(0)"><input  type="text" v-model="gsmc" placeholder="请选择公司名称" readonly="readonly"></div>
      <div class="input_list_tab_icon" @click="setSelectValue(0)">
        <img src="/static/select_tab.png" alt="">
      </div>
    </div>
    <div class="input_list_tab">
      <div class="input_list_tab_name">职位名称:</div>
      <div class="input_list_tab_input"><input  type="text" v-model="zwmc" placeholder="请输入职位名称 (必填)"></div>
    </div>
    <div class="input_list_tab">
      <div class="input_list_tab_name">工作性质:</div>
      <div class="input_list_tab_input" @click="setSelectValue(1)"><input  type="text" v-model="gzxz" placeholder="请选择工作性质" readonly="readonly"></div>
      <div class="input_list_tab_icon" @click="setSelectValue(1)">
        <img src="/static/select_tab.png" alt="">
      </div>
    </div>
    <div class="input_list_tab">
      <div class="input_list_tab_name">工作地址:</div>
      <div class="input_list_tab_input"><input  v-model="gzdz" type="text" placeholder="请输入工作地址 (必填)"></div>
    </div>
    <div class="input_list_tab">
      <div class="input_list_tab_name">月薪范围:</div>
      <div class="input_list_tab_input" @click="setSelectValue(4)"><input  v-model="yxfw" type="text" placeholder="请选择月薪范围 (必填)" readonly="readonly"></div>
      <div class="input_list_tab_icon" @click="setSelectValue(4)">
        <img src="/static/select_tab.png" alt="">
      </div>
    </div>
    <div class="input_list_tab">
      <div class="input_list_tab_name">最低学历:</div>
      <div class="input_list_tab_input" @click="setSelectValue(2)"><input  v-model="zdxl" type="text" placeholder="请选择最低学历" readonly="readonly"></div>
      <div class="input_list_tab_icon" @click="setSelectValue(2)">
        <img src="/static/select_tab.png" alt="">
      </div>
    </div>
    <div class="input_list_tab">
      <div class="input_list_tab_name">工作年限:</div>
      <div class="input_list_tab_input" @click="setSelectValue(3)"><input  v-model="gznx" type="text" placeholder="请选择工作年限" readonly="readonly"></div>
      <div class="input_list_tab_icon" @click="setSelectValue(3)">
        <img src="/static/select_tab.png" alt="">
      </div>
    </div>
    <div class="input_list_tab input_list_tab_start">
      <div class="input_list_tab_name">职位描述:</div>
      <div class="input_list_tab_textarea"><textarea  v-model="zwms" placeholder="请输入职位描述"></textarea></div>
    </div>
    <div class="input_list_tab">
      <div class="input_list_tab_name">招聘人数:</div>
      <div class="input_list_tab_input"><input  v-model="zprs" type="text" placeholder="请输入招聘人数 (必填)"></div>
    </div>
    <div class="input_list_tab">
      <div class="input_list_tab_name">联系人:</div>
      <div class="input_list_tab_input"><input  v-model="lxr" type="text" placeholder="请输入联系人 (必填)"></div>
    </div>
    <div class="input_list_tab">
      <div class="input_list_tab_name">联系方式:</div>
      <div class="input_list_tab_input"><input  v-model="lxfs" type="text" placeholder="请输入联系方式 (必填)"></div>
    </div>
    <!-- <div class="input_list_tab">
      <div class="input_list_tab_name">面试地址:</div>
      <div class="input_list_tab_input"><input  v-model="msdz" type="text" placeholder="请输入面试地址 (必填)"></div>
    </div> -->
    <div class="tab_but">
      <div class="public_but" @click="issueRecruit">发布招聘</div>
    </div>
    <mt-popup v-model="popupVisible" position="bottom">
      <div class="affirm" @click="clickAffirm">确认</div>
      <mt-picker :slots="slots" :visibleItemCount="3" valueKey="name" @change="onValuesChange"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import { Getqyzpfb, GetyrzqyList, qbzpxx } from '@/api/secondLevelPage'
export default {
  data () {
    return {
      popupVisible: false,
      qyListData: '',
      ValuesChange: '',
      slots: [
        {
          flex: 1,
          values: [],
          textAlign: 'center',
          defaultIndex: 1,
          className: 'picker_list',
        }
      ],
      selectState: 0,
      gsmc: '', // 公司名称
      gsid: '', // 公司名称对应id
      zwmc: '', // 职位名称
      gzxz: '', // 工作性质
      gzdz: '', // 工作地址
      yxfw: '', // 月薪范围
      zdxl: '', // 最低学历
      gznx: '', // 工作年限
      zwms: '', // 职位描述
      zprs: '', // 招聘人数
      lxr: '',  // 联系人
      lxfs: '', // 联系方式
      msdz: '',  // 面试地址
      qbzpxxData: ''
    }
  },
  methods: {
    setSelectValue (item) {
      switch (item) {
        case 0: // 公司名称
          if (this.qyListData.length <= 1) {
            return
          }
          this.slots[0].values = this.qyListData
          break;
        case 1: // 工作性质
          this.slots[0].values = this.filtrationData(this.qbzpxxData.gzxz)
          break;
        case 2: // 最低学历
          this.slots[0].values = this.filtrationData(this.qbzpxxData.xllb)
          break;
        case 3: // 工作年限
          this.slots[0].values = this.filtrationData(this.qbzpxxData.gznx)
          break;
        case 4: // 月薪范围
          this.slots[0].values = this.filtrationData(this.qbzpxxData.yxfw)
          break;
        default:
        break;
      }
      this.selectState = item
      this.popupVisible = true
    },
    // 过滤数据
    filtrationData (item) {
      let data = item.split(";")
      let dome = []
      for (let index = 0; index < data.length; index++) {
        if (data[index]) {
          dome.push({name: data[index]})
        }
      }
      return dome
    },
    // 发布招聘
    issueRecruit () {
      if (!this.gsmc && !this.gsid) {
        this.changtoast('请选择公司名称', 'warning')
        return
      }
      if (!this.zwmc) {
        this.changtoast('请输入职位名称', 'warning')
        return
      }
      if (!this.gzxz) {
        this.changtoast('请选择工作性质', 'warning')
        return
      }
      if (!this.gzdz) {
        this.changtoast('请输入工作地址', 'warning')
        return
      }
      if (! this.yxfw) {
        this.changtoast('请输入月薪范围', 'warning')
        return
      }
      if (!this.zprs) {
        this.changtoast('请输入招聘人数', 'warning')
        return
      }
      if (!this.lxr) {
        this.changtoast('请输入联系人', 'warning')
        return
      }
      if (!this.lxfs) {
        this.changtoast('请输入联系方式', 'warning')
        return
      }
      // if (!this.msdz){
      //   this.changtoast('请输入面试地址', 'warning')
      //   return
      // }
      this.$indicator.open("")
      Getqyzpfb ({
        qyrzId:  this.gsid,
        zwmc:  this.zwmc,
        gzxz:  this.gzxz,
        gzdz:  this.gzdz,
        yxfw:  this.yxfw,
        zdxl:  this.zdxl,
        gznx:  this.gznx,
        zwms:  this.zwms,
        zprs:  this.zprs,
        lxr:  this.lxr,
        lxdh:  this.lxfs,
        // mxdz:  this.msdz,
      }).then(rps => {
        this.$indicator.close()
        if (rps.data.success) {
          this.changtoast('发布成功')
          this.$emit('setTab', 0)
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    // 获取企业认证列表
    getListData () {
      GetyrzqyList ().then (rps => {
        if (rps.data.success) {
          this.qyListData = rps.data.content
          if (this.qyListData.length === 1) {
            this.gsmc = this.qyListData[0].name
            this.gsid = this.qyListData[0].id
          }
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    // 选择器事件
    onValuesChange (picker, values) {
      this.ValuesChange = values[0]
    },
    // 选择器确认事件
    clickAffirm () {
      switch (this.selectState) {
        case 0:
          this.gsmc = this.ValuesChange.name
          this.gsid = this.ValuesChange.id
          break;
        case 1:
          this.gzxz = this.ValuesChange.name
          break;
        case 2:
          this.zdxl = this.ValuesChange.name
          break;
        case 3:
          this.gznx = this.ValuesChange.name
          break;
        case 4: 
        this.yxfw = this.ValuesChange.name
        break;
        default:
        break;
      }
      this.popupVisible = false
    },
    Getwdzpfbxx () {
      qbzpxx ().then(rps => {
        if (rps.data.success) {
          this.qbzpxxData = rps.data.content
        } else {
          tihs.changtoast(rps.data.message, 'error')
        }
      })
    }
  },
  created () {
    this.getListData()
    this.Getwdzpfbxx()
  }
}
</script>
<style lang="scss" scoped>
@import '../style/issueRecruit.scss';
.issueRecruit /deep/ .picker_list {
  .picker-slot-wrapper {
    width: 750px;
    .picker-item {
      font-size:34px;
      font-weight:bold;
    }
    .picker-selected {
      color:rgba(40,40,40,1);
    }
  }
}
</style>
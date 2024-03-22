<template>
  <div class="attestationFrom">
    <div class="listFrom">
      <div class="listFrom_name">企业信息</div>
      <div class="listFrom_image">
        <div
          class="listFrom_image_icon"
          v-if="!yyzz_url"
          @click="uploadingImage(1)"
        >
          <img src="/static/listFrom_image_icon.png" alt="" />
        </div>
        <div class="listFrom_image_name" v-if="!yyzz_url">
          请上传企业营业执照
        </div>
        <div @click="uploadingImage(1)" class="listFrom_image_tab">
          <img
            class="listFrom_image_url"
            v-if="yyzz_url"
            :src="yyzz_url"
            alt=""
          />
        </div>
      </div>
      <div class="listFrom_input">
        <div class="listFrom_input_tab">
          <div class="listFrom_input_tab_name">信用代码:</div>
          <div class="listFrom_input_tab_input">
            <input v-model="xydm" type="text" placeholder="统一社会信用代码" />
          </div>
        </div>
        <div class="listFrom_input_tab">
          <div class="listFrom_input_tab_name">企业名称:</div>
          <div class="listFrom_input_tab_input">
            <input v-model="qymc" type="text" placeholder="请输入企业名称" />
          </div>
        </div>
        <div class="listFrom_input_tab">
          <div class="listFrom_input_tab_name">法人代表:</div>
          <div class="listFrom_input_tab_input">
            <input v-model="frdb" type="text" placeholder="请输入法人名称" />
          </div>
        </div>
        <div class="listFrom_input_tab">
          <vant-selector
            v-model="sflx"
            label-width="110px"
            :columns="[
              '居民身份证',
              '居民身份证(香港、澳门、台湾)',
              '特别行政区护照',
              '外国(地区)护照',
              '中国护照',
              '回乡证',
              '警官证',
              '军官证',
              '其他'
            ]"
            label="法人证件类型："
            :require="false"
          />
        </div>

        <div class="listFrom_input_tab">
          <div class="listFrom_input_tab_name">法人证件号码:</div>
          <div class="listFrom_input_tab_input">
            <input
              v-model="qydz"
              type="text"
              placeholder="请输入法人证件号码"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="listFrom listFrommargin">
      <div class="listFrom_name">我的信息<span>(仅需确认，无需填写)</span></div>
      <!-- <div class="listFrom_image">
        <div class="listFrom_image_icon" v-if="!sfz_url" @click="uploadingImage(2)">
          <img src="/static/listFrom_image_icon.png" alt="">
        </div>
        <div class="listFrom_image_name" v-if="!sfz_url">请上传身份证正面</div>
        <div @click="uploadingImage(2)" class="listFrom_image_tab">
          <img  class="listFrom_image_url" v-if="sfz_url" :src="sfz_url" alt="">
        </div>
      </div> -->
      <div class="listFrom_input">
        <div class="listFrom_input_tab">
          <div class="listFrom_input_tab_name">证件号码:</div>
          <div class="listFrom_input_tab_input">
            <input
              v-model="sfzhm"
              type="text"
              readonly
              placeholder="公民身份证号码"
            />
          </div>
        </div>
        <div class="listFrom_input_tab">
          <div class="listFrom_input_tab_name">姓名:</div>
          <div class="listFrom_input_tab_input">
            <input type="text" v-model="xm" readonly placeholder="请输入姓名" />
          </div>
        </div>
        <!-- <div class="listFrom_input_tab">
          <div class="listFrom_input_tab_name">性别:</div>
          <div class="listFrom_input_tab_input" @click="setSelectValue">
            <input
              type="text"
              v-model="sex"
              placeholder="请选择性别"
              readonly="readonly"
            />
          </div>
        </div> -->
        <!-- <div class="listFrom_input_tab">
          <div class="listFrom_input_tab_name">家庭地址:</div>
          <div class="listFrom_input_tab_input">
            <input
              type="text"
              v-model="addr"
              placeholder="请输入家庭住址"
            />
          </div>
        </div> -->
        <div class="listFrom_input_tab">
          <div class="listFrom_input_tab_name">联系电话:</div>
          <div class="listFrom_input_tab_input">
            <input
              type="text"
              v-model="tel"
              readonly
              placeholder="请输入联系电话"
            />
          </div>
        </div>
        <!-- <div class="listFrom_input_tab" v-if="!rzzt">
          <div class="listFrom_input_tab_name">短信验证码:</div>
          <div class="listFrom_input_tab_input">
            <input type="text" v-model="code" placeholder="请输入验证码" />
          </div>
          <div class="listFrom_input_tab_note" @click="GetphoneCode()">
            {{ codeTime === 0 ? '发送验证码' : codeTime + 's重发' }}
          </div>
        </div> -->
        <div class="listFrom_input_tab" v-if="rzzt">
          <div class="listFrom_input_tab_name">认证状态:</div>
          <div class="listFrom_input_tab_input">
            <input type="text" v-model="rzzt" readonly />
          </div>
        </div>
      </div>
    </div>
    <div class="remark" v-if="!rzzt">
      <div>
        <van-checkbox v-model="checked" shape="square"></van-checkbox>
      </div>
      <div class="tips" @click="selectCheck">
        本人为绑定企业的负责人/员工，并遵守“高明通”平台管理规定。
      </div>
    </div>
    <div class="but" v-if="!rzzt" @click="submit">马上验证</div>
    <div class="but" @click="unbound" v-else>解除绑定</div>
    <!-- <div class="btn_wraper" v-else>
      <div class="btn_cancel" @click="unbound">解除绑定</div>
      <div class="btn_code" @click="showEwm">生成企业二维码</div>
    </div> -->
    <mt-popup v-model="popupVisible" position="bottom">
      <div class="affirm" @click="clickAffirm">确认</div>
      <mt-picker
        :slots="slots"
        :visibleItemCount="3"
        valueKey="name"
        @change="onValuesChange"
      ></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import { Getqyrzsq, Getqyrzxx, GetSendCode, Getjcbd } from '@/api/secondLevelPage'
import { waChatDisposeImgaes } from '@/js/disposeImgaes'
import { GetMediaToMainId, IdCardOrcById, Bizlicense } from "@/api/WaChatApi"
import { GetWechatConfig } from "@/api/GetWechatConfig"
import { mapActions } from "vuex"
import { CheckForm } from '@/js/checkForm'

export default {
  computed: {
    state () {
      return this.$route.params.id
    },
    type () {
      return this.$route.query.type
    },
    // isReadonly () {
    //   return this.$route.params.id ? true : false
    // }
  },
  data () {
    return {
      checked: false, // 选择承诺书
      yyzz_url: '',
      xydm: '',
      qymc: '',
      frdb: '',
      qydz: '',
      // sfz_url: '',
      sfzhm: '',
      xm: '',
      // sex: '',
      // addr: '',
      tel: '',
      // code: '',
      loading: false,
      // codeTime: 0,
      rzzt: '',
      WaChatConfigData: '',
      popupVisible: false,
      ValuesChange: '',
      slots: [
        {
          flex: 1,
          values: [{ name: '男' }, { name: '女' }],
          textAlign: 'center',
          defaultIndex: 1,
          className: 'picker_list',
        }
      ],
      sflx: '居民身份证'
    }
  },
  methods: {
    ...mapActions(['getGrxx']),
    // 显示企业二维码
    showEwm () {
      this.$router.push('/qyewm/1')
    },
    selectCheck () {
      this.checked = !this.checked
    },
    // 验证字段
    verificationVaule () {
      if (!this.yyzz_url) {
        this.changtoast('请上传企业营业执照', 'warning')
        return true
      }
      if (!this.xydm) {
        this.changtoast('请输入信用代码', 'warning')
        return true
      }
      if (!this.qymc) {
        this.changtoast('请输入企业名称', 'warning')
        return true
      }
      if (!this.frdb) {
        this.changtoast('请输入法人代表', 'warning')
        return true
      }
      if (!this.qydz) {
        this.changtoast('请输入法人证件号码', 'warning')
        return true
      }
      // if (!this.sfz_url) {
      //   this.changtoast('请上传身份证', 'warning')
      //   return true
      // }
      if (!this.sfzhm) {
        this.changtoast('请输入身份证号码', 'warning')
        return true
      }
      if (!this.xm) {
        this.changtoast('请输入姓名', 'warning')
        return true
      }
      // if (!this.addr) {
      //   this.changtoast('请输入家庭住址', 'warning')
      //   return true
      // }
      if (!this.tel) {
        this.changtoast('请输入联系电话', 'warning')
        return true
      }
      // if (!this.code) {
      //   this.changtoast('请输入短信验证码', 'warning')
      //   return true
      // }
    },
    // 提交信息
    submit () {
      if (this.verificationVaule()) {
        return
      }
      if (this.sflx === '居民身份证') {
        const IsForm = CheckForm([
          { data: this.qydz, name: 'ckad', msg: '请输入正确的法人身份证号码' },
        ])
        if (IsForm) {
          return
        }
      }

      if (!this.checked) {
        this.changtoast('请勾选承诺书', 'error')
        return
      }
      this.$indicator.open("")
      Getqyrzsq({
        yyzz_url: this.yyzz_url,
        xydm: this.xydm,
        qymc: this.qymc,
        frdb: this.frdb,
        qydz: this.qydz,
        // sfz_url: this.sfz_url,
        sfzhm: this.sfzhm,
        xm: this.xm,
        // sex: this.sex,
        // addr: this.addr,
        tel: this.tel,
        zjlx: this.sflx
        // code: this.code,
      }).then(rps => {
        this.$indicator.close()
        if (rps.data.success) {
          this.changtoast('申请成功')
          if (rps.data.content.isPass) {
            this.getGrxx(true)
            if (this.type === 1) { // 企业招聘
              this.$router.replace(`/qyzp`)
            } else if (this.type === 2) {
              this.$router.replace(`/qyxc`)
            } else {
              // this.$router.replace('/index')
              this.$router.back()
            }
          } else {
            // this.$router.replace('/index')
            this.$router.back()
          }
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    // 获取详情
    _Getqyrzxx () {
      this.$indicator.open("")
      Getqyrzxx({
        id: this.state
      }).then(rps => {
        this.$indicator.close()
        if (rps.data.success) {
          let data = rps.data.content
          this.yyzz_url = data.yyzz_url
          this.xydm = data.xydm
          this.qymc = data.qymc
          this.frdb = data.frdb
          this.qydz = data.qydz
          // this.sfz_url = data.sfz_url,
          this.sfzhm = data.sfzhm
          this.xm = data.xm
          // this.sex = data.sex
          // this.addr = data.addr
          this.tel = data.tel
          // this.code = data.code
          this.rzzt = data.rzzt
        } else {
          this.changtoast(rps.data.message, "error")
        }
      })
    },
    // 解除绑定
    unbound () {
      Getjcbd({
        id: this.state
      }).then(rps => {
        if (rps.data.success) {
          this.$router.push(`/qyrz`)
          this.changtoast('解除成功')
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    // 获取短信验证码
    // GetphoneCode () {
    //   if (!this.tel) {
    //     this.changtoast('请输入手机号码', 'warning')
    //     return
    //   }
    //   if (this.codeTime > 0) {
    //     return
    //   }
    //   this.codeTime = 60
    //   GetSendCode({
    //     mobile: this.tel,
    //     smsType: 1
    //   }).then(rps => {
    //     if (rps.data.success) {
    //       let dome = setInterval(() => {
    //         if (this.codeTime > 0) {
    //           this.codeTime--
    //         } else {
    //           clearInterval(dome)
    //         }
    //       }, 1000);
    //     } else {
    //       this.codeTime = 0
    //       this.changtoast(rps.data.message, "error")
    //     }
    //   })
    // },
    // 微信上传图片
    _GetMediaToMainId () {
      let dome = new Promise(resolve => {
        waChatDisposeImgaes(this.WaChatConfigData).then(val => {
          this.$store.commit('SetMedialdsList', []) // 清空本次选中记录
          this.$store.commit('SetpublicMessage', '上传失败')
          GetMediaToMainId({
            MediaIds: val,
            mainId: this.$store.state.MainIdData
          }).then(rps => {
            this.$indicator.close()
            if (rps.data.success) {
              resolve(rps.data.content)
            } else {
              this.changtoast(rps.data.message, 'error')
            }
          })
        })
      })
      return dome
    },
    // 识别营业执照， 身份证
    uploadingImage (item) {
      if (item === 1) {
        this._BusinessLicenseOrc()
      } else if (item === 2) {
        this._IdCardOrcById()
      }
    },
    // 腾讯识别营业执照
    _BusinessLicenseOrc () {
      waChatDisposeImgaes(this.WaChatConfigData).then(val => {
        this.$store.commit('SetMedialdsList', []) // 清空本次选中记录
        Bizlicense({
          MediaId: val[0]
        }).then(rps => {
          this.$indicator.close()
          if (rps.data.success) {
            this.yyzz_url = rps.data.content.zjUrl
            this.xydm = rps.data.content.qybm
            this.qymc = rps.data.content.qymc
            this.frdb = rps.data.content.frdb
            // this.qydz = rps.data.content.addr
          } else {
            this.changtoast(rps.data.message, 'error')
          }
        })
      })
    },
    // 腾讯识别身份证
    _IdCardOrcById () {
      this._GetMediaToMainId().then(val => {
        let data = val.urlData[0]
        // this.sfz_url = data.src
        IdCardOrcById({
          id: data.id
        }).then(rps => {
          if (rps.data.errcode === 0) {
            if (rps.data.type == 'Back') {
              this.changtoast('请上传身份证正面照片', "warning");
            } else {
              this.xm = rps.data.name
              this.sfzhm = rps.data.id
              // this.addr = rps.data.addr
            }
          } else {
            this.changtoast(rps.data.rps.data.errmsg, 'error')
          }
        })
      })
    },
    // 获取微信sdk 初始化参数
    _GetWechatConfig () {
      let url = window.location.href
      GetWechatConfig({
        url: url
      }).then(rps => {
        if (rps.data.success) {
          this.WaChatConfigData = rps.data.content;
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    },
    // 开启弹出层
    setSelectValue () {
      // if (this.isReadonly) {
      //   return
      // }
      this.popupVisible = true
    },
    // 选择器事件
    onValuesChange (picker, values) {
      this.ValuesChange = values[0]
    },
    // 选择器确认事件
    clickAffirm () {
      this.sex = this.ValuesChange.name
      this.popupVisible = false
    },
    // 获取使命信息
    init () {
      let data = JSON.parse(window.sessionStorage.getItem('_ss_grxx'))
      console.log(data);
      this.sfzhm = data.sfzh
      this.xm = data.mz
      this.tel = data.tel
      // this.getGrxx().then(Grxx => {
      //   if (Grxx.hasSM) {
      //     this.sfzhm = Grxx.sfzh
      //     this.xm = Grxx.mz
      //     this.tel = Grxx.tel
      //   }
      // })
    }
  },
  created () {
    this.init()
    this._GetWechatConfig()
    if (this.state) {
      this._Getqyrzxx()
    }
  },
}
</script>

<style lang="scss" scoped>
@import './style/attestationFrom.scss';
.attestationFrom /deep/ .picker_list {
  .picker-slot-wrapper {
    width: 750px;
    .picker-item {
      font-size: 34px;
      font-weight: bold;
    }
    .picker-selected {
      color: rgba(40, 40, 40, 1);
    }
  }
}
.listFrom_input_tab {
  /deep/ .van-cell {
    padding: 0;
    font-size: 28px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }
  /deep/ .van-cell--required::before,
  /deep/ .van-cell::after,
  /deep/ .van-hairline--bottom {
    display: none;
  }
  /deep/ .van-field__control {
    font-weight: 500;
    color: #000;
    width: 400px;
  }
  /* /deep/ .van-cell::after {
    display: none;
  }
  /deep/ .van-hairline--bottom {
    display: none;
  } */
}
</style>
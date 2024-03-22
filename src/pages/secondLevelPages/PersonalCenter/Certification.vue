<!-- 实名认证 -->
<template>
  <div class="main" v-if="ishsouw">
    <BetterScroll>
      <template slot="BetterScroll" v-if="showXx">
        <div class="top">
          <div class="from">
            <div class="item">
              <div class="title">个人头像</div>
              <div class="input">
                <img :src="headPortrait" />
              </div>
            </div>
            <div v-if="canEdit" class="item item-action">
              <div class="title">身份证</div>
              <div class="input number">
                <input
                  placeholder="请输入身份证号"
                  v-model="Sfzhm"
                  type="text"
                />
              </div>
              <div class="input_tab_but" v-if="showCamera">
                <img
                  src="/static/listFrom_image_icon.png"
                  alt=""
                  @click="_IdCardOrcById"
                />
              </div>
            </div>
            <div v-else class="item item-action">
              <div class="title">身份证</div>
              <div class="input">
                <input
                  class="inRight"
                  placeholder="请输入身份证号"
                  readonly
                  v-model="Sfzhm"
                  type="text"
                />
              </div>
              <div class="input_tab_but" v-if="showCamera"></div>
            </div>
            <div class="item item-action">
              <div class="title">姓&nbsp;&nbsp;&nbsp;&nbsp;名</div>
              <div class="input">
                <input
                  :class="{ inRight: !canEdit }"
                  placeholder="请输入姓名"
                  v-model="Name"
                  type="text"
                  :readonly="!canEdit"
                />
              </div>
              <div class="input_tab_but" v-if="showCamera"></div>
            </div>
            <div class="item item-action">
              <div class="title">手机号</div>
              <div class="input">
                <input
                  :class="{ inRight: !canEdit && notbsyy }"
                  placeholder="请输入手机号"
                  v-model="Mobile"
                  type="text"
                  :readonly="!canEdit && notbsyy"
                />
              </div>
              <div class="input_tab_but" v-if="showCamera"></div>
            </div>
            <div class="item item-action">
              <div class="title">认证状态</div>
              <div class="input right">{{ Rzzt }}</div>
            </div>
            <!-- <van-field
              v-model="sms"
              left
              clearable
              maxlength="4"
              label="短信验证码"
              v-if="!notbsyy"
              placeholder="请输入短信验证码"
            >
             <div slot="button">
              <van-button size="small" @click="sendCodeFn" type="primary">{{codeTime === 0 ? "发送验证码" : codeTime + 's重发'}}</van-button>
            </div>
          </van-field> -->
          </div>
          <div class="village" v-show="notbsyy">
            <span class="guishu">归属信息</span>
            <div class="zhong">
              <span>您当前绑定的是：{{ gscj || '无' }}</span>
              <!-- <div @click="binding(1)" v-if="!hasShcj">重新绑定</div> -->
              <div @click="handleChange" v-if="!hasShcj">重新绑定</div>
            </div>
            <p v-if="!hasShcj">
              说明：请选择您的户籍地所在村居进行绑定，点击重新绑定后，选择您需绑定的村居，再次进入本页面
            </p>
          </div>

          <div class="village" v-show="notbsyy">
            <div class="dxs-info">
              <div class="dxs-auth">
                大学生认证<span>（用于大学生信息库）</span>
              </div>
              <div class="dxs-status">{{ dxsrzzt }}</div>
            </div>
            <div class="zhong">
              <span>您当前填报的是：{{ dxssf || '无' }}</span>
              <div @click="handleInfo" v-if="!hasShcj">信息填报</div>
            </div>
            <p v-if="!hasShcj">
              说明：请选择您的大学生人才信息填报，点击信息填报后，选择您需要填报的类型，再次进入本页面
            </p>
          </div>
          <!-- <div class="village" v-show="notbsyy">
            <span class="guishu">村民小组/经联社</span>
            <div class="zhong">
              <span>您当前绑定的是：{{ZrcName ? ZrcName : '无'}}</span>
              <div @click="binding(2)" v-if="!hasShcj">重新绑定</div>
            </div>
            <p v-if="!hasShcj">说明：<span>请选择您的户籍所在的村民小组/经联社，点击重新绑定后，选择您需绑定的村民小组/经联社，再次进入本页面（本次选择之后，您还有1次机会绑定所在的村民小组/经联社）</span></p>
          </div>
          <div class="from binding" v-if="false">
            <div>政务服务网绑定</div>
            <div class="item inputs">
              <div class="title">账号</div>
              <div class="input">
                <input
                  placeholder="请输入账号"
                  v-model="zwAccount"
                  :readonly="!canEdit"
                  type="text"
                />
              </div>
            </div>
            <div class="item inputs">
              <div class="title">密码</div>
              <div class="input">
                <input
                  placeholder="请输入密码"
                  v-model="zwPwd"
                  :readonly="!canEdit"
                  type="password"
                />
              </div>
            </div>
          </div>
           <div class="village">
            <span class="guishu">认证状态</span>
            <span class="tishi">{{Rzzt}}</span>
            <p v-if="canEdit">说明：请您确定提交的信息真实有效，平台将于公安部门提供的信息进行比对确认。</p>
          </div> -->
          <div v-if="Rzzt === '未通过' && shyj" class="reminder">
            <img src="/images/Icon-24.png" />{{ shyj }}
          </div>
        </div>
        <div class="bottom">
          <div
            class="fasong"
            v-if="canEdit"
            @click="submit"
            :class="{ action: islong }"
          >
            <div>{{ title }}</div>
          </div>
          <div
            class="fasong"
            @click="bdRyxx"
            :class="{ action: islong }"
            v-else-if="!notbsyy"
          >
            <div>绑定身份信息</div>
          </div>
          <div
            class="fasong"
            v-else-if="!canEdit && this.Rzzt === '认证中'"
            @click="SetCxSmrzSq"
            :class="{ action: islong }"
          >
            <div>撤销实名认证</div>
          </div>
          <div
            class="fasong"
            v-else-if="!hasShcj && notbsyy"
            @click="CxxzcjClick"
            :class="{ action: islong }"
          >
            <div>重新保存自然村</div>
          </div>
          <div
            class="fasong"
            @click="amendphone"
            :class="{ action: islong }"
            v-else-if="!canEdit && this.Rzzt === '已认证'"
          >
            <div>修改手机号码</div>
          </div>
        </div>
      </template>
      <template slot="BetterScroll" v-else>
        <div class="top">
          <div class="village" v-show="notbsyy">
            <span class="guishu">归属信息</span>
            <div class="zhong">
              <span>您当前绑定的是：{{ gscj || '无' }}</span>
              <div @click="binding(1)" v-if="!hasShcj">重新绑定</div>
            </div>
            <p v-if="!hasShcj">
              说明：请选择您的户籍地所在村居进行绑定，点击重新绑定后，选择您需绑定的村居，再次进入本页面
            </p>
          </div>
          <div class="village" v-show="notbsyy">
            <span class="guishu">村民小组/经联社</span>
            <div class="zhong">
              <span>您当前绑定的是：{{ ZrcName ? ZrcName : '无' }}</span>
              <div @click="binding(2)" v-if="!hasShcj">重新绑定</div>
            </div>
            <p v-if="!hasShcj">
              说明：<span
                >请选择您的户籍所在的村民小组/经联社，点击重新绑定后，选择您需绑定的村民小组/经联社，再次进入本页面（本次选择之后，您还有1次机会绑定所在的村民小组/经联社）</span
              >
            </p>
          </div>
        </div>
        <div class="btn-back" @click="handleBack">
          <div>确定</div>
        </div>
      </template>
    </BetterScroll>
  </div>
</template>
<script>
import { storage, session_Storage } from '@/js/until'
import { CheckForm } from '@/js/checkForm'
import { WaChatORC } from '@/js/WaChatORC'
import { SmrzSq } from '@/api/PartyBuilding'
import { RzxxDetail, Cxxzcj } from '@/api/Member'
import { GetWechatConfig } from '@/api/GetWechatConfig'
import { mapActions } from 'vuex'
import BetterScroll from '@/components/BetterScroll'
import { CxSmrzSq, RyxxBd } from '@/api/secondLevelPage'
import { GetToken } from '@/js/until.js'

export default {
  data () {
    return {
      WaChatConfigData: '',
      Avatar: '',
      NickName: '',
      Rzzt: '未认证',
      VillageId: '',
      codeTime: 0,
      gscjId: 0,
      gscj: '',
      Sfzhm: '',
      sms: '',
      Name: '',
      Mobile: '',
      islong: false,
      shyj: '',
      title: '提交认证',
      sfzFileId: null,
      ishsouw: false,
      zrcId: '', //所选自然村id
      ZrcName: '', //所选自然村名字
      kycx: false, //是否可以重新选择自然村
      zwAccount: '',
      zwPwd: '',
      hasShcj: true,
      rteurnSmrz: false,
      showXx: true,
      dxssf: '',
      dxsrzzt: ''
    }
  },
  components: {
    BetterScroll
  },
  computed: {
    showCamera () {
      return false && !this.notbsyy
    },
    longData () {
      return storage.fetch('longData').data.name
    },
    canEdit () {
      return (
        this.Rzzt === '未认证' ||
        this.Rzzt === '未通过' ||
        this.Rzzt === '已撤消'
      )
    },
    infoData () {
      return this.$store.state.inFoData
    },
    headPortrait () {
      return storage.fetch('userimages').data
    },
    notbsyy () {
      return !this.$route.query.bsyy
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let path = storage.fetch('path')
      if (path.data) {
        vm.changtoast('实名认证成功！页面跳转中…')
        setTimeout(() => {
          vm.$router.push(path.data)
          storage.remove('path')
        }, 2000)
      }
      let villageSelected = vm.$store.state.V_Selected
      if (villageSelected) {
        vm.gscjId = villageSelected.id
        vm.gscj = villageSelected.name
        vm.zrcId = ''
        vm.ZrcName = ''
        vm.$store.state.V_Selected = null //行政村选择
      } else if (vm.$store.state.ZV_Selected) {
        vm.zrcId = vm.$store.state.ZV_Selected.id
        vm.ZrcName = vm.$store.state.ZV_Selected.name
        vm.$store.state.ZV_Selected = null //自然村选择
      }
      if (vm.Rzzt === '认证中') {
        //如果在认证中状态，重新获取认证信息
        vm.initData()
      }
    })
  },
  activated () {
    this.getGrxx(true).then(val => {
      if (val.hasSM) {
        // 有实名认证
        this.$indicator.open('数据加载中...')
        this.initData()
      } else {
        // 没有实名认证
        if (val.smrzzt === '认证中' || val.smrzzt === '已撤消') {
          if (val.smrzzt === '已撤消') {
            this.rteurnSmrz = true
          }
          this.$indicator.open('数据加载中...')
          this.initData()
        } else {
          this.ishsouw = true
          if (this.infoData) {
            // 有参数
            this.Name = this.infoData.name
            this.Mobile = this.infoData.sjh
            this.Sfzhm = this.infoData.sfz
            this.sfzFileId = this.infoData.FileId
          } else {
            if (this.notbsyy) {
              this.$router.replace('/smrz')
            }
          }
        }
      }
    })
  },
  created () {
    if (this.$route.query.bsyy) {
      this.$indicator.close()
      this.$indicator.open('加载中...')
      if (this.$route.query.state && this.$route.query.code) {
        GetToken().then(token => {
          // this.bdRyxx()
          // this.$nextTick(()=>this.Mobile=this.tel)
        })
      } else {
        GetToken(true)
      }
    }
  },
  methods: {
    handleChange () {
      this.showXx = false
    },
    handleBack () {
      this.showXx = true
    },
    handleInfo () {
      this.$router.push('/dxs')
    },
    ...mapActions(['getGrxx']),
    initData () {
      RzxxDetail({}).then(res => {
        this.ishsouw = true
        this.$indicator.close()
        if (res.data.success) {
          this.Avatar = res.data.content.avatar
          this.NickName = res.data.content.nickName
          if (!this.gscjId) {
            this.gscjId = res.data.content.gsdId
            this.gscj = res.data.content.gsd
            this.zrcId = res.data.content.zrcId
            this.ZrcName = res.data.content.zrc
            this.gscj = res.data.content.gsd
            this.Sfzhm = res.data.content.sfzhm
            this.Name = res.data.content.name || ''
            this.Mobile = res.data.content.mobile
            this.tel = res.data.content.tel
            this.kycx = res.data.content.kycx
            this.dxssf = res.data.content.dxssf
            this.dxsrzzt = res.data.content.dxsrzzt
            if (!this.gscjId) {
              //进来没有所属村居的情况
              let lData = storage.fetch('longData').data
              this.gscjId = lData.id
              this.gscj = lData.name
            }
            this.Rzzt = res.data.content.rzzt
            this.shyj = res.data.content.shyj
            this.zwAccount = res.data.content.zw_account
            this.zwPwd = res.data.content.zw_pwd
            this.hasShcj = res.data.content.sscjsh == '已审核'
            // if(!this.notbsyy)
            this.Mobile = res.data.content.tel
          } else {
            // this.changtoast(res.data.message, 'error')
          }
          this.Rzzt = res.data.content.rzzt
          this.shyj = res.data.content.shyj
          this.zwAccount = res.data.content.zw_account
          this.zwPwd = res.data.content.zw_pwd
          if (!this.notbsyy) this.Mobile = res.data.content.tel
        } else {
          this.changtoast(res.data.message, 'error')
        }
      })
    },
    // 腾讯识别身份证
    _IdCardOrcById () {
      this.ORCRecognition()
    },
    sendCodeFn () {
      if (this.codeTime > 0) return
      this.getVaildCode()
    },
    getVaildCode () {
      if (!this.Mobile) {
        this.changtoast('请输入手机号码', 'error')
        return
      }
      this.codeTime = 60
      let dome = setInterval(() => {
        if (this.codeTime > 0) {
          this.codeTime--
        } else {
          clearInterval(dome)
        }
      }, 1000)
      this.hasSend = true
      this.$post('api/sms/SendCode_Bsyy', { mobile: this.Mobile }).then(res => {
        if (res.data.success) {
        } else {
          this.changtoast(res.data.message, 'error')
          this.codeTime = 0
          this.hasSend = false
        }
      })
    },
    CxxzcjClick () {
      if (!this.zrcId) {
        this.changtoast('请选择自然村', 'warning')
        return
      }
      Cxxzcj({ id: this.zrcId }).then(res => {
        if (res.data.success) {
          this.changtoast('修改成功', 'success')
        } else {
          this.changtoast(res.data.message, 'error')
        }
      })
    },
    // 获取微信sdk 初始化参数
    _GetWechatConfig () {
      var u = navigator.userAgent
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
      let url = ''
      if (isAndroid) {
        url = location.href
      }
      if (isIOS) {
        url = location.href.split('#')[0] //hash后面的部分如果带上ios中config会不对
      }
      GetWechatConfig({
        url: url
      }).then(rps => {
        if (rps.data.success) {
          this.WaChatConfigData = rps.data.content
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    submit () {
      // //撤销时重新进入判断页面
      // if (this.rteurnSmrz) {
      //   if (!this.infoData) {
      //     this.$router.push('/smrz')
      //     return
      //   }
      // }
      if (
        this.Name.indexOf('*') === -1 &&
        this.Sfzhm.indexOf('*') === -1 &&
        this.Mobile.indexOf('*') === -1
      ) {
        const IsForm = CheckForm([
          { data: this.Name, name: 'name', msg: '请输入真实姓名' },
          { data: this.Sfzhm, name: 'ckad', msg: '请输入正确的身份证号码' },
          { data: this.Mobile, name: 'phone', msg: '请输入正确的手机号码' }
        ])
        if (IsForm) {
          return
        }
      }
      if (this.gscjId == '' && this.notbsyy) {
        this.changtoast('请确认居住地', 'warning')
        return
      }
      if (this.islong) {
        return
      }
      this.islong = true
      this.title = '提交中，请稍后...'
      let bsyyopenid = this.$route.query.bsyy
      let code = this.sms
      SmrzSq({
        Name: this.Name,
        Tel: this.Mobile,
        Identity: this.Sfzhm,
        VillageId: this.gscjId,
        VillageName: this.gscj,
        FileId: this.sfzFileId,
        ZrcId: this.zrcId,
        zw_account: this.zwAccount,
        zw_pwd: this.zwPwd,
        bsyy: !this.notbsyy,
        bsyyopenid,
        code
      }).then(rps => {
        this.$store.commit('SetinFoData', '')
        this.islong = false
        this.title = '保存实名认证信息'
        if (rps.data.success) {
          if (!this.notbsyy && rps.data.content.rzzt == '已认证') {
            //办事预约
            window.location.href =
              'http://xzfw.gaoming.gov.cn/wechat/user/infoData'
            return
          }
          this.getGrxx(true) //清除状态管理中的实名认证信息
          let query
          if (rps.data.content.rzzt === '认证中') {
            query = { pass: 0, cj: this.gscj }
          } else {
            query = { pass: 1 }
          }
          this.gscjId = 0
          this.initData()
          this.$router.replace({ path: 'submit', query })
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    bdRyxx () {
      this.$indicator.open('开始绑定身份信息...')
      RyxxBd({
        bsyyopenid: this.$route.query.bsyy,
        tel: this.Mobile,
        code: this.sms
      }).then(res => {
        this.$indicator.close()
        if (res.data.success) {
          this.getGrxx(true).then(grxx => {
            if (grxx.hasSM) {
              this.changtoast('已通过实名认证')
              window.location.href =
                'http://xzfw.gaoming.gov.cn/wechat/user/infoData'
            } else {
              this.changtoast('请先进行实名认证', 'info')
            }
          })
        } else {
          this.changtoast(res.data.message, 'error')
        }
      })
    },
    // 撤销实名认证
    SetCxSmrzSq () {
      CxSmrzSq({}).then(rps => {
        if (rps.data.success) {
          this.changtoast('撤销成功')
          this.title = '重新实名认证'
          this.gscjId = 0
          this.getGrxx(true).then(val => {
            if (val.smrzzt === '已撤消') {
              this.rteurnSmrz = true
            }
          })
          this.initData()
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    binding (item) {
      if (item == 2) {
        if (!this.gscjId) {
          this.changtoast('请先选择归属村居', 'warning')
          return
        }
        this.$router.push({
          path: '/SelectVillagers',
          query: {
            vid: this.gscjId
          }
        })
      } else if (item == 1) {
        this.$router.push({
          path: '/AreaSelection',
          query: {
            Isreturn: true
          }
        })
      }
    },
    confirm () {
      this.VillageId = storage.fetch('longData').data.id
    },
    // 识别身份证
    ORCRecognition () {
      WaChatORC(this.WaChatConfigData, this)
    },
    goBack () {
      this.$store.commit('Set_ButtomTageState', 5)
      this.$router.push({
        path: '/index'
      })
    },
    amendphone () {
      this.$router.push('/amendphone')
    }
  }
}
</script>


<style lang="scss" scoped>
@import '@/Style/Certification.scss';
.van-cell {
  padding-left: 0;
  font-size: 4vw;
}
.right {
  text-align: right;
}
.btn-back {
  width: 706px;
  height: 80px;
  background: rgba(24, 130, 214, 1);
  margin-left: 22px;
  margin-top: 40px;
  text-align: center;
  line-height: 80px;
  color: #ffffff;
  font-size: 30px;
  border-radius: 15px;
}
</style>
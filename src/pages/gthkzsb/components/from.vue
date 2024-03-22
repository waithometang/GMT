<template>
  <div class="from">
    <div class="head">
      <div class="head-title">用户须知</div>
      <div class="head-name">1、每2天抽签一次，每次中签1666名。后期将根据报名数和口罩供应量适当调整。</div>
      <div class="head-name">2、报名条件放宽至所有个体工商户（暂缓开放场所行业除外）、小微企业。</div>
      <div class="head-name">3、每个中签名额一次限购20个口罩，中签名额2天内有效，逾期资格作废。（具体有效期，请参照中签时的微信通知）</div>
      <div class="head-name">4、口罩2.5元/个，具体型号以实物为准。</div>
      <div class="head-name">5、个体工商户、小微企业首次登记后，后续无需登记，长期纳入抽签。</div>
      <div class="head-name">6、请认真核对营业执照登记的信息填写个体工商户名称、统一社会信用代码（或注册号）、经营者姓名，如登记错误，将有可能导致无法中签。</div>
    </div>
    <div class="middle-list">
      <div class="list-tab">
        <div class="tab-head">*1.个体工商户名称</div>
        <div class="tab-base"><input type="text" placeholder="请输入个体工商户名称" v-model="fromData.gthmc"></div>
      </div>
      <div class="list-tab">
        <div class="tab-head">*2.统一社会信用代码（或注册号）</div>
        <div class="tab-base"><input type="text" placeholder="请输入统一社会信用代码（或注册号）" v-model="fromData.tydm"></div>
      </div>
      <div class="list-tab">
        <div class="tab-head">*3.经营者姓名</div>
        <div class="tab-base"><input type="text" placeholder="请输入经营者姓名" v-model="fromData.jyzmc"></div>
      </div>
      <div class="list-tab">
        <div class="tab-head">*4.联系电话</div>
        <div class="tab-base"><input type="number" placeholder="请输入联系电话" v-model="fromData.lxdh"></div>
      </div>
      <div class="list-tab">
        <div class="tab-head">*5.所属镇街</div>
        <div class="tab-base" @click="setState(1)"><input type="text" readonly="readonly" placeholder="请选择所属镇街" v-model="fromData.sszj"></div>
      </div>
      <div class="list-tab">
        <div class="tab-head">*6.选择购买口罩的药店</div>
        <div class="tab-base" @click="setState(2)"><input type="text" readonly="readonly" placeholder="请选择药店" v-model="fromData.yd"></div>
      </div>
      <div class="select-agreement" @click="selectAgreement">
        <i class="icon"><i v-if="agreementState"></i></i>本人自愿申请<span>《个体工商户口罩申购》 </span>并遵守相关规定，承诺提交资料属实，如有隐瞒，本人愿承担由此带来的一切法律责任。
      </div>
    </div>
    <div class="base-but"><div class="but" @click="submit">提交</div></div>
    <!-- <GmtDownMenu v-if="selectStat === 2" :actions="actions" v-model="fromData.yd" :show="show" @setActions="setActions"/> -->
    <GmtDownMenu v-if="selectStat === 1" :actions="actions" v-model="fromData.sszj" :show="show" @setActions="setActions"/>
    <van-popup v-model="show" v-if="selectStat === 2" position="bottom" :style="{ height: '50%' }">
      <div class="select-stie">
        <div class="stie-tab" v-for="(item, index) in actions" :key="index" @click="clickStie(item)">
          <div class="tab-head">{{item.name}}</div>
          <div class="tab-base">{{item.dz}}</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { kzsb,ydxxList } from '@/api/secondLevelPage';
import { Dialog } from 'vant';
import GmtDownMenu from '@/components/GmtDownMenu';

export default {
  data () {
    return {
      ydList:[],
      selectStat: '',
      show: false,
      shows: false,
      actions: [],
      yd: '',
      agreementState: false,
      fromData: {
        gthmc: '',
        tydm: '',
        jyzmc: '',
        lxdh: '',
        sszj: '',
        ydxx_id: '',
        ydmc: '',
        yd: ''
      },
    }
  },
  components: {
    GmtDownMenu
  },
  methods: {
    selectAgreement () {
      this.agreementState = !this.agreementState
    },
    submit () {
      Dialog.alert({
              title: '温馨提示',
              confirmButtonText:'确定',
              confirmButtonColor:'#00bede',
              message: '各个体工商户：目前市场上口罩等防疫物资供应已较为充足，个体工商户口罩申购平台于3月24日起暂停预约申请，请知悉。'
            }).then(() => {});
      return
      if (!this.agreementState) {
        this.changtoast('请勾选我已阅读并接受相关承诺', 'error')
        return
      }
      this.fromData.ydmc = this.fromData.yd
      let data = [
        {name: '', data: this.fromData.gthmc, msg: '请输入个体工商户名称'},
        {name: '', data: this.fromData.tydm, msg: '请输入统一社会信用代码（或注册号'},
        {name: 'name', data: this.fromData.jyzmc, msg: '请输入经营者姓名'},
        {name: 'phone', data: this.fromData.lxdh, msg: '请输入联系电话'},
        {name: '', data: this.fromData.yd, msg: '请选择药店'},
      ]
      if (this.checkForm (data)) {
        return
      }
      Dialog.confirm({
				title: '提示',
				message: '请确认填写信息是否真实有效，提交后将无法再次修改'
			}).then(() => {
        this.$indicator.open()
        kzsb(this.fromData).then(rps => {
          this.$indicator.close()
          if (rps.data.success) {
            this.changtoast('提交成功')
            this.$router.push('/sblist')
          } else {
            this.changtoast(rps.data.message, 'error')
          }
        })
			})
    },
    clickStie (item) {
      this.fromData.ydxx_id = item.id
      this.fromData.yd = item.name
      this.show = !this.show
    },
    setState (item) {
      if (item === 1) {
        this.actions = [{name: '荷城街道'}, {name: '更合镇'}, {name: '明城镇'}, {name: '杨和镇'}]
        this.fromData.yd = ''
      } else {
        if (!this.fromData.sszj) {
          this.changtoast('请选择镇街', 'error')
          return
        }
        let data = this.ydList.filter(val => {
          return val.sszj === this.fromData.sszj
        })
        this.actions = data
      }
      this.selectStat = item
      this.show = !this.show
    },
    setActions (item) {
      this.show = !this.show
    }
  },
  created(){
    ydxxList().then(rps => {
			if (rps.data.success) {
        this.ydList=rps.data.content
			} else {
				this.changtoast(rps.data.message, 'error')
			}
		})
  }
}
</script>

<style lang='scss' scoped>
@import '../style/from.scss';
</style>

                            
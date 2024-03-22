<template>
  <div class="ewm">
    <div class="ewm_pages">
      <div class="ewm_hread">
        <p> 基本信息 </p>
      </div>
      <div class="ewm_item">
        <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>
        <input v-model="xm" type="text" readonly placeholder="请输入您的家庭成员姓名" />
      </div>
      <div class="ewm_item">
        <span>身份证号</span>
        <input v-model="sfzh" type="text" readonly placeholder="请输入您的身份证号" />
      </div>
      <div class="ewm_item">
        <span>关系</span>
        <input type="text" v-model="glgx" readonly placeholder="请输入关联关系" />
      </div>
      <!-- <div class="ewm_item" @click="setpopupVisible">
        <span>打卡地点</span>
        <input type="text" v-model="address" readonly placeholder="请选择打卡地点" />
      </div> -->
    </div>
    <GmtRadio :options="szdq" title="目前所在地区" v-model="thisData.szdq"/>
    <GmtRadio :options="fhgd" title="前14天是否从湖北返回广东" v-model="thisData.sfhbfg"/>
    <GmtRadio :options="jcry" title="前14天是否接触过从湖北返回广东人员" v-model="thisData.sfjchbfgry"/>
    <GmtRadio :options="sfjc" title="前14天是否接触疑似/确诊病例" v-model="thisData.sfjcysbl"/>
    <GmtRadio :options="yxgc" title="是否在进行医学观察" v-model="thisData.sfyxgc"/>
    <GmtRadio :options="yclc" title="是否有异常临床表现（可多选）" :multiSelect="true" v-model="thisData.sfyclcbx"/>
    <GmtRadio :options="ysbl" title="是否被确诊为新型冠状病毒肺炎确诊病或疑似病例" v-model="thisData.sfqzysbl"/>
    <GmtRadio :options="twzt" title="目前体温状态" v-model="thisData.twzt"/>
    <div class="ewm_pages">
      <div class="qksm">
          <textarea v-model="thisData.bz" placeholder="请输入其他情况说明"></textarea>
      </div>
    </div>
    <div class="ewm_button" @click="tj_click">打卡</div>
    <GmtDownMenu :actions="actions" v-model="thisData.glgx" :show="show" @setActions="setActions"/>
    <mt-popup  v-model="popupVisible"  position="bottom">
			<TxMap @setTxMAP="getTxMAP" v-if="popupVisible" />
		</mt-popup>
  </div>
</template>
<script>
import GmtRadio from "@/components/GmtRadio";
import GmtDownMenu from '@/components/GmtDownMenu';
import TxMap from '@/components/secondLevelPages/ruralRevitalization/TxMap.vue';
import { WeChatGetLocation } from "@/js/WeChatGetLocation";
import { GetWechatConfig } from "@/api/GetWechatConfig";
import { dktj, dkryxx } from '@/api/secondLevelPage';

export default {
  data() {
    return { 
      szdq: [
        { value: "广东省内佛山市外", id: 1 },
        { value: "广东省内佛山市内", id: 2 },
        { value: "湖北", id: 3 },
        { value: "其他", id: 5 }
      ],
      fhgd: [
        { value: "否", id: 2 },
        { value: "是", id: 1 }
      ],
      sfjc: [
        { value: "否", id: 2 },
        { value: "是", id: 1 }
      ],
      jcry: [
        { value: "否", id: 2 },
        { value: "是", id: 1 }
      ],
      yxgc: [
        { value: "否", id: 1 },
        { value: "居家观察", id: 2 },
        { value: "集中观察", id: 3 },
        { value: "解除医学观察", id: 4 }
      ],
      ysbl: [
        { value: "否", id: 1 },
        { value: "疑似病例", id: 2 },
        { value: "确诊病例", id: 3 },
      ],
      yclc: [
        { value: "正常", isOnly:true, id: 1 },
        { value: "发热",  id: 2 },
        { value: "乏力",  id: 3 },
        { value: "干咳",  id: 4 },
        { value: "流涕",  id: 5 },
        { value: "腹泻",  id: 6, },
        { value: "感冒",  id: 7 },
        { value: "头疼头晕", id: 8 }
      ],
      twzt: [
        {value: '正常37.3℃以下', id: 1},
        {value: '低热37.3~37.9℃', id: 2},
        {value: '中热38~39℃', id: 3},
        {value: '高热 39℃以上', id: 4}
      ],
      actions: [{name: '家属'}, {name: '其他'}],
      show: false,
      xm: '',
      sfzh: '',
      glgx:'',
      address: '',
      popupVisible: false,
      WaChatConfigData: '',
      thisData:{
        szdq:'',
        sfhbfg: '',
        sfjchbfgry: '',
        sfyxgc: '',
        sfyclcbx:'',
        sfjcysbl: '',
        sfqzysbl: '',
        twzt:'',
        dkryid: '',
        bz: '',
        addr: '',
        lat: '',
        lng: '',
      },
    };
  },
  computed: {
    WaChetLatitude() {
      return this.$store.state.WaChetLatitude;
    },
    WaChetLongitude() {
      return this.$store.state.WaChetLongitude;
    }
  },
  components: {
    GmtRadio,
    GmtDownMenu,
    TxMap
  },
  methods: {
    setActions () {
      this.show = !this.show
    },
    tj_click () {
      this.thisData.dkryid = this.$route.params.id
      this.thisData.addr = this.address
      this.thisData.lat = this.WaChetLatitude
      this.thisData.lng = this.WaChetLongitude
      let data = [
        {name: 'name', data: this.thisData.szdq, msg: '请选择目前所在地区'},
        {name: 'name', data: this.thisData.sfhbfg, msg: '请确认前14天是否从湖北返回广东'},
        {name: 'name', data: this.thisData.sfjchbfgry, msg: '请确认前14天是否接触过从湖北返回广东人员'},
        {name: 'name', data: this.thisData.sfyxgc, msg: '请确认是否在进行医学观察'},
        {name: 'name', data: this.thisData.sfyclcbx, msg: '请确认是否有异常临床表现（可多选）'},
        {name: 'name', data: this.thisData.sfqzysbl, msg: '请确认是否被确诊为新型冠状病毒肺炎确诊病或疑似病例'},
        {name: 'name', data: this.thisData.twzt, msg: '请选择目前体温'},
        // {name: 'name', data: this.thisData.addr, msg: '请选择打卡地点'}
      ]
      if (this.checkForm (data)) {
        return
      }
      this.$indicator.open()
      dktj(this.thisData).then (rps => {
        this.$indicator.close()
        if (rps.data.success){
          this.$router.push('/jkdk')
        }else{
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    getListData () {
      this.$indicator.open()
      dkryxx({
        id: this.$route.params.id*1
      }).then (rps => {
        this.$indicator.close()
        if (rps.data.success) {
          this.xm = rps.data.content.xm
          this.sfzh = rps.data.content.sfzh
          this.glgx = rps.data.content.gx
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    setpopupVisible () {
      // this.popupVisible = true
      // WeChatGetLocation(this.WaChatConfigData, this)
		},
		getTxMAP (item) {
			this.address = item.poiname
			this.popupVisible = false
		},
    	// 获取微信sdk 初始化参数
    _GetWechatConfig() {
      let url = location.href
      GetWechatConfig({
        url: url
      }).then(rps => {
        if (rps.data.success) {
          this.WaChatConfigData = rps.data.content
					WeChatGetLocation(this.WaChatConfigData, this, falses)
        } else {
          this.changtoast(rps.data.message, "error")
        }
      });
		},
  },
  created () {
    this.getListData()
    this._GetWechatConfig()
  }
};
</script>
<style lang="scss" scoped>
@import "../ewm/style/index.scss";
</style>
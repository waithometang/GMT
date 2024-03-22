<template>
  <div class="jcdj" v-if="txlb">
		<div class="jcdj-content">
			<div class="content-head">
				<div class="head-qrcode">
					<qrcode-vue value="nothing" :size="160" :foreground="txcolor" level="H"></qrcode-vue>
				</div>
				<div class="head-name">{{txbt}}</div>
				<div class="head-title">{{txnr}}</div>
			</div>
			<div class="staff-info">
				<div class="info-tab">
					<div class="info-tab-name">姓名:</div>
					<div class="info-tab-value">{{xm}}</div>
				</div>
				<div class="info-tab">
					<div class="info-tab-name">类型:</div>
					<div class="info-tab-value">{{rylx}}</div>
				</div>
				<div class="info-tab">
					<div class="info-tab-name">身份证号:</div>
					<div class="info-tab-value">{{sfzh}}</div>
				</div>
				<div class="info-tab">
					<div class="info-tab-name">上次体温:</div>
					<div class="info-tab-value"><span>{{getTw(sqtw)}}</span></div>
				</div>
				<div class="info-tab">
					<div class="info-tab-name">接触史:</div>
					<div class="info-tab-value">{{jcs}}</div>
				</div>
				<div class="info-tab">
					<div class="info-tab-name">症状:</div>
					<div class="info-tab-value">{{zz}}</div>
				</div>
			</div>
		</div>
		<div class="jcdj-content">
			<ul>
				<li>
					<div class="select-tag" :class="{'select-tag-action': twStat === 1}" @click="select(1)">正常37.3℃以下</div>
				</li>
				<li style="width: calc(50% - 15px);" >
					<div class="select-tag" :class="{'select-tag-action': twStat === 2}"  @click="select(2)">低热37.3~37.9℃</div>
				</li>
				<li>
					<div class="select-tag" :class="{'select-tag-action': twStat === 3}"  @click="select(3)">中热38~39℃</div>
				</li>
				<li style="width: calc(50% - 15px);">
					<div class="select-tag" :class="{'select-tag-action': twStat === 4}"  @click="select(4)"> 高热 39℃以上</div>
				</li>
			</ul>
		</div>
		<!-- <div class="jcdj-content">
			<div class="ewm_pages ewm_pages_padding">
				<div class="txewm_hread">
          <span>接触史</span>
        </div>
				<div class="ewm-pages-tab" v-for="(item, index) in jcs" :key="index">
					<i></i> {{item}}
				</div>
			</div>
		</div> -->
		<!-- <div class="jcdj-content">
			<div class="ewm_pages ewm_pages_padding">
				<div class="txewm_hread">
          <span>症状</span>
        </div>
				<div class="ewm-pages-tab" v-for="(item, index) in zz" :key="index">
					<i></i> {{item}}
				</div>
			</div>
		</div> -->
		<div class="jcdj-content">
			<div class="remarks">
				<input type="text" v-model="bz" placeholder="请输入备注">
			</div>
      <div class="line">&nbsp;</div>
      <div class="ewm_item" @click="setpopupVisible">
        <p><img src="/static/ewm/定位-1.png"/>{{address ? address : '点击选择获取地点' }}</p>
      </div>
		</div>
		<div class="ewm_button" @click="submit">完成</div>
		<mt-popup  v-model="popupVisible"  position="bottom">
			<TxMap @setTxMAP="getTxMAP" v-if="popupVisible" />
		</mt-popup>
  </div>
</template>

<script>
import { scanQRCode } from '@/js/WaChatScanQRCode';
import { WeChatGetLocation } from "@/js/WeChatGetLocation";
import { GetWechatConfig } from "@/api/GetWechatConfig";
import { txhcxx, txhc, GetSMXX,GetWJSMXX } from '@/api/secondLevelPage';
import QrcodeVue from 'qrcode.vue'
import { session_Storage } from '@/js/until'
import TxMap from '@/components/secondLevelPages/ruralRevitalization/TxMap.vue';
import {mapActions} from "vuex";
import { Dialog } from 'vant';
export default {
	data () {
		return {
			cxjlid:'',
			txlb:'',
			ewm: '',
			WaChatConfigData: '',
			tw: '正常',
			bz: '',
			xm: '',
			sfzh: '',
			xxdz: '',
			zt: '',
			jcs: '',
			zz: '',
			zjjl: '',
			rylx: '',
			twStat: 1,
			sqtw: '',
			popupVisible: false,
			address: '',
			txcolor:'#fbbf5f',
			txbt:'临时通行',
			txnr:'黄色二维码: 临时通行',
		}
	},
	components: {
		TxMap,
		QrcodeVue
	},
	computed: {
    WaChetLatitude() {
      return this.$store.state.WaChetLatitude;
    },
    WaChetLongitude() {
      return this.$store.state.WaChetLongitude;
    }
  },
  inject: ["reload"],
	methods: {
    ...mapActions(['getGrxx']),
		getScanQRCode () {
			scanQRCode(this.WaChatConfigData).then(val => {
				if(val.indexOf('http')===0){
					window.location.href=val
					return
				}
				this.ewm = val
				WeChatGetLocation(this.WaChatConfigData, this);
				this.gettxhcxx()
			})
		},
		gettxhcxx(){
			txhcxx ({
				ewm: this.ewm,
				cert:this.$route.query.certToken,
				lat: this.WaChetLatitude,
				lng: this.WaChetLongitude,
				jcdd: this.address
			}).then(rps => {
				if (rps.data.success) {
					if(!rps.data.content.hasRight){
						// window.location.href='https://rz.weijing.gov.cn/authgzh/auth?certToken='+rps.data.content.cert
						Dialog.alert({
							title: '温馨提示',
							message: '您还没有通行证,请先获取通行证'
						}).then(() => {
							window.location.href='/ewm'
						});
						return
					}
					this.xm = rps.data.content.xm
					this.sfzh = rps.data.content.sfzh
					this.xxdz = rps.data.content.xxdz
					this.zt = rps.data.content.zt
					this.zjjl = rps.data.content.zjjl,
					this.zz = rps.data.content.zz,
					this.jcs = rps.data.content.jcs
					this.rylx = rps.data.content.rylx
					this.sqtw = rps.data.content.sqtw
					this.cxjlid = rps.data.content.cxjlid
					this.txlb = rps.data.content.txlb
					this.getTxsm(this.txlb)
				} else {
					if(rps.data.errorCode === 408) {
						this.reload()
					} else if (rps.data.errorCode === 420) {
						Dialog.alert({
              title: '温馨提示',
              confirmButtonText:'知道了',
              confirmButtonColor:'#00bede',
              message: '抱歉，只能由工作人员核查'
						}).then(() => {
							WeixinJSBridge.call('closeWindow')
						});
					} else{
						this.changtoast(rps.data.message, 'error')
						this.$router.replace('/jcdj')
						this.reload()
					}
				}
			})
		},
		select (item) {
			this.twStat = item
			switch (item) {
				case 1:
					this.tw = "正常"
					break;
				case 2:
					this.tw = "低热"
					break;
				case 3:
					this.tw = "中热"
					break;
				case 4:
					this.tw = "高热"
					break;
				default:
					break;
			}
		},
		getTxsm(lb){
			switch (lb) {
				case 1:
					this.txcolor= '#4ed961' 
					this.txbt='允许通行'
					this.txnr='绿色二维码: 允许通行'
					break;
				case 2:
					this.txcolor= '#5eaff3' 
					this.txbt='允许通行'
					this.txnr='蓝色二维码: 允许通行,户籍入口及流动人口没有数据的，申报信息来自非疫区的群众'
					break;
				case 3:
					this.txcolor= '#fbbf5f' 
					this.txbt='临时通行'
					this.txnr='黄色二维码: 临时通行'
					break;
				case 4:
					this.txcolor= '#f64d42' 
					this.txbt='不予通行'
					this.txnr='红色二维码: 不予通行，被医学隔离等高危风险人群名单'
					break;
				default:
					this.txcolor= '#fbbf5f' 
					this.txbt='临时通行证'
					this.txnr='黄色二维码: 临时通行证'
					break;
			}
		},
		getTw (item) {
			if (item === '正常') {
				return '正常37.3℃以下'
			} else if (item === '低热') {
				return '低热37.3~37.9℃'
			} else if (item === '中热') {
				return '中热38~39℃'
			} else if (item === '高热') {
				return '高热 39℃以上'
			}
		},
		test(){
			this.ewm = '002291129252187ap1127765'
			this.gettxhcxx()
		},
		submitData(){
			return txhc ({
				cxid:this.cxjlid,
				ewm: this.ewm,
				twzt: this.tw,
				bz: this.bz,
				lat: this.WaChetLatitude,
				lng: this.WaChetLongitude,
				jcdd: this.address
			})
		},
		submit () {
			// if (!this.address) {
			// 	this.changtoast('请点击获取核查地点')
			// 	return
			// }
			this.$indicator.open()
			this.submitData().then (rps => {
				this.$indicator.close()
				if (rps.data.success) {
					// this.changtoast('提交成功')
					Dialog.confirm({
						title: '核查成功',
						message: '是否继续核查下一个',
						confirmButtonText:'核查下一个',
						confirmButtonColor:'#2E3092',
						className:'bigConfirm',
						cancelButtonText:'完成'
					}).then(() => {
						// on confirm
						this.$router.replace('/jcdj')
						this.reload()
					}).catch(() => {
						// on cancel
						this.$router.replace('/hcjl')
					});
					
				} else {
					this.changtoast(rps.data.message, 'error')
				}
			})
		},
		// 获取微信sdk 初始化参数
    _GetWechatConfig() {
      let url = location.href
      GetWechatConfig({
        url: url
      }).then(rps => {
        if (rps.data.success) {
					this.WaChatConfigData = rps.data.content
					if (this.$route.params.flag) {
						WeChatGetLocation(this.WaChatConfigData, this);
					} else {
						this.getScanQRCode()
					}
        } else {
          this.changtoast(rps.data.message, "error")
        }
      });
		},
		setpopupVisible () {
			this.popupVisible = true
		},
		getTxMAP (item) {
			this.address = item.poiname
			this.popupVisible = false
			this.submitData().then()
		},

	},
	created () {
		GetWJSMXX({}).then(rps=>{
			if (rps.data.success){
				if(!rps.data.content){
					Dialog.alert({
						title: '温馨提示',
						message: '您还没有通行证,请先获取通行证'
					}).then(() => {
						this.$router.push('/ewm')
					});
				}else{
					let flag=this.$route.params.flag
					if (flag) {
						this.ewm=flag
						this.gettxhcxx()
						this._GetWechatConfig()
					}
					else 
						this._GetWechatConfig()
				}
			}else{
				if(rps.data.errorCode === 408)
					this.reload()
				if(rps.data.errorCode === 420)
					this.changtoast(rps.data.message, 'error')
				else{
					this.changtoast(rps.data.message, 'error')
				}
			}
		})
	}
}
</script>

<style lang='scss' scoped>
@import './style/jcdj.scss';
</style>

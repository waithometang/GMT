<template>
  <div class="fgdj">
    <div class="head">
		<!-- 高明区企业员工返岗直通车 -->
		</div>
	<div class="content-head">
				&nbsp;&nbsp;&nbsp;&nbsp;为帮助企业解决用工问题、尽快复工复产，高明区首批返岗直通车将前往区内企业员工来源地较为集中的湖南、广西两省接送员工，包车费用由政府全额解决。发车地点为湖南、广西两省部分地级市，具体发车时间、线路将另行公布。请湖南、广西两地有意在2020年3月1日前返回高明的企业员工朋友们结合实际需要，进行申报。
				<br>&nbsp;&nbsp;&nbsp;&nbsp;若个别企业在其他省份返岗员工人数较多，需要组织包车返程的，可以另行提出。
				<br>&nbsp;&nbsp;&nbsp;&nbsp;如有疑问，请与所属地镇（街道）、西江产业新城管委会联系。
				<br>&nbsp;&nbsp;&nbsp;&nbsp;荷城街道经促局：88988976何小姐 <br>&nbsp;&nbsp;&nbsp;&nbsp;杨和镇经促局：88809681 谭小姐
				<br>&nbsp;&nbsp;&nbsp;&nbsp;明城镇经促局：88836188 温小姐<br>&nbsp;&nbsp;&nbsp;&nbsp;更合镇经促局：88843980 陆小姐<br>&nbsp;&nbsp;&nbsp;&nbsp;西江产业新城：88812062 韩先生<br>
			</div>
    <div class="middle">
			<div class="middle-list">
				<div class="middle-list-tab">
					<div class="middle-list-tab-head"><span>*</span>1.姓名</div>
					<div class="middle-list-tab-base"><input type="text" v-model="xm" placeholder="请输入姓名"></div>
				</div>
				<div class="middle-list-tab">
					<div class="middle-list-tab-head"><span>*</span>2.身份证号码</div>
					<div class="middle-list-tab-base"><input type="text" v-model="sfzh" placeholder="请输入身份证号码"></div>
				</div>
				<div class="middle-list-tab">
					<div class="middle-list-tab-head"><span>*</span>3.联系方式</div>
					<div class="middle-list-tab-base"><input type="text" v-model="lxdh" placeholder="请输入联系方式"></div>
				</div>
				<div class="middle-list-tab">
					<div class="middle-list-tab-head"><span>*</span>4.企业所属镇街</div>
					<div class="middle-list-tab-base"><GmtOption :listData='listData' :selectState="TabStateData"  @SetselectTag="SetQCStatezj"/></div>
				</div>
				<div class="middle-list-tab">
					<div class="middle-list-tab-head"><span>*</span>5.所属企业</div>
					<div class="middle-list-tab-base"><input type="text" v-model="ssqy" placeholder="请选择所属企业"></div>
				</div>
				<!-- <div class="middle-list-tab">
					<div class="middle-list-tab-head"><span>*</span>5目前所在城市 省(仅限广西湖南)</div>
					<GmtOption :listData='optionData' :selectState="TabStateData"  @SetselectTag="SetQCState"/>
					<div class="middle-list-tab-base"><input type="text" v-model="sheng" placeholder="请输入目前所在城市 省(仅限广西湖南)"></div>
				</div>
				<div class="middle-list-tab">
					<div class="middle-list-tab-head"><span>*</span>6.目前所在城市 市</div>
					<div class="middle-list-tab-base"><input type="text" v-model="shi" placeholder="请输入目前所在城市 市"></div>
				</div> -->
				<div class="middle-list-tab">
					<div class="middle-list-tab-head"><span>*</span>6.目前所在地址</div>
					<div class="middle-list-tab-base" @click="setAdd"><input type="text" readonly="readonly" v-model="siteValue" placeholder="请输入目前所在地址"></div>
				</div>
				<div class="middle-list-tab">
					<div class="middle-list-tab-head"><span>*</span>7.计划返回时间</div>
					<div class="middle-list-tab-base" @click="setDate"><input type="text" readonly="readonly" v-model="jhsj" placeholder="请输入计划返回时间"></div>
				</div>
				<div class="middle-list-tab">
					<div class="middle-list-tab-head">8.备注</div>
					<div class="middle-list-tab-base"><input type="text" v-model="bz" placeholder="请输入备注"></div>
				</div>
			</div>
			<div class="middle-list" v-for="(item, index) in txrys" :key="index">
				<div class="middle-list-tab">
					<div class="middle-list-tab-head">同行人{{index+1}}:</div>
				</div>
				<div class="middle-list-tab">
					<div class="middle-list-tab-head"><span>*</span>1.姓名</div>
					<div class="middle-list-tab-base"><input type="text" v-model="item.xm" :ref="'name_'+index" placeholder="请输入姓名"></div>
				</div>
				<div class="middle-list-tab">
					<div class="middle-list-tab-head"><span>*</span>2.身份证号码</div>
					<div class="middle-list-tab-base"><input type="text" v-model="item.sfzh" :ref="'sfzhm_'+index" placeholder="请输入身份证号码"></div>
				</div>
				<div class="middle-list-tab">
					<div class="middle-list-tab-head"><span>*</span>3.联系方式</div>
					<div class="middle-list-tab-base"><input type="text" v-model="item.lxdh" :ref="'lxfs_'+index" placeholder="请输入联系方式"></div>
				</div>
				<div class="middle-list-tab">
					<div class="middle-list-tab-head">4.所属企业</div>
					<div class="middle-list-tab-base"><input type="text" v-model="item.ssqy" :ref="'ssqy_'+index" placeholder="请输入所属企业"></div>
				</div>
				<div class="middle-list-tab">
					<div class="middle-list-tab-head"><span>*</span>5.关系</div>
					<div class="middle-list-tab-base"><input type="text" v-model="item.gx" :ref="'gx_'+index" placeholder="请输入关系"></div>
				</div>
			</div>
			<div class="middle-but" @click="newlyAdded">
				<div class="but-tab">添加同行人</div>
			</div>
    </div>
		<div class="base-but" @click="submit">
			<div class="but-tab">提交</div>
		</div>
		<mt-datetime-picker type="date" :startDate="startDate" :endDate="endDate" @confirm="hadnleConfirm" v-model="pickerValue" ref="picker"  year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"> </mt-datetime-picker>
		<van-popup v-model="affirmSite" position="bottom">
      <van-area :area-list="areaList" value="430102" @confirm="setSiteValue" @cancel="setAffirmSite" v-if="true"/>
    </van-popup>
	</div>
</template>

<script>
import { qyztctj, qyztcxx } from '@/api/secondLevelPage';
import GmtOption from "@/components/GmtOption";
import area from '@/js/area'

export default {
	data () {
		return {
			txNumber: 0,
			xm: '',
			sfzh: '',
			lxdh: '',
			ssqy: '',
			sszj: '荷城街道',//所属镇街
			sheng: '湖南',
			shi: '',
			qu: '',
			jhsj: '',
			bz: '', 
			txrys: [],
			siteValue: '',
			pickerValue: '',
			optionData: [{name: '湖南', id: 1}, {name: '广西', id: 2}],
			TabStateData: 1,
			areaList: '',
			affirmSite: false,
			listData: [{name: '荷城街道', id: 1}, {name: '杨和镇', id: 2}, {name: '明城镇', id: 3}, {name: '更合镇', id: 4},{name: '西江产业新城', id: 5}],
			TabStateData: 1,
			startDate: new Date(),
			endDate: new Date('2020-12-31'),
		}
	},
	computed:{
		eidtModel(){
			return !!this.$route.query.m
		}
	},
	components: {
		GmtOption
	},
	methods: {
		newlyAdded () {
			// this.txNumber = this.txNumber+1
			this.txrys.push({})
		},
		getListData () {
			this.$indicator.open()
			qyztcxx({
				id: this.$route.params.id
			}).then(rps => {
				this.$indicator.close()
				if (rps.data.success) {
				this.xm = rps.data.content.xm
				this.sfzh = rps.data.content.sfzh
				this.lxdh = rps.data.content.lxdh
				this.siteValue = rps.data.content.addr
				this.ssqy = rps.data.content.ssqy
				this.sszj = rps.data.content.sszj
				this.sheng = rps.data.content.sheng
				this.shi = rps.data.content.shi
				this.qu = rps.data.content.qu
				this.jhsj = rps.data.content.jhsj
				this.bz = rps.data.content.bz
				this.txrys = rps.data.content.txrys
				this.getTabStateData(rps.data.content.sszj)
				// this.optionData.filter(val => {
				// 	if (val.name === rps.data.content.sheng) {
				// 		this.TabStateData = val.id
				// 	}
				// })
				} else {
					this.changtoast(rps.data.message, 'error')
				}
			})
		},
		getTabStateData (item) {
			this.listData.filter(val => {
				if (item === val.name) {
					this.TabStateData = val.id
				}
			})
		},
		SetQCStatezj (item) {
			this.TabStateData = item.id,
			this.sszj = item.name
		},
		setAdd () {
			this.areaList = area
			this.affirmSite = !this.affirmSite
		},
    setAffirmSite () {
      this.affirmSite = !this.affirmSite
    },
    setSiteValue (item) {
      this.affirmSite = false
      this.siteValue = ''
      item.forEach(val => {
        this.siteValue = this.siteValue + val.name
      })
	  this.sheng=item[0].name
	  this.shi=item.length > 1?item[1].name:''
	  this.qu=item.length > 2?item[2].name:''
    },
		submit () {
			// for (let index = 0; index < this.txNumber; index++) {
			// 	let data = {xm: this.$refs["name_" + index][0].value, sfzh: this.$refs["sfzhm_" + index][0].value, lxdh: this.$refs["lxfs_" + index][0].value, ssqy: this.$refs["ssqy_" + index][0].value,  gx: this.$refs["gx_" + index][0].value}
			// 	this.txrys.push(data)
			// }
			if (!this.checkValue()) {
				return
			}
			this.$indicator.open()
			qyztctj({
				id: this.$route.params.id,
				xm: this.xm,
				sfzh: this.sfzh,
				lxdh: this.lxdh,
				sszj: this.sszj,
				ssqy: this.ssqy,
				addr: this.siteValue,
				sheng: this.sheng,
				shi: this.shi,
				qu: this.qu,
				jhsj: this.jhsj,
				bz: this.bz,
				txrys: this.txrys,
				isEdit:this.eidtModel
			}).then (rps => {
				this.$indicator.close()
				if (rps.data.success) {
					this.changtoast('提交成功', 'success')
					this.$router.push('/fgdjList')
				} else {
					this.changtoast(rps.data.message, 'error')
				}
			})
		},
		checkValue () {
			if (!this.xm) {
				this.changtoast('请输入姓名', 'error')
				return false
			}
			if (!this.sfzh) {
				this.changtoast('请输入身份证号码', 'error')
				return false
			}
			if (!(/^1[3456789]\d{9}$/.test(this.lxdh))) {
				this.changtoast('请输入联系电话', 'error')
				return false
			}
			if (!this.ssqy) {
				this.changtoast('请输入所属企业', 'error')
				return false
			}
			if (!this.sszj) {
				this.changtoast('请选择所属镇街', 'error')
				return false
			}
			if (!this.siteValue) {
				this.changtoast('请输入目前所地址', 'error')
				return false
			}
			// if (!this.shi) {
			// 	this.changtoast('请输入目前所在城市 市', 'error')
			// 	return false
			// }
			// if (!this.qu) {
			// 	this.changtoast('请输入目前所在城市 区县', 'error')
			// 	return false
			// }
			if (!(/^(\d{4})-(\d{2})-(\d{2})$/.test(this.jhsj))) {
				this.changtoast('请输入计划返回时间', 'error')
				return false
			}
			return true
		},
		setDate () {
			this.pickerValue = new Date()
			this.$refs.picker.open()
		},
		hadnleConfirm () {
			this.jhsj = this.formatDate(this.pickerValue, 'yyyy-MM-dd')
		},
		formatDate (date, fmt) {
		 if (/(y+)/.test(fmt)) {
		   fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
		 }
		 let o = { 'M+': date.getMonth() + 1, 'd+': date.getDate(), 'h+': date.getHours(), 'm+': date.getMinutes(), 's+': date.getSeconds() }
		 for (let k in o) {
		   if (new RegExp(`(${k})`).test(fmt)) {
		     let str = o[k] + ''
		     fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : this.padLeftZero(str))
		   }
		 }
		 return fmt
	  },
		padLeftZero (str) {
			return ('00' + str).substr(str.length)
		},
		SetQCState (item) {
			this.TabStateData = item.id,
			this.sheng = item.name
		},
	},
	created () {
		if (this.$route.params.id) {
			this.getListData()
		}
	}
}
</script>

<style lang='scss' scoped>
@import './style/fgdj.scss';
</style>
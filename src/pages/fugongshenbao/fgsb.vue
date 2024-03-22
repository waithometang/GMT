<template>
  <div class="fgsb">
    <div class="content">
			<div class="content-title">
				<!-- 高明区复工复产企业口罩需求申购 -->
			</div>
			<div class="content-head">
				&nbsp;&nbsp;&nbsp;&nbsp;为坚持疫情防控同经济社会发展两手抓、两手硬，全力支持企业安全有序复工复产，我区将通过多渠道积极解决企业复工复产的口罩紧缺问题。请复工复产过程中切实存在口罩需求的各企业结合实际返岗员工数、现有备用口罩数，按照每人每天1个口罩的标准，申报本企业7天的口罩需求数量。因防疫物资紧缺，请各企业每7天申报一次，不便之处，敬请谅解。
				<br>&nbsp;&nbsp;&nbsp;&nbsp;如有疑问，请与属地镇（街道）、西江产业新城管委会联系。
				<br>&nbsp;&nbsp;&nbsp;&nbsp;荷城街道经促局：88988976 <br>&nbsp;&nbsp;&nbsp;&nbsp;杨和镇经促局：88809681<br>&nbsp;&nbsp;&nbsp;&nbsp;明城镇经促局：88836188<br>&nbsp;&nbsp;&nbsp;&nbsp;更合镇经促局：88843980<br>&nbsp;&nbsp;&nbsp;&nbsp;西江产业新城：88629036
			</div>
			<div class="content-list">
				<div class="list-tab">
					<div class="list-tab-head"><span>*</span>1.企业所属镇街</div>
					<div class="list-tab-base">
						<GmtOption :listData='listData' :selectState="TabStateData"  @SetselectTag="SetQCState"/>
					</div>
					<!-- <div class="list-tab-base"><input type="text" placeholder="请输入企业所属镇街" v-model="sszj"></div> -->
				</div>
				<div class="list-tab">
					<div class="list-tab-head"><span>*</span>2.企业名称</div>
					<div class="list-tab-base"><input type="text" placeholder="请输入企业名称" v-model="qymc"></div>
				</div>
				<div class="list-tab">
					<div class="list-tab-head"><span>*</span>3.企业信用代码</div>
					<div class="list-tab-base"><input type="text" placeholder="请输入企业信用代码" v-model="code"></div>
				</div>
				<div class="list-tab">
					<div class="list-tab-head"><span>*</span>4.企业负责人</div>
					<div class="list-tab-base"><input type="text" placeholder="请输入企业负责人" v-model="fzr"></div>
				</div>
				<div class="list-tab">
					<div class="list-tab-head"><span>*</span>5.企业负责人联系方式</div>
					<div class="list-tab-base"><input type="number" placeholder="请输入企业负责人联系方式" v-model="lxdh"></div>
				</div>
				<div class="list-tab">
					<div class="list-tab-head"><span>*</span>6.企业是否已复工</div>
					<div class="list-tab-select">
						<div class="select-tab" @click="select(true)"><i :class="{'select-i': sffg}"></i>&nbsp;是</div>
						<div class="select-tab" @click="select(false)"><i :class="{'select-i': !sffg}"></i>&nbsp;否</div>
					</div>
				</div>
				<div class="list-tab">
					<div class="list-tab-head"><span>*</span>7.复工时间</div>
					<div class="list-tab-title">如果企业未复工，请填计划复工时间</div>
					<div class="list-tab-base" @click="setDate"><input type="text" placeholder="请输入复工时间(格式如:2020-01-01)" readonly="readonly" v-model="fgsj"></div>
				</div>
				<div class="list-tab">
					<div class="list-tab-head"><span>*</span>8.企业员工总人数</div>
					<div class="list-tab-base"><input type="number" placeholder="请输入企业员工总人数" v-model="zrs"></div>
				</div>
				<div class="list-tab">
					<div class="list-tab-head"><span>*</span>9.企业已复工人数</div>
					<div class="list-tab-base"><input type="number" placeholder="请输入企业已复工人数" v-model="fgrs"></div>
				</div>
				<div class="list-tab">
					<div class="list-tab-head"><span>*</span>10.企业预计未来三天所需的口罩数量</div>
					<div class="list-tab-base"><input type="number" placeholder="请输入所需的口罩数量" v-model="sxkz"></div>
				</div>
				<div class="list-tab">
					<div class="list-tab-head">11.备注说明</div>
					<div class="list-tab-base"><input type="text" placeholder="请输入备注说明" v-model="bz"></div>
				</div>
			</div>
			<div class="content-base">
				<div class="base-but" @click="submit">{{addAgain?'再次':''}}提交</div>
			</div>
		</div>
		<mt-datetime-picker type="date" @confirm="hadnleConfirm" v-model="pickerValue" ref="picker"  year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"> </mt-datetime-picker>
  </div>
</template>

<script>
import { qyfgtj, qyfgxx } from '@/api/secondLevelPage';
import GmtOption from "@/components/GmtOption";

export default {
	data () {
		return {
			sszj: '荷城街道',//所属镇街
			qymc: '',//企业名称
			code: '',
			fzr: '',//企业负责人
			lxdh: '',//企业负责人联系电话
			sffg: false,//企业是否复工
			fgsj: '',//企业复工时间
			zrs: '',//企业总人数
			fgrs: '',//企业复工人数
			sxkz: '',//企业所属口罩
			bz: '',//备注说明
			listData: [{name: '荷城街道', id: 1}, {name: '杨和镇', id: 2}, {name: '明城镇', id: 3}, {name: '更合镇', id: 4},{name: '西江产业新城', id: 5}],
			TabStateData: 1,
			pickerValue: ''
		}
	},
	components: {
		GmtOption
	},
	computed:{
		eidtModel(){
			return !!this.$route.query.m
		},
		addAgain(){
			return !!this.$route.params.id
		}
	},
	methods: {
		select (item) {
			this.sffg = item
		},
		submit () {
			if (!this.checkValue()) {
				return
			}
			qyfgtj({
				id: this.$route.params.id,
				sszj: this.sszj,
				qymc: this.qymc,
				fzr: this.fzr,
				lxdh: this.lxdh,
				sffg: this.sffg,
				fgsj: this.fgsj,
				zrs: this.zrs,
				fgrs: this.fgrs,
				sxkz: this.sxkz,
				code: this.code,
				bz: this.bz,
				isEdit:this.eidtModel
			}).then (rps => {
				if (rps.data.success) {
					this.changtoast('申购成功,当天下午六点前可以修改', 'success')
					this.$router.push('/fgsbList')
				} else {
					this.changtoast(rps.data.message, 'error')
				}
			})
		},
		checkValue () {
			if (!this.sszj) {
				this.changtoast('请输入所属镇街', 'error')
				return false
			}
			if (!this.qymc) {
				this.changtoast('请输入企业名称', 'error')
				return false
			}
			if (!this.fzr) {
				this.changtoast('请输入企业负责人', 'error')
				return false
			}
			if (!(/^1[3456789]\d{9}$/.test(this.lxdh))) {
				this.changtoast('请输入企业负责人联系电话', 'error')
				return false
			}
			if (!(/^(\d{4})-(\d{2})-(\d{2})$/.test(this.fgsj))) {
				this.changtoast('请输入企业复工时间', 'error')
				return false
			}
			if (!this.zrs) {
				this.changtoast('请输入企业总人数', 'error')
				return false
			}
			if (!this.fgrs) {
				this.changtoast('请输入企业复工人数', 'error')
				return false
			}
			if (!this.sxkz) {
				this.changtoast('请输入企业所属口罩', 'error')
				return false
			}
			if (this.zrs < this.fgrs) {
				this.changtoast('企业复工人数不于大于企业总人数', 'error')
				return false
			}
			if (this.sxkz > this.fgrs * 3) {
				this.MessageBox({content:'您申报的所需的口罩数量超过标准，请结合实际返岗员工数、现有备用口罩数，按每人每天1个口罩的标准，申报企业3天的口罩需求数量。'}, 'error')
				return false
			}
			return true
		},
		getListData () {
			this.$indicator.open()
			qyfgxx ({
				id: this.$route.params.id
			}).then(rps => {
				this.$indicator.close()
				if (rps.data.success) {
				this.sszj = rps.data.content.sszj
				this.qymc = rps.data.content.qymc
				this.fzr = rps.data.content.fzr
				this.lxdh = rps.data.content.lxdh
				this.sffg = rps.data.content.sffg
				this.fgsj = rps.data.content.fgsj
				this.zrs = rps.data.content.zrs
				this.fgrs = rps.data.content.fgrs
				this.sxkz = rps.data.content.sxkz
				this.code = rps.data.content.code
				this.bz = rps.data.content.bz
				this.getTabStateData(rps.data.content.sszj)
				} else {
					this.changtoast(rps.data.message,'error')
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
		SetQCState (item) {
			this.TabStateData = item.id,
			this.sszj = item.name
		},
		setDate () {
			this.pickerValue = new Date()
			this.$refs.picker.open()
		},
		hadnleConfirm () {
			this.fgsj = this.formatDate(this.pickerValue, 'yyyy-MM-dd')
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
		}
	},
	created () {
		if (this.addAgain) {
			this.getListData()
		}
	}
}
</script>

<style lang="scss" scoped>
@import './style/fgsb.scss';
</style>
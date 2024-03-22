<template>
    <div class="txewm" v-if="state">
        <div class="txewm_pages">
            <!-- <p class="txewm_title">(有效期48小时，到期重新获取)</p> -->
            <div class="txewm_img">
				<div v-if="errorEwm" class="txewm_img_error">
					<img  src="/static/errorEwm_1.png" />
					<p>您尚未办理粤康码</p>
					<span>请先通过“粤省事”办理粤康码</span>
				</div>
                <qrcode-vue v-else  :value="ykm ? ykm : listData.ewm" :size="300" :foreground="txcolor" level="H"></qrcode-vue>
                <!-- <img v-else :src="'data:image/png;base64,'+ykm"/> -->
            </div>
            <p class="txewm_wz" v-if="cutState==1"> 
                <span>{{listData.sszj}}</span>
                <span>{{listData.sssq ? &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;listData.sssq : ''}}</span>
            </p>
            <div class="txewm_hread" v-if="cutState==1">
                <span>我的通行信息<span class="smallRed">(已通过认证)</span></span>
                <span class="ewm-edit" @click="gotoEdit">修改我的信息</span>
            </div>
            <div class="txewm_item"  v-if="cutState==1">
                <div class="txewm_list">
                    <span>姓名</span>
                    <span>{{listData.xm}}</span>
                </div>
                <div class="txewm_list">
                    <span>身份证号</span>
                    <span>{{listData.sfzh}}</span>
                </div>
                <div class="txewm_list">
                    <span>详细地址</span>
                    <Span>{{listData.xxdz}}</Span>
                </div>

                <!-- <div class="txewm_list">
                    <span>口罩预约：已中签</span>
                    <div class="list-but">领取核销</div>
                </div>
                <div class="txewm_list">
                    <span>领取状态：未领取</span>
                </div>
                <div class="txewm_list">
                    <span>领取地点：3月10日-3月15日，XX党群服务中心</span>
                </div> -->
            </div>
            <div class="cut" @click="cut">
                {{cutState==1?'切换粤康码':'切换高明通电子通行证'}}
                <img src="/static/icon_enterz3x.png"/>
            </div>
            <!-- <div class="but" @click="check">出示证件照</div> -->
        </div>   
        <div class="txewm_pages" v-if="cutState==1">
            <div class="txewm_cx">
                <div class="jilu" @click="gotocxjl()"><img src="/static/ewm/出行记录.png"/><span>出行记录</span></div>
                <div class="br"></div>
                <div class="jilu" @click="gotoshjl()"><img src="/static/ewm/核查记录.png"/><span>核查记录</span></div>
                <!-- <div class="br"></div> -->
                <!-- <div class="jilu" @click="check"><img src="/static/zjan.png"/><span>证件照</span></div> -->
            </div>
        </div>
        <div v-if="cutState==2" class="tips">
            "粤康码"由粤省事小程序提供，如有疑问，请拨打02012345咨询
        </div>
    </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue'
import {txzewm} from "@/api/secondLevelPage"
export default {
data(){
	return{
        listData:"",
        state: false,
        txcolor:'black',
        cutState:1,
        ykm:'',
        errorEwm:false
	}
},
    components: {
        QrcodeVue,
    },
    methods:{
        getTxsm(lb){
			switch (lb) {
				case 1:
					this.txcolor= '#4ed961' 
					break;
				case 2:
					this.txcolor= '#5eaff3' 
					break;
				case 3:
					this.txcolor= '#fbbf5f' 
					break;
				case 4:
					this.txcolor= '#f64d42' 
					break;
				default:
					this.txcolor= '#fbbf5f' 
					break;
			}
		},
        gotocxjl(){
            this.$router.push('/cxjl');
        },
        gotoshjl(){
            this.$router.push("/hcjl");
        },
        check () {
            this.$router.push('/wdzjz')
        },
        gotoEdit(){
            if (this.listData.id) {
                this.$router.push("/ewm?id="+this.listData.id)
            }
        },
        init(){
         this.$indicator.open('加载中...')
            txzewm({
                
                }).then(rps => {
                if (rps.data.success) {
                    if(!rps.data.content){
                        this.$router.replace('/ewm')
                        return
                    }
                    this.state = true
                    this.$indicator.close()
                    this.listData=rps.data.content
                    this.getTxsm(this.listData.txlb)
                } else {
                    this.changtoast(rps.data.message, 'error')
                }
                })
        },
        cut(){
            this.ykm=''
            this.listData=''
            this.state=false
            this.errorEwm=false
            if(this.cutState==1){
                this.$indicator.open('加载中...')
                this.cutState=2
                this.$post('api/zx/wdykm','').then(rps=>{
                    if(rps){
                        if (rps.data.success) {
                            if(!rps.data.content){
                                this.$router.replace('/ewm')
                                return
                            }
                            this.ykm=rps.data.content.qrcode
                            this.getTxsm(rps.data.content.isRed ? 4 : 1)
                            this.$indicator.close()
                            this.state=true
                        } else {
                            this.$indicator.close()
                            this.state=true
                            this.errorEwm=true
                        }
                    }
                })
            }
            else {
                this.cutState=1
                this.init()
            }
        }
    },
    created(){
        this.cut()
    }
}
</script>
<style lang="scss" scoped>
@import "./style/txewm.scss"
</style>
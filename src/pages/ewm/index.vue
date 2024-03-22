<template>
  <div class="ewm" v-if="rzPass">
    <div class="ewm_pages">
      <div class="ewm_hread">
        <p>基本信息<span v-if="rzPass" class="smallRed">(已通过认证)</span></p>
      </div>
      <div class="ewm_item">
        <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>
        <input v-model="xm" readonly type="text" placeholder="请输入您的姓名"/>
      </div>
      <div class="ewm_item">
        <span>身份证号</span>
        <input v-model="sfzh" readonly type="text" placeholder="请输入您的身份证号"/>
      </div>
      <div class="ewm_item">
        <span>手机号码</span>
        <input v-model="lxdh" type="text" maxlength="11" placeholder="请输入您的手机号码"/>
      </div>
    </div>
    <div class="ewm_pages">
      <div class="ewm_hread">
        <p>人员类型</p>
      </div>
      <div class="ewm_redio">
        <div class="select">
          <div class="select-tab" v-for="(item, index) in rylx" :key="index" @click="MultipleChoice (item, 1)">
            <i><i v-if="rylxState === item.id"></i></i>
            <div class="name-title">
              <div class="name">{{item.value}}</div>
              <div class="title">{{item.bz}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ewm_pages">
      <div class="ewm_hread">
        <p>居住属性</p>
      </div>
      <div class="ewm_redio">
        <div class="select">
          <div class="select-tab" v-for="(item, index) in jzsx" :key="index" @click="MultipleChoice (item, 2)">
            <i><i v-if="jzsxState === item.id"></i></i>
            <div class="name-title">
              <div class="name">{{item.value}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ewm_pages">
      <div class="ewm_hread">
        <p>高明居住地</p>
      </div>
      <div class="ewm_item" @click="zjPicker=true">
        <div class="ewm-iten-name">所属社区:</div>
        <div class="ewm-item-input"><input type="text" v-model="zjxx" readonly placeholder="请选择所属社区"></div>
        <!-- <span>所属社区</span>
        <input v-model="zjxx" type="text" readonly placeholder="请选择所属社区" @click="zjPicker=true"/> -->
      </div>
      <div class="ewm_item">
        <div class="ewm-iten-name">楼栋门牌号<br/>(或详细地址）:</div>
        <div class="ewm-item-input"><input v-model="xxdz" type="text" placeholder="请输入详细居住地址"></div>
        <!-- <span>楼栋门牌号<br/>(或详细地址）</span>
        <input v-model="xxdz" type="text" placeholder="请输入详细居住地址"/> -->
      </div>
      <div class="ewm_item">
        <div class="ewm-iten-name">单位名称:</div>
        <div class="ewm-item-input"><input  v-model="dw" type="text" placeholder="请输入单位名称"></div>
        <!-- <span>单位名称</span>
        <input v-model="dw" type="text" placeholder="请输入单位名称"/> -->
      </div>
      <div class="ewm_item" @click="setAdd">
        <div class="ewm-iten-name">目前常住城市:</div>
        <div class="ewm-item-input"><input type="text" readonly="readonly" v-model="szcs" placeholder="请选择目前常住城市"></div>
        <!-- <span>目前常住城市</span>
        <input type="text" readonly="readonly" v-model="szcs" placeholder="请选择目前常住城市"/> -->
      </div>
    </div>
    <div class="ewm_pages">
      <div class="ewm_hread">
        <p>个人体温情况</p>
      </div>
      <div class="ewm_redio">
        <div class="select">
          <div class="select-tab" v-for="(item, index) in tw" :key="index" @click="MultipleChoice (item, 3)">
            <i><i v-if="twState === item.id"></i></i>
            <div class="name-title">
              <div class="name">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ewm_pages">
      <div class="ewm_hread">
        <p>接触史（可多选）</p>
      </div>
      <div class="ewm_redio">
        <div class="select">
          <div class="select-tab" v-for="(item, index) in jcs" :key="index" @click="MultiChoice(item, 1)">
            <i><i v-if="getState(item.id, 1)"></i></i>
            <div class="name-title">
              <div class="name">{{item.value}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ewm_pages">
      <div class="ewm_hread">
        <p>是否有如下症状（可多选）</p>
      </div>
      <div class="ewm_redio">
        <div class="select">
          <div class="select-tab" v-for="(item, index) in rxzz" :key="index" @click="MultiChoice(item, 2)">
            <i><i v-if="getState(item.id, 2)"></i></i>
            <div class="name-title">
              <div class="name">{{item.value}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="base-ewm_redio">
      <div class="base-select" @click="chagesfyd">
        <span class="icon"><i v-if="sfyd"></i></span>本人自愿申请<span class="text-action">《高明电子通行证》</span>，并已阅读及同意<span class="text-action" @click="showGrzc">《个人信息保护政策》</span>和<span class="text-action" @click="showYhzc">《用户服务协议》</span>的全部内容， 并遵守相关规定，承诺提交资料属实，如有隐瞒，本人愿承担由此带来的一切法律责任
      </div>
    </div>
    <div @click="submit()" v-if="rzPass" class="ewm_button">提交</div>
		<van-popup v-model="affirmSite" position="bottom">
      <van-area :area-list="areaList" value="440608" @confirm="setSiteValue" @cancel="setAffirmSite" v-if="true"/>
    </van-popup>
    <van-popup v-model="zjPicker" position="bottom">
      <van-picker show-toolbar :columns="zjdata" @cancel="zjPicker = false" @confirm="zjConfirm" />
    </van-popup>
    <lazy-component>
      <PersonProtocol v-model="showPersonal" v-if="showPersonal"/>
    </lazy-component>
    <lazy-component>
      <UserProtocol v-model="showUser" v-if="showUser"/>
    </lazy-component>
  </div>
</template>
<script>
import GmtOption from './components/GmtOption';
import area from '@/js/area_v1';
import PersonProtocol from '@/components/PersonProtocol'
import UserProtocol from '@/components/UserProtocol'
import {txztj,VillageData,txzxx,getCert,GetSMXX} from "@/api/secondLevelPage"
export default {
    data(){
      return{
        rzPass: false,
        zjxx:'',
        sszj:'',
        sssq:'',
        sheng:'',
        shi:'',
        qu:'',
        zjPicker: false,
        zjdata: [],
        siteStart: 0,
				rylx:[
          {value:"常住人员",bz:'一直在高明居住或者工作的人员', id: 1}, 
          {value:"返(抵)人员",bz:"从外地返回高明居住或者工作的人员", id: 2}, 
          {value:"流动人员",bz:"从外地来高明商旅、探访亲友等人员", id: 3} 
        ],
        jzsx:[ {value:"居家自住", id: 1},
               {value:"租住", id: 2},
               {value:"投靠借住", id: 3},
               {value:"酒店旅店", id: 4},
               {value:"其他", id: 5}
            ],
        tw: [
              {value:'正常', name: '正常37.3℃以下', id: 1},
              {value:'低热', name: '低热37.3~37.9℃', id: 2},
              {value:'中热', name: '中热38~39℃ ', id: 3},
              {value:'高热', name: ' 高热 39℃以上', id: 4}
            ],
				jcs:[
          {value:"无", name: '', id: 1},
          {value:'两周内，你到过湖北省，浙江省温州市', name: '', id: 2},
          {value:'两周内，家人或周围的朋友到过湖北省，浙江 省温州市', name: '', id: 3},
          {value:'两周内，有新型冠状病毒感染的肺炎患者接触史', name: '', id: 4},
          {value:'两周内，有发热、呼吸道症状患者接触史', name: '', id: 5}
        ],
				rxzz:[
          {value:"没有出现症状", name: '', id: 1},
          {value:"感冒样症状：乏力、精神差、咳嗽、发热、肌肉痛、头痛", name: '', id: 2},
          {value:"喘憋、呼吸急促", name: '', id: 3}, {value:"恶心呕吐、腹泻", name: '', id: 4},
          {value:"心慌、胸闷", name: '', id: 5},
          {value: '结膜炎（红眼病样表现：眼睛涩、红、分泌物', id: 6}
        ],
        rylxState: '',
        jzsxState: '',
        twState: '',
        showPersonal: false,
        showUser: false,
        jcsState: [],
        rxzzState: [],
				sfyd:false,
				areaList: '',
				szcs: '',
        affirmSite: false,
        xm:"",
        sfzh:"",
        lxdh:"",
        xxdz:"",
        dw:""
      }
    },
    components:{
        GmtOption,
        PersonProtocol,
        UserProtocol
    },
    computed: {
      certToken(){
        return this.$route.query.certToken
      }
    },
    inject: ["reload"],
    created() {
      if (this.certToken) {
        GetSMXX({cert:this.certToken}).then(rps=>{
          if (rps.data.success) {
            this.rzPass=rps.data.content.haspass
            this.xm=rps.data.content.xm
            this.sfzh=rps.data.content.sfzh
          }else{
            if(rps.data.errorCode === 408)
              this.reload()
            else{
              this.changtoast(rps.data.message, 'error')
            }
          }
        })
      }else{
        this.gotoSMRZ()
      }
      txzxx({}).then(rps =>{
        if(rps.data.success){
          this.setData(rps.data.content)
        }else{
          this.changtoast(rps.data.message, 'error')
        }
      })
      VillageData().then (rps => {
        if (rps.data.success) {
          this.zjdata= rps.data.content
        }else{
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    methods:{
      showGrzc(){
        this.showPersonal=true
        event.stopPropagation()
      },
      showYhzc(){
        this.showUser=true
        event.stopPropagation()
      },
      MultipleChoice (item, state) {
        switch (state) {
          case 1:
            this.rylxState = item.id
            break;
          case 2:
            this.jzsxState = item.id
            break;
          case 3:
            this.twState = item.id
            break;                   
          default:
            break;
        }
      },
      MultiChoice (item, state) {
        switch (state) {
          case 1:
            if (item.id === 1) {
              this.jcsState = [item.id]
            } else {
              this.jcsState = this.jcsState.filter(el => {
                return el != 1
              })
              if (this.jcsState.length > 0) {
              this.jcsState.forEach((el, i) => {
                if (el === item.id) {
                  this.jcsState.splice(i,i)
                } else {
                  this.jcsState.push(item.id)
                }
              })
            } else {
              this.jcsState.push(item.id)
            }
            }
            break;
          case 2:
            if (item.id === 1) {
              this.rxzzState = [item.id]
            } else {
              this.rxzzState = this.rxzzState.filter(el => {
                return el != 1
              })
              if (this.rxzzState.length > 0) {
              this.rxzzState.forEach((el, i) => {
                if (el === item.id) {
                  this.rxzzState.splice(i,i)
                } else {
                  this.rxzzState.push(item.id)
                }
              })
            } else {
              this.rxzzState.push(item.id)
            }
            }
            break;      
          default:
            break;
        }
      },
      getState(item,state) {
        if (state === 1) {
          let dome = false
          this.jcsState.forEach(el => {
            if (el === item) {
              dome = true
            }
          })
          return dome
        } else {
          let dome = false
          this.rxzzState.forEach(el => {
            if (el === item) {
              dome = true
            }
          })
          return dome
        }
      },
      setData(_content){
        if(_content){
          // this.xm = _content. xm
          // this.sfzh = _content.sfzh
          this.lxdh = _content.lxdh
          this.zjxx =_content.sszj + _content.sssq
          this.sszj = _content.sszj
          this.sssq = _content.sssq
          this.dw = _content.dw
          this.szcs = _content.szcs
          this.xxdz = _content.xxdz
          this.sheng=_content.sheng
          this.shi=_content.shi
          this.qu=_content.qu
          let rylxStateData = this.rylx.filter(el => {
            return el.value === _content.rylx
          })
          if (rylxStateData[0]) 
            this.rylxState=rylxStateData[0].id
          let jjsxStateData = this.jzsx.filter(el => {
            return el.value === _content.jjsx
          })
          if (jjsxStateData[0]) 
            this.jzsxState=jjsxStateData[0].id
          // this.sfyd = true
        }
      },
      zjConfirm(arr){
        this.sszj=arr[0]
        this.sssq=arr[1]
        this.zjxx=this.sszj+this.sssq
        this.zjPicker=false
      },
			SiteStart(item){
				this.siteStart=item
			},
			getRadioVal() {
			},
			chagesfyd(){
				if(this.sfyd)this.sfyd=false
				else this.sfyd=true
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
        this.szcs = ''
        this.sheng=item[0].name
        this.shi=item.length > 1?item[1].name:''
        this.qu=item.length > 2?item[2].name:''
				item.forEach(val => {
					this.szcs = this.szcs + val.name
				})
      },
      submit(){
        let kong=false;
        
        if(this.xm ==''){
           this.changtoast('姓名不能为空','error')
        }
        else if(this.sfzh == ''){
           this.changtoast('身份证号码不能为空','error')
        }
        else if(this.lxdh==''){
           this.changtoast('联系电话不能为空','error')
        }
        else if(this.zjxx==''){
           this.changtoast('所属镇街不能为空','error')
        }
        else if(this.xxdz==''){
           this.changtoast('详细地址不能为空','error')
        }
        // else if(this.dw==''){
        //   this.changtoast("单位名称不能为空",'error')
        // }
        else if(this.szcs==''){
          this.changtoast('目前常住城市不能为空','error')
        }
        else if(!this.sfyd){
          this.changtoast("请勾选我已阅读并接受《承诺书》",'error')
        }
        else{
          kong=true
        }
        if(kong){
            let gl=false,id=''
            if(this.jjglVal === '是') gl=true
            id=this.$route.query.id || ''
            this.$indicator.open()
            txztj({
              id,
              xm: this.xm,
              sfzh: this.sfzh,
              lxdh: this.lxdh,
              sszj: this.sszj,
              sssq: this.sssq,
              xxdz:this.xxdz,
              dw:this.dw,
              szcs:this.szcs,
              // sfjjgl:gl,
              rylx:this.getSelectValue(1), //人员类型
              jjsx:this.getSelectValue(2), // 居住属性
              jcs:this.getSelectValue(3), // 接触史
              twzt: this.getSelectValue(4), // 体温
              rxzz:this.getSelectValue(5), // 症状
              sheng:this.sheng,
              shi:this.shi,
              qu: this.qu
            }).then(rps => {
              this.$indicator.close()
              if (rps.data.success) {
                let wjfallback=sessionStorage.getItem('wjfallbackurl')
                if (wjfallback) {
                  sessionStorage.removeItem('wjfallbackurl')
                  this.$router.replace(wjfallback)
                  return
                }
                this.$router.replace("/txewm")
              } else {
                this.changtoast(rps.data.message, 'error')
              }
            })
        }
      },
      gotoSMRZ(){
        this.$indicator.open('数据加载中')
        getCert({}).then(res=>{
          this.$indicator.close()
          if(res.data.success){
            if( res.data.content.haspass){
              this.rzPass=true
              this.xm=res.data.content.xm
              this.sfzh=res.data.content.sfzh
            }
            else
              window.location.href='https://rz.weijing.gov.cn/authgzh/auth?certToken='+res.data.content.cert
          }else{
              this.changtoast(res.data.message, 'error')
            // if(res.data.errorCode === 408)
            //   this.reload()
            // else{
            //   this.changtoast(res.data.message, 'error')
            // }
          }
        })
      },
      getSelectValue (state) {
        if (state === 1) {
          let data = this.rylx.filter(el => {
            return el.id === this.rylxState
          })
          return data[0].value
        } else if (state === 2) {
          let data = this.jzsx.filter(el => {
            return el.id === this.jzsxState
          })
          return data[0].value
        } else if (state === 3) {
          let dome = ''
          this.jcsState = [...new Set(this.jcsState)];
          this.jcsState.forEach(el => {
            this.jcs.forEach(val => {
              if (el === val.id) {
                if (dome) {
                  dome =`${dome};${val.value}`
                } else {
                  dome = val.value
                }
              }
            })
          })
          return dome
        } else if (state === 4) {
          let data = this.tw.filter(el => {
            return el.id === this.twState
          })
          return data[0]?data[0].value:''
        } else if (state === 5) {
          let dome = ''
          this.rxzzState = [...new Set(this.rxzzState)]
          this.rxzzState.forEach(el => {
            this.rxzz.forEach(val => {
              if (el === val.id) {
                if (dome) {
                  dome =`${dome};${val.value}`
                } else {
                  dome = val.value
                }
              }
            })
          })
          return dome
        } 
      }
    }
}
</script>
<style lang="scss" scoped>
@import "./style/index.scss";
</style>
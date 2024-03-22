<template>
  <div class="questionnaire_issue" >
    <questionnaireList v-for="(item,index) in listData" ref="questionnaireList" :key="index" :index="index" :item="item" ></questionnaireList>
    <div @click="showDialog" class="questionnaire_issue_button">全部答题已完成</div>
    <van-dialog v-model="dialogShow" @confirm="confirm" @cancel="cancel" :confirmButtonText="WcList.sfdyccj ? '领取红包' : '抽取红包'" cancelButtonText="关闭" :showCancelButton="!WcList.sfdyccj" :showConfirmButton="WcList.hbysd" show-cancel-button >
      <div class="dialogshow">
        <img  src="/static/questionnaire/img_06.png"/>
        <p class="dialog_title">积分通知</p>
        <p class="message" v-if="dialogShow">本次答题获得积分：{{WcList.dtwcBo.bchdjfBo}} </p>
        <p class="message" v-if="dialogShow">累计答题获得积分：{{WcList.dtwcBo.ljjfBo}}</p>
        <p class="comfim" v-show="false">恭喜本次答题获得一次抽红包机会<br/>点击前往抽取红包</p>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import {Tkxx,Dtwc} from "@/api/questionnaire"
import questionnaireList from './components/questionnaire_list';
export default {
  data(){
    return{
      dialogShow:false, //设置弹窗显示状态
      comfim:true, //弹窗是否有进入抽奖页按钮
      listData:'',
      correct:{},
      answer:{},
      WcList:[]
    }
  },
  components:{
    questionnaireList
  },
  computed:{
    zm(){//主题词
     return this.$route.query.zm
    },
    dh(){//主题词代号
      return this.$route.query.dh
    },
    ts(){//题目数量
      return this.$route.query.ts
    }
  },
  methods:{
    showDialog(){
      //获得答对的题目数量
		let tm=[];
     this.$refs['questionnaireList'].forEach(i=>{
       tm.push(i.getVal())
     })
    this.$indicator.open('提交中...')
     Dtwc({fzdh:this.dh,fzmc:this.zm,dtwcXx:tm}).then(rps=>{
       this.$indicator.close()
       if(rps.data.success){
         this.WcList=rps.data.content
         this.dialogShow=true//显示弹窗
      }else{
        this.changtoast(rps.data.message,"error")
      }
     })
    },
    confirm(){//点击抽取红包
      this.$router.push("/questionnaire_lottery/"+this.WcList.sfdyccj+"/"+this.dh)
    },
    cancel(){//点击关闭
      this.$router.push({name:'questionnaire'})
    },
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      console.log(from);
      if(from.path.indexOf("questionnaire") != -1){
        sessionStorage.setItem('beforeUrl', "true");
      }
    });
  },

  created(){
    //获取题目
    Tkxx({fzdh:this.dh,fzmc:this.zm,tmsl:parseInt(this.ts)}).then(rps=>{
      if(rps.data.success){
        let list=rps.data.content
        list.forEach(i => {
            i.tkxxArgs.tmXxXq.forEach(i2=>{
              i2.isselect=false
          })
        });
        this.listData=list
      }else{
        this.changtoast(rps.data.message,"error")
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import "./style/questionnaire_issue.scss";
</style>

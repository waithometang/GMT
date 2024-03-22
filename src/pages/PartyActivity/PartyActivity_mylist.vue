<template>
  <div class="PartyActivity_index">
    <div class="Entrance" @click="proupShow">
      <input v-model="selectTown"  disabled placeholder="请选择镇街或村居"/>
    </div>
    <div class="content">
      <GmtSearchList url="api/PartyBuilding/dyhdList" :useSearch="true" :parms="{sssq:this.sssq,sszj:sszj,wd:true}"  :pageSize="10">
        <template slot="item" slot-scope="listData">
            <div class="publicListTab" v-for="(item,index) in listData.data" :key="index">
              <div class="public_list" @click="goto(item)">
                <div class="public_list_left"  >
                  <div class="public_list_head public_list_head_mailbox_not" >
                    <div class="public_list_head_name public_list_head_name_mailbox_not">
                      <span>{{item.hdbt}}</span>
                    </div>
                  </div>
                  <div class="public_list_base">
                    <div class="public_list_base_li public_list_base_time PartyActivity_index_static PartyActivity_index_static_cor">
                      <span>{{item.hdzt}}</span>
                    </div>
                    <div class="public_list_base_li public_list_base_time">
                      <img  src="/static/FNT_IMAGES/time.png" alt="">
                      <span>{{item.rq}}</span>
                    </div>
                    <div class="public_list_base_li public_list_base_time">
                      <img src="/static/ren_2.png" alt="">
                      <span>可报名({{item.bmrs}}/{{item.zrs}})</span>
                    </div>
                  </div>
                </div>
                <div class="public_list_right">
                  <img  :src="item.hdfm" alt="">
                </div>
              </div>
            </div>
        </template>
      </GmtSearchList>
    </div>
    <van-popup  v-model="show" position="bottom">
      <van-picker show-toolbar value-key='name'  @cancel="closePopup" @confirm="onChange" :columns="EntrancePage" />
    </van-popup>
  </div>
</template>
<script>
import { storage, session_Storage } from "@/js/until";
import GmtSearchList from '@/components/GmtSearchList'
import {EntrancePageApi} from "@/api/FirstLevelPage"
import { Popup  ,Dialog } from 'vant';
export default {
  data () {
    return {
      EntrancePage:'',
      selectTown:'',
      show:false,
      sszj:'',
      sssq:''
    }
  },
  components:{
    GmtSearchList
  },
  created(){
    this.getEntrancePage();
  },
  methods:{
    goto(item){
      this.$router.push("/PartyActivity_detail?id="+item.id)
    },
    getEntrancePage(){
      EntrancePageApi().then(rps=>{
        if(rps.data.success){
        // this.EntrancePage= rps.data.content
        rps.data.content.forEach(item => {
          if(item.id!==1870){
            this.EntrancePage.push(item)
          }
        })
        }else{
          this.changtoast(rps.data.message, "error");
        }
      })
    },
    proupShow(){
      this.show=true
    },
    closePopup(){
      this.show=false
    },
    onChange(item){
      // this.selectTown=item[0]+'  '+(item[1] ? item[1] : '')
      // let jd=this.EntrancePage.find(i=>(i.name==item[0]))
      // this.jdid=jd.id
      // if(item[1]){
      //   this.cjid=jd.children.find(i=>(i.name==item[1])).id
      // }else{
      //   this.cjid=''
      // }
      this.selectTown=item[0]+'  '+(item[1] ? item[1] : '')
      this.sszj=item[0]
      this.sssq=item[1]
      this.show=false
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./style/PartyActivity_index.scss";
.PartyActivity_index /deep/.MissiveList{
    // top: 13vw !important;
}
.content{
  position: fixed;
  width: 100%;
  top: 25vw;
  bottom:0px;
}
</style>
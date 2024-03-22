<template>
  <div class="particular">
    <BetterScroll>
      <template slot="BetterScroll">
        <ul>
          <li v-for="(item, index) in pageData" :key="index">
            <div class="title">{{item.key}}</div>
            <div class="main">{{item.val}}</div>
          </li>
        </ul>
      </template>
    </BetterScroll>
  </div>
</template>
<script>
import { XX } from "@/api/SanLian.js";
import BetterScroll from '@/components/BetterScroll'

export default {
  components: {
    BetterScroll
  },
  computed: {
    FBtype(){
      return this.$route.query.type
    }
  },
  data(){
    return {
      pageData:[]
    }
  },
  created() {
    let fid=this.$route.query.fid
    XX({fid,type:this.FBtype}).then(res=>{
      if(res.data.success){
        this.pageData=res.data.content
      }else{
        this.changtoast(res.data.message,'error')
      } 
    })
  },
}
</script>
<style lang="scss" scoped>
.particular{
  background: #ffffff;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: scroll;
  overflow-x: hidden;
    ul{
      list-style: none;
      margin: 0;
      padding: 0;
      li:nth-child(2n){
        background: #f4f4f4;
      }
        li{
          width: 706px;
          font-size: 28px;
          padding:10px 22px 10px 22px;
          height: auto;
          overflow: hidden;
          vertical-align: middle;
          display: flex;
            .title{
              height: 100%;
              min-width: 200px;
              max-width: 230px;
              height: 90px;
              display: flex;
              align-items: center;
              // justify-content: center;
            }
            .main{
              max-width: 500px;
              display:grid;
              width: 500px;
              // float: right;
              align-items:center;
              justify-content: right;
              min-height: 90px;
              flex: 1;
              text-align: right;
              // margin-left: auto;
            }
        }
    }
}

</style>

<template>
  <div class="element-dy">
    <div class="main">
      <div class="hread">
        <div class="title">{{title}}</div>
        <div class="message">
          <img src="/images/geren.png">{{fbr}}
        </div>
        <div class="message">
          <img src="/images/FirstLevelPage/time.png">2018-12-25
        </div>
      </div>
      <div class="pages" v-html="content"></div>
      <div class="fot">
        <div>
          <div class="message">
            <img src="/images/party-like1.png">评论({{commentCount}})
          </div>
          <div class="message">
            <img src="/images/party-like1.png">点赞({{praisedCount}})
          </div>
        </div>
        <div class="but">
          <div @click="giveLike()">给他点赞</div>
          <div @click="disp">评论</div>
        </div>
      </div>
      <div class="item" v-for="(item,index) in pl_List" :key="index">
        <div class="xinxi">
          <ul>
            <li>
              <img :src="item.icon">
            </li>
            <li>
              <span>{{item.name}}</span>
              <p>{{item.date}}</p>
            </li>
            <li v-show="item.canDel" @click="pl_Del(item.id)">删除</li>
          </ul>
        </div>
        <div class="neirong">{{item.content}}</div>
      </div>
    </div>
    <div :class="{'sc': TagState == 1}" class="comment">
      <textarea placeholder="详细描述...." v-model="pl_text"></textarea>
      <div @click="comment()">发布</div>
    </div>
    <div @click="disp" v-show="ceng" class="ceng"></div>
  </div>
</template>
<script>
import {mapActions} from "vuex"
import { ZlrzXX,ZlrzLike,ZlrzPl,ZlrzPlDel } from "@/api/secondLevelPage.js";
export default {
  data() {
    return {
      TagState: 0,
      ceng: false,
      readedCount:0,
      praisedCount:0,
      commentCount:0,
      pl_text:'',
      title:'',
      content:'',
      fbr:'',
      pl_List:[],
      id:0
    };
  },
  methods: {
    ...mapActions(['showToast',"setLoading"]),
    giveLike(){
      ZlrzLike({id:this.id}).then(res=>{
        if(res.data.success){
          this.changtoast('点赞成功')
          this.getData()
        }else{
          this.changtoast(res.data.message,'error')
        }
      })
    },
    pl_Del(id){
      ZlrzPlDel({id}).then(res=>{
        if(res.data.success){
          this.changtoast('删除成功')
          this.getData()
        }else{
          this.changtoast(res.data.message,'error')
        }
      })
    },
    comment(){
      let parms={content:this.pl_text,rzid:this.id}
      this.setLoading(true)
      ZlrzPl(parms).then(res=>{
        this.setLoading(false)
        if(res.data.success){
          this.pl_text=''
          this.changtoast('评论成功')
          this.disp()
          this.getData()
        }else{
          this.changtoast(res.data.message,'error')
        }
      })
    },
    disp() {
      if (this.TagState == 1) {
        this.TagState = 0;
        this.ceng = false;
      } else {
        this.TagState = 1;
        this.ceng = true;
      }
    },
    getData(){
      ZlrzXX({id:this.id}).then(res=>{
        if(res.data.success){
          this.readedCount=res.data.content.readedCount
          this.praisedCount=res.data.content.praisedCount
          this.commentCount=res.data.content.commentCount
          this.title=res.data.content.title
          this.content=res.data.content.content
          this.fbr=res.data.content.fbr
          this.pl_List=res.data.content.pl_List
        }else{
          this.changtoast(res.data.message)
        }
    })
    }
  },
  created() {
    this.id=this.$route.query.id
    this.getData()
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/pages/secondLevelPages/element-dy.scss";
</style>

<!-- 党员登录 -->
<template>
  <div class="main">
    <div class="hread-img"></div>
    <div class="main-from">
      <ul class="main-ul">
        <li class="main-li">
          <img src="/images/party/party-zhanghu.png"/>
          <input placeholder="请输入账户" type="text" v-model="account"/>
        </li>
            <li class="main-li">
          <img src="/images/party/party-mima.png"/>
          <input placeholder="请输入密码" v-model="password" type="password"/>
        </li>
      </ul>
      <div class="main-but" @click="login">确定</div>
    </div>
    <div class="fot-font">
      账号是您的姓名拼音，忘记密码请联系支部管理员
    </div>
  </div>
</template>
<script>
import {PartyMemberLogin} from '@/api/PartyMemberLogin'

  export default {
    data(){
      return {
        account:'',
        password:''
      }
    },
    methods:{
      login(){
        if(!this.account){
          this.changtoast('账号不能为空', 'error')
          return
        }
        if(!this.password){
          this.changtoast('密码不能为空', 'error')
          return
        }
        let account=this.account,password=this.password
        let that=this
        PartyMemberLogin({account,password})
          .then(res=>{
            if(res.data.success){
              that.setPMToken(res.data.content.token)
              let permission=res.data.content.permission
              that.setPermission(permission)
              that.changtoast('登陆成功')
              if(permission>0){
                that.$router.push({
                  path:'/managePage'
                })
              }else{
                that.$router.back(-1)
              }
            }else{
              that.changtoast(res.data.message, 'error')
            }
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
@import "@/style/pages/secondLevelPages/party/Login.scss"; 
</style>

<template>
    <div class="wdzjz" v-if="hasdata">
        <div class="content">
            <div class="imgdiv" v-if="hasImg">
                <img :src="imgUrl"/>
            </div>
            <div class="bbbb" v-else>
                未获取到认证照片,重新认证获取
            </div>
        </div>
        <div class="footer">
            <div class="btdiv" v-if="!hasImg">
                <mt-button type="primary" :plain="true" @click="getAgain">重新获取</mt-button>
            </div>
            <div class="btdiv">
                <mt-button type="primary" @click="$router.replace('/txewm')">返回</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import {haswjimg,getCertAgain,GetSMXX,getWdzjz} from "@/api/secondLevelPage"
export default {
    computed: {
      certToken(){
        return this.$route.query.certToken
      }
    },
    data () {
        return {
            imgUrl:'',
            hasdata:false,
            hasImg:false,
        }
    },
    inject: ["reload"],
    methods: {
        setImg(val){
            this.imgUrl='http://gmt.gaoming.gov.cn/api/yq/wdzjz/'+val
        },
        setBase64(val){
            this.imgUrl='data:image/jpeg;base64,'+val
        },
        getAgain(){
            this.$indicator.open()
            getCertAgain({}).then(res=>{
            this.$indicator.close()
                if(res.data.success){
                    window.location.href='https://rz.weijing.gov.cn/authgzh/auth?certToken='+res.data.content.cert
                }
            })
        }
    },
    created () {
        this.$indicator.open()
        if (this.certToken) {
            GetSMXX({cert:this.certToken}).then(rps=>{
                this.$indicator.close()
                if (rps.data.success) {
                    this.$router.replace('/wdzjz')
                    this.reload()
                }else{
                    this.changtoast(rps.data.message, 'error')
                }
            })
        }else{
            getWdzjz({}).then(rps=>{
                this.$indicator.close()
                if (rps.data.success) {
                    if (rps.data.content) {
                        this.setBase64(rps.data.content)
                        this.hasdata=true
                        this.hasImg=true
                    }else{
                        this.hasdata=true
                    }
                }else{
                    this.changtoast(rps.data.message, 'error')
                }
            })
            // haswjimg({}).then(rps=>{
            //     this.$indicator.close()
            //     if (rps.data.success) {
            //         if (rps.data.content) {
            //             this.setImg(rps.data.content)
            //             this.hasdata=true
            //             this.hasImg=true
            //         }else{
            //             this.hasdata=true
            //         }
            //     }else{
            //         this.changtoast(rps.data.message, 'error')
            //     }
            // })
        }
    }
}
</script>

<style lang="scss" scoped>
    .wdzjz{
        width:100%;
        height: 100vh;
        overflow: hidden;
        .content{
            text-align: center;
            padding-top: 100px;
            margin-bottom: 100px;
        }
        .footer{
            width:100%;
            .btdiv{
                width:600px;
                margin-top: 50px;
            }
        }
        .mint-button--normal{
            width:100%;
            left:80px;
        }
    }
</style>
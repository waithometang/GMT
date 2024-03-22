<template>
    <div class="container">
        <div class="tips">
            在活动期间将自己的作品分享到抖音、快手、携程、马蜂窝、小红书APP，把发布后的截图上传提交，在最后总评比中能获得对应加分！图片最多可上传5张，且须反映出作品上传后在平台显示的情况哦。（每个作品只能上传一次加分项）
        </div>
        <div class="uploadImg">
            <GmtImageUpload v-model="jfid" :showExists="true" :amount="5"/>
        </div>
        <div @click="backFn" class="back">确定</div>
    </div>
</template>

<script>
import GmtImageUpload from "@/components/GmtImageUpload";
export default {
    data() {
        return {
            jfid:'',
        }
    },
    components:{
        GmtImageUpload
    },
    created () {
        if (this.$route.params.jfid) {
            this.jfid=this.$route.params.jfid
            console.log(this.jfid);
        }else{
            this.$router.replace('/mlgm')
        }
    },
    methods: {
        backFn() {
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped lang="scss">
@import '../style/scjfx.scss';
</style>
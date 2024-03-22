<!-- 疫情报备 -->
<template>
    <div class="yqbbsm">
        <div class="title">
            <img src="/static/images/PersonalHomePage/biaoti.png">
        </div>
        <div class="nr">
            <div class="title1">
                <p>公&nbsp;&nbsp;&nbsp;&nbsp;告</p>
            </div>
            <div class="nr1">
                <p>内容内容内容内容内容内容内容内容内容内容
                内容内容内容内容内容内容内容内容内容内容
                内容内容内容内容内容内容内容内容内容内容
                内容内容内容内容内容内容内容内容内容内容
                内容内容内容内容内容内容内容内容内容内容
                内容内容内容内容内容内容内容内容内容内容</p>
            </div>
        </div>
        <div class="btdiv">
            <div class="bt" @click="goto">我要报备</div>
        </div>
    </div>
</template>

<script>

export default {
    methods: {
        goto(){
            this.$router.push('/yqbb')
        }
    }
}
</script>

<style lang='scss' scoped type="text">
@import '@/style/pages/secondLevelPages/homePage/yqbbsm.scss';
</style>

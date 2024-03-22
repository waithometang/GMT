<template>
    <div class="yqbb">
        <div class="tabs">
            <div class="tab" :class="{'active':!tabIndex}" @click="tabClick(0)">疫情报备</div>
            <div class="tab" :class="{'active':tabIndex}" @click="tabClick(1)">我的报备</div>
        </div>
        <yqbbxx v-show="!tabIndex"></yqbbxx>
        <yqbbwd v-if="tabIndex"></yqbbwd>
    </div>
</template>

<script>
import yqbbxx from '@/components/secondLevelPages/homePage/yqbbxx';
import yqbbwd from '@/components/secondLevelPages/homePage/yqbbwd';

export default {
    components:{
        yqbbxx,
        yqbbwd
    },
    data() {
        return {
            tabIndex:0
        }
    },
    methods: {
        tabClick(index){
            this.tabIndex=index
        }
    }
}
</script>

<style lang='scss' scoped type="text">
@import '@/style/pages/secondLevelPages/homePage/yqbb.scss';
</style>

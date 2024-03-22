<template>
    <div class="container">
        <van-grid :border="false">
            <van-grid-item v-for="(item, index) in gridData" :key="index" :icon="item.img" :text="item.text" @click="goTo(item.url)"/>
        </van-grid>
    </div>
</template>

<script>
export default {
    data() {
        return {
            gridData: [
                // {
                //     img: require('../images/cstg.png'),
                //     text: '参赛投稿',
                //     url: '/mlgm/wdcstg'
                // },
                {
                    img: require('../images/zhtp.png'),
                    text: '精品路线',
                    url: '/mlgm/zhtp'
                },
                {
                    img: require('../images/tpdb.png'),
                    text: '投票打榜',
                    url: '/mlgm/tpdb'
                },
                {
                    img: require('../images/jingpin.png'),
                    text: '精品体验',
                    url: '/mlgm/jpty'
                },
                {
                    img: require('../images/jubao.png'),
                    text: '环境黑点随手拍',
                    url: '/mlgm/jbhjhd'
                }
            ]
        }
    },
    methods: {
        goTo(url) {
            this.$router.push(url);
        }
    }
}
</script>

<style scoped lang="scss">
@import '../style/grid.scss';
</style>
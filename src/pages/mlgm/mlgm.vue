<template>
    <div class="container">
        <water-fall :type="1" ref="waterfall" :call="false">
            <!-- head -->
            <div class="headImg">
                <img src="./images/cover.png" alt="">
            </div>
            <!-- tab -->
            <Grid/>
            <div class="bd"></div>
            <van-notice-bar
                left-icon="volume-o"
                :text="jplxText"
                @click="navClickFn"
                />
            <div class="bd"></div>
            <!-- search -->
            <div class="search">
                <div class="latest">最新</div>
                <div class="search_val">
                    <input type="text" placeholder="输入关键字" v-model="seaVal" v-on:keyup.enter="searchFn(seaVal)">
                    <div @click="searchFn(seaVal)" class="btn">
                        <img src="./images/searchbtn.png" alt="" >
                    </div>
                </div>
                <!-- <GmtSearchList
                    ref="commonList"
                    class="commonList"
                    url="api/mlgm/WeeklyList"
                    :useSearch="useSearch"
                    :parms="{fblxId:20,mkId:1}"
                /> -->
            </div>
        </water-fall>
    </div>
</template>

<script>
import Grid from './component/Grid.vue';
import waterFall from './component/Waterfall.vue';
import GmtSearchList from "@/components/GmtSearchList.vue";
import { WaChatrequireShare } from "@/js/WaChatrequireShare";
import { NoticeBar } from 'vant';
export default {
    data() {
        return {
            showBtn: false,
            scrollTop: 0,
            // showNum: false,
            seaVal: '',
            useSearch: true,
            jplxText:'',
            jpxlId: '',
        }
    },
    components: {
        Grid,
        waterFall,
        GmtSearchList,
        'van-notice-bar': NoticeBar
    },
    mounted() {
        window.addEventListener("scroll",this.handlerScroll,true);
        setTimeout(()=>{
            WaChatrequireShare('美丽高明大发现','“美丽高明大发现”精品路线策划大赛', window.location.pathname.substr(1),'/static/icon/mlgm.png')
          }, 1500)
        this.$post('api/mlgm/getInfo',{}).then(res => {
            if(res.data.success){
                let _data = res.data.content || {}
                if (_data.jpxlgb) {
                    this.jplxText=_data.jpxlgb + '  中签人员名单公布'
                    this.jpxlId=_data.jpxlId
                }
                
            }
        })
    },
    methods: {
        handlerScroll(e) {
            let that = this;
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            // let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            that.scrollTop = scrollTop
            if(that.scrollTop >= 400) {
                that.showBtn = true;
            } else {
                that.showBtn = false;
            }
        },
        navClickFn(){
            if (!this.jpxlId) {
                return
            }
            let url = '/mlgm/jpty/jplxzqmd?id=' + this.jpxlId
            this.$router.push(url)
        },
        backTop() {
            var timer = setInterval(function(){
            let osTop = document.documentElement.scrollTop || document.body.scrollTop;
            let ispeed = Math.floor(-osTop / 5);
            document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
            if(osTop === 0){
              clearInterval(timer);
            }
          },50)
        },
        searchFn() {
            console.log('in');
            this.$refs.waterfall.searchFn({title: this.seaVal})
        }
    }
}
</script>

<style scoped lang="scss">
@import './style/index.scss';
.waterfall{
    /deep/ .commonList{
        top: 0;
        bottom: 0;
    }
}

</style>

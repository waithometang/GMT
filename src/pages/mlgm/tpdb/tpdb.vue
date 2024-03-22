<template>
    <div class="container">
        <!-- tab栏切换 -->
        <van-tabs  v-model="tabIndex" swipeable >
            <van-tab title="每周打榜" name="0">
                <div>
                    <div class="wrapItem">
                        <div class="week">
                            <div class="date" @click="showPicker = true">
                                周榜时间段：{{pageData.week}}
                                <img src="../images/arrowdown.png" alt="">
                            </div>
                        </div>
                        <div class="explain" @click="showDesc">
                            <img src="../images/sm.png" alt="">
                            打榜说明
                        </div>
                        <water-full ref="weekWater" :showNum="showNum" url="api/mlgm/WeeklyList" :call="false"/>
                    </div>
                </div>
            </van-tab>
            <van-tab title="总排行榜" name="1">
                <div>
                    <div class="wrapItem">
                        <div class="week">
                            <div class="total">
                                累计作品数量：{{pageData.count}}
                            </div>
                        </div>
                        <div class="explain" @click="showDesc">
                            <img src="../images/sm.png" alt="">
                            打榜说明
                        </div>
                        <water-full :params="{id:1}" :showNum="showNum" :call="false"/>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
        <!-- 打棒说明 -->
            <!-- <happy-scroll :class="show ? 'mask' : ''"> -->
                <transition name="fade">
                    <div class="wrapper" v-if="show">
                        <div class="block">
                                <div class="header">
                                    <img src="../images/dbsm.png" alt="">
                                </div>
                                <div class="info">
                                    <div class="title"><b><span class="like"></span>点赞、转发功能</b></div>
                                        市民可对主页面显示的作品进行点赞或转发。
                                    <div class="title"><b><span class="week"></span>每周打榜说明：</b></div>
                                    每周对投票点赞数进行统计，投票数排名前五位的作品投稿人可获得相应奖品。获奖结果及如何领奖将通过微信推送通知投稿人。
                                    <div class="title"><b><span class="total"></span>总打榜说明</b></div>
                                        （1）最佳人气奖。
                                        <br/>
                                            作品点赞数最多的前十名可获得“最佳人气奖”，奖励奖品和颁发证书。
                                            <br/>
                                        （2）专业评审奖
                                        <br/>
                                            专业评审奖主要分为“精品攻略奖”“热门攻略奖”和“创意攻略奖”三类，评选得分由专业评审得分（占80分）和额外加分项（占20分）组成。额外加分项指作品同步在抖音、快手、携程、马蜂窝、小红书APP上传推广可得额外加分。同一创作者不重复获奖。奖项设置具体如下：
                                            <br/>
                                            精品攻略奖1名：奖金3000元、奖品、证书；
                                            <br/>
                                            热门攻略奖3名：奖金2000元、奖品、证书；
                                            <br/>
                                            创意攻略奖5名：奖金1000元、奖品、证书。
                                </div>
                                <div class="footer">
                                    <div class="btn" @click="showDesc">
                                        确定
                                    </div>
                                </div>
                        </div>
                    </div>
                </transition>
        <van-popup v-model="showPicker" position="bottom">
            <van-picker
                show-toolbar
                :columns="zclist"
                :default-index="1"
                value-key="date"
                @confirm="onConfirm"
                @cancel="showPicker = false"
            />
        </van-popup>
            <!-- </happy-scroll>   -->
    </div>
</template>

<script>
import waterFull from '../component/Waterfall.vue';
import { HappyScroll } from 'vue-happy-scroll';
import 'vue-happy-scroll/docs/happy-scroll.css';
export default {
    data() {
        return {
            tabIndex: '0',
            show: false,
            showNum: true,
            pageData:{},
            zclist:[],
            showPicker:false,
        }
    },
     components: {
        waterFull,
        HappyScroll
    },
    created() {
        this.$get('api/mlgm/CszpInfo').then(res => {
            if(res.data.success){
                this.pageData=res.data.content
                this.zclist=res.data.content.zcs
            }else{
                this.changtoast(res.data.message,'error')
            }
        });
       

    },
    methods: {
        onConfirm(item){
            this.pageData.week=item.date
            this.$refs.weekWater.searchWeek(item.id)
            this.showPicker=false
        },
        // 显示抽奖说明
        showDesc() {
            const aLiUrl = require("../images/dbsm.png");
            // this.$dialog({
            //     // message: '<img style="width:100px;height:100px;" src="'+aLiUrl+'">'
            //     message: '<img style="width: 200px;height: 40px;margin-top: -24px; position: fixed; left: 50%; transform: translateX(-50%)"  src="'+aLiUrl+'">'+
            //     '<p style="text-align: left;line-height: 26px;margin: 0; color: #333333; margin-top: 20px;><strong>点赞、转发及抽奖功能</strong><br/>市民可对主页面显示的作品进行点赞或转发（每天可对5个作品进行点赞投票，点击一次算10票），只要点赞或转发，均可抽奖，抽奖规则：每个用户ID每天可抽奖一次，奖金待定。' +
            //     '<p style="text-align: left;line-height: 26px;margin: 0; color: #333333;><strong>点赞、转发及抽奖功能</strong><br/>市民可对主页面显示的作品进行点赞或转发（每天可对5个作品进行点赞投票，点击一次算10票），只要点赞或转发，均可抽奖，抽奖规则：每个用户ID每天可抽奖一次，奖金待定。' +
            //     '<p style="text-align:left;line-height: 26px; margin: 0; color: #333333;"><strong>每周打榜说明：</strong><br/>每周对点赞投票数进行统计，投票数排名前10位的作品投稿人可获得对应奖品（初定2张门票），获奖结果及如何领奖需微信推送给获奖者。（前一周已获奖的，后面的每周打榜不再纳入统计，但总排名需一直统计）</p>'+
            //     '<p style="text-align: left;line-height: 26px;margin: 0; color: #333333;"><strong>总打榜说明</strong><br/>（1）最佳人气奖。<br/>作品点赞数最多的前十名可获得“最佳人气奖”，奖励奖品和颁发证书。<br/>（2）专业评审奖<br/>专业评审奖主要分为“精品攻略奖”“热门攻略奖”和“创意攻略奖”三类，评选得分由专业评审得分（占80分）和额外加分项（占20分）组成。专业评审组由专业评委、主办方、市民代表组成；额外加分项指作品同步在抖音、快手、携程、马蜂窝、小红书APP上传推广可得额外加分。同一创作者不重复获奖。奖项设置具体如下：<br/>精品攻略奖1名：奖金3000元、奖品、证书；<br/>热门攻略奖3名：奖金2000元、奖品、证书；<br/>创意攻略奖5名：奖金1000元、奖品、证书。</p>',
            //     // '<div class="btn" onclick="btnFn"><p style="padding: 10px 100px; background:rgba(255,211,0,1);border-radius:43px;font-size:20px;font-weight:bold;color:rgba(51,51,51,1);">确定</p></div>',
            //     confirmButtonText: '确定',
            //     confirmButtonColor: '#000',
                
            //     // cancelButtonText: <p style="display: none;"></p>
            // });
            this.show = !this.show;
        }
    }
}
</script>

<style scoped lang="scss">
@import '../style/tpdb.scss';
.fade-enter-active, .fade-leave-active {
      transition: opacity .5s
}
.fade-enter, .fade-leave-active {
      opacity: 0
}
</style>
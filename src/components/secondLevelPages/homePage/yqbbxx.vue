<template>
    <div class="yqbbxx">
        <div class="card">
            <div class="title row">基本信息</div>
            <div class="row">
                <div class="t1">姓&nbsp;&nbsp;名</div>
                <div class="n1">
                    <div v-if="readonly"></div>
                    <input v-else placeholder="请输入需报备人姓名" v-model="info.xm"  type="text">
                </div>
            </div>
            <div class="row">
                <div class="t1">性&nbsp;&nbsp;别</div>
                <div class="n1">
                    <div v-if="readonly"></div>
                    <input v-else placeholder="请选择需报备人性别" v-model="info.xm" readonly type="text" @click="selectSex">
                </div>
            </div>
            <div class="row">
                <div class="t1">联系方式</div>
                <div class="n1">
                    <div v-if="readonly"></div>
                    <input v-else placeholder="请输入需报备人的联系方式" v-model="info.xm"  type="text">
                </div>
            </div>
        </div>
        <div class="card">
            <div class="title row">相关问题</div>
            <div class="row col">
                <div class="question"><p>1月8日至今是否到过湖北省？</p></div>
                <YesNo class="answer" v-model="info.sfqghb" :readonly="readonly"></YesNo>
            </div>
            <div class="row col">
                <div class="question"><p>1月8日至今是否接触过湖北省人员？</p></div>
                <YesNo class="answer" v-model="info.sfqghb1" :readonly="readonly"></YesNo>
            </div>
            <div class="row col">
                <div class="question"><p>是否有与确诊或疑似病例接触？</p></div>
                <YesNo class="answer" v-model="info.sfqghb2" :readonly="readonly"></YesNo>
            </div>
            <div class="row col">
                <div class="question"><p>是否有发热、乏力、咳嗽或者鼻塞、流鼻涕等症状？</p></div>
                <YesNo class="answer" v-model="info.sfqghb3" :readonly="readonly"></YesNo>
            </div>
        </div>
        <div class="card">
            <div class="title row row2">
                <div>留言内容</div>
                <p class="bzsm">请写明乘坐的交通工具，班次，时间，出发及到达地点</p>
            </div>
            <div class="row col">
                <div v-if="readonly"></div>
                <textarea class="bz" v-else placeholder="请输入... " v-model="info.bz" type="text"></textarea>
            </div>
        </div>
        <!-- <mt-popup v-model="popupVisible" position="bottom">
            <div class="affirm" @click="clickAffirm">确认</div>
            <mt-picker :slots="slots" :visibleItemCount="3" valueKey="name" @change="onValuesChange"></mt-picker>
        </mt-popup> -->
        <div class="btdiv">
            <div class="bt" @click="tj">提交</div>
        </div>
    </div>
</template>

<script>
import YesNo from '@/components/secondLevelPages/homePage/YesNo';

export default {
    props:{
        readonly:{
            type: Boolean,
            default: false
        }
    },
    components:{
        YesNo
    },
    data() {
        return {
            info:{
                xm:'',
                sfqghb:'',
                sfqghb1:'',
                sfqghb2:'',
                sfqghb3:'',
                bz:''
            },
            popupVisible:false,
            tabIndex:0
        }
    },
    methods: {
        tabClick(index){
            this.tabIndex=index
        },
        selectSex(){
            this.popupVisible = true
        },
        onValuesChange (picker, values) {
            this.ValuesChange = values[0]
        },
        tj(){
            console.log(this.info);
            
        }
    }
}
</script>

<style lang='scss' scoped type="text">
@import '@/style/components/secondLevelPages/homePage/yqbbxx.scss';
</style>

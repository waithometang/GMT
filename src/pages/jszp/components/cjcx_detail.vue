<template>
    <div class="container">
        <div class="searchresult">
            <div class="top">
                <div class="left"></div>
                <div class="right">查询结果</div> 
            </div>
            <div class="middle">
                {{data.ccmc}}
            </div>
            <div class="bottom">
                <span>{{data.gbrq}}</span>
                <!-- <span>15:37</span> -->
            </div>
        </div>
        <div class="line"></div>
        <div class="content">
            <div class="info">
                <div class="left">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名&nbsp;:</div>
                <div class="right">{{data.xm}}</div>
            </div>
            <div class="info">
                <div class="left">身份证号&nbsp;:</div>
                <div class="right">{{data.sfzh}}</div>
            </div>
            <div class="info">
                <div class="left">成绩&nbsp;:</div>
                <div class="right">{{data.cj}}分</div>
            </div>
            <div class="info" v-if="data.pm">
                <div class="left">排名&nbsp;:</div>
                <div class="right">{{data.pm}}</div>
            </div>
            <div class="info">
                <div class="left">成绩结果&nbsp;:</div>
                <div class="right">{{data.cjjg}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        data:{
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
.container {
    background-color: #fff;
    margin-top: 14px;
    padding: 35px 30px;
    .searchresult {
        .top {
            display: flex;
            align-items: center;
            .left {
                width:6px;
                height:30px;
                background:rgba(255,197,1,1);
                border-radius:3px;
            }
            .right {
                font-size:32px;
                font-family:PingFang SC;
                font-weight:bold;
                color:rgba(51,51,51,1);
                margin-left: 17px;
            }
        }
        .middle {
            margin-top: 35px;
            margin-bottom: 18px;
            font-size:30px;
            font-family:PingFang SC;
            font-weight:bold;
            color:rgba(51,51,51,1);
        }
        .bottom {
            font-size:24px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(172,172,172,1);
            // span {
                
            // }
        }
    }
    .line {
        margin-top: 28px;
        margin-bottom: 28px;
        height:1px;
        background:rgba(238,238,238,1);
    }
    .content{
       .info {
           display: flex;
           justify-content: space-between;
        //    font-family:PingFang SC;
        //    font-weight:500;
        //    color:rgba(108,108,108,1);
           margin-bottom: 30px;
            .left {
                font-size:28px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(108,108,108,1);
            }
            .right {
                font-size:28px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(51,51,51,1);
            }
       } 
    }
}
</style>
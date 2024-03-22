<template>
    <div class="container">
        <div class="searchresult">
            <div class="top">
                <div class="left"></div>
                <div class="right">查询结果<span class="red">（具体成绩以佛山市中考成绩条为准）</span></div> 
            </div>
            <div class="middle">
                总分：{{data.zf}}分
            </div>
            <div class="bottom">
                <span>{{data.gbrq}}</span>
                <!-- <span>15:37</span> -->
            </div>
        </div>
        <div class="line"></div>
        <div class="content">
            <div class="info">
                <div class="left">姓&emsp;&emsp;名&nbsp;:</div>
                <div class="right">{{data.xm}}</div>
            </div>
            <div class="info">
                <div class="left">考&nbsp;&nbsp;生&nbsp;&nbsp;号&nbsp;:</div>
                <div class="right">{{data.ksh}}</div>
            </div>
            <div class="info">
                <div class="left">出生日期&nbsp;:</div>
                <div class="right">{{data.csrq}}</div>
            </div>
            <div class="info">
                <div class="left">报&nbsp;&nbsp;名&nbsp;&nbsp;点&nbsp;:</div>
                <div class="right">{{data.bmdmc}}</div>
            </div>
            <div class="info">
                <div class="left">语&emsp;&emsp;文&nbsp;:</div>
                <div class="right">{{data.yw}}</div>
            </div>
            <div class="info">
                <div class="left">数&emsp;&emsp;学&nbsp;:</div>
                <div class="right">{{data.sx}}</div>
            </div>
            <div class="info">
                <div class="left">英&emsp;&emsp;语&nbsp;:</div>
                <div class="right">{{data.yy}}</div>
            </div>
            <div class="info">
                <div class="left">物&emsp;&emsp;理&nbsp;:</div>
                <div class="right">{{data.wl}}</div>
            </div>
            <div class="info">
                <div class="left">化&emsp;&emsp;学&nbsp;:</div>
                <div class="right">{{data.hx}}</div>
            </div>
            <div class="info">
                <div class="left">道&emsp;&emsp;法&nbsp;:</div>
                <div class="right">{{data.df}}</div>
            </div>
            <div class="info">
                <div class="left">体&emsp;&emsp;育&nbsp;:</div>
                <div class="right">{{data.ty}}</div>
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
            .red {
                color: red;
                font-size:23px;
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
<template>
    <div class="fgtb">
        <div class="bg">
            <img src="/static/images/PersonalHomePage/fgtbbg.png">
        </div>
        <div class="card">
            <div class="btitle">
                企业员工健康申报
            </div>
            <div class="content">
                广东企业注意!为充分发挥“数字政府”对疫情防控工作的支撑作用，保障重要疫情信息公开透明，帮助企业组织健康管理在线化、数字化，实现员工健康关怀、疫情防控管理。
                <span class="red">2020年2月4日起</span>，我省所有企业法定代表人(或其授权的管理员)可<span class="red">登录“粤商通”APP</span>
                ,打开[员工健康] - [邀请员工申报]，将申报小程序码分享给员工，<span class="red">邀请全体员工完成个人健康情况申报</span>
                ;也可直接通知全体员工登录“粤商通”APP，打开[员工健康]，通过<span class="red">绑定企业完成个人健康情况申报</span>。
            </div>
            <div class="foot">
                <div class="left">
                    <div class="code">
                        <img src="/static/images/PersonalHomePage/fgtbcode.png">
                    </div>
                    <p>佛山市佛山防疫宣传</p>
                </div>
                <div class="right">
                    <div class="button">
                        <img src="/static/images/PersonalHomePage/button.png">
                    </div>
                    <p>下载“粤商通”APP</p>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="ttitle">
                <p>针对企业法定代表人或管理员</p>
            </div>
            <div class="content">
                1、<span class="red">分享企业专属的申报小程序码</span>，邀请全体员工完成个人健康情况申报，快速收集、统计员工健康信息; <br>
                2、<span class="red">查看企业员工的健康统计数据及员工健康详情</span>，分享企业员工健康统计数据(非员工健康详情）。
            </div>
        </div>
        <div class="card">
            <div class="ttitle">
                <p>针对企业员工</p>
            </div>
            <div class="content">
                <span class="red">有两种方式完成个人健康情况申报:</span><br>
                1、通过识别企业的法定代表人分享的小程序码打开“粤省事”小程序[个人健康申报],登记个人健康状况;<br>
                2、直接刷脸登录“粤商通”APP，通过绑定、关联所就职的企业，完成个人健康情况申报。
            </div>
        </div>
        <div class="card">
            <div class="ttitle orange">
                <p>特别说明</p>
            </div>
            <div class="content">
                根据广东省政府《关于应对新型冠状病毒感染的肺炎疫情支持企业复工复产的若干政策措施》、佛山市新型冠状病毒感染的肺炎疫情防控指挥部办公室《关于实施“八项严管”防控疫情措施的通告》等文件规定，企业申请开(复)工，需进行相关报备。
                <span class="red">企业通过“粤商通”进行员工健康情况报备后，相关资料将及时移交相应区、镇街主管部门跟踪处理</span>
                。该报备仅作为企业开(复) 工的参考条件之一，具体条件以各区、镇街主管部门]核实同意并下发的开(复)工通知为准。尚未收到开(复)工通知的，需最大程度动员本企业员工暂时不返回佛山。
                <br><br><span class="red">目前仅支持有营业执照的市场主体</span>
                ，包括内外资企业、农民专业合作社、各类分支机构和个体户等。  
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .fgtb{
        background-color: #109FC7;
        position: relative;
        z-index: 9997;
        padding: 303px 30px 1px 30px;
        .bg{
            top: 0px;
            left: 0px;
            z-index: 9998;
            position:absolute;
            img{
                width:100%;
            }
        }
        .card{
            position: relative;
            z-index: 9999;
            background:rgba(255,255,255,1);
            border-radius:16px;
            padding: 0px 24px 34px 24px;
            margin-bottom: 90px;
            text-align: center;
            .ttitle{
                position: relative;
                top: -33px;
                left: 80px;
                width:475px;
                height:66px;
                background:rgba(34,99,202,1);
                border-radius:30px;
                p{
                    font-size:32px;
                    line-height: 66px;
                    font-family:SimHei;
                    font-weight:bold;
                    color:rgba(255,255,255,1);
                }
            }
            .orange{
                background-color: #FF952D;
            }
            .content{
                font-size:28px;
                line-height: 48px;
                font-family:SimHei;
                text-align: left;
                font-weight:400;
                color:rgba(51,51,51,1);
                .red{
                    color:#EC3939;
                }
            }
        }
        .btitle{
            width:100%;
            text-align:center;
            font-size:72px;
            line-height: 142px;
            font-family:Microsoft YaHei;
            font-weight:bold;
            margin: 10px 0px 0px 0px;
            color:rgba(34,99,202,1);
            text-shadow:3px 4px 1px rgba(0, 0, 0, 0.22);

        }
        .foot{
            display: flex;
            width: 100%;
            .left{
                padding: 10px 10px 0px 10px;
                .code{
                    position: relative;
                    z-index: 999;
                    width:194px;
                    height: 191px;
                    margin-left: 19px;
                }
                img{
                    width:100%;
                    height: 100%;
                    pointer-events: all;
                }
                p{
                    font-size:26px;
                    font-family:SimHei;
                    font-weight:400;
                    color:rgba(127,127,127,1);

                }
            }
            .right{
                padding: 61px 10px 0px 60px;
                text-align: center;
                .button{
                    width:253px;
                    height: 66px;
                    margin-left: 19px;
                }
                img{
                    width:100%;
                    height: 100%;
                }
                p{
                    font-size:30px;
                    font-family:SimHei;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                }
            }
        }
    }
</style>
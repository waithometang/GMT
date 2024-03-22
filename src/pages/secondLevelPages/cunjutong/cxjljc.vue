<template>
    <div class="cxjljc" @click="begincheck()">
        <div class="ss">
            <button >test</button>
        </div>
    </div>
</template>

<script>
import wx from 'weixin-js-sdk'


export default {
    methods: {
        begincheck(){
            wx.ready(()=>{
                wx.scanQRCode({
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    },
                    fail: function(res){
                        alert("kkk")
                        alert(JSON.stringify(res))
                    }
                });
            })
        }
    },
    created () {
        let that = this
        wx.checkJsApi({
            jsApiList: ["scanQRCode",],
            success: function (rps) {
                if (!rps.checkResult.scanQRCode) {
                    that.changtoast('当前微信版本不支持该功能请升级', "error")
                }
            },
            fail: function (rps) {
                that.changtoast('检查失败', "error")
            }
        })
    }
}
</script>

<style lang="scss" scoped>
    .cxjljc{
        width: 100%;
        height: 720px;
        background-color: #000;

    }
</style>
<template>
  <div class="xxxzlx">
    <div class="middle">
      <div class="middle-title">上传资料照片（必须上传原件）</div>
      <div class="info-list">
        <div v-for="val in zmzllist" :key="val.id">
          <publicUploadPictures
            :ref="'uploadpic' + val.id"
            ImagesKey="JSZPIMG"
            :title="val.desc"
            :loaclData="!isView && !bmid"
            :state="val.id"
            :isNeed="val.sfbx === 1"
            :amount="val.desc.indexOf('免冠') > -1 ? 1 : 9"
          />
        </div>
      </div>
    </div>
    <div class="base" v-if="!isView">
      <div class="base-tab">
        <div class="public-long-but" @click="beforeStep">上一步</div>
      </div>
      <div class="base-tab" v-if="isView">
        <div class="public-long-but" @click="goback">返回</div>
      </div>
      <div class="base-tab" v-else>
        <div class="public-long-but" @click="nextStep">下一步</div>
      </div>
    </div>
    <van-dialog v-model="show" class="dialog">
      <p class="title">确认报名</p>
      <p class="item">
        本人如实填写本人信息，并已再次确认报名信息准确无误，本人承诺对所填信息的真实性、完整性及有效性负责。
      </p>
      <div class="btn">
        <div
          class="btn_item_submit"
          :class="{ active: cannotClick }"
          @click="submit"
        >
          本人已阅读，确认提交<span v-if="cannotClick">（{{ count }}秒）</span>
        </div>
        <div class="btn_item_back" @click="back">
          <span>返回修改</span>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import publicUploadPictures from "@/components/publicUploadPictures";
import GmtImageUpload from "@/components/GmtImageUpload";
import { WaChatUploadPictures } from "@/js/WaChatUploadPictures";
import { GetWechatConfig } from "@/api/GetWechatConfig"
import { WeChatGetLocation } from "@/js/WeChatGetLocation"
export default {
  data () {
    return {
      baseData: {
      },
      zmzllist: [],
      rxlblxs: [],
      WaChatConfigData: "",
      tabState: 2,
      show: false,
      checked: false,
      count: 30,
      cannotClick: true,
      mainid: '',
      sourceType: ["album", "camera"]
    };
  },
  methods: {
    beforeStep () {
      // localStorage.setItem('JSZPIMG', JSON.stringify(this.mainid))
      this.$router.go(-1)
    },
    nextStep () {
      // this.$dialog.confirm({ title: "重要提示", message: '本人如实填写本人信息，并已再次确认报名信息准确无误，本人承诺对所填信息的真实性、完整性及有效性负责。' }).then(res => {
      //   this.submitFn()
      // })
      this.show = true
      this.count = 30
      setTimeout(this.countFn, 1000)
    },
    submitFn () {
      let zkgw_id, dxlx_id, bkdw
      let jszpData = this.$store.state.jszpData
      if (this.bmid) {
        if (!jszpData.baseData) {
          this.$toast('请勿刷新页面')
          this.$router.replace('/zkbm/wybm')
          return
        }
        jszpData.baseData.bmid = this.bmid
      } else {
        if (!jszpData.gwxx) {
          this.$toast('请勿刷新页面')
          this.$router.replace('/zkbm/wybm')
          return
        }
      }
      zkgw_id = jszpData.gwxx.id
      dxlx_id = jszpData.dxlxData.id
      bkdw = jszpData.gwxx.zkdw
      let picDoms = [];
      let zlList = this.zmzllist, zlDatas = []
      for (let index = 0; index < zlList.length; index++) {
        const el = zlList[index];
        let dom = this.$refs["uploadpic" + el.id][0];
        let data = dom.getMainId();
        if (data.number === 0 || !data.mainId) {
          if (el.sfbx === 1) {
            this.changtoast("请上传" + el.desc, 'warning');
            return;
          }
        } else {
          zlDatas.push({ id: el.id, mainid: data.mainId });
          picDoms.push(dom);
        }
      }


      let _params = { ...jszpData.baseData }
      _params.dxlx_id = dxlx_id
      _params.zkgw_id = zkgw_id
      _params.bkdw = bkdw
      _params.zls = zlDatas

      jszpData.jtcys.forEach(jtcy => {
        jtcy.id = 0
      })
      _params.jtcys = jszpData.jtcys
      // console.log(dxlx_id);
      // console.log(_params);
      this.$indicator.open('提交中...')
      this.$post('api/jszp/zkbm', _params).then(res => {
        this.$indicator.close()
        if (res.data.success) {
          this.$store.commit('Clear_JszpData', zkgw_id)  //清除报名数据
          picDoms.forEach(picdom => {
            picdom.removeStorageImage();
          });
          this.$toast('提交成功')
          this.$router.replace('zgcx')
        } else {
          this.changtoast(res.data.message, 'error')
        }
      })
    },
    readFn () {
      this.checked = !this.checked
    },
    back () {
      this.show = false
    },
    submit () {
      if (!this.cannotClick) {
        this.submitFn()
      }
    },
    countFn () {  //倒数
      this.count--
      if (this.count === 0) {
        this.cannotClick = false
      } else {
        setTimeout(this.countFn, 1000)
      }
    },
    getLocation () {
      var u = navigator.userAgent
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1 //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
      let url = ""
      if (isAndroid) {
        url = location.href
      }
      if (isIOS) {
        url = location.href.split("#")[0] //hash后面的部分如果带上ios中config会不对
      }
      GetWechatConfig({
        url: url
      }).then(rps => {
        if (rps.data.success) {
          this.WaChatConfigData = rps.data.content
          WeChatGetLocation(this.WaChatConfigData, this)
        } else {
          this.changtoast(rps.data.message, "error")
        }
      })
    },
  },
  created () {
    this.getLocation()
    let jszpData = this.$store.state.jszpData
    if (!jszpData.gwxx) {
      this.$toast.fail('获取报考岗位信息失败,请重新选择')
      this.$router.replace('wybm')
      return
    }
    this.zmzllist = jszpData.dxlxData.zls
    // this.mainid = JSON.parse(localStorage.getItem('JSZPIMG'));
    if (this.bmid) {
      this.$indicator.open('加载中...')
      this.$get('api/jszp/bmzl?id=' + this.bmid).then(res => {
        this.$indicator.close()
        if (res.data.success) {
          this.$nextTick(() => {
            let zls = res.data.content.datas;
            zls.forEach(el => {
              let _ref = this.$refs["uploadpic" + el.zlid];
              if (_ref && _ref.length > 0) {
                _ref[0].setPictures(el.idurls, el.main_id);
              }
            });
          })
        } else {
          this.changtoast(res.data.message, 'error')
        }
      })
    }
  },
  components: {
    publicUploadPictures, GmtImageUpload
  },
  computed: {
    bmid () {
      return this.$route.query.bmid;
    },
    isView () {
      //只看模式，不能修改
      return this.$route.query.m === "v";
    },
    isEdit () {
      //查看模式，待审查前
      return this.$route.query.m === "e";
    },
  },
};
</script>

<style lang='scss' scoped>
@import '../../zkbm/style/sczl.scss';
/deep/ .van-dialog__footer {
  display: none;
}
.dialog {
  padding: 20px;
  .title {
    font-size: 32px;
    font-weight: bold;
    color: #333333;
    text-align: center;
  }
  .item {
    font-size: 28px;
    font-weight: 500;
    color: #333333;
    padding: 0 61px;
    line-height: 50px;
  }
  .btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 61px;
    .btn_item_submit {
      width: 100%;
      height: 80px;
      background: #ffc501;
      border-radius: 10px;
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      color: #333333;
      line-height: 80px;
    }
    .active {
      background: #cacaca;
    }
    .btn_item_back {
      font-size: 28px;
      font-weight: 500;
      color: #ffc501;
      padding: 30px 0;
    }
  }
}
.upload-pictures-title {
  text-align: left;
  font-size: 28px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  span {
    color: red;
  }
}
</style>

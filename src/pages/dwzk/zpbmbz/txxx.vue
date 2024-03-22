<template>
  <div class="xxtxxx">
    <van-skeleton title :row="10" :loading="!show">
      <template v-if="show">
        <div class="middle">
          <div class="middle-title" v-if="!isView">填写报名信息</div>
          <div class="middle-input">
            <van-form
              @submit="onSubmit"
              ref="form"
              label-align="right"
              :scroll-to-error="true"
            >
              <van-field
                :value="gwxx.gwmc"
                disabled
                required
                label="应聘岗位"
              />
              <van-field :value="gwxx.dm" disabled required label="职位代码" />
              <GmtField v-model="baseData.xm" label="姓名" disabled />
              <idCardF v-model="baseData.zjhm" disabled />
              <sexSelector v-model="baseData.xb" :readonly="isView" />
              <nationSelector v-model="baseData.mz" :readonly="isView" />
              <datetimeSelector
                :minDate="birthminDate"
                v-model="baseData.csrq"
                label="出生年月"
                :readonly="isView"
              />
              <areaSelector
                v-model="baseData.jg"
                label="籍贯"
                :readonly="isView"
              />
              <zzmmSelector v-model="baseData.zzmm" :readonly="isView" />
              <vant-selector
                v-model="baseData.hyzt"
                :columns="['未婚', '已婚', '离异', '丧偶']"
                label="婚姻状况"
                :readonly="isView"
              />
              <addressSelector
                v-model="baseData.hjdz"
                label="户籍地址"
                :readonly="isView"
              />
              <GmtField v-model="baseData.yb" label="邮编" :readonly="isView" />
              <areaSelector
                v-model="baseData.syd"
                label="生源地"
                :readonly="isView"
              />
              <datetimeSelector
                :minDate="birthminDate"
                v-model="baseData.bysj"
                label="毕业时间"
                :readonly="isView"
              />
              <GmtField
                v-model="baseData.qrz_byxx"
                label="毕业院校"
                :readonly="isView"
              />
              <vant-selector
                v-model="baseData.xllb"
                :columns="xllbOptions"
                label="学历类别"
                :readonly="isView"
              />
              <vant-selector
                v-model="baseData.qrz_xl"
                :columns="['本科', '研究生']"
                label="学历"
                :readonly="isView"
              />
              <vant-selector
                v-model="baseData.xw"
                :columns="['学士', '硕士', '博士', '无']"
                label="学位"
                :readonly="isView"
              />
              <GmtField
                v-model="baseData.qrz_zy"
                label="所学专业"
                :readonly="isView"
              />
              <addressSelector
                v-model="baseData.txdz"
                label="通讯地址"
                :readonly="isView"
              />
              <mobile
                v-model="baseData.lxdh"
                label="联系电话"
                :readonly="isView"
              />
              <!-- <datetimeSelector
                v-if="baseData.zzmm == '中共党员'"
                :minDate="birthminDate"
                v-model="baseData.rdrq"
                label="入党时间"
                :readonly="isView"
              />
              <vant-selector
                v-model="baseData.qrz_xl"
                :columns="[
                  '小学',
                  '初中',
                  '高中',
                  '中专',
                  '大专',
                  '本科',
                  '硕士',
                  '博士'
                ]"
                label="全日制学历"
                :readonly="isView"
              /> -->
              <!-- <GmtField v-model="baseData.qrz_byyx" label="毕业院系" :readonly="isView"/> -->
              <GmtField
                v-model="baseData.zyjszg"
                label="专业技术资格"
                :readonly="isView"
              />
              <GmtField
                v-model="baseData.zyzg"
                label="执业(职业)资格"
                :readonly="isView"
              />
              <!-- <vant-selector v-model="baseData.zyzg" :columns="getArr(gwxx.zyzgyq)" label="执业（职业）资格" :readonly="isView" /> -->
              <GmtField
                v-model="baseData.wysp"
                label="外语水平"
                :readonly="isView"
              />
              <GmtField
                v-model="baseData.jsjsp"
                label="计算机水平"
                :readonly="isView"
              />
              <GmtField
                v-model="baseData.sg"
                type="digit"
                label="身高"
                rightWord="CM"
                :readonly="isView"
              />
              <GmtField
                v-model="baseData.tz"
                type="digit"
                label="体重"
                rightWord="KG"
                :readonly="isView"
              />
              <van-row>
                <van-col :span="14">
                  <GmtField
                    v-model.number="baseData.lssll"
                    placeholder="左眼视力"
                    type="number"
                    label="裸视视力"
                    rightWord="左"
                    :readonly="isView"
                  />
                </van-col>
                <van-col :span="9">
                  <GmtField
                    v-model.number="baseData.lsslr"
                    placeholder="右眼视力"
                    type="number"
                    rightWord="右"
                    :readonly="isView"
                  />
                </van-col>
              </van-row>
              <van-row>
                <van-col :span="14">
                  <GmtField
                    v-model.number="baseData.jzsll"
                    placeholder="左眼视力"
                    type="number"
                    label="矫正视力"
                    rightWord="左"
                    :readonly="isView"
                  />
                </van-col>
                <van-col :span="9">
                  <GmtField
                    v-model.number="baseData.jzslr"
                    placeholder="右眼视力"
                    type="number"
                    rightWord="右"
                    :readonly="isView"
                  />
                </van-col>
              </van-row>
              <GmtField
                v-model="baseData.xgzdw"
                label="现工作单位"
                :readonly="isView"
              />
              <GmtField
                v-model="baseData.dwxz"
                label="单位性质"
                :readonly="isView"
              />
              <vant-selector
                v-model="baseData.lngzjy"
                :columns="['是', '否']"
                label="是否具有2年以上工作经历"
                :readonly="isView"
              />
              <!-- <vant-selector
                v-model="baseData.zz_xl"
                :columns="['大专', '本科', '硕士', '博士']"
                :required="false"
                label="在职学历"
                :readonly="isView"
              />
              <GmtField
                v-model="baseData.zz_byxx"
                label="在职毕业院校"
                :readonly="isView"
                :required="false"
              />
              <GmtField v-model="baseData.zz_byyx" label="毕业院系" :readonly="isView" :required="false"/>
              <GmtField
                v-model="baseData.zz_zy"
                label="专业名称"
                :readonly="isView"
                :required="false"
              /> -->
              <!-- <vant-selector
                v-model="baseData.sftwjr"
                :columns="['是', '否']"
                label="是否退伍军人"
                :readonly="isView"
              />
              <vant-selector
                v-model="baseData.sfcmgb"
                :columns="['是', '否']"
                label="是否在任村（居）民小组党组织班子"
                :readonly="isView"
              />
              <vant-selector
                v-model="baseData.sfdzzgb"
                :columns="['是', '否']"
                label="是否在任村（居）民小组党组织干部"
                :readonly="isView"
              />
              <vant-selector
                v-model="baseData.sfjtjjzzgb"
                :columns="['是', '否']"
                label="是否在任村（居）民小组集体经济组织干部"
                :readonly="isView"
              /> -->
              <!-- <addressSelector
                v-model="baseData.xjzd"
                label="现居住地"
                :readonly="isView"
              />
              <GmtField
                v-model="baseData.xgzzw"
                label="现工作职务"
                :readonly="isView"
                :required="false"
              /> -->
              <GmtField
                v-model="baseData.grjl"
                autosize
                show-word-limit
                type="textarea"
                :maxlength="300"
                label="学习、工作经历"
                placeholder="何年何月至何年何月在何地、何单位工作或学习、任何职，从中学开始，按时间先后顺序填写"
                :readonly="isView"
              />
              <GmtField
                v-model="baseData.grtc"
                autosize
                show-word-limit
                type="textarea"
                :maxlength="100"
                label="特长/突出业绩"
                placeholder="特长/突出业绩"
                :readonly="isView"
              />
              <GmtField
                v-model="baseData.hjqk"
                autosize
                show-word-limit
                type="textarea"
                :maxlength="100"
                label="奖惩情况"
                placeholder="奖惩情况"
                :readonly="isView"
              />
            </van-form>
          </div>
        </div>
        <div class="yellow-btn2" v-if="!isView">
          <div class="base-tab">
            <div class="public-long-but" @click="beforeStep">上一步</div>
          </div>
          <div class="base-tab">
            <div class="public-long-but" @click="nextStep">下一步</div>
          </div>
        </div>
        <!-- <div class="base" v-else-if="jg==2">
        <div class="base-tab width">
          <div class="public-long-but" @click="compile">点击重新编写资料</div>
        </div>
      </div> -->
        <div
          class="yellow-btn2"
          v-else-if="baseData.sczt == '已审查' && baseData.scjg == '不通过'"
        >
          <div class="base-tab">
            <div class="public-long-but" @click="gotoIndex">点击返回首页</div>
          </div>
          <div class="base-tab">
            <div class="public-long-but" @click="modified">点击修改资料</div>
          </div>
        </div>
        <div class="base" v-else-if="jg == 3">
          <div class="base-tab width">
            <div class="public-long-but" @click="gotoIndex">点击返回首页</div>
          </div>
        </div>
      </template>
    </van-skeleton>
  </div>
</template>

<script>
import sexSelector from "@/components/vantSelector/sex"
import nationSelector from "@/components/vantSelector/nation"
import addressSelector from "@/components/vantSelector/address"
import areaSelector from "@/components/vantSelector/area"
import datetimeSelector from "@/components/vantSelector/datetime"
import mobile from "@/components/vantField/mobile"
import idCardF from "@/components/GmtIdCardField"
import zzmmSelector from "@/components/vantSelector/zzmm"
import GmtField from "@/components/GmtField"
import wjutils from "@/js/WjSmrzUtil"
import { getBirthdayFromIdcard } from "@/js/commonUtils"
// import { GetWechatConfig } from "@/api/GetWechatConfig";
// import { xxxx } from "@/api/xzxxApi";
export default {
  components: {
    sexSelector,
    idCardF,
    nationSelector,
    addressSelector,
    areaSelector,
    datetimeSelector,
    mobile,
    GmtField,
    zzmmSelector
  },
  computed: {
    bmid () {
      return this.$route.query.bmid
    },
    isView () {
      //查看模式，不能修改
      return this.$route.query.m === "v"
    },
    isEdit () {
      //修改模式
      return this.$route.query.m === "e"
    },
    jg () {
      return this.$route.query.jg
    }
  },
  data () {
    return {
      show: false,
      birthminDate: new Date(1900, 0, 1),
      gwxx: {},
      zjlxData: ["身份证", "港澳居民居住证", "护照"],
      xllbOptions: ["全日制", "非全日制"],
      baseData: {},
      tabState: 1,
      WaChatConfigData: ""
    }
  },
  inject: ["reload"],
  methods: {
    changeTab (item) {
      if (item.state == 2) {
        this.$router.push("/czbtg" + window.location.search)
      } else if (item.state == 3) {
        this.$router.push("/czzgcxxq" + window.location.search)
      } else if (item.state == 1) {
        this.$router.push("/cztxck" + window.location.search)
      }
      // this.$nextTick(()=>{this.setData()})
    },
    beforeStep () {
      this.$router.go(-1)
      // this.$router.back(-1)
    },
    nextStep () {
      this.$refs.form.submit()
    },
    compile (item) {
      let bmids = this.$route.query.bmid
      this.$router.replace("/txxx/" + bmids)
      this.reload()
    },
    onSubmit () {
      if (this.isView) {
        this.$router.push("sczl" + window.location.search)
        return
      }
      this.$store.state.zkbmData = { gwxx: this.gwxx, baseData: this.baseData }
      if (!this.bmid)
        localStorage.setItem(
          "tempZkbmData" + this.gwxx.id,
          JSON.stringify(this.$store.state.zkbmData)
        )
      if (this.$route.query.certToken) {
        //刚人脸识别完
        this.$router.push("jtcy")
      } else {
        this.$router.push("jtcy" + window.location.search)
      }
    },
    modified () {
      this.$indicator.open("加载中...")
      this.$post("api/zkgl/CheckCcxx", {
        id: this.baseData.zkcc_id,
        bmid: this.baseData.id
      }).then(res => {
        this.$indicator.close()
        if (res.data.success) {
          // this.$router.push('/dwzk/xzgw/'+this.baseData.zkcc_id+'?m=e&bmid='+this.bmid)
          this.$router.push("/dwzk/txxx?m=e&bmid=" + this.bmid)
        } else {
          this.changtoast(res.data.message, "error")
        }
      })
    },
    gotoIndex () {
      this.$router.push("/dwzk")
    }
  },
  created () {
    if (
      this.$route.query.errorMsg &&
      !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    ) {
      //特殊处理ios的问题
      window.location.href =
        window.location.origin +
        window.location.pathname +
        "?certToken=" +
        this.$route.query.certToken
      return
    }
    this.gwxx = this.$store.state.zkbmData.gwxx
    if (this.bmid) {
      this.$indicator.open("加载中...")
      this.$get("api/zkgl/dwGetbmjbxx?id=" + this.bmid).then(res => {
        this.$indicator.close()
        if (res.data.success) {
          if (!res.data.content) {
            this.changtoast("没有可展示数据", "error")
            return
          }
          this.baseData = res.data.content
          if (!this.isEdit) {
            this.gwxx = {
              gwmc: res.data.content.ngwmc,
              dm: res.data.content.ngwdm
            }
          } else {
            this.gwxx = { gwmc: "数据管理技术人员（专业技术岗位）", dm: "S01" }
          }
          this.show = true
        } else {
          this.changtoast(res.data.message, "error")
        }
      })
    } else {
      let gwxxStr = sessionStorage.getItem("zkbmDataGWXX")
      if (!gwxxStr) {
        this.$toast.fail("获取报考岗位信息失败,请重新选择")
        this.$router.replace("wybm")
        return
      }
      this.gwxx = JSON.parse(gwxxStr)
      //获取本地数据
      let tempDataStr = localStorage.getItem("tempZkbmData" + this.gwxx.id)
      if (tempDataStr) {
        let tempData = JSON.parse(tempDataStr)
        if (this.gwxx.id == tempData.gwxx.id) {
          this.baseData = tempData.baseData
          this.show = true
          return
        }
      }
      // Promise.resolve({ xm: "杨过", sfzh: "130101200001012239" })
      this.$indicator.open("加载中...")
      wjutils
        .getWjSmxx(
          this.$route.query.certToken,
          this,
          window.location.origin + window.location.pathname,
          3600
        )
        .then(
          res => {
            this.baseData.xm = res.xm
            this.baseData.zjhm = res.sfzh
            this.show = true
            this.baseData.csrq = getBirthdayFromIdcard(res.sfzh)
            this.$indicator.close()
            sessionStorage.removeItem("zkbmDataGWXX")
          },
          rej => {
            this.changtoast(rej, "error")
          }
        )
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../style/xxtxxx.scss';
/deep/ .van-field__label {
  width: auto;
}
</style>

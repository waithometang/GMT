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
              <van-field
                v-model="gwxx.zkdw"
                label="报考单位"
                disabled
                required
              />
              <van-field v-model="baseData.xm" label="姓名" required disabled />
              <van-field
                :minDate="birthminDate"
                v-model="baseData.csrq"
                label="出生年月"
                required
                disabled
              />
              <van-field
                label="身份证号码"
                v-model="baseData.zjhm"
                readonly
                disabled
                required
              />
              <sexSelector v-model="baseData.xb" :readonly="isView" />
              <nationSelector v-model="baseData.mz" :readonly="isView" />
              <vant-selector
                v-model="baseData.hyzt"
                :columns="['未婚', '已婚', '离异', '丧偶']"
                label="婚姻状况"
                :readonly="isView"
              />
              <vant-selector
                v-model="baseData.zzmm"
                :columns="[
                  '中共党员',
                  '中共预备党员',
                  '共青团员',
                  '群众',
                  '民革党员',
                  '民盟盟员',
                  '民建会员',
                  '民进会员',
                  '农工党党员',
                  '致公党党员',
                  '九三学社社员',
                  '台盟盟员',
                  '无党派人士',
                  '其他'
                ]"
                label="政治面貌"
                :readonly="isView"
              />
              <!-- <zzmmSelector v-model="baseData.zzmm" :readonly="isView" /> -->
              <GmtField
                v-model="baseData.byxx"
                label="毕业院校"
                :readonly="isView"
              />
              <majorSelector
                v-model="baseData.sxzy"
                :value="baseData.sxzy"
                :columns="majorColumns"
                label="所学专业"
                :readonly="isView"
              ></majorSelector>
              <vant-selector
                v-model="baseData.xllb"
                :columns="xllbOptions"
                label="学历类别"
                :readonly="isView"
              />
              <vant-selector
                v-model="baseData.xl"
                :columns="[
                  '本科学历学士学位',
                  '研究生学历硕士学位',
                  '研究生学历博士学位',
                  '本科学历未获得学位',
                  '研究生学历未获得学位'
                ]"
                label="学历学位"
                :readonly="isView"
              />
              <!-- <vant-selector
                v-model="baseData.xl"
                :columns="['本科', '研究生']"
                label="学历"
                :readonly="isView"
              />
              <vant-selector
                v-model="baseData.xw"
                :columns="['学士', '硕士', '博士', '无']"
                label="学位"
                :readonly="isView"
              /> -->
              <datetimeSelector
                type="year-month"
                :minDate="bysjminDate"
                :maxDate="bysjmaxDate"
                v-model="baseData.bysj"
                label="毕业时间"
                :readonly="isView"
              />
              <vant-selector
                v-model="baseData.zyzg"
                :columns="getArr(gwxx.zyzgyq)"
                label="执业（职业）资格"
                :readonly="isView"
              />
              <areaSelector
                v-model="baseData.jg"
                label="籍贯"
                :readonly="isView"
              />
              <areaSelector
                v-model="baseData.syd"
                label="生源地"
                :readonly="isView"
              />
              <areaSplitSelector
                :sheng.sync="baseData.xhjd_sheng"
                :shi.sync="baseData.xhjd_shi"
                :qu.sync="baseData.xhjd_qu"
                label="现户籍地"
                :readonly="isView"
              />
              <addressSelector
                v-model="baseData.tsdz"
                label="通讯地址"
                :readonly="isView"
              />
              <GmtField
                v-model="baseData.yb"
                type="digit"
                label="邮编"
                :readonly="isView"
              />
              <mobile
                v-model="baseData.lxdh"
                label="手机号码"
                :readonly="isView"
              />
              <GmtField
                v-model="baseData.zyjszg"
                label="专业技术资格"
                placeholder="如果无有关情况，填“无”"
                :readonly="isView"
              />
              <GmtField
                v-model="baseData.wysp"
                label="外语水平"
                placeholder="如果无有关情况，填“无”"
                :readonly="isView"
              />
              <GmtField
                v-model="baseData.jsjsp"
                label="计算机水平"
                placeholder="如果无有关情况，填“无”"
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
              <!-- <van-row>
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
              </van-row> -->
              <vant-selector
                v-model="baseData.lssll"
                :columns="slColumns"
                label="左裸视视力"
                :readonly="isView"
              />
              <vant-selector
                v-model="baseData.lsslr"
                :columns="slColumns"
                label="右裸视视力"
                :readonly="isView"
              />
              <!-- <van-row>
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
              </van-row> -->
              <vant-selector
                v-model="baseData.jzsll"
                :columns="slColumns"
                label="左矫正视力"
                :readonly="isView"
              />
              <vant-selector
                v-model="baseData.jzslr"
                :columns="slColumns"
                label="右矫正视力"
                :readonly="isView"
              />
              <GmtField
                v-model="baseData.xgzdw"
                label="现工作单位"
                placeholder="如果无有关情况，填“无”"
                :readonly="isView"
              />
              <!-- <GmtField
                v-model="baseData.dwxz"
                label="单位性质"
                :readonly="isView"
              /> -->
              <vant-selector
                v-model="baseData.dwxz"
                :columns="['公办', '民办', '无']"
                label="单位性质"
                :readonly="isView"
              />
              <vant-selector
                label-width="14em"
                v-model="baseData.lngzjy"
                :columns="['是', '否']"
                label="是否具有2020年9月1日至今连续在中小学校任教经历"
                :readonly="isView"
              />
              <GmtField
                v-model="baseData.grjl"
                autosize
                show-word-limit
                type="textarea"
                :maxlength="300"
                label="学习、工作经历"
                placeholder="从中学开始，按时间先后顺序填写,如：
2002.09-2005.06 XX省XX市XX县XX中学就读高中
2005.09-2009.06 XX大学XX院系XX专业就读本科"
                :readonly="isView"
              />
              <GmtField
                v-model="baseData.grtc"
                autosize
                show-word-limit
                type="textarea"
                :maxlength="300"
                label="有何特长及突出业绩"
                placeholder="请输入特长"
                :readonly="isView"
              />
              <GmtField
                v-model="baseData.hjqk"
                autosize
                show-word-limit
                type="textarea"
                :maxlength="300"
                label="奖惩情况"
                placeholder="请输入奖惩情况"
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
        <div class="yellow-btn2" v-else-if="ifUpdate">
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
import areaSplitSelector from "@/components/vantSelector/areaSplit"
import areaSelector from "@/components/vantSelector/area"
import datetimeSelector from "@/components/vantSelector/datetime"
import idCardF from "@/components/GmtIdCardField"
import zzmmSelector from "@/components/vantSelector/zzmm"
import mobile from "@/components/vantField/mobile"
import GmtField from "@/components/GmtField"
import majorSelector from "../components/majorSelector"
import wjutils from "@/js/WjSmrzUtil";
import { getBirthdayFromIdcard } from "@/js/commonUtils";
// import { GetWechatConfig } from "@/api/GetWechatConfig";
// import { xxxx } from "@/api/xzxxApi";
export default {
  components: {
    sexSelector,
    idCardF,
    nationSelector,
    addressSelector,
    datetimeSelector,
    areaSplitSelector,
    GmtField,
    areaSelector,
    zzmmSelector,
    mobile,
    majorSelector
  },
  computed: {
    bmid () {
      return this.$route.query.bmid;
    },
    isView () {
      //查看模式，不能修改
      return this.$route.query.m === "v";
    },
    isEdit () {
      //修改模式
      return this.$route.query.m === "e";
    },
    jg () {
      return this.$route.query.jg;
    }
  },
  data () {
    return {
      show: false,
      birthminDate: new Date(1984, 6, 7),
      bysjminDate: new Date(1900, 0, 1),
      bysjmaxDate: new Date(2021, 7, 31),
      gwxx: {},
      zjlxData: ["身份证", "港澳居民居住证", "护照"],
      baseData: {
      },
      tabState: 1,
      xllbOptions: ['全日制', '非全日制'],
      WaChatConfigData: "",
      majorColumns: [],
      slColumns: [
        '4.0',
        '4.1',
        '4.2',
        '4.3',
        '4.4',
        '4.5',
        '4.6',
        '4.7',
        '4.8',
        '4.9',
        '5.0',
        '5.1',
        '5.2',
        '5.3'
      ],
      ifUpdate: true,
    };
  },
  inject: ["reload"],
  methods: {
    changeTab (item) {
      if (item.state == 2) {
        this.$router.push("/czbtg" + window.location.search);
      } else if (item.state == 3) {
        this.$router.push("/czzgcxxq" + window.location.search);
      } else if (item.state == 1) {
        this.$router.push("/cztxck" + window.location.search);
      }
      // this.$nextTick(()=>{this.setData()})
    },
    beforeStep () {
      this.$router.go(-1);
      // this.$router.back(-1)
    },
    nextStep () {
      this.$refs.form.submit()
    },
    compile (item) {
      let bmids = this.$route.query.bmid;
      this.$router.replace("/txxx/" + bmids);
      this.reload();
    },
    getArr (str) {
      if (str) {
        let rtn = str.split(";")
        if (!rtn[rtn.length - 1]) rtn.pop()
        return rtn
      } else {
        return []
      }
    },
    onSubmit () {
      if (this.isView) {
        this.$router.push("sczl" + window.location.search);
        return;
      }
      this.$store.state.jszpData = { gwxx: this.gwxx, baseData: this.baseData }
      if (!this.bmid) {
        localStorage.setItem('tempJszpData' + this.gwxx.id, JSON.stringify(this.$store.state.jszpData))
      } else {
        localStorage.setItem('baseData', JSON.stringify(this.baseData))
      }
      if (this.$route.query.certToken) { //刚人脸识别完
        // this.$router.push("xzlx");
        this.$router.push("jtcy")
      } else {
        // this.$router.push("xzlx" + window.location.search);
        this.$router.push("jtcy" + window.location.search)
      }
    },
    modified () {
      this.$indicator.open('加载中...')
      this.$post('api/jszp/CheckCcxx', { id: this.baseData.zkcc_id, bmid: this.baseData.id }).then(res => {
        this.$indicator.close()
        if (res.data.success) {
          this.$router.push('/jszp/wybm?m=e&bmid=' + this.bmid)
        } else {
          this.changtoast(res.data.message, 'error')
        }
      })
    },
    gotoIndex () {
      this.$router.push("/jszp");
    },
    fetchGwxx (zzzk_id, gwxx_id) {
      this.$get('api/jszp/gwlist?id=' + zzzk_id).then(res => {
        if (res.data.success) {
          this.gwxx = res.data.content.find(m => m.id === gwxx_id)
          this.$store.state.jszpData.gwxx = this.gwxx
          sessionStorage.setItem('jszpDataGWXX', JSON.stringify(this.gwxx))
        } else {
          this.changtoast(res.data.message, 'error')
        }
      })
    },
    isDuringDate (beginDateStr, endDateStr) {
      var curDate = new Date()
      var beginDate = new Date(beginDateStr.replace(/-/g, "/"))
      var endDate = new Date(endDateStr.replace(/-/g, "/"))
      if (curDate >= beginDate && curDate <= endDate) {
        return true;
      }
      return false;
    },
    changeData (data) {
      var da = new Date(
        data
          .replace('/Date(', '')
          .replace(')/', '')
          .split('+')[0]
      )
      return (
        da.getFullYear() +
        '-' +
        (da.getMonth() + 1) +
        '-' +
        da.getDate())
    }
  },
  created () {
    this.$post('api/jszp/GetCcxx').then(res => {
      this.$indicator.close()
      if (res.data.success) {
        var ksrq = this.changeData(res.data.content.ksrq) + ' ' + res.data.content.kssj
        var jsrq = this.changeData(res.data.content.jsrq) + ' ' + res.data.content.jssj
        this.ifUpdate = this.isDuringDate(ksrq, jsrq)
      } else {
        this.changtoast(res.data.message, 'error')
      }
    })
    if (this.$route.query.errorMsg && !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      //特殊处理ios的问题
      window.location.href = window.location.origin + window.location.pathname + "?certToken=" + this.$route.query.certToken
      return
    }
    if (!this.isView) {
      this.majorColumns = JSON.parse(sessionStorage.getItem('jszpDataGWXX')).gwZyxx.xkList
    }
    if (this.bmid) {
      this.$indicator.open('加载中...')
      this.$get('api/jszp/getbmjbxx?id=' + this.bmid).then(res => {
        this.$indicator.close()
        if (res.data.success) {
          if (!res.data.content) {
            this.changtoast('没有可展示数据', "error");
            return
          }
          this.baseData = res.data.content
          localStorage.setItem('baseData', JSON.stringify(this.baseData))
          if (this.isEdit) {
            // this.fetchGwxx(this.baseData.zkcc_id,this.baseData.zkgw_id)
            this.gwxx = this.$store.state.jszpData.gwxx
          } else {
            this.gwxx = { gwmc: res.data.content.ngwmc, dm: res.data.content.ngwdm, zkdw: res.data.content.bkdw }
          }
          this.show = true
        } else {
          this.changtoast(res.data.message, "error");
        }
      })
    } else {
      // this.gwxx=this.$store.state.jszpData.gwxx || {}
      let gwxxStr = sessionStorage.getItem('jszpDataGWXX')
      if (!gwxxStr) {
        this.$toast.fail('获取报考岗位信息失败,请重新选择')
        this.$router.replace('wybm')
        return
      }
      this.gwxx = JSON.parse(gwxxStr)
      this.$store.state.jszpData.gwxx = this.gwxx
      // console.log(this.$store.state.jszpData.gwxx)
      // if (this.gwxx.sfqrz === '是') {
      //   this.xllbOptions = ['全日制']
      // }
      //获取本地数据
      let tempDataStr = localStorage.getItem('tempJszpData' + this.gwxx.id)
      if (tempDataStr) {
        let tempData = JSON.parse(tempDataStr)
        if (this.gwxx.id == tempData.gwxx.id) {
          this.baseData = tempData.baseData
          this.show = true
          return
        }
      }
      this.$indicator.open("加载中...");
      wjutils.getWjSmxx(this.$route.query.certToken, this, window.location.origin + window.location.pathname, 3600)
        .then(
          res => {
            this.baseData.xm = res.xm
            this.baseData.zjhm = res.sfzh
            this.baseData.csrq = getBirthdayFromIdcard(res.sfzh)
            this.show = true
            this.$indicator.close()
          },
          rej => {
            this.changtoast(rej, "error");
          }
        );
    }
  }
};
</script>

<style lang='scss' scoped>
@import '../../zkbm/style/xxtxxx.scss';
/deep/ .van-field__label {
  width: auto;
}
</style>

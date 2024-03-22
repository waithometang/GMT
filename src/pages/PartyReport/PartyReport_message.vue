<template>
  <div class="PartyReport_message">
    <div class="ewm">
      <div class="ewm_pages">
        <div class="ewm_item">
          <span>报到社区：</span>
          <input
            type="text"
            v-model="bdsq_text"
            readonly
            @click="select(1)"
            placeholder="请选择报到镇街社区"
          />
        </div>
        <div class="ewm_item">
          <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
          <input type="text" v-model="ListData.xm" :readonly="true" placeholder="请输入您的真实姓名" />
        </div>
        <div class="ewm_item">
          <span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
          <input type="text" v-model="ListData.xb" readonly @click="select(2)" placeholder="请选择性别" />
        </div>
        <div class="ewm_item">
          <span>联系电话：</span>
          <input
            type="text"
            v-model="ListData.lxdh"
            oninput="value=value.replace(/[^\d]/g,'')"
            :readonly="isXX"
            placeholder="请输入联系电话"
          />
        </div>
        <div class="ewm_item">
          <span>所在单位：</span>
          <input
            type="text"
            v-model="ListData.gzdw"
            readonly
            @click="select(3)"
            placeholder="请输入所在所在单位"
          />
        </div>
        <div class="ewm_item">
          <span>所在党支部：</span>
          <input
            type="text"
            v-model="ListData.szdzb"
            readonly
            @click="select(4)"
            placeholder="请输入所在党支部名称"
          />
        </div>
        <div class="ewm_item">
          <span>家庭住址(具体到楼栋)：</span>
          <input type="text" v-model="ListData.jtdz" :readonly="isXX" placeholder="请输入详细的家庭住址" />
        </div>
      </div>
      <div class="ewm_pages">
        <GmtRadio
          v-if="loding"
          :options="zyfwyx_list"
          title="参与志愿服务意向（多选）"
          :isview="isXX"
          :multiSelect="true"
          v-model="ListData.zyfwyx"
        />
        <div v-if="!isXX" class="ewm_item">
          <span>其他：</span>
          <input type="text" :readonly="isXX" v-model="zyfwyx_text" placeholder="请输入其他您的参与志愿服务意向" />
        </div>
      </div>
      <div class="ewm_pages">
        <GmtRadio
          :options="cjwthdyx_list"
          title="参加文体活动意向（多选）"
          :multiSelect="true"
          v-model="ListData.wthdyx"
          :isview="isXX"
          v-if="loding"
        />
        <div v-if="!isXX" class="ewm_item">
          <span>其他：</span>
          <input type="text" v-model="wthdyx_text" placeholder="请输入其他您的参加文体活动意向" />
        </div>
      </div>
      <div class="ewm_pages">
        <GmtRadio
          :options="cyqsddjxmyx_list"
          title="参与党建项目意向（多选）"
          :multiSelect="true"
          v-model="ListData.djxmyx"
          :isview="isXX"
          v-if="loding"
        />
      </div>
      <div class="ewm_pages">
        <div class="ewm_hread">
          <p>个人爱好及特长</p>
        </div>
        <div class="ewm_item">
          <input type="text" v-model="ListData.xqtc" placeholder="请输入" />
        </div>
      </div>
      <!-- <div class="ewm_hread" v-if="hasPic">
          <p>上传报到单（非必填）</p>
        </div>
        <div class="tpsc">
          <GmtImageUpload v-model="ListData.bdd_mainid" ref="bdd_pic" :readonly="isXX"/>
      </div>-->
      <div v-if="!isXX" @click="submit" class="ewm_button">确认报到</div>
    </div>
    <van-popup v-model="popupShow" position="bottom" :round="true" :close="onClose">
      <van-picker
        :show-toolbar="true"
        :columns="columns"
        :value-key="'name'"
        @confirm="onChange"
        @cancel="closePopup"
      />
    </van-popup>
  </div>
</template>

<script>
//党员报到
import GmtRadio from "./components/GmtRadio";
import GmtImageUpload from "@/components/GmtImageUpload";
import { dybd, dybdxx, dybdInit } from "@/api/secondLevelPage";
import { GetWechatConfig } from "@/api/GetWechatConfig";
import { EntrancePageApi } from "@/api/FirstLevelPage";
import wjutils from "@/js/WjSmrzUtil";
export default {
  data() {
    return {
      ListData: {
        zyfwyx: "",
        wthdyx: "",
        djxmyx: "",
        bdsq: "",
        bdzj: "",
        xm: "",
        xb: "",
        lxdh: "",
        szdzb: "",
        gzdw: "",
        jtdz: "",
        xqtc: "",
        bdd_mainid: ""
      },
      zyfwyx_list: [
        { value: "疫情防控", id: 1 },
        { value: "扶贫助困", id: 2 },
        { value: "洁净家园", id: 3 },
        { value: "守护平安", id: 4 },
        { value: "文明出行", id: 5 },
        { value: "和睦邻里", id: 6 },
        { value: "其他", id: 7 }
      ],
      cjwthdyx_list: [
        { value: "书法", id: 1 },
        { value: "声乐", id: 2 },
        { value: "表演", id: 3 },
        { value: "戏曲", id: 4 },
        { value: "乒乓球", id: 5 },
        { value: "羽毛球", id: 6 },
        { value: "篮球", id: 7 },
        { value: "足球", id: 8 },
        { value: "广场舞", id: 9 },
        { value: "徒步", id: 10 }
      ],
      cyqsddjxmyx_list: [
        { value: "参与小区议事", id: 1 },
        { value: "收集居民意见", id: 2 },
        { value: "维护社区稳定", id: 3 },
        { value: "担任党员楼长", id: 4 },
        { value: "担任物业住宅小区党组织委员", id: 5 },
        { value: "技能共享", id: 6 },
        { value: "物品共享", id: 7 },
        { value: "时间共享", id: 8 }
      ],
      szdw_list: [],
      szdzb_list: [],
      bdsq_text: "",
      bdsq_list: "",
      xb_list: ["男", "女"],
      popupShow: false,
      hasPic: true,
      static: 1,
      columns: "",
      WaChatConfigData: "",
      loding: false,
      zyfwyx_text: "",
      wthdyx_text: "",
      dws: ""
    };
  },
  computed: {
    certToken() {
      return this.$route.query.certToken;
    },
    isXX() {
      if (this.$route.query.isXX) {
        return this.$route.query.isXX == "true";
      }
    },
    id() {
      if (this.$route.query.id) {
        return this.$route.query.id;
      }
    }
  },
  methods: {
    select(index) {
      if (this.isXX) {
        return;
      }
      this.static = index;
      if (index == 1) {
        this.columns = this.bdsq_list;
      } else if (index == 2) {
        this.columns = this.xb_list;
      } else if (index == 3) {
        this.columns = this.szdw_list;
      } else if (index == 4) {
        this.columns = this.szdzb_list;
      }
      this.popupShow = true;
    },
    onClose() {},
    onChange(item) {
      if (this.static == 1) {
        this.bdsq_text = item;
      } else if (this.static == 2) {
        this.ListData.xb = item;
      } else if (this.static == 3) {
        this.ListData.gzdw = item;
        let s = this.dws.filter(i => i.mc == item);
        this.szdzb_list = s[0].dzbs;
        this.ListData.szdzb = "";
      } else if (this.static == 4) {
        this.ListData.szdzb = item;
      }
      this.popupShow = false;
    },
    closePopup() {
      this.popupShow = false;
    },
    submit() {
      this.ListData.zyfwyx = this.ListData.zyfwyx.split("@@")[0];
      if (this.zyfwyx_text) {
        this.ListData.zyfwyx += "@@" + this.zyfwyx_text;
      }
      if (this.wthdyx_text) {
        this.ListData.wthdyx += "@@" + this.wthdyx_text;
      }
      this.ListData.bdd_mainid = this.UploadPicturesId;
      this.ListData.bdsq = this.bdsq_text[1];
      this.ListData.bdzj = this.bdsq_text[0];
      dybd(this.ListData).then(rps => {
        if (rps.data.success) {
          this.$router.push("/PartyReport_record");
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    },
    getwxConfig() {
      let url = location.href;
      GetWechatConfig({
        url: url
      }).then(rps => {
        if (rps.data.success) {
          this.WaChatConfigData = rps.data.content;
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    }
  },
  components: {
    GmtRadio,
    GmtImageUpload
  },
  created() {
    if (this.isXX) {
      dybdxx({ id: this.id }).then(rps => {
        if (rps.data.success) {
          let data = rps.data.content;
          this.bdsq_text = [data.bdzj, data.bdsq];
          this.ListData.xm = data.xm;
          this.ListData.xb = data.xb;
          this.ListData.djxmyx = data.djxmyx;
          this.ListData.jtdz = data.jtdz;
          this.ListData.lxdh = data.lxdh;
          this.ListData.szdzb = data.szdzb;
          this.ListData.gzdw = data.gzdw;
          this.ListData.wthdyx = data.wthdyx;
          this.ListData.xqtc = data.xqtc;
          this.ListData.zyfwyx = data.zyfwyx;
          this.zyfwyx_list = data.zyfwyx;
          this.cjwthdyx_list = data.wthdyx;
          this.cyqsddjxmyx_list = data.djxmyx;
          // this.$refs.bdd_pic.initPicData(data.bdd_urls)
          // if(data.bdd_urls.length === 0) this.hasPic=false
          this.loding = true;
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    } else {
      wjutils.getWjSmxx(this.certToken, this).then(
        res => {
          this.$router.replace(this.$route.path);
          this.ListData.xm = res.xm;
          EntrancePageApi().then(rps => {
            if (rps.data.success) {
              // this.bdsq_list = rps.data.content;
              rps.data.content.forEach(item => {
                if(item.id!==1870){
                  this.bdsq_list.push(item)
                }
              })
            } else {
              this.changtoast(rps.data.message, "error");
            }
          });
          dybdInit().then(rps => {
            if (rps.data.success) {
              this.ListData.szdzb = rps.data.content.szdzb;
              this.ListData.gzdw = rps.data.content.gzdw;
              this.dws = rps.data.content.dws;
              if (rps.data.content.gzdw) {
                let s = this.dws.find(i => i.mc == rps.data.content.gzdw);
                if (s) {
                  this.szdzb_list = s.dzbs;
                }
              }else{
                this.$dialog.alert({
                  title: "温馨提示",
                  message: "您好，您暂不在需参与党员报到的名单。如需报到或有疑问，请联系您所在党组织。"
                  }).then(() =>{
                    this.$router.replace('/index')
                  })
                  return
              }
              rps.data.content.dws.forEach(i => {
                this.szdw_list.push(i.mc);
              });
            } else {
              this.changtoast(rps.data.message, "error");
            }
          });
          this.getwxConfig();
          this.loding = true;
        },
        rej => {
          this.changtoast(rej, "error");
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./style/PartyReport_message.scss";
</style>
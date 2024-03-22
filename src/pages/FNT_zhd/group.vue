<template>
  <div class="group">
      <div class="ggbs">
        <img src="/static/FNT_IMAGES/bmsm.png"/>
        <div class="main">
          <span v-if="hdgz_data" v-html="hdgz_data.hdgz"></span>
        </div>
      </div>
      <hr/>
    <div class="xxtx">
      <div class="item">
        <span>团队名称</span>
        <input v-model="tdmc" placeholder="请输入您的团队名称"/>
      </div>
      <div class="item">
        <span>团队口号</span>
        <input v-model="tdkh" placeholder="请输入您的团队口号" />
      </div>
      <div class="item">
        <span>参演人数</span>
        <input v-model="cyrs" type="number" placeholder="请输入您的参演人数" />
      </div>
      <div class="item">
        <span>领队人</span>
        <input v-model="ldr" placeholder="请输入您的领队人名字" />
      </div>
      <div class="item">
        <span>联系电话</span>
        <input v-model="lxdh" placeholder="请输入您的联系电话" />
      </div>
      <div class="item">
        <span>所属镇街</span>
        <mt-popup
          v-model="popupVisible"
          position="bottom">
          <div class="select">
            <div class="hideSelect"><span @click="hideSelect">完成</span></div>
            <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
          </div>
        </mt-popup>
        <input v-model="sszj" @click="showSelect()" readonly="readonly" placeholder="请输入您的所属镇街" />
        <div class="select_img"><img src="/static/FNT_IMAGES/xl.png"/></div>
        <!-- <select v-model="sszj">
          <option v-for="(item,index) in site" :key="index">{{item.name}}</option>
        </select> -->
        <!-- <GmtOption class="input" :listData="site" :selectState="siteStart"  @SetselectTag="SiteStart"/> -->
      </div>
      <div class="item"  style="border-bottom: none;">
        <textarea v-model="tdjs" maxlength="100" placeholder="请输入您的团队介绍">
        </textarea>
        <div class="tpsmNum">{{tdjs.length}}/100</div>
      </div>
      <div class="tpsc"> 
        <div class="tjtp" @click="remove_imges(item)" v-for="(item, index) in UploadPicturesSrc" :key="index">
            <img class="imgs" :src="item.src"/>
        </div>
        <div class="tjtp"  @click="waChatUploadImage" v-if="UploadPicturesSrc.length < 5">
          <img class="imgs" src="/static/FNT_IMAGES/add.png" />
        </div>
      </div>
    </div>
    <div class="button_form">
        <div @click="submit" class="button">确定提交</div>
    </div>
  </div>
</template>
<script>
import { GetWechatConfig } from "@/api/GetWechatConfig";
import { WaChatUploadPictures } from "@/js/WaChatUploadPictures";
import { Hdgz,TtHdbm } from '@/api/FNTApi'
import GmtOption from '@/components/GmtOption'
import { DelUpload } from "@/api/WaChatApi";

export default {
  data() {
    return {
      WaChatConfigData: "",
      tdmc:'',
      tdkh:'',
      cyrs:'',
      ldr:'',
      lxdh:"",
      sszj:"荷城街道",
      tdjs:"",
      bmsm:"",
      hdgz_data:"",
      siteStart: 0,
      popupVisible:false,
      slots: [
        {
          flex: 1,
          values: ['荷城街道', '杨和镇', '明城镇', '更合镇'],
          className: 'picker_list',
          textAlign: 'center'
        }
      ]
    };
  },
  components: {
    GmtOption,
  },
  created() {
    let url = location.href
      GetWechatConfig({
        url: url
      }).then(rps => {
        if (rps.data.success) {
          this.WaChatConfigData = rps.data.content;
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    this.init();
  },
  computed: {
    UploadPicturesSrc() {
      return this.$store.state.UploadPicturesSrc;
    },
    UploadPicturesId() {
      return this.$store.state.MainIdData;
    },
  },
  methods: {
    init() {
      Hdgz({id:this.$route.params.id}).then(rps=>{
        if (rps.data.success) {
            this.hdgz_data = rps.data.content[0];
        } else {
        this.changtoast(rps.data.message, "error");
        }
      })
    },
    showSelect(){
      this.popupVisible=true
    },
    hideSelect(){
      this.popupVisible=false
    },
    waChatUploadImage() {
      let amount = 5 - this.UploadPicturesSrc.length;
      WaChatUploadPictures(this.WaChatConfigData, amount);
    },
    submit(){
      TtHdbm({
          hdid:this.$route.params.id,
          ttmc:this.tdmc,
          tdkh:this.tdkh,
          cyrs:this.cyrs,
          ldry:this.ldr,
          lxdh:this.lxdh,
          sszj:this.sszj,
          tdjs:this.tdjs,
          scfj:this.UploadPicturesId
      }).then(rps=>{
        if (rps.data.success) {
          this.changtoast('报名成功')
          this.$store.commit("SetUploadPicturesSrc", "");
          this.$store.commit("SetMainIdData", "");
          this.$router.go(-1)
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    onValuesChange(picker, values) {
       this.sszj=values[0]
    },
    remove_imges(item) {
      DelUpload({
        id: item.id
      }).then(rps => {
        if (rps.data.success) {
          this.changtoast("删除成功");
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
      let newUploadPicturesSrc = this.UploadPicturesSrc.filter(rps => {
        return rps.id != item.id;
      });
      this.$store.commit("SetUploadPicturesSrc", newUploadPicturesSrc);
    },
  },
  destroyed: function() {
    this.$store.commit("SetUploadPicturesSrc", "");
    this.$store.commit("SetMainIdData", "");
  },
};
</script>

<style lang="scss" scoped>
@import "./style/group.scss";
.group /deep/ .picker_list {
    .picker-slot-wrapper {
      width: 750px;
      .picker-item {
        font-size:30px;
      }
      .picker-selected {
        color:rgba(40,40,40,1);
      }
    }
  }
</style>

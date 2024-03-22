<template>
  <div class="releaseFrom">
    <div class="head" v-if="options.length > 0 &&lx >= 0">
      <div class="head_select">
        <div class="select_name">请选择发布类型:</div>
        <div class="select_tab">
          <GmtOption :listData='options' @SetselectTag="SetTagState" :selectState="lx" v-if="options.length > 0"></GmtOption>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="input_tab" v-if="lx === 3">
        <div class="tab_name">所属镇街:</div>
        <div class="tab_input">
          <input  @focus="select_tab(1)" v-model="zjInfo.name" readonly="readonly" type="text" placeholder="请选择所属镇街">
        </div>
        <div class="tab_select" @click="select_tab(1)">
          <img src="/images/icon_enterz3x.png" alt="">
        </div>
      </div>
      <div class="input_tab" v-if="lx === 3">
        <div class="tab_name">所属行政村:</div>
        <div class="tab_input">
          <input  @focus="select_tab(2)" v-model="cjInfo.name" readonly="readonly" type="text" placeholder="请选择所属行政村">
        </div>
        <div class="tab_select" @click="select_tab(2)">
          <img src="/images/icon_enterz3x.png" alt="">
        </div>
      </div>
      <div class="input_tab" v-if="lx === 3">
        <div class="tab_name">自然村:</div>
        <div class="tab_input">
          <input  @focus="select_tab(3)" v-model="zrcInfo.name" readonly="readonly" type="text" placeholder="请选择自然村">
        </div>
        <div class="tab_select" @click="select_tab(3)">
          <img src="/images/icon_enterz3x.png" alt="">
        </div>
      </div>
      <div class="input_tab">
        <div class="tab_name">标题:</div>
        <div class="tab_input">
          <input  type="text" v-model="title" placeholder="请输入标题(必填)">
        </div>
      </div>
      <div class="input_tab" v-if="lx === 3 && totalPoints">
        <div class="tab_name">总分:</div>
        <div class="tab_input">
          <input  type="text" v-model="totalPoints" placeholder="考核总分" readonly="readonly">
        </div>
      </div>
      <div class="textarea_tab">
        <textarea  v-model="content" placeholder="请输入内容" cols="30" rows="10"></textarea>
      </div>
      <div class="textarea_tab_numbers">0/200</div>
      <div class="images_tab">
        <div class="images_tab_name">上传照片/文件</div>
        <ul class="images_list">
          <li class="images_list_tab" v-for="(item, index) in UploadPicturesSrc" :key="index" @click="remove(item)">
            <img :src="item.src" alt="">
          </li>
          <li class="images_list_tab" @click="UploadPictures" v-if="UploadPicturesSrc.length < 9">
            <img src="/images/add.png" alt="">
          </li>
          <div style="clear:both;"></div>
        </ul>
      </div>
    </div>
    <div class="gradeList" v-if="lx === 3">
      <div class="gradeList_name">高明区农村人居环境整治工作考核评分表:</div>
      <div class="file_table">
        <table class="f-table" cellspacing="0" cellpadding="0" width="100%">
          <thead>
            <tr>
              <th width="65%">考核内容</th>
              <th width="15%">分数</th>
              <th width="20%">电子文件</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in khsxListData" :key="index">
              <td>
                <span class="font">
                  {{index+1}}: {{item.khnr}}
                  <span v-if="item.isNeed" class="startMark">（*）</span>
                </span>
              </td>
              <td>{{item.sfz}}</td>
              <td>
                <uploadFile :title="item.khnr" @uploadFinished="uploadFinished" :dataObject="item" :ref="'zl_'+item.id" :WaChatConfigData="WaChatConfigData" @removeImage="remove"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="base">
      <div class="release_but" @click="submitData">
        发布
      </div>
    </div>
    <mt-popup v-model="popupVisible" position="bottom">
      <div v-if="popupVisible" class="accomplish" @click="setpopupVisible()">完成</div>
      <mt-picker v-if="popupVisible" :slots="slots" @change="onValuesChange" valueKey="name"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import GmtSelectTab from '@/components/GmtSelectTab'
import GmtOption from '@/components/GmtOption'
import uploadFile from './uploadFile'
import { WaChatUploadPictures } from "@/js/WaChatUploadPictures"
import { GetWechatConfig } from "@/api/GetWechatConfig"
import { DelUpload } from "@/api/WaChatApi"
import { GetGrfb, GetWdfb, Getzjxx, GetKhsx } from "@/api/secondLevelPage"
import {mapActions} from "vuex"
import { storage } from "@/js/until";

export default {
  data () {
    return {
      content: '',
      title: '',
      options: [],
      WaChatConfigData: '',
      lx: '',
      title: '', // 标题
      content: '', // 内容
      zjInfo: {}, // 镇街信息
      cjInfo: {}, // 村居信息
      zrcInfo:{}, //自然村信息
      totalPoints: 0, // 总分
      khsxListData: [],
      popupVisible: false,
      zjxxData: '',
      tabState: 1,
      storeData: '',
      slots: [
        {
          flex: 1,
          values: [],
          textAlign: 'center',
          defaultIndex: 1,
          className: 'picker_list',
        }
      ],
    }
  },
  watch: {
    zjInfo () {
      this.cjInfo = {} // 村居信息
      this.zrcInfo = {} //自然村信息
    },
    cjInfo () {
      this.zrcInfo = {} //自然村信息
    }
  },
  components: {
    GmtOption,
    uploadFile
  },
  computed: {
    // 获取选中的图片路径
    UploadPicturesSrc() {
      return this.$store.state.UploadPicturesSrc;
    },
    // 上传的图片id
    UploadPicturesId() {
      return this.$store.state.MainIdData;
    },
    villageId () {
      let userInfo = storage.fetch("longData").data
      let vid = this.$route.params.vid
      if (vid) {
        return vid
      } else {
        return userInfo.id
      }
    },
    releaseState () {
      return this.$route.params.releaseState*1
    }
  },
  methods: {
    ...mapActions(['GetuserInfo']),
    SetTagState (item) {
      this.lx = item.id
    },
    uploadFinished(fileCount,item){
      if (item.fz && item.kfbl) {
        let rtn=item.fz-item.kfbl*fileCount
        if (rtn>0) {
          item.sfz=rtn
        }else{
          item.sfz=0
        }
      }
      this.settotalPoints ()
    },
    // 计算总分
    settotalPoints () {
      this.totalPoints = 0
      for (let index = 0; index < this.khsxListData.length; index++) {
        const element = this.khsxListData[index];
        if (element.sfz) {
          this.totalPoints = this.totalPoints + element.sfz*1
        }
      }
    },
    // 判断发布权限
    jurisdiction () {
      this.options = [{name: '两委工作', id: 0}, {name: '直联日志', id: 1}, {name: '党员实事', id: 2}, {name: '现场考核', id: 3}]
      this.GetuserInfo ().then(Grxx => {
        let that = this
        if (!Grxx.lwfb) {
          this.options = this.options.filter(function (item) {
            return item.id != 0
          })
        }
        if (!Grxx.dyfb) {
          this.options = this.options.filter(function (item) {
            if (that.releaseState === 2) {
              that.lx = 2
            }
            return item.id != 2
          })
        }
        if (!Grxx.zlfb) {
          this.options = this.options.filter(function (item) {
            if (that.releaseState === 1) {
              that.lx = 1
            }
            return item.id != 1
          })
        }
        if (!Grxx.zxkhfb) {
          this.options = this.options.filter(function (item) {
            if (that.releaseState === 3) {
              that.lx = 3
            }
            return item.id != 3
          })
        }
        if (!this.releaseState) {
          this.lx =this.options[0].id
        }
      })
    },
    // 发布数据
    submitData () {
      if (this.lx < 0) {
        this.changtoast ('请选择在发布类型', 'warning')
        return
      }
      if (this.lx === 4) {
        if (!this.zjInfo.id || !this.cjInfo.id || !this.zrcInfo.id) {
          this.changtoast ('请选择村居信息', 'warning')
          return
        }
      }
      if (!this.title) {
        this.changtoast ('请填写标题', 'warning')
        return
      }
      this.$indicator.open('正在提交数据，请稍等...')
      GetGrfb ({
        VillageId: this.villageId,
        lx: this.lx + 1,
        img_mainId :this.UploadPicturesId,
        Title: this.title,
        Content: this.content,
        cjid: this.cjInfo.id,
        zrcid: this.zrcInfo.id,
        KhList: this.GetKhsxId()
      }).then (rps => {
        this.$indicator.close()
          if (rps.data.success) {
          this.$store.commit("SetUploadPicturesSrc", ""); // 清空记录的图片路径
          this.$store.commit("SetMainIdData", ""); // 清空记录的图片id
          this.$store.commit('Set_FbInfoTag', 0)
        } else {
          this.changtoast(rps.data.message, "error");
          this.GetuserInfo('post')
        }
      })
    },
    // 选取照片 最多九张
    UploadPictures() {
      let amount = 9 - this.UploadPicturesSrc.length
      WaChatUploadPictures(this.WaChatConfigData, amount);
    },
    // 删除图片
    remove(item,fileCount, dataItem) {
      DelUpload({
        id: item.id
      }).then(rps => {
        if (rps.data.success) {
          this.changtoast("删除成功");
          if (dataItem && dataItem.fz && dataItem.kfbl) {
            let rtn=dataItem.fz-dataItem.kfbl*fileCount
            if (rtn>0) {
              dataItem.sfz=rtn
            }else{
              dataItem.sfz=0
            }
            this.settotalPoints ()
          }
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
      let newUploadPicturesSrc = this.UploadPicturesSrc.filter(rps => {
        return rps.id != item.id;
      });
      this.$store.commit("SetUploadPicturesSrc", newUploadPicturesSrc);
    },
    // 获取微信sdk 初始化参数
    _GetWechatConfig() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      let url = "";
      if (isAndroid) {
        url = location.href;
      }
      if (isIOS) {
        url = location.href.split("#")[0]; //hash后面的部分如果带上ios中config会不对
      }
      GetWechatConfig({
        url: url
      }).then(rps => {
        if (rps.data.success) {
          this.WaChatConfigData = rps.data.content;
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
    },
    // 获取镇街信息
    _Getzjxx (item) {
      Getzjxx().then(rps => {
        if(rps.data.success) {
          this.zjxxData = rps.data.content
          if (item) {
            this.select_tab(item)
          }
        } else {
          this.changtoast(rps.data.message,'error')
        }
      })
    },
    // 收起弹窗
    setpopupVisible () {
      if (this.tabState === 1) {
        this.zjInfo = this.storeData
      } else if (this.tabState === 2) {
        this.cjInfo = this.storeData
      } else if (this.tabState === 3) {
        this.zrcInfo =this.storeData
      }
      this.popupVisible = false
    },
    // 设置信息
    select_tab (item) {
       this.tabState = item
      let values = []
      let dome = this.zjxxData
      if (dome.length > 0) {
        if (item === 1) {
          values = dome
          this.slots[0].values = values
        } else if (item === 2) {
          let arr  = Object.keys(this.zjInfo)
          if (arr.length <= 0) {
            this.changtoast('请先选择镇街')
            return
          }
          dome = dome.filter(rps => {
            return rps.id === this.zjInfo.id
          })
          values = dome[0].cjxxs
          this.slots[0].values = values
        } else if (item === 3) {
          let arr  = Object.keys(this.zjInfo)
          let arr2  = Object.keys(this.cjInfo)
          if (arr.length <= 0 && arr2.length <= 0 ) {
            this.changtoast('请先选择镇街或村居')
            return
          }
          dome = dome.filter(rps => {
            return rps.id === this.zjInfo.id
          })
          dome = dome[0].cjxxs.filter(rps => {
            return rps.id === this.cjInfo.id
          })
          values = dome[0].zrcxxs
          this.slots[0].values = values
        }
        this.popupVisible = true
      } else {
        this._Getzjxx(item)
      }
    },
    onValuesChange (picker, values) {
      this.storeData = values[0]
    },
    // 获取考核事项
    _GetKhsx () {
      GetKhsx().then (rps => {
        if (rps.data.success) {
          rps.data.content.forEach(item => {
            item.sfz=item.fz
          })
          this.khsxListData = rps.data.content
          for (let index = 0; index < this.khsxListData.length; index++) {
            const element = this.khsxListData[index]
            if (element.sfz) {
              this.totalPoints = this.totalPoints + element.sfz*1
            }
          }
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    // 获取考核事项文件id
    GetKhsxId () {
      let data = []
      if (this.lx === 3) {
        for (let index = 0; index < this.khsxListData.length; index++) {
          const element = this.khsxListData[index]
          let khid = element.id
          let mainId = this.$refs["zl_" + khid][0].getFileIds();
          if (mainId) {
            data.push({ mainId, khid });
          }
        }
      }
      return data
    }
  },
  created () {
    this._GetWechatConfig()
    this._GetKhsx()
    this.jurisdiction()
    if (this.releaseState === 3) {
      this._Getzjxx ()
    }
    if (this.releaseState) {
      this.lx = this.releaseState
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/releaseFrom.scss';
.releaseFrom /deep/ .picker_list {
  .picker-slot-wrapper {
    width: 750px;
    .picker-item {
      font-size:38px;
      font-weight:bold;
    }
    .picker-selected {
      color:rgba(40,40,40,1);
    }
  }
}
.f-table tbody tr td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  vertical-align: middle;
}
.f-table tbody tr td:first-child {
  text-align: left;
}
</style>
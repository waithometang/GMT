<template>
  <div class="bmupload">
    <div @click="showFiles" class="fileInfo">文件({{fileCount}})</div>
    <el-button size="small" type="primary" @click="upload">点击上传</el-button>
    <mt-popup class="filePopup" v-model="isShowFiles" position="bottom">
      <div class="popup_head">
        <div class="head_left" @click="hideFiles">收起</div>
        <div class="head_middle">{{title}}</div>
        <div class="head_right" @click="upload">添加</div>
      </div>
      <div class="file_list">
        <div class="list_tab" v-for="(item, index) in uploaded" :key="index">
          <div class="list_tab_name" @click="SeePhotos(item.src||item.name, uploaded)">{{index+1}}、{{item.src || item.name}}</div>
          <div class="list_tab_but"  @click="confirmDel(item,index)">删除</div>
        </div>
      </div>
      <!-- <mt-header class="hea" :title="title">
        <mt-button icon="back" slot="left" @click="hideFiles">收起</mt-button>
        <mt-button slot="right" @click="upload">添加</mt-button>
      </mt-header>
      <el-row class="fileRow" v-for="(item, index) in uploaded" :key="index">
        <el-col :span="20"><div class="fileName">{{index+1}}、{{item.src || item.name}}</div></el-col>
        <el-col :span="4"><div class="delCell"><mt-button type="danger" @click="confirmDel(item,index)" class="delBtn" size="small">删除</mt-button></div></el-col>
      </el-row>
      <el-row class="fileRow progressRow" v-if="uploading">
        <el-col :span="24"><el-progress :stroke-width="12" :percentage="percent"></el-progress></el-col>
      </el-row> -->
    </mt-popup>
  </div>
</template>
<script>
import fileAxios from '@/api/fileAxios'
import { uploadFile } from '@/js/uploadFile'
import { WcChatPreviewImage }from '@/js/WeChatpreviewImage'

export default {
  props:{
    title:{
      type:String
    },
    WaChatConfigData : {

    },
    dataObject:{
      type:Object
    },
    files: {

    },
    mainIdData: {

    }
  },
  computed:{
    fileCount () {
      if (this.files) {
        return this.files.length
      } else {
        return this.uploaded.length
      }
    }
  },
  data () {
    return {
      percent:0,
      isShowFiles:false,
      uploaded:[],
      uploading:false,
      mainId: ''
    }
  },
  methods: {
    // 返回上传文件id
    getFileIds(){
      if(this.uploading) return null  //正在上传时则不返数组，返回Null
      return this.mainId
    },
    upload (e) {
      if (this.mainIdData) {
        this.mainId = this.mainIdData
      }
      uploadFile (this.WaChatConfigData, this)
    },
    doneUpload(){  //上传完成之后回调
      if (this.dataObject) {
        this.$emit('uploadFinished', this.fileCount, this.dataObject)
      }
    },
    // 显示已上传的文件
    showFiles(){
      if(this.uploaded.length===0) return
      this.isShowFiles=true
    },
    // 收起已上传文件
    hideFiles () {
      this.isShowFiles=false
    },
    // 删除已上传文件
    confirmDel (f,index) {
      let that = this
      that.MessageBox({
        content: '是否确定删除文件',
        success: function () {
          that.uploaded.splice(index,1)
          that.$emit('removeImage', f, that.fileCount, that.dataObject,11,111,1)
        },
        failStata: true
      })
    },
    fileChange (e) {
      if(!e.target.files || e.target.files.length===0) return
      this.uploading=true
      fileAxios(e.target.files,this.mainId).then(res=>{
        if(res.data.success){
          this.changtoast('上传成功')
          this.uploaded.push(...res.data.content.urlData)
          this.mainId = res.data.content.mainId
        }else{
          this.changtoast(res.data.message,'error')
          this.$refs.vfile.value=''  //目的是让选择相同的文件后可继续响应change事件
        }
        this.percent=0
        this.uploading=false
      },
      rej => {
        this.changtoast('上传失败','error')
        this.percent=0
        this.uploading=false
        this.$refs.vfile.value=''
      })
    },
    SeePhotos (item, arr) {
      // let url = 'http://gmt.znzwoa.com' + item
      let url = 'http://gmt.gaoming.gov.cn' + item
      let dome = []
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index]
        let data = element.src || element.name
        // dome.push('http://gmt.znzwoa.com' + data)
        dome.push('http://gmt.gaoming.gov.cn' + data)
      }
      WcChatPreviewImage(url,dome,this.WaChatConfigData)
    }
  },
  mounted () {
    if (this.files) {
      this.uploaded = this.files
    }
  }
}
</script>
<style lang='scss' scoped>
.bmupload {
  .fileInfo{
    font-size: 24px;
    font-weight:500;
    text-align: center;
  }
  .filePopup{
    width: 100%;
    padding-bottom: 20px;
    .popup_head {
      padding: 5px 20px;
      background: #26a2ff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 400;
      font-size: 30px;
      color: #ffffff;
      .head_left {
        flex: 0 0 auto;
        margin-right: 20px;
      }
      .head_middle {
        flex: 1;
        overflow: hidden;
        text-overflow: -o-ellipsis-lastline;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .head_right {
        flex: 0 0 auto;
        margin-left: 20px;
      }
    }
    .file_list {
      padding: 0 30px;
      background: #ffffff;
      .list_tab {
        padding: 10px 0;
        border-bottom: 1px solid #cccccc;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 400;
        font-size: 30px;
        color: #ffffff;
        .list_tab_name {
          flex: 1;
          overflow: hidden;
          text-overflow: -o-ellipsis-lastline;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
          color:rgba(40,40,40,1);
        }
        .list_tab_but {
          flex: 0 0 auto;
          margin-left: 20px;
          background: red;
          border: 1px solid #cccccc;
          font-weight: 400;
          font-size: 30px;
          color: #ffffff;
          padding: 2px 10px;
        }
      }
    }
  }
}
  // .hide{
  //   display: none;
  // }
  // .delCell{
  //   text-align: center;
  // }
  // .fileRow{
  //   border-bottom: 1px solid #cccccc;
  //   margin-left:20px;
  //   margin-right:20px;
  // }
  // .progressRow{
  //   height: 78px;
  //   line-height: 78px;
  //   padding: 20px 10px 0px 10px;
  // }
  // .delBtn{
  //   top:10px;
  // }
  // .fileName{
  //   font-size: 28px;
  //   text-align: left;
  //   line-height: 78px;
  //   overflow: hidden;
  //   text-overflow:ellipsis;
  //   white-space: nowrap;
  // }
</style>



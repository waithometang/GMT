<template>
  <div class="content">
    <!-- 上传视频模块 -->
    <div class="video" v-show="show">
      <video
        ref="videoD"
        id="test"
        :src="srcVideo"
        controls
        preload
        controlslist="nodownload"
      ></video>
      <img @click="delVideo" src="/static/img_close.png" />
    </div>
    <br />
    <button class="upload" :class="hide ? 'hide_btn' : ''">
      <input
        type="file"
        name=""
        ref="ipt_video"
        id="fileId"
        @change="uploadVideo"
        accept="video/mp4,video/quicktime"
      />
      <!-- <img src="../images/upvideo.png" alt=""> -->
    </button>
  </div>
</template>

<script>
import fileAxios from '@/api/fileAxios'
import blobUploader from '@/js/blobUploader.js'
export default {
  data () {
    return {
      srcVideo: '',
      show: false,
      hide: false
    }
  },

  methods: {
    delVideo () {
      this.show = false;
      this.hide = false;
      this.srcVideo = '';
      this.$refs.ipt_video.value = '';
      this.$emit('input', '');
    },
    successCb (url, e) {
      // console.log(url);
      var that = this;
      this.$toast('上传视频成功');
      this.hide = true;
      this.show = true;
      this.$emit('input', url);
    },
    checkCanUpload (e, len) {
      var that = this;
      return new Promise((resolve, reject) => {
        let maxLen = 300 //最大多少M
        if (len > maxLen) { //大于？M不能上传
          this.$toast.fail(`请选择少于${maxLen}M的文件`)
          return resolve(false)
        }
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
          that.srcVideo = this.result;
          // that.show = true;
          // that.$refs.ipt_video.setAttribute('type','text');
          that.$refs.ipt_video.setAttribute('type', 'file');
          setTimeout(() => {
            let dur = that.$refs.videoD.duration
            if (dur > 180) {
              that.delVideo()
              that.$toast.fail('请上传少于三分钟的视频')
              return resolve(false)
            } else {
              return resolve(true)
            }
          }, 600)
        }
      })
    },
    async uploadVideo (e) {
      var that = this;
      if (!e.target.files) return
      let len = e.target.files[0].size / 1024 / 1024
      this.$indicator.open('上传中...')
      let isVideoOk = await this.checkCanUpload(e, len)
      if (!isVideoOk) {
        this.$indicator.close()
        return
      }
      if (len > 20) {
        blobUploader(e.target.files[0]).then(resolve => {
          this.$indicator.close()
          this.successCb(resolve, e)
        }, rej => {
          this.$indicator.close()
          this.delVideo()
          this.changtoast(rej.message, 'error')
        })
      } else {
        fileAxios(e.target.files)
          .then(res => {
            this.$indicator.close()
            if (res.data.success) {
              this.successCb(res.data.content.urlData[0].src, e)
            } else {
              this.changtoast(res.data.message, 'error')
            }
          })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../style/style.scss';
</style>

<template>
  <div class="container">
    <div class="top">
      <!-- 封面 -->
      <GmtImageUpload v-show="false" v-model="form.file_fmid" :onlyOne="true" ref="coverUploader" />
      <div class="coverImg" v-if="form.file_fmid">
        <!-- <van-image height="100" fit="cover" :radius="10" :src="form.file_fmid"/> -->
        <img :src="form.file_fmid" alt />
      </div>
      <div
        @click="uploadCover"
        :class="{'cover': !form.file_fmid,'reload':form.file_fmid}"
      >{{form.file_fmid? '点击重新上传封面' : '点击上传封面'}}</div>
      <!-- 添加标题 -->
      <div class="title">
        <input type="text" v-model="form.zpzt" placeholder="添加标题更容易被打call哦" />
      </div>
      <!-- 联系电话 -->
      <div class="title">
        <input type="number" v-model="form.lxdh" placeholder="请输入您的联系方式" />
      </div>
      <!-- 提示标题 -->
      <div class="tip_title">上传图片或小视频（至少选择一种参赛投稿方式）</div>
      <!-- 提示 -->
      <div class="tips">
        <img src="../images/tips.png" alt />
        请选择参赛投稿图片，图片最多可上传9张
      </div>
      <!-- 上传图片 -->
      <div class="pic">
        <GmtImageUpload v-model="form.file_id" />
      </div>
      <!-- 上传视频 -->
      <div class="tips">
        <img src="../images/tips.png" alt />
        请选择参赛投稿视频，小视频只可上传1个，时间控制在3分钟内
      </div>
      <div class="pic mb">
        <UploadVideo v-model="form.spwj_id" />
      </div>
    </div>

    <div class="middle">
      <div class="header">
        #
        <span class="add">添加标签</span>
        <span class="info">（最多选择5个）</span>
      </div>
      <div class="tags">
        <div
          class="tag"
          :class="{'active':item.active}"
          @click="()=>tagClickFn(item)"
          v-for="(item,index) in tagList"
          :key="index"
        >
          <span>#</span>
          {{item.label}}
        </div>
      </div>
      <div class="input">
        <div class="sign">#</div>
        <input v-model="cusTag" type="text" placeholder="点击输入你的特色标签" />
      </div>
    </div>

    <div class="footer">
      <van-field
        v-model="form.zpms"
        rows="10"
        autosize
        type="textarea"
        maxlength="3000"
        placeholder="#具体路线#
#亮点介绍#
#游玩点评# "
        show-word-limit
      />
      <div class="btn" @click="submitFn">
        <div class="submit">确认提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import GmtImageUpload from "@/components/GmtImageUpload";
import UploadVideo from "../component/UploadVideo";
import wjutils from "@/js/WjSmrzUtil";
export default {
  data() {
    return {
      // 标签名称
      tagList: [
        {
          label: "半日游",
          active: false,
        },
        {
          active: false,
          label: "一日游",
        },
        {
          active: false,
          label: "两日游",
        },
        {
          active: false,
          label: "徒步游",
        },
        {
          active: false,
          label: "骑行游",
        },
        {
          active: false,
          label: "自驾游",
        },
        {
          active: false,
          label: "亲子游",
        },
        {
          active: false,
          label: "美食游",
        },
        {
          active: false,
          label: "网红打卡游",
        },
      ],
      form: {
        file_fmid: "",
        // is_video: 0
      },
      // tagCount: 0,
      cusTag: "",
    };
  },
  components: {
    GmtImageUpload,
    UploadVideo,
  },
  created() {
    this.$showSubscribe();
    wjutils.gotoSMRZIfNot(this);
    this.$dialog
      .confirm({
        title: "参赛投稿要求",
        message:
          '<p style="color:#333333;line-height: 26px;text-align: left;margin:0;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作品征集范围不限，只要能<span style="color: #4187EB;">反映高明的人文景象、自然风光、特色建筑、美食特产、休闲娱乐环境，能有助于推广“美丽高明”名片</span>，能提升群众对高明的关注度和认可度的作品即可，投稿前需先行取得作品全部版权，如发生版权纠纷责任自负。<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;参赛作品可采用“<span style="color: #4187EB;">文字+图片（短视频）</span>”等方式进行展示和说明，路线设计或游览攻略均可。<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获奖作品的使用权自评定之日起归主办方所有，主办方有权对其进行修改完善以及用于宣传推广。<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本次活动及公告未详尽的事宜，主办单位有最终解释权。</p>',
        confirmButtonText: "我已阅读",
        cancelButtonText: "取消",
        confirmButtonColor: "#333333",
      })
      .then(() => {
        //  this.$dialog
        //     .confirm({
        //     title: "请选择上传图片或视频",
        //     message: '<p style="text-align: left;line-height: 22px;">图片: 最多上传<strong>9</strong>张<br/>小视频: 只可上传<strong>1</strong>个，时间控制 在<strong>1分钟内</strong></p>',
        //     confirmButtonText:'视频',
        //     cancelButtonText:'图片',
        //     confirmButtonColor:'#323233'
        //     }).then(()=> {
        //         this.form.is_video=1
        // })
      })
      .catch(() => {
        // this.$router.replace('/mlgm/wdcstg');
        this.$router.go(-1);
      });
  },
  methods: {
    uploadCover() {
      this.$refs.coverUploader.waChatUploadImage();
    },
    tagClickFn(item) {
      if (item.active || this.tagCount < 5) {
        item.active = !item.active;
      } else {
        this.$toast("最多可选五个标签！");
        return false;
      }
    },
    submitFn() {
      if (!this.form.zpms || this.form.zpms.length < 100) {
        this.$toast.fail("请填写至少一百字的优质详细的攻略内容");
        return;
      }
      let zpbq = this.tagList
        .filter((m) => m.active)
        .map((m) => m.label)
        .join(";");
      let cusTag = this.cusTag.replace(/;/g, "");
      if (cusTag.length > 0) {
        zpbq += ";" + cusTag;
      }
      if (!zpbq) {
        this.$toast.fail("请选择作品标签");
        return;
      }
      if (zpbq.indexOf(";") === 0) {
        zpbq = zpbq.substr(1);
      }
      this.form.zpbq = zpbq;
      this.$indicator.open("提交中...");
      this.$post("api/mlgm/AddCszp", this.form).then((res) => {
        this.$indicator.close();
        if (res.data.success) {
          //    this.$toast('提交成功')
          this.$dialog
            .confirm({
              title: "您的作品已上传！",
              message: "请等待后台审核发布<br/> 发布后将以微信推送方式告知您！",
              confirmButtonText: "确定",
            })
            .then(() => {
              this.$router.replace(`/mlgm/cstg/${res.data.content}`);
            })
            .catch(() => {
              this.$router.replace(`/mlgm/cstg/${res.data.content}`);
            });
        } else {
          this.changtoast(res.data.message, "error");
        }
      });
    },
  },
  computed: {
    tagCount() {
      return this.tagList.filter((m) => m.active).length;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../style/cstg.scss";
</style>

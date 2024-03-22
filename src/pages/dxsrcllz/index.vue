 <template>
  <div class="container">
    <img class="xxzs" src="./images/斜线装饰.png" />
    <p class="title">
      各位大学生，高明全国大学生人才联络站已建立<span class="number">{{
        data.zs
      }}</span
      >个站点啦，还有尚未建站的区域，等待你们来开拓！想成为人才联络站的联络员，可直接联系“高明团团”~
    </p>
    <div class="QR_Code" @click="yl">
      <img src="./images/QRCode.jpg" />
    </div>
    <p class="explain">
      大学生人才联络站是在外高明大学生了解家乡发展变化、政策信息、岗位需求、创新创业环境的沟通桥梁。加入联络站，可让您求学在外仍时刻熟知家乡咨询，感受家乡关怀，可让您在迷茫时能第一时间找到家乡的帮助！快滑动屏幕找到属于您的专属组织吧！
    </p>
    <div class="tips">
      <div class="tips_item">
        <div class="left_icon">
          <img src="./images/ptfwdx.png" />
        </div>
        <div class="right_item">
          <p class="label">平台服务对象：</p>
          <p class="item">高明籍或在高明居住的在读大学生</p>
        </div>
      </div>
      <div class="tips_item">
        <div class="left_icon">
          <img src="./images/czlc.png" />
        </div>
        <div class="right_item">
          <p class="label">操作流程：</p>
          <p class="item">扫描加入各自片区群即可</p>
        </div>
      </div>
    </div>
    <div class="dropdown_menu">
      <div class="serch">
        <div>
          <input placeholder="请输入搜索内容" type="text" v-model="searchTxt" />
          <div class="imagesss" @click="Search">
            <img src="/images/secondLevelPages/search_blue_1.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="content" v-for="(item, index) in data.rcllzList" :key="index">
      <img :src="item.file_fmid" @click="lookOver(item.file_fmid)" />
      <p class="content_head">{{ item.pq }}片区联系人及电话</p>
      <div
        class="contact"
        :class="{ contact_one: item.rcllzRyxxList.length === 1 }"
      >
        <div
          class="contact_item"
          v-for="(contact, index) in item.rcllzRyxxList"
          :key="index"
        >
          <span class="name">{{ contact.xm }}</span>
          <span class="phone">{{ contact.lxdh }}</span>
        </div>
      </div>
    </div>
    <div class="tail">
      <p>更多问题也可添加团团微信（微信号gmqn0504）咨询！</p>
      <p>温馨提醒：如无法扫码入群请联系片区联系人或团团咨询。</p>
    </div>
  </div>
</template>

<script>
import { WcChatPreviewImage } from "@/js/WeChatpreviewImage"
import { ImagePreview } from "vant"
export default {
  data() {
    return {
      data: {},
      searchTxt: ""
    }
  },
  methods: {
    Search() {
      this.GetListData()
    },
    GetListData() {
      this.$indicator.open("加载中...")
      this.$post("api/Zx/dxsList", { type: 2, search: this.searchTxt }).then(
        res => {
          this.$indicator.close()
          if (res.data.success) {
            this.data = res.data.content
          } else {
            this.changtoast(res.data.message, "error")
          }
        }
      )
    },
    lookOver(item) {
      item = item.slice(2)
      let url = "http://gmt.gaoming.gov.cn" + item
      WcChatPreviewImage(url, [url])
    },
    yl() {
      ImagePreview([require("./images/QRCode.jpg")])
    }
  },
  created() {
    this.GetListData()
  }
}
</script>
<style scoped lang="scss">
@import "./style/index.scss";
</style>
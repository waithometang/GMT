<template>
  <div class="pushParticulars" v-if="tagList && showPages">
    <div class="content">
      <div class="iconTitle"> 
        <div class="left">
          <img :src="listData.headPortrait">
        </div>
        <div class="right">
          <div class="nameTitle">
            <div class="name">
              <div class="name_name">{{listData.name}}</div>
              <div class="name_state">
                <span>{{listData.blzt}}</span>
              </div>
            </div>
            <div class="title">{{listData.content}}</div>
          </div>
          <div class="icon">
            <div class="images"  v-for="(item_1, index_1) in listData.picture" :key="index_1" @click="previewImages(item_1, listData.picture)">
              <img :src="item_1">
            </div>
          </div>
          <div class="timecomment">
            {{listData.location}}
          </div>
          <div class="timecomment right">
            <div>
              {{listData.date}}
            </div>
          </div>
          <div class="reply-list">
            <div class="reply-content">
              <span>回复内容:</span>{{listData.reply}}
            </div>
            <div class="reply-accessory" v-for="(item_1, index_1) in listData.wjList" :key="index_1" v-show="listData.wjList">
              <div class="accessory-icon">
                <img src="/images/word_icon@2x.png" alt="">
              </div>
              <div class="accessory-name">
                <a :href="item_1.wj_url" @click="clickTagA(item_1.wj_url)" :download="item_1.wjmc">
                {{item_1.wjmc}}
                </a>
              </div>
              <a :href="item_1.wj_url" @click="clickTagA(item_1.wj_url)" :download="item_1.wjmc">
                <div class="download-icon">
                  <img src="/images/download_icon@2x.png" alt="">
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div v-if=" lx=='1' &&  listData.blzt != '未办结'" class="writeBack">
        <div class="writeBack_title">请对本次服务进行评价</div>
        <div class="icon_name">
          <div class="tab">
            <div class="tab_content" :class="{'tag_dissatisfied': goodState === 1}" @click="SetisGood(1)">
              <img src="/images/manyi.png" alt="">
              <div class="tab_content_name">满意</div>
            </div>
          </div>
          <div class="tab">
            <div class="tab_content" :class="{'tag_dissatisfied': goodState === 2}"  @click="SetisGood(2)">
              <img src="/images/bumanyi.png" alt="">
              <div class="tab_content_name dissatisfied">不满意</div>
            </div>
          </div>
        </div>
        <div class="cause">请选择原因</div>
        <div class="causeList" v-if="isGood !== ''">
          <ul class="tag-list">
            <li class="tag" @click="SetTag(item, index)" :class="{'tag_action': item.isselect}" v-for="(item, index) in tagDome" :key="index">{{item.name}}</li>
          </ul>
        </div>
        <div class="writeBack_content">
          <textarea maxlength="200"  :readonly="!kypj" v-model="reason" placeholder="您的反馈会督促我们做得更好"></textarea>
        </div>
        <div class="but">
          <div class="but_text" @click="SetSqfypj" v-if="kypj">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetSqfyxx, GetSqfypj, GetSqpjTag} from '@/api/secondLevelPage'
import { WcChatPreviewImage } from '@/js/WeChatpreviewImage'
export default {
  data () {
    return {
      listData: '',
      reason: '',
      isGood: true,
      goodState:1,
      tagList: '',
      kypj: false,  //是否可以评价
      tagDome: [],
      showPages: false
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    lx () {
      return this.$route.params.lx
    }
  },
  methods: {
    GetListData () {
      GetSqpjTag (
        {},
        {
          method: 'get'
        }).then(rps => {
          if (rps.data.success) {
            this.tagList = rps.data.content
            this.ArraryTag()
          } else {
            this.changtoast(rps.data.message, "error")
          }
      })
      GetSqfyxx ({
        id: this.id,
        lx: this.lx
      }).then (rps => {
        this.showPages = true
        if (rps.data.success) {
          this.listData = rps.data.content
          this.reason = this.listData.reason
          this.listData.isGood ? this.goodState = 1 : this.goodState = 2
          this.kypj = this.listData.kypj
          //设置已选tag
          let _tag = this.listData.tag
          if(_tag){
            _tag=';'+_tag+';'
            this.tagDome.forEach(t => {
              if(_tag.indexOf(';'+t.name+';')>-1) t.isselect=true
            })
          }
        } else {
          this.changtoast(rps.data.message, "error")
        }
      })
    },
    SetTag (item, index) {
      if (!this.kypj) {
        return
      }
      item.isselect = !item.isselect
    },
    previewImages (item, data) {
      let url = 'http://gmt.gaoming.gov.cn' + item
      console.log(url)
      let datas = []
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let str = 'http://gmt.gaoming.gov.cn' + element
        datas.push(str)
      }
      WcChatPreviewImage(url, datas)
    },
    GetTagName () {
      let dome = this.tagDome.filter (rps => {
        return rps.isselect
      })
      let src = ''
      for (let index = 0; index < dome.length; index++) {
        const element = dome[index];
        if (src) {
          src = src + ';' +element.name
        } else {
          src = element.name
        }
      }
      return src
    },
    ArraryTag () {
      this.tagDome = []
      if (this.goodState === 1) {
        let data = this.tagList.good.split(';')
        for (let index = 0; index < data.length; index++) {
          const element = data[index]
          if (element) {
            this.tagDome.push({name: element, isselect: false})
          }
        }
      } else {
        let data = this.tagList.bad.split(';')
        for (let index = 0; index < data.length; index++) {
          const element = data[index]
          if (element) {
            this.tagDome.push({name: element, isselect: false})
          }
        }
      }
    },
    SetSqfypj () {
      GetSqfypj ({
        id: this.id,
        isGood: this.goodState === 1 ? true : false,
        reason: this.reason,
        tag: this.GetTagName(),
        lx: this.lx
      }).then(rps => {
        if (rps.data.success) {
          this.changtoast('评价成功')
        } else {
          this.changtoast(rps.data.message, "error")
        }
      })
    },
    SetisGood (item) {
      if (!this.kypj) {
        return
      }
      this.goodState = item
      this.ArraryTag()
    },
     // a标签跳转记录状态
    clickTagA (item) {
      window.location.href = `http://gmt.gaoming.gov.cn${item}`
    }
  },
  created () {
    this.GetListData()
  }
}
</script>

<style lang='scss' scoped type="text/css">
@import '@/style/pushParticulars.scss';
</style>

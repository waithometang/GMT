<template>
  <div class="evaluate">
    <div class="writeBack_title">您对本次服务满意？</div>
    <div class="icon_name">
      <div class="tab">
        <div class="tab_content" :class="{'tag_dissatisfied': tagState === 1}" @click="SetisGood(1)">
          <img src="/images/manyi.png" alt />
          <div class="tab_content_name">满意</div>
        </div>
      </div>
      <div class="tab">
        <div class="tab_content" :class="{'tag_dissatisfied': tagState === 2}" @click="SetisGood(2)">
          <img src="/images/bumanyi.png" alt />
          <div class="tab_content_name dissatisfied">不满意</div>
        </div>
      </div>
    </div>
    <div class="cause">请选择原因</div>
    <div class="causeList">
      <ul class="tag-list">
        <li class="tag" @click="SetTag(item, index)" :class="{'tag_action': item.isselect}" v-for="(item, index) in tagDome" :key="index">{{item.name}}</li>
      </ul>
    </div>
    <div class="writeBack_content">
      <textarea  :readonly="!kypj" v-model="reason" placeholder="您的反馈会督促我们做得更好"></textarea>
    </div>
    <div class="but" v-show="kypj">
      <div class="but_text" @click="SetSqfypj">提交</div>
    </div>
  </div>
</template>

<script>
import { GetSqfyxx, GetSqfypj, GetSqpjTag} from '@/api/secondLevelPage'

export default {
  data () {
    return {
      tagState: 1,
      reason: '',
      listData: [],
      tagList: '',
      kypj: false,  //是否可以评价
      tagDome: [],//[{name: '满意'}, {name: '不满意'}, {name: '非常满意'}, {name: '非常不满意'}, {name: '其他'},]
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    SetisGood(item) {
      if(!this.kypj) return
      this.tagState = item
      this.ArraryTag()
    },
    SetSqfypj () {
      GetSqfypj ({
        id: this.id,
        isGood: this.tagState === 1 ? true :false,
        reason: this.reason,
        tag: this.GetTagName(),
        lx: 1
      }).then(rps => {
        if (rps.data.success) {
          this.changtoast('评价成功')
          this.$router.go(-1)
        } else {
          this.changtoast(rps.data.message, "error")
        }
      })
    },
    SetTag (item) {
      if(!this.kypj) return
      item.isselect = !item.isselect
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
      GetSqfyxx({id:this.id,lx:1,zypj:true}).then(res=>{
        if(res.data.success){
          this.kypj=res.data.content.kypj
          if (!res.data.content.kypj) {
            let isgood = res.data.content.isGood
            this.SetisGood(isgood?1:2)
            this.reason = res.data.content.reason
            //设置已选tag
            let _tag = res.data.content.tag
            if(_tag){
              _tag=';'+_tag+';'
              this.tagDome.forEach(t => {
                if(_tag.indexOf(';'+t.name+';')>-1) t.isselect=true
              })
            }
          }
        }else{
          this.changtoast(res.data.message,'error')
        }
      })
    },
    ArraryTag () {
      this.tagDome = []
      if (this.tagState === 1) {
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
  },
  created () {
    this.GetListData()
  }
};
</script>

<style lang='scss' scoped type="text/css">
.evaluate {
  background: #ffffff;
  .writeBack_title {
    padding: 30px 0;
    font-size: 36px;
    margin-bottom: 15px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    text-align: center;
  }
  .cause {
    font-size: 28px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    padding:15px 0;
    text-align: center;
  }
  .icon_name {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    .tab {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .tab_content {
        display: flex;
        background:rgba(247,247,247,1);
        border-radius: 30px;
        img {
          width: 69px;
          height: 69px;
          flex: 0 0 auto;
        }
        .tab_content_name {
          flex: 1;
          display: flex;
          align-items: center;
          font-size: 28px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          padding: 0 58px 0 39px;
        }
        .dissatisfied {
          padding: 0 40px 0 44px;
        }
      }
      .tag_dissatisfied {
        background: rgba(255, 248, 231, 1);
      }
      .tab_content:active {
        background: #cccccc;
      }
    }
  }
  .causeList {
    padding: 27px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    .tag-list {
      list-style: none;
      padding: 0 50px;
      margin: 0;
      .tag {
        float: left;
        padding: 12px 24px;
        background: rgba(239, 239, 239, 1);
        border-radius: 26px;
        font-size: 26px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        margin-right: 14px;
        margin-bottom: 20px;
      }
      .tag_action {
        background:rgba(255,248,231,1);
      }
      .tag:active {
        background: #cccccc;
      }
    }
  }
  .writeBack_content {
    width: 617px;
    margin: auto;
    background: rgba(250, 250, 250, 1);
    border: 1px solid rgba(204, 204, 204, 1);
    border-radius: 10px;
    textarea {
      width: 557px;
      height: 160px;
      padding: 27px 30px;
    }
  }
  .but {
    padding: 20px 37px;
    height: 72px;
    .but_text {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background: rgba(56, 157, 235, 1);
      border-radius: 10px;
      font-size: 30px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>

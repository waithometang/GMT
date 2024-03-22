<template>
  <div class="jtcy">
    <div class="title">
      <span>主要家庭成员情况</span>
    </div>
    <van-form
      @submit="onSubmit"
      ref="form"
      label-align="right"
      :scroll-to-error="true"
    >
      <div class="cyxx" v-for="(item, index) in jtcys" :key="index">
        <GmtField v-model="item.cw" label="与本人关系" :readonly="isView" />
        <GmtField v-model="item.xm" label="姓名" :readonly="isView" />
        <sexSelector v-model="item.xb" :readonly="isView" />
        <datetimeSelector
          :minDate="birthminDate"
          v-model="item.csrq"
          label="出生年月"
          :readonly="isView"
        />
        <GmtField v-model="item.xgzdw" label="现工作单位" :readonly="isView" />
        <GmtField v-model="item.xgzzw" label="现工作职务" :readonly="isView" />
        <addressSelector
          v-model="item.hjszd"
          label="户籍所在地"
          :readonly="isView"
        />
        <i
          v-if="!isView && index !== 0"
          class="van-icon van-icon-clear van-uploader__preview-delete"
          @click="() => delFn(index)"
        ></i>
      </div>
    </van-form>
    <div class="base btn">
      <div class="base-tab width">
        <div class="public-long-but" @click="addMember" v-if="!isView">
          新增成员
        </div>
      </div>
    </div>
    <div class="yellow-btn2">
      <div class="base-tab">
        <div class="public-long-but" @click="beforeStep">上一步</div>
      </div>
      <div class="base-tab">
        <div class="public-long-but" @click="nextStep">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
import sexSelector from "@/components/vantSelector/sex"
import datetimeSelector from "@/components/vantSelector/datetime"
import GmtField from "@/components/GmtField"
import addressSelector from "@/components/vantSelector/address"
// import { GetWechatConfig } from "@/api/GetWechatConfig";
// import { xxxx } from "@/api/xzxxApi";
export default {
  data () {
    return {
      jtcys: [{}],
      birthminDate: new Date(1900, 1, 1),
      number: 1
    }
  },
  methods: {
    addMember () {
      if (this.number < 6) {
        this.jtcys.push({})
        this.number = this.number + 1
      } else {
        this.$toast.fail("最多填写6人（含本人父母、夫妻、子女关系）")
      }
    },
    beforeStep () {
      this.$router.go(-1)
    },
    nextStep () {
      if (this.jtcys.length === 0) {
        this.$toast.fail("请填写家庭成员")
      } else {
        this.$refs.form.submit()
      }
    },
    delFn (i) {
      this.$dialog.confirm({ message: "是否确定删除该成员?" }).then(() => {
        this.number = this.number - 1
        this.jtcys.splice(i, 1)
      })
    },
    onSubmit () {
      this.$store.state.jszpData.jtcys = this.jtcys
      localStorage.setItem('tempJszpDataJTCY', JSON.stringify(this.jtcys))
      this.$router.push("xzlx" + window.location.search)
    }
  },
  created () {
    if (this.bmid) {
      this.$indicator.open('加载中...')
      this.$get('api/jszp/jtcylist?id=' + this.bmid).then(res => {
        this.$indicator.close()
        if (res.data.success) {
          this.jtcys = res.data.content
        } else {
          this.changtoast(res.data.message, 'error')
        }
      })
    } else {
      let jszpData = this.$store.state.jszpData
      if (!jszpData.gwxx) {
        this.$toast.fail('获取报考岗位信息失败,请重新选择')
        this.$router.replace('wybm')
        return
      }
      let jtcysStr = localStorage.getItem('tempJszpDataJTCY')
      if (jtcysStr) {
        this.jtcys = JSON.parse(jtcysStr)
      }
    }

  },
  components: {
    GmtField,
    sexSelector,
    datetimeSelector,
    addressSelector
  },
  computed: {
    bmid () {
      return this.$route.query.bmid;
    },
    isView () {
      //查看模式，不能修改
      return !!this.$route.query.bmid//this.$route.query.m === "v";
    },
  },
};
</script>

<style lang='scss' scoped>
.jtcy {
  .title {
    background-color: #fff;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(16, 16, 16, 1);
    line-height: 88px;
    padding: 10px 0px 10px 50px;
    margin-bottom: 20px;
  }
  .cyxx {
    margin: 20px 20px;
    padding: 0px 30px;
    position: relative;
    background-color: #fff;
    // overflow: hidden;
    // z-index: 999;
    border: 0px solid #ccc;
    border-radius: 50px;
  }
  .btn {
    margin-top: 20px;
    padding: 10px 30px;
  }
  .yellow-btn2 {
    background-color: inherit;
    margin-top: 0px;
  }
  .van-uploader__preview-delete {
    font-size: 50px;
    color: red;
  }
}
/deep/ .van-field__label {
  width: auto;
  margin-right: 30px;
}
/deep/ .van-uploader__preview-delete {
  background-color: #fff;
}
</style>

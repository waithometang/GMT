<template>
  <div class="hdbm">
    <van-form label-align="right" label-width="100px">
      <van-field :value="hdInfo.bmzt" label="报名主题：" :readonly="true" />
      <van-field :value="hdInfo.bmsj" label="报名时间：" :readonly="true" />
      <van-field
        autosize
        type="textarea"
        :value="hdInfo.sm"
        label="报名说明："
        :readonly="true"
      />
      <van-field :value="hdInfo.xm" label="姓名：" :readonly="true" />
      <van-field :value="hdInfo.lxdh" label="联系方式：" :readonly="true" />
      <van-field :value="hdInfo.sfzh" label="身份证号：" :readonly="true" />
    </van-form>
    <div class="formzy">
      <hdbmFormZy
        v-model="bmObj.dyzy_id"
        ref="formZys1"
        :readData="readData"
        :infoObj="hdInfo.zy1"
        :required="true"
        :hdid="hdInfo.id"
        :index="1"
      />
      <hdbmFormZy
        v-model="bmObj.dezy_id"
        ref="formZys2"
        :readData="readData"
        :infoObj="hdInfo.zy2"
        :hdid="hdInfo.id"
        :index="2"
      />
      <hdbmFormZy
        v-model="bmObj.dszy_id"
        ref="formZys3"
        :readData="readData"
        :infoObj="hdInfo.zy3"
        :hdid="hdInfo.id"
        :index="3"
      />
      <hdbmFormZy
        v-model="bmObj.dsgw_id"
        ref="formZys4"
        :readData="readData"
        :infoObj="hdInfo.zy4"
        :hdid="hdInfo.id"
        :index="4"
      />
      <hdbmFormZy
        v-model="bmObj.dwgw_id"
        ref="formZys5"
        :readData="readData"
        :infoObj="hdInfo.zy5"
        :hdid="hdInfo.id"
        :index="5"
      />
      <hdbmFormZy
        v-model="bmObj.dlgw_id"
        ref="formZys6"
        :readData="readData"
        :infoObj="hdInfo.zy6"
        :hdid="hdInfo.id"
        :index="6"
      />
      <van-form label-align="right" label-width="100px" @submit="submitFn">
        <van-field
          v-model="pageObj.zytc"
          label="专业特长："
          placeholder="请输入专业特长"
          :readonly="canNotEdit"
        />
        <van-field
          v-model="pageObj.zsjx"
          label="曾获得的证书和奖项："
          placeholder="请输入曾获得的证书和奖项"
          :readonly="canNotEdit"
        />
        <!-- <vant-selector
          v-model="pageObj.fctj"
          :columns="['是', '否']"
          label="是否服从调剂："
          :readonly="canNotEdit"
        /> -->
        <van-field
          v-model="pageObj.ksbz"
          label="备注"
          placeholder="请输入备注"
          :readonly="canNotEdit"
        />
        <div class="buttonDiv" v-if="canNotEdit">
          <van-button
            round
            block
            native-type="button"
            type="info"
            @click="beginEditFn"
            >修改报名信息</van-button
          >
          <!-- <van-button round block v-else="editModel" type="info">提交修改</van-button> -->
        </div>
        <div class="buttonDiv" v-else>
          <van-button v-if="hdInfo.isOver" round block disabled type="info"
            >活动已结束</van-button
          >
          <van-button v-else round block type="info">确认提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import hdbmFormZy from "./hdbmFormZy";
import GmtField from "@/components/GmtField"
import yesnoF from "@/components/vantField/yesno"
export default {
  components: {
    hdbmFormZy,
    GmtField,
    yesnoF
  },
  methods: {
    beginEditFn () {
      this.canNotEdit = false
      this.$refs.formZys1.tranToShow()
      this.$refs.formZys2.tranToShow()
      this.$refs.formZys3.tranToShow()
      this.$refs.formZys4.tranToShow()
      this.$refs.formZys5.tranToShow()
      this.$refs.formZys6.tranToShow()
    },
    checkHasSameZY () {
      let hasMap = {}
      hasMap[this.bmObj.dyzy_id] = true
      if (this.bmObj.dezy_id) {
        if (hasMap[this.bmObj.dezy_id]) return true
        else hasMap[this.bmObj.dezy_id] = true
      }
      if (this.bmObj.dszy_id) {
        if (hasMap[this.bmObj.dszy_id]) return true
        else hasMap[this.bmObj.dszy_id] = true
      }
      if (this.bmObj.dsgw_id) {
        if (hasMap[this.bmObj.dsgw_id]) return true
        else hasMap[this.bmObj.dsgw_id] = true
      }
      if (this.bmObj.dwgw_id) {
        if (hasMap[this.bmObj.dwgw_id]) return true
        else hasMap[this.bmObj.dwgw_id] = true
      }
      if (this.bmObj.dlgw_id) {
        if (hasMap[this.bmObj.dlgw_id]) return true
        else hasMap[this.bmObj.dlgw_id] = true
      }
      return false
    },
    submitFn () {
      if (!this.bmObj.dyzy_id) {
        this.$alert('请填写志愿一', '温馨提示')
        return
      }
      if (this.checkHasSameZY()) {
        this.$alert('存在重复的志愿', '温馨提示')
        return
      }
      this.$dialog
        .confirm({
          title: "确认报名",
          message: "请确认填报实习意向信息\n报名截止日期过后不可更改!",
          confirmButtonColor: "#2E3092",
          className: "bigConfirm",
        })
        .then(() => {
          let hdid = this.hdInfo.id
          this.$indicator.open('提交中...')
          let _params = { hdid, zy1: this.bmObj.dyzy_id, zy2: this.bmObj.dezy_id, zy3: this.bmObj.dszy_id, zy4: this.bmObj.dsgw_id, zy5: this.bmObj.dwgw_id, zy6: this.bmObj.dlgw_id }
          Object.assign(_params, this.pageObj)
          if (this.detailData) _params.id = this.detailData.id
          this.$post('api/zx/dxshdbm', _params).then(res => {
            if (res.data.success) {
              this.$toast('提交成功')
              if (!this.detailData) {
                this.bmObj = {}
                this.pageObj = {}
              }
              this.$emit('submitSc')
            } else {
              this.changtoast(res.data.message, 'error')
            }
          })
        })
        .catch(() => {
        });
    }
  },
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    detailData: {
      type: Object
    }
  },
  created () {
    if (this.detailData) {
      this.readData = true
      this.$indicator.open('加载中...')
      this.$post('api/zx/dxshdbmxx', { id: this.detailData.id }).then(res => {
        if (res.data.success) {
          this.hdInfo = res.data.content
          this.pageObj.zytc = this.hdInfo.zytc
          this.pageObj.zsjx = this.hdInfo.zsjx
          // this.pageObj.fctj = this.hdInfo.fctj
          this.pageObj.ksbz = this.hdInfo.ksbz
        } else {
          this.changtoast(res.data.message, 'error')
        }
      })
    } else {
      let __data = this.$route.params.data
      if (!__data) {
        if (this.$route.query.id) {
          // this.$indicator.open('加载中...')
          // this.$post('api/zx/dxsbmCheck').then(res =>{
          //   if (res.data.success){
          //     this.hdInfo=res.data.content
          //   }else{
          //     this.$alert(res.data.message,'温馨提示')
          //   }
          // })
        } else {
          this.$router.replace('/dxs')
        }
      }
      else {
        this.hdInfo = __data
      }
    }
    if (this.readonly) this.canNotEdit = true
  },
  data () {
    return {
      readData: false,
      pageObj: {},
      editModel: false,
      canNotEdit: false,
      hdInfo: {
        id: 0,
        bmzt: "",
        bmsj: "",
        sm: "",
        zy1: null,
        zy2: null,
        zy3: null,
        zy4: null,
        zy5: null,
        zy6: null,
        isOver: false
      },
      bmObj: {}
    };
  }
};
</script>

<style lang="scss" scoped>
.hdbm {
  background-color: #eeeeee;
  .formzy {
    margin-top: 12px;
    background-color: #fff;
  }
  .buttonDiv {
    padding: 16px;
    background-color: #fff;
  }
}
</style>

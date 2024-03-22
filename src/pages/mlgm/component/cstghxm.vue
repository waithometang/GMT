<template>
  <div class="Verification-code">
    <div class="content" v-for="(item,index) in listData" :key="index">
      <div class="head">
        <span>恭喜您</span>
        <span>获得{{item.jbmc}}!</span>
        <span>请展示该核销码给工作人员进行核销</span>
      </div>
      <div class="code">
        <qrcode-vue
          v-show="item.hxm"
          :value="baseUrl+item.hxm"
          :size="230"
          foreground="black"
          level="H"
        ></qrcode-vue>
      </div>
      <div class="time-place">
        <span>
          截止时间：{{item.jzsj}}
          <span v-if="!item.sfyx">已核销</span>
          <span v-else-if="item.sfgq">已失效</span>
        </span>
        <span v-html="'兑奖地点：'+item.dz"></span>
      </div>
    </div>
  </div>
</template>
<script>
import QrcodeVue from "qrcode.vue";
export default {
  data() {
    return {
      listData: [],
      baseUrl:'http://gmt.gaoming.gov.cn/mlgm/shjg?hxm=',
      // list :[
      //   {
      //     jbmc : "测试",
      //     hxm : "测试",
      //     jzsj : "测试",
      //     sfyx : true,
      //     sfgq : true,
      //     dz : "测试\n测测测"
      //   }
      // ]
    };
  },
  methods: {},
  created() {
    this.$indicator.open('加载中...')
    this.$post('api/mlgm/HxmInfo',{id: this.$route.query.id,sjlb:'参赛作品'}).then(res => {
      this.$indicator.close()
      if(res.data.success){
        this.listData=res.data.content
      }else{
        this.changtoast(res.data.message,'error')
      }
    })
  },
  components: {
    QrcodeVue,
  },
};
</script>

<style lang='scss' type="text/css" scoped>
@import "../style/cstghxm.scss";
</style>
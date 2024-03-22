<template>
  <div class="Verification-code">
    <div class="content">
      <div class="head">
        <span>恭喜您</span>
        <span>获得{{pageData.jbmc}}!</span>
        <span>请展示该核销码给工作人员进行核销</span>
      </div>
      <div class="code">
        <qrcode-vue v-show="pageData.hxm" :value="baseUrl+pageData.hxm" :size="230" foreground="black" level="H"></qrcode-vue>
      </div>
      <div class="time-place">
        <span>
          截止时间：{{pageData.jzsj}}
          <span v-if="!pageData.sfyx">已核销</span>
          <span v-else-if="pageData.sfgq">已失效</span>
        </span>
        <span v-html="'兑奖地点：'+pageData.dz"></span>
      </div>
    </div>
  </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue'
export default {
  data() {
    return {
      baseUrl:'http://gmt.gaoming.gov.cn/mlgm/shjg?hxm=',
      pageData:{}
    };
  },
  methods: {},
  created() {
    this.$indicator.open('加载中...')
    this.$post('api/mlgm/HxmInfo',{id: this.$route.query.id,sjlb:'黑点举报'}).then(res => {
      this.$indicator.close()
      if(res.data.success){
        this.pageData=res.data.content
      }else{
        this.changtoast(res.data.message,'error')
      }
    })
  },
  components:{
    QrcodeVue
  }
};
</script>

<style lang='scss' type="text/css" scoped>
@import "./style/hxm.scss";
</style>
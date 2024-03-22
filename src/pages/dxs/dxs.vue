<template>
  <div class="dxs">
    <div class="dxs_box">
      <div class="list">
        <img src="./images/xxrz.png">
        <dl
          v-for="(item, index) in dxlist"
          :key="index"
          @click="() => demo(index)"
        >
          <dt>
            <img :src="item.image" alt />
          </dt>
          <dd>
            <p>{{ item.title }}</p>
            <p>{{ item.bydate }}</p>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant"
export default {
  data() {
    return {
      dxlist: [
        // {image:require("../../images/cd2e7ee21cb491bae820a27aee010de.png"),title:'明撑大学生·放假齐充电',bydate:'2020年暑假走读高明活动报名'},
        {
          image: require("../../images/gaosan.png"),
          title: "高三毕业生（含中职应届毕业生）",
          bydate: "2021年毕业的高三学生"
        },
        {
          image: require("../../images/zaixiao.png"),
          title: "在校大学生",
          bydate: "2018年至2020年高中毕业的在校大学生"
        },
        {
          image: require("../../images/biye.png"),
          title: "毕业五年内大学生",
          bydate: "2017年至2021年大学毕业的应往届生"
        },
        {
          image: require("../../images/biye5.png"),
          title: "毕业五年以上大学生",
          bydate: "2017年以前大学毕业的应往届生"
        }
      ]
    }
  },
  created() {
    this.$showSubscribe().then(res => {})
    Dialog.alert({
      title: '温馨提示',
      message:
        "&emsp;&emsp;高明大学生信息平台是全市首个专门对大学生建立的一站式综合服务平台，以信息采集和分析为基础，通过大数据融合更精准地为高明大学生推送实习、就业、社会实践活动、人才政策等信息，增强大学生与家乡之间的互动交流。",
      className: "bigConfirm clause"
    }).then(() => {})
  },
  methods: {
    demo(i) {
      // if (i===3) {
      //   this.$indicator.open('加载中...')
      //   this.$post('api/zx/dxsbmCheck').then(res =>{
      //     if (res.data.success){
      //       this.$router.push({
      //         name:"dxshdbm",
      //         params:{data:res.data.content}
      //       })
      //     }else {
      //       this.$alert(res.data.message,'温馨提示')
      //     }
      //     // else if(res.data.errorCode===406){
      //     //   this.$dialog.alert({message:res.data.message,title:'温馨提示',confirmButtonText:'前往报到'}).then(()=>{
      //     //     this.$router.push('/dxsxxtx/2')
      //     //   })
      //     // }
      //   })
      // }else{
      //   this.$router.push('/dxsxxtx/'+(i+1))
      // }
      this.$router.push("/dxsxxtx/" + (i + 1))
      // if (i===0) {
      //       this.$indicator.open('加载中...')
      //       this.$post('api/zx/dxsmccb').then(res =>{
      //         if (res.data.success){
      //           this.$router.push('/dxszdhd')
      //         }else{
      //           this.$alert(res.data.message,'温馨提示')
      //         }
      //       })
      // }else{
      //   this.$router.push('/dxsxxtx/'+(i+1))
      // }
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style/dxs.scss";
</style>
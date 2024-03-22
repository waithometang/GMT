<template>
  <div class="container">
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item
        v-model="gxxw"
        :options="option1"
        @change="changeDropdown"
      />
      <van-dropdown-item
        v-model="wpfl"
        :options="option2"
        @change="changeDropdown"
      />
      <van-dropdown-item
        v-model="wpzt"
        :options="option3"
        @change="changeDropdown"
      />
    </van-dropdown-menu>
    <table width="92%" class="table_head">
      <tr class="tr_th">
        <th width="30%">物品名称</th>
        <th width="20%">数量</th>
        <th width="25%">可借出</th>
        <th width="25%">已借出</th>
      </tr>
    </table>
    <div class="table_item">
      <table width="100%" class="table_content">
        <tr
          align="center"
          v-for="(item, index) in listData"
          :key="index"
          @click="gotoWpjyxq(item.wpmc, item.kjysl)"
        >
          <td width="30%">{{ item.wpmc }}</td>
          <td width="20%">{{ item.gxsl }}</td>
          <td width="25%">{{ item.kjysl }}</td>
          <td width="25%">{{ item.yjysl }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      gxxw: "",
      wpfl: "",
      wpzt: "",
      option1: [],
      option2: [{ text: "物品分类", value: "" }],
      option3: [{ text: "物品状态", value: "" }],
      listData: []
    }
  },
  methods: {
    changeDropdown() {
      this.refreshList()
    },
    refreshList() {
      this.$indicator.open("加载中...")
      this.$post("api/PartyBuilding/xwwpList", {
        gxxw: this.gxxw,
        wpfl: this.wpfl,
        wpzt: this.wpzt
      }).then(res => {
        this.$indicator.close()
        if (res.data.success) {
          this.listData = res.data.content
        } else {
          this.changtoast(res.data.message, "error")
        }
      })
    },
    gotoWpjyxq(wpmc, kjysl) {
      if (kjysl > 0) {
        this.$router.push({
          path: `/sqfw/gxwp/jysq/${this.$route.params.vid}`,
          query: {
            gxxw: this.gxxw,
            wpmc: wpmc
          }
        })
      }else{
        this.changtoast("该物品可借出数量为0！", "warning")
      }
    }
  },
  created() {
    var that = this
    this.$indicator.open("加载中...")
    this.$post("api/PartyBuilding/fllXq").then(res => {
      if (res.data.success) {
        res.data.content.xwmcList.forEach(element => {
          that.option1.push({ text: element.xwmc, value: element.xwmc })
        })
        res.data.content.wpflList.forEach(element => {
          that.option2.push({ text: element, value: element })
        })
        res.data.content.wpztList.forEach(element => {
          that.option3.push({ text: element, value: element })
        })
        this.gxxw = this.option1[0].text
        this.refreshList()
      } else {
        this.changtoast(res.data.message, "error")
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import "./style/xwwp.scss";
</style>
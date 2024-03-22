<template>
  <div class="public_list_tag" v-if="listData">
    <div
      class="list_tag_list"
      v-for="(item_1, index_1) in listData.menus"
      :key="index_1"
    >
      <ul>
        <li
          class="list_tag_list_tab"
          v-for="(item, index) in item_1"
          :key="index"
          @click="switchoverPages(item)"
        >
          <div class="list_tab_icon">
            <img class="list_tab_icon_index" :src="item.images" alt="" />
          </div>
          <div class="list_tab_name">{{ item.title }}</div>
          <div class="list_tab_number" v-if="item.redNumber > 0">
            {{ item.redNumber >= 99 ? '99+' : item.redNumber }}
          </div>
        </li>
        <div style="clear: both"></div>
      </ul>
    </div>
  </div>
</template>

<script>
import { storage, session_Storage } from "@/js/until"
import { mapActions } from "vuex"
import { UpdateReadRecord } from '@/api/secondLevelPage'
export default {
  data () {
    return {

    }
  },
  props: {
    listData: {

    },
    numberData: {

    }
  },
  computed: {
    userinfo () {
      return this.$store.state.userinfo
    }
  },
  methods: {
    getReadNumber (item) {
      let dome = this.numberData.filter(rps => {
        return rps.id === item.Id
      })
      if (dome.length > 0) {
        return dome[0]
      } else {
        return false
      }
    },
    // 首页图标跳转
    switchoverPages (item) {
      console.log(item);
      // if (item.Id === 70) {
      //   this.$dialog.alert({
      //     title: '温馨提示',
      //     message: '幼儿园报名还未开始，敬请期待'
      //   })
      //   return
      // }
      if (!item.sfkf) {
        this.$alert(item.gbsm || '功能开发中', '温馨提示')
        return
      }
      if (item.redNumber) {
        item.redNumber = 0
        this.emptyredNumber(item.Id)
        UpdateReadRecord({
          menuId: item.Id,
          vid: this.ButtomTageState === 2 ? this.userinfo.id : 0
        })
      }
      let urlVillageId = ''
      if (this.userinfo.id) urlVillageId = '/' + this.userinfo.id
      this.selectIndex = item.id
      switch (item.gnlx) {  //功能类型
        case 1:   //发布类
          this.$router.push(`/nrfb/${item.fblx_id}${urlVillageId}`)
          break;
        case 2:  //内部链接
          if (item.Id === 70) {
            window.location.href = item.linkage
          } else if (item.Id === 82) {
            this.$router.push(item.linkage + '?t=' + new Date().getTime())
          } else {
            if (this.ButtomTageState == 2) {
              this.$router.push(item.linkage + urlVillageId)
            } else {
              this.$router.push(item.linkage)
            }
          }
          break;
        case 3:  //外部链接
          window.location.href = item.linkage
          break;
        case "5":
          this.$store.commit('Set_ButtomTageState', 4) // 底部导航状态
          this.$store.commit('Set_TopTagState', 1) // 诉求反映顶部导航状态
          break;
        default:
          break;
      }
    },
    // 清空阅读数
    emptyredNumber (item) {
      let NotReadNumberData = session_Storage.fetch('NotReadNumber').data
      let data = NotReadNumberData.data || []
      let key = NotReadNumberData.key || []
      data.filter(val => {
        if (val.id === item) {
          val.number = 0
        }
      })
      session_Storage.save('NotReadNumber', { data, key })
    }
  },
  // updateMenu(){
  //   let menu =this.listData
  //   this.listData=[]
  //   this.$nextTick(() => {this.listData=menu})
  // }
}
</script>
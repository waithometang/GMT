<template>
  <div class="public_list_tag" v-if="listData && numberData">
    <div class="list_tag_list" v-for="(item_1, index_1) in listData.menus" :key="index_1">
      <ul>
        <li class="list_tag_list_tab" v-for="(item, index) in item_1" :key="index">
          <div class="list_tab_icon">
            <img src="/static/11@2x.png" alt="">
          </div>
          <div class="list_tab_name">{{item.title}}</div>
          <div class="list_tab_number" v-if="getReadNumber(item) && getReadNumber(item).number > 0">{{getReadNumber(item).number > 99 ? '99+' : getReadNumber(item).number}}</div>
        </li>
        <div style="clear:both;"></div> 
      </ul>
    </div>
  </div>
</template>

<script>
import { AppSetting } from "@/api/FirstLevelPage.js"
import { NotReadNumber } from '@/api/secondLevelPage'
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
    }
  }
}
</script>
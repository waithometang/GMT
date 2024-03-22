<template>
  <div class="wdsq">
    <GmtSearchList v-if="isselect" url="fapi/qzhd/YqfkWdsq">
			<template slot="item" slot-scope="listData">
        <div class="wdsq_item" @click="wdxx(item)" v-for="(item,index) in listData.data" :key="index">
          <p class="xqlx">{{item.xqlx}}</p>
          <span class="title">{{item.sqry}}</span>
          <span class="time">{{item.sqsj}}</span>
        </div>
      </template>
		</GmtSearchList>
  </div>
</template>
<script>
import GmtSearchList from '@/components/GmtSearchList';
export default {
  components: {
    GmtSearchList
  },
  data(){
    return{
      isselect:true
    } 
  },
  methods:{
    wdxx(item){
      // this.$router.push(`/fntxqbzxx/${item.id}`)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../style/wdsq.scss"
</style>
<!-- 党建概况 -->
<template>
  <div class="VillageRegulations">
    <div class="hread">
      <img src="/images/party/party-banner-04.png">
    </div>
    <div class="title">
      <div></div>
      区党组织概况
    </div>
    <div class="pages_main" v-html="listData.qzzgk">
      {{listData.qzzgk}}
    </div>
    <div class="title">
      <div></div>
      镇街党组织概况
    </div>
    <div class="pages_main" v-html="listData.zzzgk">
      {{listData.zzzgk}}
    </div>
    <template v-if="listData.czzgk">
      <div class="title">
        <div></div>
        村居党组织概况
      </div>
      <div class="pages_main" v-html="listData.czzgk">
      </div>
    </template>
  </div>
</template>

<script>
import { GetDjgk } from '@/api/PartyBuilding'
export default {
  data () {
    return {
      listData: ''  
    }
  },
  computed: {
    id () {
      return this.$route.params.vid
    }
  },
  methods: {
    _GetDjgk () {
      GetDjgk ({
        id: this.id
      }).then (rps => {
        if (rps.data.success) {
          this.listData = rps.data.content
        } else {
          this.changtoast(res.data.message, "error");
        }
      })
    }
  },
  created () {
    this._GetDjgk()
  }
}
</script>

<style lang="scss" scoped>
.VillageRegulations{
  position: absolute;
  overflow-x: hidden;
  background: white;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .hread {
    width: 100%;
    height: 300px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title {
    padding-left: 22px;
    padding-bottom: 10px;
    padding-top: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ebeef5;
    display: flex;
    font-size: 30px;
    align-items: center;
    div {
      width: 8px;
      height: 30px;
      margin-right: 18px;
      background: #379dea;
      border-radius: 30px;
    }
  }
  .pages_main{
    margin:22px;
    overflow: hidden;
    text-indent: 2em;
    word-wrap: break-word;
    font-size: 30px;
  }
}
</style>

<template>
  <div class="organization_xq">
    <div class="organization_xq_hread">
      <div class="list_organization_left">
        <img :src="!listData.img ? '/static/FNT_IMAGES/serch_organization/organization_logo.png' : listData.img" />
      </div>
      <div class="list_organization_right">
        <div class="list_organization_right_font">
          <span class="list_organization_right_title">{{listData.sqfl}}</span>
          <div class="list_organization_right_div">
            <span>所在镇街:{{listData.sszj}}</span>
            <span>
              发布活动:
              <span>{{listData.hds}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="organization_xq_item">
      <div class="organization_xq_item_title">服务时间：</div>
      <div class="organization_xq_item_content">{{listData.fwsj}}</div>
    </div>
    <div class="organization_xq_item">
      <div class="organization_xq_item_title">联系方式：</div>
      <div class="organization_xq_item_content">
        <a :href="'tel:' + listData.tel">
          <img src="/static/FNT_IMAGES/tel.png" />
          {{listData.tel}}
        </a>
      </div>
    </div>
    <div class="organization_xq_item">
      <div class="organization_xq_item_title">联系地址：</div>
      <div class="organization_xq_item_content">{{listData.addr}}</div>
    </div>
    <div class="map">
      <div id="container"></div>
    </div>
    <div class="organization_xq_content">
      <div class="title_font">
        <div></div>
        <span>简要介绍</span>
      </div>
      <div class="content">{{listData.desc}}</div>
    </div>
  </div>
</template>

<script>
import { ZzzXx } from '@/api/FNTApi'
import { TMap } from '@/js/TMap'
export default {
  data(){
    return{
      listData:""
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    type() {
      return this.$route.params.type;
    }
  },
  methods: {
    getlistData () {
      ZzzXx({
        id: this.id,
        type: this.type
      }).then(rps => {
        if (rps.data.success) {
          this.listData = rps.data.content
          this.setMap()
        } else {
          this.changtoast(rsp.data.message, 'error')
        }
      })
    },
    setMap () {
      let lat=this.listData.lat
      let lng=this.listData.lng
      TMap('QOQBZ-HQ2EP-IC3DC-VLC2Z-QCUQT-IAFYS').then(qq => {
        let myLatlng = new qq.maps.LatLng(lat,lng);
        let myOptions = {
          zoom: 14,               //设置地图缩放级别
          center: myLatlng,      //设置中心点样式
          mapTypeId: qq.maps.MapTypeId.ROADMAP  //设置地图样式详情参见MapType
        }
        //获取dom元素添加地图信息
        let map = new qq.maps.Map(document.getElementById("container"), myOptions);
        //给定位的位置添加图片标注
        let marker = new qq.maps.Marker({position: myLatlng, map: map}); 
      })
    }
  },
  created () {
    this.getlistData()
  }
}
</script>

<style lang='scss' scoped>
@import './style/particulars.scss';
</style>

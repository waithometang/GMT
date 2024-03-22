<template>
  <div class="AEDMap" id="AEDMap"></div>
</template>
<script>
import { storage } from "@/js/until"
import { WaChatUploadPictures } from "@/js/WaChatUploadPictures"
import { DelUpload } from "@/api/WaChatApi"
import { TxGeocode } from "@/api/secondLevelPages/ruralRevitalization"
import { mapActions } from "vuex"
import BetterScroll from "@/components/BetterScroll"
import TxMap from "@/components/secondLevelPages/ruralRevitalization/TxMap"
import wjutils from "@/js/WjSmrzUtil"
import { GetWechatConfig } from "@/api/GetWechatConfig"
import { WeChatGetLocation } from "@/js/WeChatGetLocation"
import staticData from '../hsjcData'
export default {
  data () {
    return {
      map: {},
      markerArr: [], // AED信息
      listData: [], // 列表数据
      markerLocation: {}, // 所在点位标签
      marker: {}, // AED标签
      markerCenter: {}, // 地图中心点标签
      clickAEDMarker: {},
      WaChatConfigData: "",
      state: 0,
      icon: require("../images/定位red.png"),
      iconAfter: require("../images/定位blue.png"),
    }
  },
  props: ["aedList"],
  mounted () {
    // 微信接口获取所在地经纬度
    this.getLocation()
    setTimeout(() => {
      this.init()
    }, 2000)
  },
  computed: {
    WaChetLatitude () {
      return this.$store.state.WaChetLatitude
    },
    WaChetLongitude () {
      return this.$store.state.WaChetLongitude
    }
  },
  methods: {
    // 加载地图
    init () {
      var center = new TMap.LatLng(this.WaChetLatitude, this.WaChetLongitude)
      // var center = new TMap.LatLng(22.88955, 112.880258)

      //初始化地图
      this.map = new TMap.Map("AEDMap", {
        zoom: 12, //设置地图缩放级别
        center: center //设置地图中心点坐标
      })
      this.map.removeControl(TMap.constants.DEFAULT_CONTROL_ID.SCALE)
      this.map.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ZOOM)
      this.map.removeControl(TMap.constants.DEFAULT_CONTROL_ID.LOGO)
      this.map.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ROTATION)
      // 获取AED点位数据
      var that = this
      /**
       * todo: 请求接口数据
       */
      staticData.forEach(element => {
        this.markerArr.push({
          id: element.id,
          styleId: "marker",
          position: new TMap.LatLng(element.lat, element.lng),
          properties: {
            mc: element.mc,
            xxdz: element.xxdz,
          }
        })
      })
      this.marker = new TMap.MultiMarker({
        id: "marker-layer",
        map: this.map,
        styles: {
          //点标注的相关样式
          marker: new TMap.MarkerStyle({
            width: 30,
            height: 35,
            src: this.icon
          })
        },
        geometries: this.markerArr
      })
      this.markerCenter = new TMap.MultiMarker({
        id: "marker-location",
        map: this.map,
        styles: {
          //点标注的相关样式
          marker: new TMap.MarkerStyle({
            width: 25,
            height: 30,
            anchor: { x: 12, y: 40 },
            src: require("../images/定位.png")
          })
        },
        geometries: [
          {
            //点标注数据数组
            id: "moveLocation",
            styleId: "marker",
            position: center
          }
        ]
      })
      this.markerLocation = new TMap.MultiMarker({
        id: "marker-center",
        map: this.map,
        styles: {
          //点标注的相关样式
          marker: new TMap.MarkerStyle({
            width: 20,
            height: 25,
            src: require("../images/coordinates.png")
          })
        },
        geometries: [
          {
            //点标注数据数组
            id: "center",
            styleId: "marker",
            position: center
          }
        ]
      })
      this.clickAEDMarker = new TMap.MultiMarker({
        id: "clickMarker-layer",
        map: this.map,
        styles: {
          //点标注的相关样式
          marker: new TMap.MarkerStyle({
            width: 60,
            height: 70,
            src: this.iconAfter
          })
        },
        geometries: []
      })

      // 绑定地图点击事件
      this.map.on("click", this.clickMap)
      // 绑定标签点击事件
      this.marker.on("click", this.clickMarker)
      // 绑定地图平移事件
      this.map.on("pan", this.panMap)
      // 绑定地图平移结束事件
      this.map.on("panend", this.panendMap)
      // 绑定地图缩放事件
      this.map.on("zoom", this.chhangeZoom)
      this.renderList(this.WaChetLatitude, this.WaChetLongitude)

    },
    // 点击地图
    clickMap () {
      this.renderList(this.map.getCenter().lat, this.map.getCenter().lng)
    },
    // 点击AED标签
    clickMarker (e) {
      // this.map.setZoom(14)
      // this.map.setCenter(
      //   new TMap.LatLng(e.geometry.position.lat, e.geometry.position.lng)
      // )
      this.setGeometrie(this.clickAEDMarker, [
        {
          //点标注数据数组
          id: "click-marker",
          styleId: "marker",
          position: new TMap.LatLng(
            e.geometry.position.lat,
            e.geometry.position.lng
          )
        }
      ])
      this.$parent.noicon()
      this.state = 1
      this.map.easeTo(
        {
          zoom: 14,
          center: new TMap.LatLng(
            e.geometry.position.lat,
            e.geometry.position.lng
          )
        },
        { duration: 500 }
      )
      this.setStyle(this.marker, 60, 70)
      this.setStyle(this.clickAEDMarker, 60, 70, this.iconAfter)
      var jl = this.GetDistance(
        e.geometry.position.lat,
        e.geometry.position.lng,
        this.WaChetLatitude,
        this.WaChetLongitude
      )
      var list
      list = e.geometry
      list.jl = jl
      this.$emit("update:aedList", [list])
    },
    // 平移地图
    panMap () {
      this.setGeometrie(this.markerCenter, [
        {
          //点标注数据数组
          id: "center",
          styleId: "marker",
          position: new TMap.LatLng(
            this.map.getCenter().lat,
            this.map.getCenter().lng
          )
        }
      ])
    },
    // 平移地图结束
    panendMap () {
      if (this.state !== 1) {
        this.renderList(this.map.getCenter().lat, this.map.getCenter().lng)
      }
      this.state = 0
    },
    // 监听地图缩放
    chhangeZoom () {
      if (this.state !== 1) {
        if (this.map.getZoom() < 12) {
          this.setStyle(this.marker, 20, 25)
          this.setStyle(this.clickAEDMarker, 20, 25, this.iconAfter)
        } else if (this.map.getZoom() >= 12 && this.map.getZoom() < 13) {
          this.setStyle(this.marker, 30, 35)
          this.setStyle(this.clickAEDMarker, 30, 35, this.iconAfter)
        } else if (this.map.getZoom() >= 13 && this.map.getZoom() < 14) {
          this.setStyle(this.marker, 45, 53)
          this.setStyle(this.clickAEDMarker, 45, 53, this.iconAfter)
        } else if (this.map.getZoom() >= 14) {
          this.setStyle(this.marker, 60, 70)
          this.setStyle(this.clickAEDMarker, 60, 70, this.iconAfter)
        }
      }
    },
    // 判断距离,渲染列表数据
    renderList (lat, lng, geometries = this.marker.geometries) {
      var that = this
      this.listData = []
      geometries.forEach(element => {
        var jl = that.GetDistance(
          lat,
          lng,
          element.position.lat,
          element.position.lng
        )
        element.jl = jl
        // if (jl < 3000) {
        that.listData.push(element)
        // }
      })
      that.$parent.contentHeightAuto()
      that.listData.sort(this.sortData)
      that.$emit("update:aedList", that.listData)
    },
    sortData (a, b) {
      return a.jl - b.jl
    },
    // 定位
    location () {
      this.clickAEDMarker.setGeometries([])
      this.getLocation()
      this.setGeometrie(this.markerLocation, [
        {
          //点标注数据数组
          id: "center",
          styleId: "marker",
          position: new TMap.LatLng(this.WaChetLatitude, this.WaChetLongitude)
        }
      ])
      this.state = 1
      this.map.easeTo(
        {
          zoom: 12,
          center: new TMap.LatLng(this.WaChetLatitude, this.WaChetLongitude)
          // center: new TMap.LatLng(22.88955, 112.880258)
        },
        { duration: 500 }
      )
      this.setStyle(this.marker, 30, 35)
      this.renderList(this.WaChetLatitude, this.WaChetLongitude)
    },
    // 修改样式
    setStyle (marker, width, height, src = this.icon) {
      marker.setStyles({
        //点标注的相关样式
        marker: new TMap.MarkerStyle({
          width: width,
          height: height,
          src: src
        })
      })
    },
    setGeometrie (marker, geometries) {
      marker.setGeometries(geometries)
    },
    // 使用微信接口获取定位经纬度
    getLocation () {
      var u = navigator.userAgent
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1 //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
      let url = ""
      if (isAndroid) {
        url = location.href
      }
      if (isIOS) {
        url = location.href.split("#")[0] //hash后面的部分如果带上ios中config会不对
      }
      GetWechatConfig({
        url: url
      }).then(rps => {
        if (rps.data.success) {
          this.WaChatConfigData = rps.data.content
          WeChatGetLocation(this.WaChatConfigData, this)
        } else {
          this.changtoast(rps.data.message, "error")
        }
      })
    },
    // 根据经纬度计算两点距离
    GetDistance (lat1, lng1, lat2, lng2) {
      var radLat1 = (lat1 * Math.PI) / 180.0
      var radLat2 = (lat2 * Math.PI) / 180.0
      var a = radLat1 - radLat2
      var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0
      var s =
        2 *
        Math.asin(
          Math.sqrt(
            Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) *
            Math.cos(radLat2) *
            Math.pow(Math.sin(b / 2), 2)
          )
        )
      s = s * 6378137 // WGS1984坐标系,单位m
      s = Math.round(s * 10000) / 10000
      return s
    },
    /**
     * todo: 搜索的代码
     */
    search (query) {
      var searchArray = []

      staticData.forEach(element => {
        if (element.mc.indexOf(query) > -1 || element.xxdz.indexOf(query) > -1) {
          var jl = this.GetDistance(
            element.lat,
            element.lng,
            this.WaChetLatitude,
            this.WaChetLongitude
          )
          searchArray.push(
            {
              id: element.id,
              styleId: "marker",
              position: new TMap.LatLng(element.lat, element.lng),
              properties: {
                mc: element.mc,
                xxdz: element.xxdz,
              },
              jl: jl
            }
          )
        }
      })
      this.$emit("update:aedList", searchArray)
    }
  },
  created () {
    this.$showSubscribe().then(res => {
      var script = document.createElement("script")
      script.type = "text/javascript"
      script.src =
        "https://map.qq.com/api/gljs?v=1.exp&key=QOQBZ-HQ2EP-IC3DC-VLC2Z-QCUQT-IAFYS&referer=高明通"
      document.head.appendChild(script)
    })
  }
}
</script>

<style lang='scss' scoped>
.AEDMap {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
}
</style>
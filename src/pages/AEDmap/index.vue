<template>
  <div class="container">
    <div class="map" id="map">
      <Map :aedList.sync="aedList" :currentName="currentName" ref="map"></Map>
    </div>
    <div class="content" id="content">
      <div class="head" @touchmove="slideList" @click="clickList">
        <img :src="icon" v-if="!unicon" />
      </div>
      <div class="serch">
        <div>
          <input
            :placeholder="'查找' + currentName"
            type="text"
            v-model="query"
          />
          <div class="imagesss" @click="search">
            <img src="/images/secondLevelPages/search.png" />
          </div>
        </div>
      </div>
      <div class="aed-list" id="aed-list" v-if="aedList.length > 0">
        <ul class="aed-ul" id="aed-ul">
          <li class="aed-li" v-for="(item, index) in aedList" :key="index">
            <div class="aed-information">
              <p class="aed-name">{{ item.properties.mc }}</p>
              <p class="aed-address">{{ item.properties.xxdz }}</p>
              <p class="aed-phone">
                <span class="blue">{{ item.jl | capitalize }}</span> |
                <img src="./images/phone.png" />
                <span @click="call(item.properties.lxfs)">
                  {{ item.properties.lxfs }}
                </span>
              </p>
            </div>
            <div class="aed-btn" @click="toPlace(item)">
              <img src="./images/goto.png" />
              <span>到这去</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="aed-list" id="aed-list" v-else>
        <div class="no-aed">
          <img src="./images/noAED.png" />
          <span>无查询结果</span>
        </div>
      </div>
      <div class="location" @click="location">
        <van-icon name="aim" size="30" />
      </div>
      <div class="switch" @click="switchPoints">
        <img src="./images/切换.png" />
        <span v-if="currentName === '急救点'">切换为医疗机构</span>
        <span v-else>切换为急救点</span>
      </div>
    </div>
    <div class="btn-explain">
      <van-button plain type="info" size="small" @click="introduce"
        >AED介绍</van-button
      >
      <van-button plain type="info" size="small" @click="declare"
        >免责声明</van-button
      >
    </div>
  </div>
</template>
<script>
import Map from "./component/map"
export default {
  data () {
    return {
      aedList: [],
      state: true,
      icon: require("./images/收起.png"),
      unicon: false,
      currentName: "急救点",
      query: ""
    }
  },
  components: { Map },
  filters: {
    capitalize: function (value) {
      var jl
      if (value < 1000) {
        jl = Math.round(value) + "m"
      } else {
        jl = (value / 1000).toFixed(1) + "Km"
      }
      return jl
    }
  },
  methods: {
    // AED介绍
    introduce () {
      document
        .querySelector("body")
        .removeEventListener("touchmove", this.removeEvent, { passive: true })
      this.$dialog
        .alert({
          title: "AED介绍",
          message: `<div style="text-align: left;text-indent:2em;line-height: 24px;">AED是体外自动除颤器的简称，它是一种带计算机的医疗设备，可以评估患者的心律，并在检测到应进行电击的节律时间向心脏传输电击的一种仪器。室颤是病人的心脏电生理系统一种无序活动（这种状态可在心房或心室内发生），当在心室内发生时，会以快速无序方式颤动，阻止心室将血液泵送到全身，AED可以通过电击将室颤去除使心脏重新恢复正常工作。如果心脏骤停的病人立即实施心肺复苏并在数分钟内使用AED，则有最大的生存机会。</div><div style="text-align: left;text-indent:2em;line-height: 24px;"> AED不仅安全准确，而且易于使用，AED会检查患者是否需要电击，并会在患者需要电击时给出提示，它还会告诉你何时应确保无人接触患者，用于传导电击的电极片有一个示意图，它提示了电极片的贴放位置，一旦开启AED后，它就会指示你怎么做。</div>`
        })
        .then(() => {
          document
            .querySelector("body")
            .addEventListener("touchmove", this.removeEvent, { passive: false })
        })
    },
    // 免责声明
    declare () {
      document
        .querySelector("body")
        .removeEventListener("touchmove", this.removeEvent, { passive: true })
      this.$dialog
        .alert({
          title: "免责声明",
          message: `<div style="text-align: left;text-indent:2em;line-height: 24px;">本应用所提供的网点名称、地址信息，仅供查询参考，实际导航结果以用户所选用的第三方地图应用所显示的位置为准，本应用不保证其导航定位准确性。</div><div style="text-align: left;text-indent:2em;line-height: 24px;">在法律允许的范围内，本应用声明，不承担用户或任何人士就使用或未能使用本应用所提供的信息所引致的任何直接、间接、附带、从属、特殊、惩罚性或惩戒性的损害赔偿。 </div>`
        })
        .then(() => {
          document
            .querySelector("body")
            .addEventListener("touchmove", this.removeEvent, { passive: false })
        })
    },
    slideList (event) {
      var content = document.getElementById("content")
      content.style.transitionProperty = "none"
      content.style.transitionDuration = "none"
      var touch = event.touches[0] //获取第一个触点
      var screenY = Number(touch.screenY)
      if (
        this.aedList.length > 2 &&
        document.body.clientHeight - screenY + 80 < screenY
      ) {
        content.style.height = document.body.clientHeight - screenY + 80 + "px"
      } else if (
        this.aedList.length == 2 &&
        document.body.clientHeight - screenY + 310 < screenY
      ) {
        content.style.height = document.body.clientHeight - screenY + 80 + "px"
      }
      if (content.offsetHeight > document.body.clientHeight - screenY + 80) {
        this.icon = require("./images/展开.png")
        this.state = false
      } else {
        this.icon = require("./images/收起.png")
        this.state = true
      }
    },
    clickList () {
      if (!this.unicon) {
        if (this.state === true) {
          content.style.transitionProperty = "height"
          content.style.transitionDuration = "0.8s"
          content.style.height = "0px"
          this.icon = require("./images/展开.png")
          this.state = false
        } else {
          content.style.transitionProperty = "height"
          content.style.transitionDuration = "0.8s"
          content.style.height = "400px"
          this.icon = require("./images/收起.png")
          this.state = true
        }
      }
    },
    removeEvent (e) {
      if (!document.querySelector(".aed-list").contains(e.target)) {
        e.preventDefault()
      }
    },
    // content高度自适应
    contentHeightAuto () {
      this.unicon = false
      this.icon = require("./images/收起.png")
      this.state = true
      var content = document.getElementById("content")
      content.style.height = "auto"
    },
    toPlace (val) {
      var href =
        "http://apis.map.qq.com/uri/v1/marker?marker=coord:" +
        val.position.lat +
        "," +
        val.position.lng +
        ";title:" +
        val.properties.mc +
        ";addr: " +
        val.properties.xxdz
      window.location.href = href
    },
    // 拨打电话
    call (phone) {
      window.location.href = "tel://" + phone
    },
    // 定位
    location () {
      this.$refs.map.location()
    },
    noicon () {
      this.unicon = true
    },
    switchPoints () {
      if (this.currentName === "急救点") {
        this.currentName = "医疗机构"
      } else {
        this.currentName = "急救点"
      }
      this.$refs.map.switchPoints();
    },
    search () {
      this.$refs.map.search(this.query)
    }
  },
  mounted () {
    // 阻止下拉暴露域名来源
    document
      .querySelector("body")
      .addEventListener("touchmove", this.removeEvent, { passive: false })
  },
  created(){
    this.$showSubscribe()
  }
}
</script>
<style lang="scss" scoped>
@import './style/index.scss';
</style>
<template>
  <div class="jfpm">
    <table
      v-for="(item, index) in listData"
      :key="index"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      class="points-ranking"
    >
      <tr height="30" class="integral-head">
        <th width="20%">{{ item.group }}排名</th>
        <template v-if="index === 0">
          <th width="20%" align="left" class="team">球队</th>
          <th width="10%">场次</th>
          <th width="15%">胜/平/负</th>
          <th width="10%">进球</th>
          <th width="10%">失球</th>
          <th width="15%">积分</th>
        </template>
        <template v-else>
          <th width="20%"></th>
          <th width="10%"></th>
          <th width="15%"></th>
          <th width="10%"></th>
          <th width="10%"></th>
          <th width="15%"></th>
        </template>
      </tr>
      <tr
        v-for="(integral, index) in item.integral"
        :key="index"
        height="33"
        class="integral-list"
      >
        <td>
          <span class="name"> {{ index + 1 }}<img :src="integral.img" /> </span>
        </td>
        <td align="left">{{ integral.qd }}</td>
        <td>{{ integral.cc }}</td>
        <td>{{ integral.win }}/{{ integral.lose }}/{{ integral.flat }}</td>
        <td>{{ integral.jq }}</td>
        <td>{{ integral.sq }}</td>
        <td>{{ integral.jf }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listData: [
        {
          group: "A组",
          integral: [
            {
              img: require("./images/icon1.png"),
              qd: "飞鹰队",
              cc: "6",
              win: "5",
              lose: "0",
              flat: "1",
              jq: "9",
              sq: "1",
              jf: "20",
            },
            {
              img: require("./images/icon2.png"),
              qd: "战无不胜队",
              cc: "6",
              win: "3",
              lose: "2",
              flat: "1",
              jq: "8",
              sq: "1",
              jf: "19",
            },
            {
              img: require("./images/icon3.png"),
              qd: "火星队",
              cc: "6",
              win: "2",
              lose: "3",
              flat: "1",
              jq: "7",
              sq: "1",
              jf: "18",
            },
            {
              img: require("./images/icon4.png"),
              qd: "猛虎队",
              cc: "6",
              win: "1",
              lose: "4",
              flat: "1",
              jq: "6",
              sq: "1",
              jf: "12",
            },
          ],
        },
        {
          group: "B组",
          integral: [
            {
              img: require("./images/icon1.png"),
              qd: "飞鹰队",
              cc: "6",
              win: "5",
              lose: "0",
              flat: "1",
              jq: "9",
              sq: "1",
              jf: "20",
            },
            {
              img: require("./images/icon2.png"),
              qd: "战无不胜队",
              cc: "6",
              win: "3",
              lose: "2",
              flat: "1",
              jq: "8",
              sq: "1",
              jf: "19",
            },
            {
              img: require("./images/icon3.png"),
              qd: "火星队",
              cc: "6",
              win: "2",
              lose: "3",
              flat: "1",
              jq: "7",
              sq: "1",
              jf: "18",
            },
            {
              img: require("./images/icon4.png"),
              qd: "猛虎队",
              cc: "6",
              win: "1",
              lose: "4",
              flat: "1",
              jq: "6",
              sq: "1",
              jf: "12",
            },
          ],
        },
        {
          group: "C组",
          integral: [
            {
              img: require("./images/icon1.png"),
              qd: "飞鹰队",
              cc: "6",
              win: "5",
              lose: "0",
              flat: "1",
              jq: "9",
              sq: "1",
              jf: "20",
            },
            {
              img: require("./images/icon2.png"),
              qd: "战无不胜队",
              cc: "6",
              win: "3",
              lose: "2",
              flat: "1",
              jq: "8",
              sq: "1",
              jf: "19",
            },
            {
              img: require("./images/icon3.png"),
              qd: "火星队",
              cc: "6",
              win: "2",
              lose: "3",
              flat: "1",
              jq: "7",
              sq: "1",
              jf: "18",
            },
            {
              img: require("./images/icon4.png"),
              qd: "猛虎队",
              cc: "6",
              win: "1",
              lose: "4",
              flat: "1",
              jq: "6",
              sq: "1",
              jf: "12",
            },
          ],
        },
      ],
    };
  },
  components: {},
  methods: {},
  created() {
    // this.$indicator.open("加载中...");
    // this.$post("api/mlgm/jplxzcmd", {}).then((res) => {
    //   this.$indicator.close();
    //   if (res.data.success) {
    //     this.listData = res.data.content;
    //   } else {
    //     this.changtoast(res.data.message, "error");
    //   }
    // });
  },
};
</script>
<style lang="scss" type="text/css" scoped>
@import "./styles/jfpm.scss";
</style>

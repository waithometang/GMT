<template>
  <div class="zjgg">
    <div class="content-title">
      关于征集佛山市高明区2021年度民生实事项目建议的公告
    </div>
    <div class="content-info">
      为深入践行以人民为中心的发展思想，扎实做好“六稳”工作、全面落实“六保”任务，最大程度地倾听民声、汇聚民智，遴选出人民群众关切、社会关注的民生实事，努力让人民群众的获得感成色更足、幸福感更可持续、安全感更有保障，高明区人民政府现面向社会公开征集2021年民生实事项目建议。
    </div>
    <div class="content-item-title">一、征集时间</div>
    <div class="content-item-info">
      <span>&emsp;&emsp;2020年11月6日至2020年11月30日</span>
    </div>
    <div class="content-item-title">二、征集内容</div>
    <div class="content-item-info">
      &emsp;&emsp;真诚期待您就高明区疫情防控、就业创业、教育优质、文体惠民、医药卫生、交通出行、居住养老、政务服务、社保医保、养老济困、环境保护、城市治理、美丽乡村、公共安全等工作提出意见和建议。
    </div>
    <div class="content-item-title">三、征集要求</div>
    <div class="content-item-info">
      <span>（一）具有公益性、普惠性。</span>
      民生实事建议项目要与日常生活密切相关，突出普惠性、公益性和社会效益。
      <br />
      <span>（二）突出实施的时效性。</span>
      民生实事建议项目要突出时效性，原则上要求当年建设、当年竣工、当年见效。<br />
      <span>（三）符合高明财力实际。</span>
      民生实事建议项目应突出可行性，符合高明区政府财力实际。
    </div>
    <div class="content-item-title">四、征集方式</div>
    <div class="content-item-info">
      &emsp;&emsp;请将有关民生实事项目建议填入《高明区2021年度民生实事项目建议征集表》，一张表只填一个项目，并签署姓名、联系电话。可通过以下任何一种方式送达：<br />
      &emsp;&emsp;1.登录高明政府在线“为2021年度民生实事项目建言献策”专栏，按提示填写意见建议。<br />
      &emsp;&emsp;2.通过电子邮箱发送至高明区委政研室决策咨询股（fsgmdyk@126.com）。<br />
      &emsp;&emsp;3.关注“高明通”微信公众号，在“为2021年度民生实事项目建言献策”专栏上按提示填写意见建议。<br />
      &emsp;&emsp;4.来信邮寄至佛山市高明区荷城街道文汇路6号高明区委政研室决策咨询股，信封注明“为2021年度民生实事项目建言献策”。<br />
      <p>
        &emsp;&emsp;此次征集的项目建议，经分析、论证后，将吸收成为民生实事项目建议。高明区2021年度民生实事项目建议经区人民代表大会票决确定后向社会公布。
      </p>
    </div>
    <div class="btn" @click="handleChange">我要建议</div>
  </div>
</template>

<script>
export default {
  methods: {
    handleChange() {
      this.$emit('changeState', 2)
    }
  }
}
</script>
<style scoped lang="scss">
@import './style/zjgg.scss';
</style>
<template>
  <div class="xqsq">
    <div class="xqsq_hread">
      {{hread_title}}
    </div>
    <div class="xqsq_item">
        <span><span class="cor">&lowast;</span>需求类型：</span>
        <select @click="onselected" :class="{'selected' : selected}" v-model="xqlx">
              <option value="" style="display: none;" disabled selected >请选择需求类型</option>
              <option value="婚姻家庭关系调适">婚姻家庭关系调适</option>
              <option value="情绪疏导和心理咨询">情绪疏导和心理咨询</option>
              <option value="法律服务">法律服务</option>
              <option value="家庭教育">家庭教育</option>
              <option value="慈善助学">慈善助学</option>
              <option value="其他">其他</option>
        </select>
    </div>
    <div class="xqsq_item">
        <span><span class="cor">&lowast;</span>详细内容：</span>
        <textarea v-model="xxnr" placeholder="请输入你详细的需求申请内容"></textarea>
        <div class="picture">
          <ul>
            <li v-for="(item, index) in UploadPicturesSrc" :key="index"  @click="remove(item)">
              <img :src="item.src">
            </li>
            <li @click="waChatUploadImage" v-if="UploadPicturesSrc.length < 9">
              <img src="/static/FNT_IMAGES/add.png" alt=""> 
            </li>
            <div style="clear:both;"></div>
          </ul>
        </div>
    </div>
    <div class="xqsq_item">
      	<span><span class="cor">&lowast;</span>姓名：</span>
        <input type="text" v-model="sqry" placeholder="请填写真实姓名"/>
    </div>
    <div class="xqsq_item">
      	<span><span class="cor">&lowast;</span>联系地址：</span>
        <input type="text" v-model="lxdz" placeholder="请填写联系地址"/>
    </div>
    <div class="xqsq_item">
      	<span><span class="cor">&lowast;</span>身份证号：</span>
        <input type="text" v-model="sfzh" placeholder="请填写身份证号码"/>
    </div>
    <div class="xqsq_item">
      	<span><span class="cor">&lowast;</span>联系方式：</span>
        <input type="text" v-model="lxdh" placeholder="请填写联系方式"/>
    </div>
    <div @click="submit()" class="input-button">提交</div>
  </div>
</template>
<script>
import { YqfkXqsm,YqfkSqxx } from '@/api/FNTApi';
import { WaChatUploadPictures } from "@/js/WaChatUploadPictures";
import { DelUpload } from "@/api/WaChatApi";
export default {
  data(){
    return{
      xqlx:"",
      xxnr:'',
      sqry:'',
      sfzh:'',
      lxdh:'',
      lxdz:'',
      selected:true,
      hread_title:''
    }
  },
  computed: {
    UploadPicturesSrc() {
      return this.$store.state.UploadPicturesSrc;
    },
    UploadPicturesId() {
      return this.$store.state.MainIdData;
    },
  },
  created(){this.init()},
  methods:{
    onselected(){
      this.selected=false
    },
    waChatUploadImage () {
      let amount = 9 - this.UploadPicturesSrc.length
      WaChatUploadPictures(this.WaChatConfigData, amount);
    },
    init(){
      YqfkXqsm ({lx:1
      }).then (rps => {
        if (rps.data.success) {
          this.hread_title=rps.data.content[0]
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    submit(){
      if(this.xqlx==''){
        this.changtoast('需求类型不能为空', 'error')
      }else if(this.xxnr==''){
        this.changtoast('详细内容不能为空', 'error')
      }else if(this.sqry==''){
        this.changtoast('姓名不能为空', 'error')
      }else if(this.lxdz==''){
        this.changtoast('联系地址不能为空', 'error')
      }else if(this.sfzh==''){
        this.changtoast('身份证号码不能为空', 'error')
      }else if(this.lxdh==''){
        this.changtoast('联系电话不能为空', 'error')
      }else{
        YqfkSqxx ({
          xqlx:this.xqlx,
          xxnr:this.xxnr,
          sqry:this.sqry,
          lxdz:this.lxdz,
          sfzh:this.sfzh,
          lxdh:this.lxdh,
          nrfj:this.UploadPicturesId
        }).then (rps => {
          if (rps.data.success) {
            this.changtoast('提交成功');
            this.xqlx=''
            this.xxnr=''
            this.sqry=''
            this.sfzh=''
            this.lxdh=''
            this.lxdz=''
            this.$store.commit("SetUploadPicturesSrc", ""); // 清空记录的图片路径
            this.$store.commit("SetMainIdData", ""); // 清空记录的图片id
            this.$emit('childFn')
        } else {
          this.changtoast(rps.data.message, 'error')
          }
        })
      }
    },
    // 删除图片
    remove(item) {
      DelUpload({
        id: item.id
      }).then(rps => {
        if (rps.data.success) {
          this.changtoast("删除成功");
        } else {
          this.changtoast(rps.data.message, "error");
        }
      });
      let newUploadPicturesSrc = this.UploadPicturesSrc.filter(rps => {
        return rps.id != item.id;
      });
      this.$store.commit("SetUploadPicturesSrc", newUploadPicturesSrc);
    },
  }
}
</script>
<style lang="scss" scoped>
@import "../style/xqsq.scss"
</style>
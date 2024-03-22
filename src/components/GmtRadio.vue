<template>
    <div class="ewm_pages">
      <div class="ewm_hread" v-if="title">
        <p>{{title}}</p>
      </div>
      <div class="ewm_redio">
        <div class="select">
          <div
            class="select-tab"
            v-for="(item, index) in thisOptions"
            :key="index"
            @click="select(item)"
            :class="border?'border':''"
          >
            <i>
              <i v-if="item.isSelect"></i>
            </i>
            <div class="name-title">
              <div class="name">{{item.value}}</div>
              <div class="title">{{item.bz}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
let hasOnly = false

export default {
    watch:{
        value(){
            if (this.multiSelect) {
                this.mValue=';'+this.value+';'
            }
        }
    },
    data(){
        return {
            mValue:'',
            selectValue: '',
            thisOptions:[]
        }
    },
    methods:{
        select(item){
            if (this.multiSelect) {
                item.isSelect=!item.isSelect
                let colseNotOnly = false
                if(hasOnly){
                    if(item.isOnly){
                        if(item.isSelect){
                            this.cancleAll()
                        }
                        item.isSelect = true
                        this.selectValue=item.value
                    }else{
                        if(item.isSelect){
                            this.cancleIsOnly()
                        }
                        this.setSelectValue()
                    }
                }else{
                    this.setSelectValue()
                }
            }else{
                this.cancleAll()
                item.isSelect=true
                this.selectValue=item.value
            }
            this.$emit('input',this.selectValue)
            this.thisOptions=[]
            this.thisOptions=this.options
            
        },
        setSelectValue(){
            let _value = ''
            this.thisOptions.forEach(el => {
                if(el.isSelect) _value = `${_value};${el.value}`
            })
            if(_value.length > 0) _value = _value.substring(1)
            this.selectValue = _value
        },
        cancleAll(){
            this.thisOptions.forEach(el => {
                el.isSelect=false
            })
        },
        cancleIsOnly(){
            this.thisOptions.forEach(el => {
                if(el.isOnly)
                    el.isSelect=false
            })
        }
    },
    created () {
        let cOption;
        if (this.value) {
            let initSelect=this.value.split(';')
            for (var i = 0; i < this.options.length; i++) {
                cOption = this.options[i]
                if( initSelect.indexOf(cOption.value)> -1) {
                    cOption.isSelect=true
                    if(this.multiSelect) 
                        if(cOption.isOnly) hasOnly = true
                    else
                        break
                }
            }
        }else{
            if(this.multiSelect){
                for (var i = 0; i < this.options.length; i++) {
                    cOption = this.options[i]
                    if(cOption.isOnly){
                        hasOnly = true
                        break
                    }
                }
            }
        }
        if(this.value) this.selectValue=this.value
        this.thisOptions=this.options
    },
    props: {
        options:{
            type: Array,
            required: true
        },
        title:{
            type: String,
            required: true
        },
        value: {
            type: String
        },
        multiSelect: {
            type: Boolean,
            default:false
        },
        border:{
            type: Boolean,
            default:true
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '@/style/components/GmtRadio.scss';
</style>

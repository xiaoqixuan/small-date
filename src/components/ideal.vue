<template>
  <div>
    <header class="centertBC textC fontSize36">
        <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>理想对象
    </header>
    <section>
      <div class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF" @click="openPicker()">
				<span class="fl textL">出生年月</span>
				<input type="text" class="fr height88 textR inputColor" style="height:.87rem;line-height:.87rem" v-model="viewPickedTime" placeholder="不限" readonly="value" />
			</div>
      <div class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
				<span class="fl textL">身高</span>
				<input type="password" class="fr height88 textR inputColor" style="height:.86rem;line-height:.87rem" placeholder="不限" />
			</div>
      <div class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
				<span class="fl textL">体重</span>
				<input type="password" class="fr height88 textR inputColor" style="height:.86rem;line-height:.86rem" placeholder="不限" />
			</div>
      <div class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
				<span class="fl textL">学历</span>
				<input type="password" class="fr height88 textR inputColor" style="height:.86rem;line-height:.87rem" placeholder="不限" />
			</div>
      <div class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
				<span class="fl textL">籍贯</span>
				<input type="password" class="fr height88 textR inputColor" style="height:.87rem;line-height:.87rem" placeholder="不限" />
			</div>
      <div class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
				<span class="fl textL">婚姻状况</span>
				<input type="password" class="fr height88 textR inputColor" style="height:.86rem;line-height:.87rem" placeholder="不限" />
			</div>
      <div class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
				<span class="fl textL">最低收入</span>
				<input type="password" class="fr height88 textR inputColor" style="height:.86rem;line-height:.86rem" placeholder="不限" />
			</div>
      <div class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
				<span class="fl textL">有无车房</span>
				<input type="password" class="fr height88 textR inputColor" style="height:.86rem;line-height:.86rem" placeholder="不限" />
			</div>
    </section>
    <mt-datetime-picker
    ref="picker"
    type="date"
    :startDate="startDate"
    :endDate="endDate"
    year-format="{value} 年"
    month-format="{value} 月"
    date-format="{value} 日"
    v-model="pickerValue">
  </mt-datetime-picker>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  name: 'ideal',
  data () {
    return{
      pickerValue:'',
      startDate: new Date('1980-1-1'),
      endDate: new Date('2000-1-1'),
      viewPickedTime:'',
      pickedTime: new Date(),
      timeNum: ''
    }
  },
  watch: {
    pickerValue:function (newdata,olddata) {
      this.viewPickedTime = newdata.getFullYear()+"年"+(newdata.getMonth()+1)+"月"+newdata.getDate()+"日"
      this.pickedTime = newdata
      this.timeNum = Number(newdata)
    }
  },
  methods: {
    onValuesChange(picker, values) {
      console.log(values)
    },
    openPicker() {
        this.$refs.picker.open();
      }
  }
}
</script>
<style>
.picker{
  width: 100%;
  background-color: #ffffff !important;
  position: fixed;
  bottom: 0;
}
.picker-item{
  text-align: center !important;
  color: #888888 !important;
}
.picker-selected{
  color: #424242 !important;
}
</style>



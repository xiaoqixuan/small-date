<template>
  <div>
    <header class="centertBC textC fontSize36">
        <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>理想对象
    </header>
    <section>
        <div class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
            <span class="fl textL">年龄</span>
            <input type="text" class="fr height88 textR inputColor" style="height:.87rem;line-height:.87rem" placeholder="不限" readonly="value" />
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
    
    <!-- <mt-picker :slots="slots" @change="onValuesChange"></mt-picker> -->
    <!-- <mt-datetime-picker
        ref="picker"
        type="date"
        :startDate="startDate"
        :endDate="endDate"
        v-model="pickerValue">
    </mt-datetime-picker> -->
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    name: 'ideal',
    data () {
        return{
            msgList: [
                { label: '年龄', value: '129元', type: 'pickerValue' }, 
                { label: '身高', value: '129元', type: 'createUser' }, 
                { label: '体重', value: '129元', type: 'createUser' }, 
                { label: '学历', value: '129元', type: 'createUser' },
                { label: '籍贯', value: '129元', type: 'createUser' },
                { label: '婚姻状况', value: '129元', type: 'createUser' },
                { label: '最低收入', value: '129元', type: 'createUser' },
                { label: '有无车房', value: '129元', type: 'createUser' }
            ],
            // pickerValue:'',
            // action sheet 选项内容 
            options: {
                maritalStatus: [
                    { name: '未婚', value: 1, type: 'maritalStatus', method : this.changeVal },
                    { name: '离异无孩', value: 2, type: 'maritalStatus', method : this.changeVal },
                    { name: '离异有孩', value: 3, type: 'maritalStatus', method : this.changeVal }
                ],
                assets: [
                    { name: '有房有车', value: '11', type: 'assets', method : this.changeVal },
                    { name: '有房无车', value: '12', type: 'assets', method : this.changeVal },
                    { name: '无房有车', value: '21', type: 'assets', method : this.changeVal },
                    { name: '无房无车', value: '22', type: 'assets', method : this.changeVal }
                ]
            },
            // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏  
            showMaritalStatus: false,
            showAssets: false 
        }
    },
    computed: {
        startDate () {
            return new Date('1980-1-1')
        },
        endDate () {
            return new Date()
        }
    },
    // watch: {
    //     pickerValue (val, oldVal) {
    //         this.pickerValue = val.toLocaleDateString && val.toLocaleDateString().replace(/\//g, '-') || val
    //     }

    // },
    // watch: {
    //     pickerValue (newdata,olddata) {
    //         this.viewPickedTime = newdata.getFullYear()+"年"+(newdata.getMonth()+1)+"月"+newdata.getDate()+"日"
    //         this.pickedTime = newdata
    //         this.timeNum = Number(newdata)
    //     }
    // },
    methods: {
        onValuesChange (picker, values) {
            console.log(values)
        },
        openPicker () {
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



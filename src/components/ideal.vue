<template>
    <div>
        <header class="centertBC textC fontSize36">
            <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>理想对象
            <span style="position: absolute;right: .3rem;font-size: .3rem;" @click="save">保存</span>
        </header>
        <section>
            <ul class="basicsDiv backGFFF">
                <li class="height88 fontSize28 textL borderBottome5e5e5 paddingLR"
                    :class="{borderTop5e5e5: index === 0}"
                    v-for="(n,index) in msgList">
                    {{n.type === 'loverMinIncome' ? n.label+'(万/年)' : n.label }}
                    <!-- 年龄/身高/体重 -->
                    <span class="fr basicsInput backGFFF color888"
                        v-if="['Birth', 'Height', 'Weight'].indexOf(n.type) > -1"
                        @click="openSlots(n)">
                        {{n.value || '不限'}}<i class="fa fr fa-angle-right"></i>
                    </span>
                    <!-- 学历 -->
                    <span class="fr basicsInput backGFFF color888"
                        v-if="n.type === 'loverEducation'"
                        @click="showDegree=true">
                        {{ n.value ? ['初中以上', '高中以上', '大专以上', '本科以上', '硕士以上', '博士以上'][n.value-1] : '不限' }}
                        <i class="fa fr fa-angle-right"></i>
                    </span>
                    <!-- 籍贯，最低收入手输 -->
                    <input type="text" class="fr basicsInput backGFFF color888" placeholder="不限"
                        v-if="n.type === 'loverNativePlace' || n.type === 'loverMinIncome'"
                        v-model="n.value" />
                    <!-- 婚姻/资产状况复选框 -->
                    <span class="fr basicsInput backGFFF color888"
                        v-if="n.type === 'assets' || n.type === 'maritalStatus'"
                        @click="openChecklist(n)">
                        <span v-if="n.value.length" v-for="m in n.value">{{checkText[m]}}&nbsp;</span>
                        <span v-if="!n.value.length">不限</span><i class="fa fr fa-angle-right"></i>
                    </span>
                </li>
            </ul>
        </section>
        <!-- <section>
            <ul class="basicsDiv backGFFF" v-if="baseTab">
                <li class="height88 fontSize28 textL borderBottome5e5e5 paddingLR"
                    :class="{borderTop5e5e5: index === 0}"
                    v-for="(n,index) in base">
                    {{n.label}}

                    <input class="fr basicsInput backGFFF color888"
                        type="text" style="height:.84rem;line-height:.84rem"
                        v-if="n.type !== 'maritalStatus' && n.type !== 'birthday'"
                        v-model="n.value">

                    <span class="fr basicsInput backGFFF color888"
                        v-if="n.type === 'birthday'"
                        @click="openPicker">
                        {{date || '点击选择时间'}}<i class="fa fr fa-angle-right"></i>
                    </span>
                    <span class="fr basicsInput backGFFF color888"
                        v-if="n.type === 'maritalStatus'"
                        @click="showMaritalStatus=true">
                        {{n.value > 1 ? (n.value == 2 ? '离异无孩' : '离异有孩') : '未婚'}}
                        <i class="fa fr fa-angle-right"></i>
                    </span>
                </li>
            </ul> -->
            <!-- <div class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
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
                <input @click="showAssets=true" type="password" class="fr height88 textR inputColor" style="height:.86rem;line-height:.86rem" placeholder="不限" />
            </div>
        </section> -->
        <!-- 蒙层 -->
        <div class="tmc" v-if="showSlots ||showCheckList"></div>
        <!-- 年龄/身高/体重 -->
        <div class="picker-wrap" v-if="showSlots">
            <p class="title borderBottome5e5e5">
                请选择{{showSlots === 'Birth' ? '年龄' : (showSlots === 'Height' ? '身高' : '体重')}}:
                <i class="fa fr fa-remove" @click="showSlots = false"></i>
            </p>
            <mt-picker :slots="slots" @change="onValuesChange"></mt-picker> 
        </div>
        <!-- 学历 -->
        <mt-actionsheet  
            :actions= "options.loverEducation"
            v-model="showDegree">  
        </mt-actionsheet>
        <!-- 婚姻/资产 -->
        <div v-if="showCheckList" class="checklist-wrap">
            <mt-checklist
                v-model="checkVal"   
                align="right" 
                :options="checklist">  
            </mt-checklist>
            <p @click="showCheckList=false" style="padding:.2rem;background:#fff;"><i class="fa fa-remove"></i></p>
            <!-- <p @click="showCheckList=false" style="padding:.2rem;background: #fe5c5c;color: #fff;">选好了</p> -->
        </div>
    </div>
</template>
<script>
import { Indicator, Toast } from 'mint-ui'
export default {
    name: 'ideal',
    data () {
        return{
            // msgData: {
            //     loverBirthMin: '',
            //     loverBirthMax: '',
            //     loverHeightMin: '',
            //     loverHeightMax: '',
            //     loverWeightMin: '',
            //     loverWeightMax: '',
            //     loverEducation: '',
            //     loverNativePlace: '',
            //     loverUnmarried: '',
            //     loverDivorcedNoChild: '',
            //     loverDivorcedChild: '',
            //     loverMinIncome: '',
            //     loverHasHouse: '',
            //     loverHasCar: ''
            // },
            msgList: [
                { label: '年龄', value: '25-30', type: 'Birth' }, 
                { label: '身高', value: '175-185', type: 'Height' }, 
                { label: '体重', value: '70-90', type: 'Weight' }, 
                { label: '学历', value: 2, type: 'loverEducation' },
                { label: '籍贯', value: '四川 成都', type: 'loverNativePlace' },
                { label: '婚姻状况', value: ['loverDivorcedNoChild'], type: 'maritalStatus' },
                { label: '最低收入', value: '20', type: 'loverMinIncome' },
                { label: '有无车房', value: ['loverHasCar'], type: 'assets' }
            ],
            options: {
                maritalStatus: [
                    { label: '未婚', value: 'loverUnmarried', type: 'maritalStatus' },
                    { label: '离异无孩', value: 'loverDivorcedNoChild', type: 'maritalStatus' },
                    { label: '离异有孩', value: 'loverDivorcedChild', type: 'maritalStatus' }
                ],
                assets: [
                    { label: '有房', value: 'loverHasHouse', type: 'assets' },
                    { label: '有车', value: 'loverHasCar', type: 'assets' }
                ],
                loverEducation: [
                    { name: '初中以上', value: 1, type: 'loverEducation', method : this.changeVal },
                    { name: '高中以上', value: 2, type: 'loverEducation', method : this.changeVal },
                    { name: '大专以上', value: 3, type: 'loverEducation', method : this.changeVal },
                    { name: '本科以上', value: 4, type: 'loverEducation', method : this.changeVal },
                    { name: '硕士以上', value: 5, type: 'loverEducation', method : this.changeVal },
                    { name: '博士以上', value: 6, type: 'loverEducation', method : this.changeVal },
                ],
            },
            // 复选框参数配置(婚姻/资产)
            checklist: [],
            checkVal: [],
            showCheckList: false,
            checkText: {
                loverUnmarried: '未婚',
                loverDivorcedNoChild: '离异无孩',
                loverDivorcedChild: '离异有孩',
                loverHasHouse: '有房',
                loverHasCar: '有车'
            },
            // 单选picker参数配置(年龄/身高/体重)  
            showSlots: false,
            slots: [],
            slotsObj: {
                Birth: { range: [20, 50], gap: 5 },
                Height: { range: [140, 220], gap: 5 },
                Weight: { range: [35, 150], gap: 5 }
            },
            // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏(学历)
            showDegree: false,
        }
    },
    created(){
        this.getDetail()
    },
    watch: {
        // 更改婚姻/资产状态
        checkVal (val, oldVal) {
            console.log(val)
            const type = this.showCheckList
            this.msgList.forEach(it => {
                if(it.type === type) { // 查找字段
                    it.value = val
                }
            })
        }
    },
    methods: {
        getDetail () {
            const self = this
            Indicator.open(); // loading组件
            this.getData(`/member/memberbaseinfo/info`)
                .then(_data => {
                    const { memberBaseInfo } = _data
                    Indicator.close(); // loading组件
                    self.msgList.forEach(it => {
                        if (it.type === 'assets') { // 资产
                            it.value = []
                            if (memberBaseInfo.loverHasHouse == 1) it.value.push('loverHasHouse')
                            if (memberBaseInfo.loverHasCar == 1) it.value.push('loverHasCar')
                        } else if (it.type === 'maritalStatus') { // 婚姻
                            it.value = []
                            if (memberBaseInfo.loverUnmarried == 1) it.value.push('loverUnmarried')
                            if (memberBaseInfo.loverDivorcedNoChild == 1) it.value.push('loverDivorcedNoChild')
                            if (memberBaseInfo.loverDivorcedChild == 1) it.value.push('loverDivorcedChild')
                        } else if (['Birth', 'Height', 'Weight'].indexOf(it.type) > -1) { // 年龄/身高/体重/学历
                            const min = memberBaseInfo[`lover${it.type}Min`]
                            const max = memberBaseInfo[`lover${it.type}Max`]
                            it.value = [min, max].join('-')
                        } else {
                            it.value = memberBaseInfo[it.type]
                        }
                    })
                })
        },
        openChecklist (item) {
            if (!this.showCheckList) {
                this.showCheckList = item.type
                this.checkVal = item.value
                this.checklist = this.options[item.type]
            }
        },
        openSlots (item) {
            if (!this.showSlots) {
                this.showSlots = item.type
                this.getSlots(item.type, item.value)
            }
        },
        getSlots (type, defaultVal) {
            const list = []
            const { range, gap } = this.slotsObj[type]
            for (let i=range[0];i<range[1];i+=gap) {
                list.push(`${i+1}-${i+5}`)
            }
            this.slots = [
                { values: list, value: defaultVal, defaultIndex: list.indexOf(defaultVal) }
            ]
        },
        // 更改年龄/身高/体重状态
        onValuesChange(picker, values) {  
            console.log(values)
            const type = this.showSlots
            this.msgList.forEach(it => {
                if(it.type === type) { // 查找字段
                    it.value = values[0]
                }
            })
            console.log(this.msgList)
        },
        // 更改学历状态
        changeVal (item) {
            this.msgList.forEach(it => {
                if(it.type === 'loverEducation') { // 学历状况
                    it.value = item.value
                }
            })
            console.log(item.name, item.value)
        },
        save () {
            const self = this
            const param = {}
            self.msgList.forEach(item => {
                if (item.type === 'assets') { // 资产
                    param.loverHasHouse = item.value.indexOf('loverHasHouse') > -1 ? 1 : 0
                    param.loverHasCar = item.value.indexOf('loverHasCar') > -1 ? 1 : 0
                } else if (item.type === 'maritalStatus') { // 婚姻
                    param.loverUnmarried = item.value.indexOf('loverUnmarried') > -1 ? 1 : 0
                    param.loverDivorcedNoChild = item.value.indexOf('loverDivorcedNoChild') > -1 ? 1 : 0
                    param.loverDivorcedChild = item.value.indexOf('loverDivorcedChild') > -1 ? 1 : 0
                } else if (['Birth', 'Height', 'Weight'].indexOf(item.type) > -1) { // 年龄/身高/体重/学历
                    const list = item.value.split('-')
                    param[`lover${item.type}Min`] = list[0]
                    param[`lover${item.type}Max`] = list[1]
                } else {
                    param[item.type] = item.value
                }
                
            })
            console.log(param)
             self.getData('/member/memberbaseinfo/update', param).then(res => {
                console.log(res)
                if(res.code == 0) {
                    self.getDetail()
                    // Toast('保存成功')
                }
            })
        }
    }
}
</script>
<style>
.picker-wrap{
    position: fixed;
    bottom: 0;
    z-index: 6;
    width: 100%;
    background-color: #ffffff !important;
}
.title {
    padding: .2rem .3rem;
    font-size: .28rem;
    text-align: left;
}
.picker-selected{
    color: #fe5c5c !important;
}
.checklist-wrap {
    position: fixed;
    bottom: 0;
    z-index: 6;
    width: 100%;
    
}
</style>



<template>
    <div>
        <header class="centertBC textC fontSize36">
            <router-link :to="{path:'/center'}"  class="historyGo fontSize36"></router-link>
            基本资料
        </header>
        <section class="basics">
            <ul class="height88 backGFFF fontSize28 borderBottome5e5e5">
                <li class="basicsTab textC color888 fl"
                    :class="{ basicsActive: n.isActive }"
                    @click="changeTab(n.type)"
                    v-for="(n,index) in tab">
                    {{n.label}}
                </li>
            </ul>
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
            </ul>
            <ul class="basicsDiv backGFFF" v-if="workTab">
                <li class="height88 fontSize28 textL borderBottome5e5e5 paddingLR"
                    :class="{borderTop5e5e5: index === 0, heightAuto: n.type == 'assets'}"
                    v-for="(n,index) in work">
                    {{n.label}}
                    <input class="fr basicsInput backGFFF color888"
                        type="text" style="height:.84rem;line-height:.84rem"
                        v-if="n.type !== 'assets'"
                        v-model="n.value">

                    <!-- 资产状况单独处理 -->
                    <span class="fr basicsInput backGFFF color888"
                        v-if="n.type === 'assets'"
                        @click="showAssets=true">
                        {{n.value > 20 ? (n.value == '21' ? '无房有车' : '无房无车') : (n.value == '11' ? '有房有车' : '有房房无车')}}
                    </span>
                </li>
            </ul>
            <ul class="basicsDiv backGFFF" v-if="hobbyTab">
                <li class="height88 fontSize28 textL borderBottome5e5e5 paddingLR"
                    :class="{borderTop5e5e5: index === 0}"
                    v-for="(n,index) in hobby">
                    {{n.label}}
                    
                    <!-- <router-link class="fr basicsInput backGFFF color888"
                        :to="{path:'/edit', query: { type: n.type }}">
                        {{n.value || '点击编辑' + n.label}}<i class="fa fr fa-angle-right"></i>
                    </router-link> -->
                    <span class="fr basicsInput backGFFF color888 ellipsis" style="padding-right: .6rem;"
                        @click="goEdit(n)">
                        {{n.value || '点击编辑' + n.label}}
                        <i class="fa fr fa-angle-right" style="position: absolute;right: .3rem;"></i>
                    </span>
                    <!-- <input class="fr basicsInput backGFFF"
                        type="text" style="height:.84rem;line-height:.84rem"
                        v-model="n.value" disabled> -->
                </li>
            </ul>
            <div class="indexButton loginButton textC centertBC fontSize28" @click="save">保存</div>
            
        </section>
        
        <mt-datetime-picker
            ref="picker"
            type="date"
            :startDate="startDate"
            :endDate="endDate"
            v-model="date">
        </mt-datetime-picker>
        <mt-actionsheet  
            :actions= "options.maritalStatus"
            v-model="showMaritalStatus">  
        </mt-actionsheet>
        <mt-actionsheet  
            :actions= "options.assets"
            v-model="showAssets">  
        </mt-actionsheet>
    </div>
</template>
<script>
import { Indicator, Toast  } from 'mint-ui'
export default {
    name: 'basics',
    data () {
        return{
            date: '',
            tab: [
                { label: '基本资料', isActive: true, type: 'base' }, 
                { label: '工作学习', isActive: false, type: 'work' }, 
                { label: '兴趣爱好', isActive: false, type: 'hobby' } 
            ],
            baseTab: true,
            workTab: false,
            hobbyTab: false,

            base: [ // 基本资料'
                { label: '真实姓名', value: 'Daisy', type: 'realname' }, 
                { label: '出生年月', value: '1991-11-20', type: 'birthday' }, 
                { label: '身高', value: '157', type: 'height' }, 
                { label: '体重', value: '40', type: 'weight' }, 
                { label: '最高学历', value: '大专', type: 'highestEducation' }, 
                { label: '婚姻状况', value: '未婚', type: 'maritalStatus' }, 
                { label: '籍贯', value: '四川', type: 'nativePlace' }
            ],
            work: [ // 工作学习
                // { label: '工作行业', value: '互联网', type: '缺字段' }, 
                { label: '工作单位', value: '国美', type: 'workUnit' }, 
                { label: '职位', value: '开发', type: 'position' }, 
                { label: '年收入', value: '10', type: 'weight' }, 
                { label: '毕业院校', value: '家里蹲', type: 'university' },
                { label: '资产状况', value: '12', type: 'assets' }
            ],
            hobby: [ // 兴趣爱好
                { label: '自我介绍', value: '我是Daisy', type: 'selfIntroduction' }, 
                { label: '业余爱好', value: '吃饭睡觉打豆豆', type: 'hobby' }, 
                { label: '喜欢的食物', value: '好吃的都喜欢', type: 'favoriteFood' }, 
                { label: '喜欢的电影', value: '雏菊', type: 'favoriteMovie' }, 
                { label: '喜欢的书', value: '人类简史', type: 'favoriteBook' }, 
                { label: '喜欢的歌', value: '一生所爱', type: 'favoriteSong' }, 
                { label: '喜欢的情话', value: '我在', type: 'favorite_love_words' }, 
                { label: '喜欢的名人爱情', value: '梁祝', type: 'favorite_love_story' }
            ],
            currentTab: 'base',
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
    created(){
        this.getDetail()
    },
    computed: {
        endDate () {
            return new Date()
        },
        startDate () {
            return new Date('1970-01-01')
        }
    },
    watch: {
        date (val, oldVal) {
            this.date = val.toLocaleDateString && val.toLocaleDateString().replace(/\//g, '-') || val
        }
    },
    methods:{
        openPicker() {
            this.$refs.picker.open();
        },
        // 更改婚姻/资产状态
        changeVal (item) {
            const type = item.type === 'assets' ? 'work' : 'base'
            this[type].forEach(it => {
                if(it.type === item.type) { // 婚姻状况
                    it.value = item.value
                }
            })
            console.log(item.name, item.value)
        },
        getDetail () {
            const self = this
            Indicator.open(); // loading组件
            this.getData(`/member/memberbaseinfo/info`)
                .then(_data => {
                    const { memberBaseInfo } = _data
                    self.base.forEach(it => {
                        it.value = memberBaseInfo[it.type]
                        if (it.type === 'birthday') { // 出生年月
                            self.date = memberBaseInfo[it.type]
                        }
                    })
                    self.work.forEach(it => {
                        if (it.type === 'assets') { // 资产状况
                            it.value = [memberBaseInfo.hasHouse, memberBaseInfo.hasCar].join('')
                        } else {
                            it.value = memberBaseInfo[it.type]
                        }
                    })
                    self.hobby.forEach(it => {
                        it.value = memberBaseInfo[it.type]
                    })
                    Indicator.close(); // loading组件
                }).catch(err => {
                    console.log(err)
                    Indicator.close(); // loading组件
                })
        },
        changeTab (type) {
            const self = this
            this.tab.forEach(it => {
                if (it.type === type) {
                    it.isActive = true
                    self.currentTab = type
                } else {
                    it.isActive = false
                }
                self[it.type + 'Tab'] = it.isActive
            })
        },
        goEdit (n) {
            this.$router.push({path:'/edit'})
            sessionStorage.setItem('information', JSON.stringify(n))
        },
        save () {
            const param = {}
            const self = this
            self[self.currentTab].forEach(item => {
                if (item.type === 'assets') { // 资产状况
                    param.hasHouse = item.value[0]
                    param.hasCar = item.value[1]
                } else if (item.type === 'birthday') { // 出生年月
                    param['birthday'] = self.date
                } else {
                    param[item.type] = item.value
                }
                
            })
            console.log(param)
            self.getData('/member/memberbaseinfo/update', param).then(res => {
                console.log(res)
                if(res.code == 0) {
                    // self.getDetail()
                    Toast('保存成功');
                }
            })
        }
    }
}
</script>

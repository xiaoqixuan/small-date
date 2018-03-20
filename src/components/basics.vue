<template>
    <div>
        <header class="centertBC textC fontSize36">
            <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>基本资料
        </header>
        <section>
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
                    @click="getEditInformation(n)"
                    v-for="(n,index) in base">
                    {{n.label}}

                    <input class="fr basicsInput backGFFF"
                        type="text" style="height:.84rem;line-height:.84rem"
                        v-if="n.type !== 'maritalStatus'"
                        v-model="n.value">
                    <dropdown v-show="n.type === 'maritalStatus'" :options="options.maritalStatus" @changeVal="changeVal"></dropdown>
                </li>
            </ul>
            <ul class="basicsDiv backGFFF" v-if="workTab">
                <li class="height88 fontSize28 textL borderBottome5e5e5 paddingLR"
                    :class="{borderTop5e5e5: index === 0}"
                    @click="getEditInformation(n)"
                    v-for="(n,index) in work">
                    {{n.label}}
                    <input class="fr basicsInput backGFFF"
                        type="text" style="height:.84rem;line-height:.84rem"
                        v-model="n.value" disabled>
                </li>
            </ul>
            <ul class="basicsDiv backGFFF" v-if="hobbyTab">
                <li class="height88 fontSize28 textL borderBottome5e5e5 paddingLR"
                    :class="{borderTop5e5e5: index === 0}"
                    @click="getEditInformation(n)"
                    v-for="(n,index) in hobby">
                    {{n.label}}
                    <input class="fr basicsInput backGFFF"
                        type="text" style="height:.84rem;line-height:.84rem"
                        v-model="n.value" disabled>
                </li>
            </ul>
            <div class="indexButton loginButton textC centertBC fontSize28" @click="save">保存</div>
        </section>

        
        

        <!-- <div class="tmc" v-if="editOpen"></div>
        <div class="sexTs" v-if="editOpen">
            <div class="divBasics">
                <p class="fontSize30 textL p2 trueName borderBottome5e5e5 color888">
                    {{editObj.label}}
                </p>
                <p class="fontSize30 textC borderBottome5e5e5 p1 color42 trueName">性别一旦提交，就不能更改哦</p>
                <p class="basicsNameDiv">
                    <input type="text" v-model="editObj.value" class="basicsName color42 borderBottome5e5e5">
                    <span class="qingkong" @click="clear"></span>
                </p>
                <p class="fontSize30 textC p2">
                    <span class="s1 fl color888" @click="editOpen=false">取消</span>
                    <span class="s2 fr colorfe5c5c" @click="save">确定</span>
                </p>
            </div>
        </div> -->
    </div>
</template>
<script>

import dropdown from './comm/dropdown.vue'
export default {
    name: 'basics',
    data () {
        return{
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
                { label: '工作行业', value: '互联网', type: '缺字段' }, 
                { label: '工作单位', value: '国美', type: 'workUnit' }, 
                { label: '职位', value: '开发', type: 'position' }, 
                { label: '年收入', value: '10', type: 'weight' }, 
                { label: '资产状况', value: '没房没车', type: 'hasHouse' }, 
                { label: '资产状况', value: '没房没车', type: 'hasCar' },
                { label: '毕业院校', value: '家里蹲', type: 'university' }
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
            options: {
                maritalStatus: [
                    { label: '未婚', value: 1, type: 'maritalStatus' },
                    { label: '离异无孩', value: 2, type: 'maritalStatus' },
                    { label: '离异有孩', value: 3, type: 'maritalStatus' }
                ],
            },
            
            // editOpen: false,
            // editObj: {}
            currentTab: 'base'
        }
    },
    components: {
        dropdown,
    },
    created(){
        this.getDetail()
    },
    methods:{
        changeVal (obj) {
            this[this.currentTab].forEach(item => {
                if(obj.type === item.type) {
                    item.value = obj.value
                }
            })
        },
        getDetail () {
            let self = this
            this.getData(`/member/memberbaseinfo/info`)
            .then(_data => {
                const { memberBaseInfo } = _data
                self.base.forEach(it => {
                    it.value = memberBaseInfo[it.type]
                })
                self.work.forEach(it => {
                    it.value = memberBaseInfo[it.type]
                })
                self.hobby.forEach(it => {
                    it.value = memberBaseInfo[it.type]
                })
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
        getEditInformation (item) {
            // this.editOpen = true
            // this.editObj = { ...item }
            // console.log(this.editObj)
        },
        clear () {
            this.editObj.value = ''
        },
        save () {
            // const { type, value } = this.editObj
            // const self = this
            // const param = {
            //     [type]: value
            // }
            const param = this[this.currentTab].map(item => {
                return {
                    [item.type]: item.value
                }
            })
            console.log(param)
            this.getData('/member/memberbaseinfo/update', JSON.stringify(param)).then(res => {
                console.log(res)
                if(res.code == 0) {
                    self.editOpen = false
                    self.getDetail()
                }
            })
            // self.$http.post('/api/member/memberbaseinfo/update', param, {
            //     headers: { 'content-type': 'application/x-www-form-urlencoded'}
            // }).then((data) => {
            //     if(data.body.code == 0) {
            //         self.editOpen = false
            //         self.getDetail()
            //     }
            // })
        }
    }
}
</script>

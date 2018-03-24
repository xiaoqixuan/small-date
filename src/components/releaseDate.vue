<template>
  <div>
    <header class="centertBC textC fontSize36">
        <!-- <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a> -->发布约会
    </header>
    <section class="release-wrap">
        <div class="releaseDate"></div>
        <ul class="basicsDiv backGFFF" @click="tips = ''">
            <li class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
                <span class="padL">约会项目</span>
                <span class="fr height88 padR color888 content" style="width:64%;"
                    @click="showDateType = true">
                    {{deta.dateType || '点击选择项目'}}
                    <i class="fa fr fa-angle-right"></i>
                </span>
            </li>
            <li class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
                <span class="padL">约会时间</span>
                <span class="fr height88 padR color888 content" style="width:64%;"
                    @click="openPicker">
                    {{deta.dateTime || '点击选择时间'}}<i class="fa fr fa-angle-right"></i>
                </span>
            </li>
            <li class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
                <span class="padL">约会地点</span>
                <span class="fr height88 padR color888 content" style="width:64%;"
                    @click="showDatePlace = true">
                    {{deta.datePlace || '点击选择地点'}}
                    <i class="fa fr fa-angle-right"></i>
                </span>
            </li>
            <li class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
                <span class="padL">详细地址</span>
                <input type="text" class="fr height88 padR color888" style="width:64%;height: calc(.88rem - 1px);"
                    placeholder="请输入详细地址"  v-model="deta.dateDetailAddress">
            </li>
        </ul>
        <p v-if="tips" class="tips">注意：{{tips}}</p>
        <div class="indexButton loginButton textC centertBC fontSize28 marginTop06" @click="save">发布</div>
    </section>
    <my-footer :classStyle="[true,false,false]"></my-footer>
    <mt-datetime-picker
        ref="picker"
        type="date"
        :startDate="startDate"
        v-model="deta.dateTime">
    </mt-datetime-picker>
    <mt-actionsheet  
        :actions= "options.dateType"
        v-model="showDateType">  
    </mt-actionsheet>
    <mt-actionsheet  
        :actions= "options.datePlace"
        v-model="showDatePlace">  
    </mt-actionsheet>
  </div>
</template>

<script>
import footer from './comm/footer.vue'
import { Indicator } from 'mint-ui'
export default {
    name:'recordDate',
    data () {
        return {
            deta: {
                dateType: '',
                dateTime: '',
                datePlace: '',
                dateDetailAddress: ''
            },
            pager: {
                limit: 100,
                page: 1,
                sidx: 'create_time',
                order: 'asc'
            },
            // action sheet 选项内容 
            options: {
                dateType: [],
                datePlace: []
            },
            // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏  
            showDateType: false,
            showDatePlace: false,
            tips: ''
        }
    },
    components: {
        'my-footer':footer,
    },
    computed: {
        startDate () {
            return new Date()
        },
        userInfo () {
            return JSON.parse(sessionStorage.getItem("userInfo" || ''))
        }
    },
    created(){
        this.getList()
    },
    watch: {
        'deta.dateTime' (val, oldVal) {
            this.deta.dateTime = val.toLocaleDateString && val.toLocaleDateString().replace(/\//g, '-') || val
            console.log(this.deta.dateTime)
        }
    },
    methods:{
        getList () {
            const self = this
            const { limit, page, sidx, order } = this.pager
            Indicator.open(); // loading组件
            self.getData(`/engage/engagebasedatetype/list?limit=${limit}&page=${page}&sidx=${sidx}&order=${order}`)
                .then(res => {
                    if (res.code === 0) {
                        self.options.dateType = res.page.list.map(it => {
                            return {
                                name: it.dateType,
                                type: 'dateType',
                                method: self.chooseVal
                            }
                        })
                        Indicator.close(); // loading组件
                    }
                })
            
            Indicator.open(); // loading组件
            self.getData(`/engage/engagebasedateplace/list?limit=${limit}&page=${page}&sidx=${sidx}&order=${order}`)
                .then(res => {
                    if (res.code === 0) {
                        self.options.datePlace = res.page.list.map(it => {
                            return {
                                name: it.datePlace,
                                type: 'datePlace',
                                method: self.chooseVal
                            }
                        })
                        Indicator.close(); // loading组件
                    }
                })
        },
        // 选择项目/地点
        chooseVal (item) {
            this.deta[item.type] = item.name
        },
        openPicker() {
            this.$refs.picker.open();
        },
        checkVal (obj) {
            const errMessage = {
                dateType: '约会项目',
                dateTime: '约会时间',
                datePlace: '约会地点',
                dateDetailAddress: '详细地址'
            }
            let result = true
            for (let k in errMessage) {
                if (!obj[k]) {
                    this.tips = `${errMessage[k]}未填写`
                    result = false
                    break
                }
            }
            return result
        },
        save () {
            const { id, nickname } = this.userInfo
            const param = {
                createUserId: id,
                createUser: nickname,
                ...this.deta
            }
            const result = this.checkVal(param)
            if (result) {
                this.getData('/engage/engageengageinfo/save', param).then(res => {
                    console.log(res)
                    if(res.code == 0) {
                        this.$router.push({path:'/recordDate'}) // 跳转约会记录页面
                    }
                })
            }
        }
    }
}
</script>
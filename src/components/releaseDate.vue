<template>
  <div>
    <header class="centertBC textC fontSize36">
        <!-- <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a> -->发布约会
    </header>
    <section class="release-wrap">
        <div class="releaseDate"></div>
        <ul class="basicsDiv backGFFF" @click="msg = ''">
            <li class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF"
                :class="{heightAuto: openDateType}">
                <span class="padL">约会项目</span>
                <span class="fr height88 padR color888" style="width:64%;"
                    @click="openDateType = !openDateType">
                    {{deta.dateType}}
                    <i class="fa fr" :class="{'fa-angle-down': !openDateType, 'fa-angle-up': openDateType}"></i>
                </span>
                <ul v-if="openDateType" class="list-wrap borderTop5e5e5" style="text-align:center;">
                    <li :class="{active: m.isChecked}"
                        v-for="(m,index) in dateType"
                        @click="chooseVal('dateType', m.value)" >{{m.value}}</li>
                </ul>
            </li>
            <li class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
                <span class="padL">约会时间</span>
                <span class="fr height88 padR color888" style="width:64%;"
                    @click="openPicker">{{deta.dateTime || '点击选择时间'}}</span>
                <mt-datetime-picker
                    ref="picker"
                    type="date"
                    :startDate="startDate"
                    v-model="deta.dateTime">
                </mt-datetime-picker>
            </li>
            <li class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF"
                :class="{heightAuto: openDatePlace}">
                <span class="padL">约会地点</span>
                <span class="fr height88 padR color888" style="width:64%;"
                    @click="openDatePlace = !openDatePlace">
                    {{deta.datePlace}}
                    <i class="fa fr" :class="{'fa-angle-down': !openDatePlace, 'fa-angle-up': openDatePlace}"></i>
                </span>
                <ul v-if="openDatePlace" class="list-wrap borderTop5e5e5" style="text-align:center;">
                    <li :class="{active: m.isChecked}"
                        v-for="(m,index) in datePlace"
                        @click="chooseVal('datePlace', m.value)" >{{m.value}}</li>
                </ul>
            </li>
            <li class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
                <span class="padL">详细地址</span>
                <input type="text" class="fr height88 padR color888" style="width:64%;height: calc(.88rem - 1px);" placeholder="请输入详细地址"  v-model="deta.dateDetailAddress">
            </li>
        </ul>
        <p v-if="msg">{{msg}}</p>
        <div class="indexButton loginButton textC centertBC fontSize28 marginTop06" @click="save">发布</div>
    </section>
    <my-footer :classStyle="[true,false,false]"></my-footer>

  </div>
</template>

<script>
import footer from './comm/footer.vue'
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
            dateType: [],
            datePlace: [],
            openDateType: false,
            openDatePlace: false,
            msg: ''
        }
    },
    components: {
        'my-footer':footer,
    },
    computed: {
        startDate () {
            return new Date()
        }
    },
    created(){
        this.getList()
    },
    watch: {
        'deta.dateTime' (val, oldVal) {
            this.deta.dateTime = val.toLocaleDateString && val.toLocaleDateString().replace(/\//g, '-') || val
        }

    },
    methods:{
        getList () {
            const { limit, page, sidx, order } = this.pager
            this.getData(`/engage/engagebasedatetype/list?limit=${limit}&page=${page}&sidx=${sidx}&order=${order}`)
            .then(res => {
                if (res.code === 0) {
                    this.dateType = res.page.list.map(it => {
                        return {
                            value: it.dateType,
                            isChecked: false
                        }
                    })
                }
                console.log(res)
            })
            this.getData(`/engage/engagebasedateplace/list?limit=${limit}&page=${page}&sidx=${sidx}&order=${order}`)
            .then(res => {
                if (res.code === 0) {
                    this.datePlace = res.page.list.map(it => {
                        return {
                            value: it.datePlace,
                            isChecked: false
                        }
                    })
                }
                console.log(res)
            })
        },
        chooseVal (type, val) {
            this.deta[type] = val
            if (type == 'dateType') {
                this.openDateType = false
            } else {
                this.openDatePlace = false
            }
            this[type].forEach(it => {
                if (it.value === val) {
                    it.isChecked = true
                } else {
                    it.isChecked = false
                }
            })
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
                    this.msg = `${errMessage[k]}未填写`
                    result = false
                    break
                }
            }
            return result
        },
        save () {
            let param = {
                // createUserId: 1,
                // createUser: 'Daisy',
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
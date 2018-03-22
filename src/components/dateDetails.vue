<style scoped>
    html,body{
        background-color: #f2f2f2;
        height: 100%;
        width: 100%;
    }
</style>
<template>
  <div>
    <header class="centertBC textC fontSize36">
        <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>约会详情
    </header>
    <section>
        <ul class="basicsDiv backGFFF">
            <li class="height88 borderBottome5e5e5 dateList backGFFF"
                v-for="(n,index) in detail">
                <span class="fl color888 fontSize24 dateListTitle textL">{{n.label}}</span>
                <span class="fl color42 fontSize28 dateListName textL">{{n.value}}</span>
            </li>
        </ul>
        <!-- <div class="height88 borderBottome5e5e5 dateList backGFFF">
            <span class="fl color888 fontSize24 dateListTitle textL">发起人</span>
            <span class="fl color42 fontSize28 dateListName textL">晓晓</span>
        </div>
        <div class="height88 borderBottome5e5e5 dateList backGFFF">
            <span class="fl color888 fontSize24 dateListTitle textL">约会对象</span>
            <span class="fl color42 fontSize28 dateListName textL">我</span>
        </div>
        <div class="height88 borderBottome5e5e5 dateList backGFFF">
            <span class="fl color888 fontSize24 dateListTitle textL">约会状态</span>
            <span class="fl color42 fontSize28 dateListName textL">约会结束</span>
        </div>
        <div class="height88 borderBottome5e5e5 dateList backGFFF">
            <span class="fl color888 fontSize24 dateListTitle textL">约会项目</span>
            <span class="fl color42 fontSize28 dateListName textL">喝咖啡</span>
        </div>
        <div class="height88 borderBottome5e5e5 dateList backGFFF">
            <span class="fl color888 fontSize24 dateListTitle textL">约会地点</span>
            <span class="fl color42 fontSize28 dateListName textL">星巴克咖啡</span>
        </div>
        <div class="height88 borderBottome5e5e5 dateList backGFFF">
            <span class="fl color888 fontSize24 dateListTitle textL">约会时间</span>
            <span class="fl color42 fontSize28 dateListName textL">2017-12-12 17:00</span>
        </div> -->
        <div v-if="status == 3" class="height88 borderBottome5e5e5 evaluate backGFFF">
            <span class="fl color42 fontSize28 textL borderBottome5e5e5">约会评价</span>
            <textarea rows="3" cols="20" placeholder="描述一下对对方的印象吧！" v-model="comment">
            </textarea>
        </div>
        <div class="indexButton loginButton textC centertBC fontSize28" @click="save">提交</div>
    </section>
  </div>
</template>
<script>
import { Indicator } from 'mint-ui'
export default {
    name:'dateDetails',
    data () {
        return {
            detail: [ // 基本资料'
                { label: '发起人', value: '晓晓', type: 'createUser' }, 
                { label: '约会对象', value: '我', type: 'joinUser' }, 
                { label: '约会状态', value: '约会结束', type: 'status' }, 
                { label: '约会项目', value: '喝咖啡', type: 'dateType' }, 
                { label: '约会地点', value: '星巴克咖啡', type: 'datePlace' }, 
                { label: '约会时间', value: '2017-12-12 17:00', type: 'dateTime' }
            ],
            comment: ''
        }
    },
    computed: {
        id () {
            return this.$route.query.id
        },
        status () {
            return this.$route.query.status
        }
    },
    created(){
        this.getDetail()
    },
    methods:{
        getDetail () {
            let self = this
            Indicator.open(); // loading组件
            this.getData(`/engage/engageengageinfo/info/${this.id}`)
            .then(res => {
                if (res.code === 0) {
                    self.detail.forEach(it => {
                        if (it.type == 'status') {
                            it.value = ['未开始', '约会中', '约会结束'][self.status-1]
                        } else {
                            it.value = res.engageEngageInfo[it.type]
                        }
                    })
                    Indicator.close(); // loading组件
                }
            })
        },
        save () {
            const { id, comment } = this
            const msg = comment.replace(/(^\s*)|(\s*$)/g, '')
            if (msg) {
                let data = {
                    id,
                    comment: msg
                }
                this.getData('/engage/engageengageinfo/update', data).then(res => {
                    console.log(res)
                    if(res.code == 0) {
                        alert('保存成功')
                    }
                })
            } else {
                alert('请输入评价')
            }
        }
    }
}
</script>
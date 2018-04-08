<template>
    <div class="info">
        <header class="centertBC textC fontSize36">
            <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>晴天
        </header>
        <section>
            <router-link :to="{path:'/releaseDetail',query: {id}}" class="customer backGFFF">
                <div class="avatar">
                    <img src="http://www.onegreen.org/QQ/UploadFiles/201302/2013022822455722.jpg">
                </div>
                <div class="info-detail">
                    <div class="personinfo">
                        <span class="name">晴天</span>
                        <i class="fa fa-venus"></i> <i class="fa fa-mars"></i>
                    </div>
                    <i class="fa fr fa-angle-right"></i>
                </div>
            </router-link>
            <div class="content-msg">
                <p class="title borderBottome5e5e5">约会详情</p>
                <ul class="basicsDiv backGFFF" style="margin:0;">
                    <li class="height88 fontSize28 textL borderBottome5e5e5 paddingLR"
                        v-for="(n,index) in detail">
                        <span class="color888">{{n.label}}</span>
                        <span class="fr basicsInput backGFFF">{{n.value}}</span>
                    </li>
                </ul>
            </div>
            <span @click="signUp" class="saveButton loginButton textC centertBC fontSize28 marginTop06">报名</span> 
            <router-link tag="div" to="/releaseDetail" class="saveButton loginButton textC centertBC fontSize28 marginTop06 margintop03">不在接收此人信息</router-link> 
            <div class="textC colorfe5c5c wathYh">什么是小约会？</div>
        </section>
    </div>
</template>
<script>
import { Indicator  } from 'mint-ui'
export default {
    data () {
        return {
            detail: [
                { label: '约会项目', value: '喝咖啡', type: 'dateType' }, 
                { label: '约会时间', value: '2017-12-12 17:00', type: 'dateTime' },
                { label: '约会地点', value: '星巴克咖啡', type: 'datePlace' }, 
                { label: '约会详细地址', value: '上海市股东双林路77号', type: 'dateDetailAddress' }, 
                { label: '约会状态', value: '约会结束', type: 'status' }, 
                { label: '约会剩余时间', value: '29:35', type: 'deadline' }, 
            ]
        }
    },
    created(){
        this.getDetail()
    },
    computed: {
        id () {
            return this.$route.params.id
        },
        userInfo () {
            console.log()
            return JSON.parse(sessionStorage.getItem("userInfo") || '')
        }
    },
    methods: {
        getDetail () {
            const self = this
            Indicator.open(); // loading组件
            self.getData(`/engage/engageengageinfo/info/${this.id}`)
                .then(res => {
                    console.log(res)
                    const { engageEngageInfo } = res
                    self.detail.forEach(it => {
                        it.value = engageEngageInfo[it.type]
                    })
                    Indicator.close(); // loading组件
                }).catch(err => {
                    console.log(err)
                    Indicator.close(); // loading组件
                })
        },
        signUp () {
            const { id, userInfo } = this
            const param = {
                id,
                joinUserId: userInfo.id,
                joinUser: userInfo.nickname,
                joinTime: new Date().toLocaleDateString().replace(/\//g, '-')
            }
            console.log(param)
            this.getData('/engage/engageengageinfo/update', param).then(res => {
                if(res.code == 0) {
                    // Toast('保存成功')
                }
            })
        }
    }
}
</script>
<style lang="css" rel="stylesheet/css" scoped>
    /* 头像及认证 */
    .customer {
        display: flex;
        padding: .3rem 0 .3rem .3rem;
        height: 2.5rem;
    }
    .avatar {
        flex: 1;
    }
    .avatar img {
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 50%;
    }
    .info-detail {
        flex: 6;
        padding: .7rem .2rem;
        font-size: .2rem;
        text-align: left;
    }
    .info-detail .fa {
        color: #fe5c5c;
        margin: 0 .1rem;
    }
    .info-detail .fa-angle-right {
        font-size: .5rem;
        color: #999;
    }
    .personinfo {
        display: inline;
        font-size: .28rem;
        color: #555;
    }
   /* 文字部分内容 */
    .content-msg {
        padding-bottom: 1rem;
    }
    .content-msg .title {
       text-align: left;
       padding: .3rem;
       font-size: .35rem;
       font-weight: bold;
       color: #424242;
    }
    /* 按钮 */
    .saveButton {
        display: block;
        margin: .2rem auto;
    }
</style>

<template>
    <div class="info">
        <header class="centertBC textC fontSize36">
            <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>{{loverInfo.realname}}
        </header>
        <section>
            <router-link :to="{path:'/releaseDetail',query: {id}}" class="customer backGFFF">
                <div class="avatar">
                    <img :src="loverInfo.headImgUrl">
                </div>
                <div class="info-detail">
                    <div class="personinfo">
                        <span class="name">{{loverInfo.realname}}</span>
                        <i class="fa" :class="loverInfo.sex == '女' ? ' fa-venus' : ' fa-mars'"></i>
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
            <span @click="signUp" class="saveButton loginButton textC centertBC fontSize28 marginTop06" :class="{disable: loverInfo.status}">报名</span> 
            <span @click="rejectedMsg" class="saveButton loginButton textC centertBC fontSize28 marginTop06 margintop03">不在接收此人信息</span> 
            <div class="textC colorfe5c5c wathYh">什么是小约会？</div>
        </section>
    </div>
</template>
<script>
import { Indicator  } from 'mint-ui'
export default {
    data () {
        return {
            status: {
                2: '已报名',
                3: '已结束',
                4: '不感兴趣'
            },
            loverInfo: {},
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
    mounted(){
        this.getDetail()
    },
    computed: {
        id () {
            return this.$route.params.id
        },
        userInfo () {
            console.log()
            return JSON.parse(sessionStorage.getItem("userInfo") || '{}')
        },
        token () {
            console.log()
            return sessionStorage.getItem("token") || ''
        }
    },
    methods: {
        getDetail () {
            const self = this
            Indicator.open(); // loading组件
            self.getData(`/engage/sendRecord/info/${this.id}`)
                .then(res => {
                    console.log(res)
                    const { engageEngageInfo } = res
                    self.detail.forEach(it => {
                        if (it.type == 'status') {
                            const val = engageEngageInfo[it.type]
                            it.value = status[val] || '报名中'
                        } else {
                            it.value = engageEngageInfo[it.type]
                        }
                    })
                    self.loverInfo = {
                        status: status[engageEngageInfo.status],
                        // status: 2,
                        realname: engageEngageInfo.realname || '晴天',
                        sex: engageEngageInfo.sex || '女',
                        headImgUrl: engageEngageInfo.headImgUrl || 'http://www.onegreen.org/QQ/UploadFiles/201302/2013022822455722.jpg'
                    }
                    Indicator.close(); // loading组件
                }).catch(err => {
                    console.log(err)
                    Indicator.close(); // loading组件
                })
        },
        signUp () {
            const { id, userInfo } = this
            const param = {
                joinUserId: userInfo.id,
                joinUser: userInfo.nickname || 'XX',
                joinTime: new Date().toLocaleDateString().replace(/\//g, '-')
            }
            console.log(param)
            this.getData(`/engage/engageengageinfo/join/${this.id}`, param, 'Form').then(res => {
                if(res.code == 0) {
                    // Toast('保存成功')
                }
            })
        },
        rejectedMsg () {
            this.getData(`/member/rejectperson/save/${this.id}`).then(res => {
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

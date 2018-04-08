<template>
  <div class="detail">
    <header class="centertBC textC fontSize36">
        <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>晴天
    </header>
    <section>  
        <div class="customer backGFFF">
            <div class="avatar">
                <img src="http://www.onegreen.org/QQ/UploadFiles/201302/2013022822455722.jpg">
            </div>
            <div class="info-detail">
                <div class="personinfo">
                    <span class="name">晴天</span>
                    <i class="fa fa-venus"></i> <i class="fa fa-mars"></i>
                </div>
                <div class="authen">
                    <span><i class="fa fa-user"></i>实名认证</span>
                    <span><i class="fa fa-mortar-board"></i>学历认证</span>  
                    <span><i class="fa fa-home"></i>单位认证</span>
                </div>
            </div>
        </div>
        <div class="photos">
            <img class="logo" src="http://www.onegreen.org/QQ/UploadFiles/201302/2013022822455722.jpg">
            <img class="logo" src="http://www.onegreen.org/QQ/UploadFiles/201302/2013022822455722.jpg">
            <img class="logo" src="http://www.onegreen.org/QQ/UploadFiles/201302/2013022822455722.jpg">
        </div>
        <ul class="content-msg">
            <li>
                <p class="title borderBottome5e5e5">基本资料</p>
                <ul class="basicsDiv backGFFF" style="margin:0;">
                    <li class="height88 fontSize28 textL borderBottome5e5e5 paddingLR"
                        v-for="(n,index) in base">
                        <span class="color888">{{n.label}}</span>
                        <span class="fr basicsInput backGFFF">{{n.value}}</span>
                    </li>
                </ul>
            </li>
            <li>
                <p class="title borderBottome5e5e5">工作学习</p>
                <ul class="basicsDiv backGFFF" style="margin:0;">
                    <li class="height88 fontSize28 textL borderBottome5e5e5 paddingLR"
                        v-for="(n,index) in work">
                        <span class="color888">{{n.label}}</span>
                        <span class="fr basicsInput backGFFF">{{n.value}}</span>
                    </li>
                </ul>
            </li>
            <li>
                <p class="title borderBottome5e5e5">兴趣爱好</p>
                <ul class="basicsDiv backGFFF" style="margin:0;">
                    <li class="height88 fontSize28 textL borderBottome5e5e5 paddingLR"
                        v-for="(n,index) in hobby">
                        <span class="color888">{{n.label}}</span>
                        <span class="fr basicsInput backGFFF">{{n.value}}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </section>
        
        
  </div>
</template>
<script>
import { Indicator  } from 'mint-ui'
export default {
    data () {
        return {
            base: [ // 基本资料'
                { label: '昵称', value: '晴天', type: 'nickname' }, 
                { label: '出生年月', value: '1991-11-20', type: 'birthday' }, 
                { label: '身高', value: '165', type: 'height' }, 
                { label: '体重', value: '60', type: 'weight' }, 
                { label: '最高学历', value: '本科', type: 'highestEducation' }, 
                { label: '婚姻状况', value: '未婚', type: 'maritalStatus' }, 
                { label: '籍贯', value: '四川', type: 'nativePlace' }
            ],
            work: [ // 工作学习
                { label: '工作单位', value: '阿里巴巴集团', type: 'workUnit' }, 
                { label: '职位', value: '开发', type: 'position' }
            ],
            hobby: [ // 兴趣爱好
                { label: '喜欢的电影', value: '雏菊', type: 'favoriteMovie' }, 
                { label: '喜欢的书', value: '人类简史', type: 'favoriteBook' }, 
                { label: '喜欢的名人爱情', value: '梁祝', type: 'favorite_love_story' }
            ],

        }
    },
    created () {
        this.getDetail()
    },
    computed: {
        id () {
            return this.$route.query.id
        }
    },
    methods: {
        getDetail () {
            const self = this
            Indicator.open(); // loading组件
            this.getData(`/engage/engageengageinfo/info/${this.id}`)
                .then(res => {
                    console.log(res)
                    Indicator.close(); // loading组件
                }).catch(err => {
                    console.log(err)
                    Indicator.close(); // loading组件
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
        padding: 0 .2rem;
        font-size: .2rem;
        text-align: left;
    }
    .info-detail .fa {
        color: #fe5c5c;
        margin: 0 .1rem;
    }
    .personinfo {
        padding: .4rem 0 .1rem;
        /* height: 50%; */
    }
    .personinfo .name {
        font-size: .35rem;
    }
    .authen {
        color: #fe5c5c;
    }
    /* 照片 */
    .photos {
        padding: .2rem;
        text-align: left;
        font-size: 0;
    }
    .photos img {
        margin-right: 2.5%;
        margin-bottom: 2.5%;
        width: 18%;
        border-radius: .1rem .1rem;
    }
    .photos img:last-child {
        margin-right: 0;
    }
    /* 文字部分内容 */
    .content-msg {
        padding-bottom: 2rem;
    }
    .content-msg .title {
       text-align: left;
       padding: .4rem 0 .2rem .3rem;
       font-size: .35rem;
       font-weight: bold;
       color: #424242;
    }
</style>

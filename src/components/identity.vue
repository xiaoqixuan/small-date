<template>
    <div>
        <header class="centertBC textC fontSize36">
        <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>身份认证
        </header>
        <section>
            <ul>
                <li @click="goLink({path:'/RealName'})" class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
                    <span class="fl textL">实名认证</span>
                    <span  class="fr height88 textR inputColor">
                        {{identityData.isRealNameCertified ? '已认证' : '未认证'}} <i v-if="!identityData.isRealNameCertified" class="fa fr fa-angle-right"></i>
                    </span>
                </li>
                <li @click="goLink({path:'/Education'})" class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
                    <span class="fl textL">学历认证</span>
                    <span  class="fr height88 textR inputColor">
                        {{identityData.isEducationCertified ? '已认证' : '未认证'}} <i v-if="!identityData.isEducationCertified" class="fa fr fa-angle-right"></i>
                    </span>
                </li>
                <li @click="goLink({path:'/Company'})" class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
                    <span class="fl textL">单位认证</span>
                    <span  class="fr height88 textR inputColor">
                        {{identityData.isCompanyCertified ? '已认证' : '未认证'}} <i v-if="!identityData.isCompanyCertified" class="fa fr fa-angle-right"></i>
                    </span>
                </li>
            </ul>
            <!-- <router-link :to="{path:'/RealName'}" tag="div" class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
                <span class="fl textL">实名认证</span>
                <input type="text" class="fr height88 textR inputColor" style="height:.87rem;line-height:.87rem" placeholder="未认证" readonly="value" />
            </router-link>
            <router-link :to="{path:'/Education'}" tag="div" class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
                <span class="fl textL">学历认证</span>
                <input type="text" class="fr height88 textR inputColor" style="height:.86rem;line-height:.86rem" placeholder="未认证" readonly="value" />
            </router-link>
            <router-link :to="{path:'/Company'}" tag="div" class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
                <span class="fl textL">单位认证</span>
                <input type="text" class="fr height88 textR inputColor" style="height:.86rem;line-height:.86rem" placeholder="未认证" readonly="value" />
            </router-link> -->
        </section>
    </div>
</template>

<script> 
import { Indicator } from 'mint-ui'
export default {
    name:'identity',
    data () {
        return{
            identityData: {
                isRealNameCertified: false,
                isEducationCertified: false,
                isCompanyCertified: false
            }
        }
    },
    created(){
        this.getDetail()
    },
    methods: {
        getDetail () {
            let self = this
            Indicator.open(); // loading组件
            this.getData(`/member/memberbaseinfo/info`)
                .then(res => {
                    if (res.code === 0) {
                        const { memberBaseInfo } = res
                        this.identityData =  {
                            isRealNameCertified: memberBaseInfo.isRealNameCertified ? true :false,
                            isEducationCertified: memberBaseInfo.isEducationCertified ? true :false,
                            isCompanyCertified: memberBaseInfo.isCompanyCertified ? true :false
                        }
                        // console.log(res)
                        Indicator.close(); // loading组件
                    }
                }).catch(err => {
                    Indicator.close(); // loading组件
                })
        },
        goLink (obj) {
            this.$router.push(obj)
        }
    }
}
</script>
<style lang="css" rel="stylesheet/css" scoped>
.registerDiv .textR {
    display: inline-block;
    width: 1.2rem;
    text-align: left;
    font-size: .28rem;
}
</style>
<template>
    <div>
        <header class="centertBC textC fontSize36">
        <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>身份认证
        </header>
        <section>
            <ul>
                <li @click="goLink" class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
                    <span class="fl textL">实名认证</span>
                    <span  class="fr height88 textR inputColor">
                        {{identityData.realName ? '已认证' : '未认证'}} <i class="fa fr fa-angle-right"></i>
                    </span>
                </li>
                <li @click="goLink" class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
                    <span class="fl textL">学历认证</span>
                    <span  class="fr height88 textR inputColor">
                        {{identityData.education ? '已认证' : '未认证'}} <i class="fa fr fa-angle-right"></i>
                    </span>
                </li>
                <li @click="goLink" class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
                    <span class="fl textL">单位认证</span>
                    <span  class="fr height88 textR inputColor">
                        {{identityData.company ? '已认证' : '未认证'}} <i class="fa fr fa-angle-right"></i>
                    </span>
                </li>
            </ul>
            <!-- <router-link :to="{path:'/realName'}" tag="div" class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
                <span class="fl textL">实名认证</span>
                <input type="text" class="fr height88 textR inputColor" style="height:.87rem;line-height:.87rem" placeholder="未认证" readonly="value" />
            </router-link>
            <router-link :to="{path:'/education'}" tag="div" class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
                <span class="fl textL">学历认证</span>
                <input type="text" class="fr height88 textR inputColor" style="height:.86rem;line-height:.86rem" placeholder="未认证" readonly="value" />
            </router-link>
            <router-link :to="{path:'/company'}" tag="div" class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
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
                realName: false,
                education: false,
                company: true
            }
        }
    },
    created(){
        // this.getDetail()
    },
    methods: {
        getDetail () {
            let self = this
            Indicator.open(); // loading组件
            this.getData(`/member/memberproperty/info`)
                .then(res => {
                    if (res.code === 0) {
                        console.log(res)
                        Indicator.close(); // loading组件
                    }
                })
        },
        goLink () {
            const { depositBalance } = this.memberProperty
            // const depositBalance = false
            if (depositBalance) {
                this.$router.push({path:'/cash', query: { depositBalance } })
            } else {
                this.$router.push({path:'/recharge/2'})
            }
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
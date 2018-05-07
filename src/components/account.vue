<template>
    <div class="backGFFF" style="height:100% width:100%;">
        <header class="centertBC textC fontSize36">
            <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>我的账户
        </header>
        <section>
            <router-link :to="{path:'/balance'}" class="accountBanner" style="display: block;">
                <img src="../assets/img/account.jpg" alt="">
            </router-link>
            
            <div class="borderBottome5e5e5 accountList textL fontSize28 color42">
                开通会员
                <router-link :to="{path:'/balance'}" tag="span" class="kaitong fr fontSize28">开通</router-link>
            </div>
            <div class="borderBottome5e5e5 accountList textL fontSize30 color42 accountListCz">
            <span class="fontSize28 color42 yue">余额</span>
            <div class="accountMon fontSize32 colorfe5c5c">
                {{memberProperty.storeBalance}}元
                <router-link :to="{path:'/recharge/1'}" class="kaitong fr fontSize28 chongzhi">充值</router-link>
            </div>
            </div>
            <p class="borderBottome5e5e5 cashDiv height88 paddingLR textL fontSize28 color42"
                @click="goCash">
                押金
                <label class="fr jiantou color888">{{memberProperty.depositBalance ? '已交' : '未交'}}</label>
            </p>
            <!-- <router-link :to="{path:'/cash'}" class="borderBottome5e5e5 cashDiv height88 paddingLR textL fontSize28 color42">
                押金
                <label class="fr jiantou color888">{{memberProperty.depositBalance ? '已交' : '未交'}}</label>
            </router-link> -->
        </section>
    </div>
</template>
<script> 
import { Indicator } from 'mint-ui'
export default {
    name:'balance',
    data () {
        return{
            memberProperty: {}
        }
    },
    created(){
        this.getDetail()
    },
    methods: {
        getDetail () {
            let self = this
            Indicator.open(); // loading组件
            this.getData(`/member/memberproperty/info`)
                .then(res => {
                    if (res.code === 0) {
                        console.log(res)
                        self.memberProperty = res.memberProperty
                        Indicator.close(); // loading组件
                    }
                }).catch(err => {
                    console.log(err)
                    Indicator.close(); // loading组件
                })
        },
        goCash () {
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
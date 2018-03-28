<template>
    <div>
        <header class="centertBC textC fontSize36">
            <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>{{type ==1 ? '余额' : '押金'}}充值
        </header>
        <section>
            <div class="yueDiv height88 paddingLR backGFFF fontSize28 borderBottome5e5e5">
                <span class="fl color42">金额</span>
                <input class="fl moneySpan colorb4" type="number"
                    placeholder="请输入充值金额" v-model="amount" />
            </div>
            <div class="loginButton textC centertBC fontSize28" style="margin-top:.6rem" :class="{disable: !amount}">立即支付</div>
        </section>
    </div>
</template>

<script>
export default {
    name:'recharge',
    data () {
        return{
            amount: ''
        }
    },
    computed: {
        type () { // 1:余额/2:押金
            return this.$route.params.type
        }
    },
    methods: {
        
    }
}
</script>
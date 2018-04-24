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
            <div class="loginButton textC centertBC fontSize28" style="margin-top:.6rem" :class="{disable: !amount}" @click="payAmount">立即支付</div>
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
        payAmount () {
            const { amount, type } = this
            const param = {
                amount,
                orderType: type == 1 ? 2 : 3
            }
			this.getData(`/wechat/mp/prePay`, param)
                .then(res => {
                    alert(res.result)
                    this.wxPay(res.result)
                }).catch(err => {
                    console.log(err)
                })
        },
        wxPay (param) {
            const self = this
            wx.chooseWXPay({
                // timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                // nonceStr: '', // 支付签名随机串，不长于 32 位
                // package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                // signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                // paySign: '', // 支付签名
                ...param,
                success: function (res) {
                    // 支付成功后的回调函数
                    self.successBack()
                }
            })
        },
        successBack () {
            alert('支付成功啦~')
        }
    }
}
</script>
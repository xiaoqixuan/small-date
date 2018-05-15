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
            <!-- <div class="loginButton textC centertBC fontSize28" style="margin-top:.6rem" :class="{disable: !amount}">立即支付</div> -->
            <div class="loginButton textC centertBC fontSize28" style="margin-top:.6rem" :class="{disable: !amount}" @click="payAmount">立即支付</div>
        </section>
    </div>
</template>

<script>
const wx = require('weixin-js-sdk')
export default {
    name:'recharge',
    data () {
        return{
            amount: ''
        }
    },
    computed: {
        type () { // 1:余额/2:押金
            return this.$route.query.type
        },
        verify () {
            return JSON.parse(sessionStorage.getItem("verify") || {})
        }
    },
    created(){
        this.getCertification()
    },
    methods: {
		getCertification () {
            const { verify } = this
            const param = {
                // appId: 'wx34a8632f0f8f508c',
                // secret: 'cfd47d86e739535cb980cb4544e1cf87',
                ...verify,
                url: window.location.href
            }
			this.getData(`/wechatmp/jssdk/wxconfig`, param, 'Form')
                .then(res => {
                    this.wxConfig(res.result)
                    console.log(res)
                })
        },
        wxConfig (param) {
            wx.config({  
                debug: true, 
                ...param,
                jsApiList: [  
                    // 所有要调用的 API 都要加到这个列表中  
                    'chooseWXPay'
                ]  
            })
            wx.ready(function () {  
                wx.checkJsApi({  
                    jsApiList: [
                        'chooseWXPay' 
                    ],  
                    success: function (res) {
                        if (res.checkResult.getLocation == false) {  
                            alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');  
                            return;  
                        } else {
                            console.log(res)
                        }  
                    }  
                });  
            });  
            wx.error(function(res){  
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。  
                console.log("验证失败，请重试！",res);  
            }); 
        },
        payAmount () {
            const { amount, type } = this
            if (amount) {
                const param = {
                    amount,
                    orderType: type == 1 ? 2 : 3
                }
                this.getData(`/wechat/mp/prePay`, param)
                    .then(res => {
                        alert(JSON.stringify(res.result))
                        this.wxPay(res.result)
                    }).catch(err => {
                        console.log(err)
                    })
            }
        },
        wxPay (param) {
            const self = this
            wx.chooseWXPay({
                timestamp: param.timeStamp,
                nonceStr: param.nonceStr,
                package: param.packageValue,
                signType: param.signType,
                paySign: param.paySign,
                // timestamp: param.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                // nonceStr: param.nonceStr, // 支付签名随机串，不长于 32 位
                // package: data.packageValue,// 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                // signType: param.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                // paySign: param.paySign, // 支付签名
                // ...param,
                success: function (res) {
                    // 支付成功后的回调函数
                    self.successBack()
                }
            })
        },
        successBack () {
            alert('支付成功啦~')
            this.$router.push("/account")
        }
    }
}
</script>
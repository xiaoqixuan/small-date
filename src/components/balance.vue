<template>
    <div>
        <header class="centertBC textC fontSize36">
            <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>开通会员
        </header>
        <section>
        <div class="balanceBox">
            <ul class="list-wrap" style="text-align:center;">
                <li  class="balanceDiv backGFFF"
                    :class="{balanceActive: n.isChecked, fl: index%2 == 0, fr: index%2 == 1}"
                    v-for="(n,index) in cardList"
                    @click="chooseVal(n.id)">
                    <div class="balanceTop">
                        <div class="balanceMon textL fl">
                        <span class="fontSize32 color42">{{n.presentPrice}}</span>
                        <span class="fontSize24 color999 scx">{{n.originalPrice}}</span>
                        </div>
                        <div class="balanceZk fl textC">{{n.discount}}折</div>
                    </div>
                    <div class="balanceMonth textL fontSize28">{{n.duration}}个月</div>
                </li>
            </ul>
        </div>
        <div v-if="tip" class="fontSize32 color42 textL xsTq">
            享受特权:
            <div class="fontSize26 color999" v-html="tip"></div>
            <!-- <span class="fontSize26 color999 xsTqSpan"><label class="yuandian fl"></label>可享受8次免费发布小约会</span> -->
        </div>
        <div class="indexButton loginButton textC centertBC fontSize28" :class="{disable: !tip}" @click="payAmount">开通</div>
        </section>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui'
const wx = require('weixin-js-sdk')
export default {
    name:'balance',
    data () {
        return{
            amount: 0,
            pager: {
                limit: 4,
                page: 1,
                sidx: 'create_time',
                order: 'asc'
            },
            cardList: [],
            tip: ''
        }
    },
    computed: {
        verify () {
            return JSON.parse(sessionStorage.getItem("verify") || {})
        }
    },
    created(){
        this.getCertification()
        this.getList()
    },
    methods: {
        getList () {
            let self = this
            const { limit, page, sidx, order } = this.pager
            Indicator.open(); // loading组件
            self.getData(`/member/membercard/list?limit=${limit}&page=${page}&sidx=${sidx}&order=${order}`)
                .then(res => {
                    if (res.code === 0) {
                        self.cardList = res.page.list.map(it => {
                            return {
                                id: it.id,
                                discount: it.discount,
                                duration: it.duration,
                                originalPrice: it.originalPrice,
                                presentPrice: it.presentPrice,
                                privileges:  it.privileges,
                                isChecked: false
                            }
                        })
                        Indicator.close(); // loading组件
                        console.log(self.cardList)
                    }
                }).catch(err => {
                    console.log(err)
                    Indicator.close(); // loading组件
                })
        },
        chooseVal (id) {
            let self = this
            self.cardList.forEach(it => {
                if (it.id === id) {
                    it.isChecked = true
                    self.tip = it.privileges
                    self.amount = it.presentPrice
                } else {
                    it.isChecked = false
                }
            })
        },
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
            const { amount } = this
            if (amount) {
                const param = {
                    amount,
                    orderType: 1
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
                timestamp: param.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: param.nonceStr, // 支付签名随机串，不长于 32 位
                package: param.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: param.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: param.paySign, // 支付签名
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


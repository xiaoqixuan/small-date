<template>
    <div>
        <header class="centertBC textC fontSize36">
			注册
		</header>
		<section>
			<div class="telLogin fontSize28 colorb4">
				<input type="tel" placeholder="请输入您的手机号" v-model="mobile" />
				<p class="backGFFF">
					<input class="fl"  v-model="smsCode" placeholder="请输入短信验证码" />
					<span v-if="!mobile" class="fl disabled">获取验证码</span>
					<span v-else class="fl centertBC" @click="getCode">获取验证码</span>
				</p>
			</div>
			<div class="loginButton textC centertBC fontSize28" @click="signBut">注册</div>
		</section>
        <mt-popup
            v-model="popupVisible"
            position="top"
            :modal=false >
            {{text}}
        </mt-popup>
    </div>
</template>
<script>
import { Popup } from 'mint-ui';
export default {
	name: 'login',
	data () {
		return {
			mobile: '13281176587',	// 13612345678
            smsCode: '',
            popupVisible: false,
            text: '发送成功'
		}
	},
    computed: {
        fansId () {
            return window.sessionStorage.fansId || ''
        }
    },
	methods: {
		getCode () {
            const self = this
			const { mobile } = this
            const data = { mobile }
            this.getData('/sms/sendRecord/send', data)
                .then(res => {
                    console.log(res)
                    if(res.code == 0) {
                        self.popupVisible = true
                        setTimeout(() => {
                            self.popupVisible = false
                        },1000)
                    }
                })
		},
		signBut () {
			const { mobile, smsCode, fansId } = this
			const data = {
                wxAccountId: 16,
                mobile,
                smsCode,
                fansId: fansId ? fansId*1 : fansId
            }
			this.getData('/wxReg', data, 'Form').then(res => {
				console.log(res)
				if(res.code == 0) {
					sessionStorage.setItem("token", res.token)
					this.$router.push({path:'/releaseDate'})
				}
			})	
        }
	}
}
</script>
<style lang="css" rel="stylesheet/css" scoped>
    .disabled {
        background: transparent;
        color: inherit;
    }
    .mint-popup {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        background: rgba(254, 92, 92, .9);
        color: #fff;
        font-size: .35rem;
    }
</style>
<template>
    <div>
        <header class="centertBC textC fontSize36">
			登录
		</header>
		<section>
			<div class="loginTab color42 fontSize28">
				<p class="fl paddingTB textC" :class="{borderBottom:isLogin}" @click="isLogin=true">登录</p>
				<p class="fl paddingTB textC" :class="{borderBottom:!isLogin}" @click="isLogin=false">注册</p>
			</div>
			<div class="telLogin fontSize28 colorb4">
				<input type="tel" placeholder="请输入您的手机号"  v-model="mobile"  />
				<input type="password" class="" placeholder="请输入您的密码" style="border-top:none;" v-model="password" v-if="isLogin" />
				<p class="backGFFF" v-if="!isLogin">
					<input class="fl" placeholder="请输入短信验证码" />
					<span class="fl" @click="getCode">获取验证码</span>
				</p>
				<a class="textR colorfe5c5c fontSize22 passWordClass" v-if="isLogin" @click="passwordLink()">
					忘记密码？
				</a>
			</div>
			<div class="loginButton textC centertBC fontSize28" v-if="isLogin" @click="loginBut()">登录</div>
			<a class="loginButton textC centertBC fontSize28" style="margin-top: .2rem; display: block;" v-if="!isLogin" @click="registerBut()">下一步</a>
		</section>
    </div>
</template>
<script>
export default {
	name: 'login',
	data () {
		return {
			isLogin: true,
			mobile: '13612345678',	// 13612345678
			password: 'admin'
		}
	},
	methods: {
		// 登录
		loginBut () {
			const { mobile, password } = this
			const data = { mobile, password }
			this.getData('/login', data, 'Form').then(res => {
				console.log(res)
				if(res.code == 0) {
					sessionStorage.setItem("samllLogin", res.token)
					this.$router.push({path:'/releaseDate'})
				}
			})	
		},
		getCode () {
			const { mobile } = this
			const data = { mobile }
			this.getData('/sendCoden', data, 'Form').then(res => {
				console.log(res)
				if(res.code == 0) {
					console.log(res)
				}
			})
		},
		// 忘记密码
		passwordLink () {
			this.$router.push({path:'/password'})
		},
		registerBut () {
			this.$router.push({path:'/register'}) 
		}
	}
}
</script>
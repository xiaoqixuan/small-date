<template>
    <div>
        <header class="centertBC textC fontSize36">
			登录
		</header>
		<section>
			<div class="loginTab color42 fontSize28">
				<p class="fl paddingTB textC" :class="{borderBottom:login}" @click="login=true,register=false">登录</p>
				<p class="fl paddingTB textC" :class="{borderBottom:register}" @click="login=false,register=true">注册</p>
			</div>
			<div class="telLogin fontSize28 colorb4">
				<input type="tel" placeholder="请输入您的手机号"  v-model="loginTel"  />
				<input type="password" class="" placeholder="请输入您的密码" style="border-top:none;" v-model="loginPas" v-if="login" />
				<p class="backGFFF" v-if="register">
					<input class="fl" placeholder="请输入短信验证码" />
					<span class="fl textR">获取验证码</span>
				</p>
				<a class="textR colorfe5c5c fontSize22 passWordClass" v-if="login" @click="passwordLink()">
					忘记密码？
				</a>
			</div>
			<div class="loginButton textC centertBC fontSize28" v-if="login" @click="loginBut()">登录</div>
			<a class="loginButton textC centertBC fontSize28" style="margin-top: .2rem; display: block;" v-if="register" @click="registerBut()">下一步</a>
		</section>
    </div>
</template>
<script>
export default {
	name: 'login',
	data () {
		return {
			login: true,
			register: false,
			loginTel: '13612345678',	// 13612345678
			loginPas: 'admin'
		}
	},
	methods: {
		// 登录
		loginBut(){
			let self = this
			let data = 'mobile='+self.loginTel+'&password='+self.loginPas
			this.getData('/login', data, 'Form').then(res => {
				console.log(res)
				if(res.code == 0) {
					sessionStorage.setItem("samllLogin", res.token)
					self.$router.push({path:'/center'})
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
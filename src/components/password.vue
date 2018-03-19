<template>
  <div>
      <header class="centertBC textC fontSize36">
			<a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>重置密码
		</header>
		<section>
			<div class="telLogin fontSize28 colorb4">
				<input type="tel" placeholder="请输入您的手机号" />
				<p class="backGFFF">
					<input class="fl" placeholder="请输入短信验证码" />
					<span class="fl textR ">获取验证码</span>
				</p>
				<input class="" placeholder="请输入您的密码" style="border-top:none;" />
				<p class="textR colorfe5c5c fontSize22 passWordClass"></p>
			</div>
			<div class="loginButton textC centertBC fontSize28">提交</div>
		</section>
  </div>
</template>
<script>
export default {
  name:'password',
  data () {
      return {}
  }
}
</script>

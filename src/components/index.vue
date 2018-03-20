<template>
  <div>
    <section class="backGFFF" style="min-height:414px;">
			<div class="indexImg">
				<img src="../assets/img/date.png"/>
			</div>
			<div class="textC coffee">用一杯咖啡的时间，邂逅一段爱情</div>
			<div class="textC coffee" style="padding: 0;">已有<label class="colorfe5c5c">4212</label>对约会成功</div>
			<div class="indexButton loginButton textC centertBC fontSize28" @click="loginBut">立即体验</div>
      <!-- <router-link :to="{path:'/login'}" class="indexButton loginButton textC centertBC fontSize28" @click="loginBut">立即体验</router-link>  style="height:100%;width:100%;background:#fff;"-->
			<div class="textC colorfe5c5c wathYh">什么是小约会？</div>
		</section>
		<my-footer :classStyle="[true,false,false]"></my-footer>
  </div>
</template>

<script>
import footer from './comm/footer.vue'
export default {
  	name: 'index',
  	data () {
	    return {
	      msg: 'Welcome to Your Vue.js App'
	    }
	},
	components: {
		'my-footer':footer,
	},
	created () {
		
	},
  	methods: {
		loginBut(){
	  		this.$router.push({path:'/releaseDate'})
		}
	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

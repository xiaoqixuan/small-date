<template>
  <div>
      <footer>
			<span class="indexS1 textC active" :class="[indexClick01 ? 'colorfe5c5c indexS01' : 'color42']" @click="indexClick(),indexClick01=true,indexClick02=false,indexClick03=false">
				去约会
			</span>
			<span class="indexS2 textC" :class="[indexClick02 ? 'colorfe5c5c indexS02' : 'color42']" @click="recordClick(),indexClick01=false,indexClick02=true,indexClick03=false">
				约会记录
			</span>
			<span class="indexS3 textC" :class="[indexClick03 ? 'colorfe5c5c indexS03' : 'color42']" @click="centerClick(),indexClick01=false,indexClick02=false,indexClick03=true">
				我的
			</span>
		</footer>
  </div>
</template>
<script>
export default {
	props:['classStyle'],
  	name:'footer',
  	data () {
      	return{
			indexClick01: this.classStyle[0],
			indexClick02: this.classStyle[1],
			indexClick03: this.classStyle[2]
		}
  	},
 	methods:{
		indexClick () {
			this.$router.push({path:'/'})
		},
    	recordClick () {
			if(this.$cookie.get('samllLogin')){
				this.$router.push({path:'/recordDate'})
			}else{
				this.$router.push({path:'/login'})
			}
		},
		centerClick () {
			if(this.$cookie.get('samllLogin')){
				this.$router.push({path:'/center'})
			}else{
				this.$router.push({path:'/login'})
			}
		}
  	}
}
</script>


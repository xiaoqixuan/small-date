<template>
  <div>
    <div class="tmc" v-if="basicsName"></div>
		<div class="sexTs" v-if="basicsName">
			<div class="divBasics">
        <p class="fontSize30 textL p2 trueName borderBottome5e5e5 color888">
					{{inputValue}}
				</p>
				<p class="basicsNameDiv">
						<input type="text" class="basicsName color42 borderBottome5e5e5">
						<span class="qingkong" @click="qingkong"></span>
				</p>
				<p class="fontSize30 textC p2">
					<span class="s1 fl color888" @click="basicsName=false">取消</span>
					<span class="s2 fr colorfe5c5c" @click="basicsName=false">确定</span>
				</p>
			</div>
		</div>
  </div>
</template>
<script>
export default {
	props:{
		inputValue: String
	},
  name:'modal',
  data () {
      return{
				basicsName: true
			}
  },
  methods:{
		inputName () {
			this.basicsName = true
		},
		qingkong () {
				this.name = ''
		}
  }
}
// <modal :inputValue="msg" ref="ji"></modal>
// this.$refs.take.inputName();
</script>






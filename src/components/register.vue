<template>
  <div>
      <header class="centertBC textC fontSize36">
			<a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>免费注册
		</header>
		<section>
			<div class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
				<span class="fl textL">密码</span>
				<input type="password" class="fr height88 textR inputColor" style="height:.87rem;line-height:.87rem" placeholder="请输入密码" />
			</div>
			<div class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
				<span class="fl textL">昵称</span>
				<input type="text" class="fr height88 textR inputColor" style="height:.86rem;line-height:.87rem" placeholder="请输入昵称" />
			</div>
			<div class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
				<span class="fl textL">性别</span>
				<!-- <select class="fr height88 inputColor">
					<option class="textR">请选择</option>
					<option>男</option>
					<option>女</option>
				</select> -->
                <Select v-model="model3">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
			</div>
			<p class="textR colorfe5c5c fontSize22 passWordClass"></p>
			<div class="loginButton textC centertBC fontSize28" @click="regClick()">提交注册</div>
			<div class="divTy textC">
				<span class="ty"></span>
				<span class="colorb4 ty1">我已阅读并同意<label class="colorfe5c5c">小约会注册条款</label></span>
			</div>
		</section>
		<div class="tmc" v-if="sexAlert"></div>
		<div class="sexTs" v-if="sexAlert">
			<div>
				<p class="fontSize30 textC borderBottome5e5e5 p1 color42">性别一旦提交，就不能更改哦</p>
				<p class="fontSize30 textC p2">
					<span class="s1 fl color888" @click="sexAlert=false">取消</span>
					<span class="s2 fr colorfe5c5c" @click="sexAlert=false">确定</span>
				</p>
			</div>
			
		</div>
  </div>
</template>
<script>
export default {
  name:'register',
  data () {
      return {
          cityList: [
            {
                value: '男',
                label: '男'
            },
            {
                value: '女',
                label: '女'
            }
        ],
        model3: '',
        sexAlert:false
      }
  },
  methods:{
      regClick() {
          this.sexAlert = true
      }
  }
}
</script>
<style>
    .ivu-select{
        float: right;
        width: 40%;
    }
    .ivu-select-selection{
        border: none;
    }
    .ivu-select-single,.ivu-select-selection{
        height: .86rem !important;
        line-height: .88rem;
    }
    .ivu-select-placeholder{
        height: .86rem !important;
        line-height: .88rem !important;
        text-align: right;
        width: 100% !important;
        font-size: .28rem !important;
    }
    .ivu-select-selected-value{
        height: .86rem !important;
        line-height: .88rem !important;
        text-align: right;
        width: 100% !important;
        font-size: .28rem !important;
    }
</style>

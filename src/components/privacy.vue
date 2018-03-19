<template>
  <div>
    <header class="centertBC textC fontSize36">
        <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>隐私设置
    </header>
    <section>
        <div class="privacyList height88 color42 textL fontSize30 backGFFF borderBottome5e5e5">
            隐藏工作单位
            <i-switch v-model="switch1" @on-change="change"></i-switch>
        </div>
        <div class="privacyList height88 color42 textL fontSize30 backGFFF borderBottome5e5e5">
            隐藏微信号
            <i-switch v-model="switch2" @on-change="change"></i-switch>
        </div>
        <div class="privacyList height88 color888 textL fontSize24 borderBottome5e5e5">
           隐藏后微信号不会作为约会成功后的联系方式
        </div>
        <div class="privacyList height88 color42 textL fontSize30 backGFFF borderBottome5e5e5">
            拒收小约会推送信息
            <i-switch v-model="switch3" @on-change="change"></i-switch>
        </div>
        <div class="privacyList height88 color888 textL fontSize24 borderBottome5e5e5">
          请谨慎操作，如果拒收将不会收到小约会推送消息
        </div>
        <div class="privacyList height88 color42 textL fontSize30 backGFFF borderBottome5e5e5">
            拒绝被推荐
            <i-switch v-model="switch4" @on-change="change"></i-switch>
        </div>
        <div class="privacyList color888 textL fontSize24" style="padding-top:.3rem;">
         如果拒绝，将不会被推荐合适的异性，现在推荐的方式包括人工推荐和只能推荐
        </div>
    </section>
  </div>
</template>
<script>
export default {
  name:'privacy',
  data () {
      return{
          switch1: false,
          switch2: false,
          switch3: false,
          switch4: false,
      }
  },
  methods: {
      change (status) {
        //   this.$Message.info('开关状态：' + status);
      } 
  }
}
</script>
<style scoped>
    .ivu-switch{
        width: .84rem;
        height: .5rem;
        float: right;
        margin-top: .16rem;
    }
    .ivu-switch:after{
        height: .46rem;
        width: .46rem;
        top: 0;
    }
    .ivu-switch-checked:after{
        left: .34rem;
    }
    .ivu-switch-checked{
        background-color: #fe5c5c;
        border-color:#fe5c5c;
    }
</style>



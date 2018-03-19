<template>
  <div>
        <header class="centertBC textC fontSize36">
            <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>约会记录
        </header>
        <section>
			<router-link :to="{path:'/dateDetails',query:{id:'123'}}" class="recordList borderBottome5e5e5 colorfe5c5c backGFFF">
                <p style="font-size:bold">
                    <span class="textL fontSize30 fl">我</span>
                    <span class="textR fontSize30 fl">约会中</span>
                </p>
                <p>
                    <span class="textL fontSize18 fl">发起人</span>
                    <span class="textR fontSize18 fl">2017-12-24</span>
                </p>
            </router-link>
            <router-link :to="{path:'/dateDetails',query:{id:'123'}}" class="recordList borderBottome5e5e5 backGFFF">
                <p class="color42">
                    <span class="textL fontSize30 fl">晓晓</span>
                    <span class="textR fontSize30 fl">约会结束</span>
                </p>
                <p class="color888">
                    <span class="textL fontSize18 fl">发起人</span>
                    <span class="textR fontSize18 fl">2017-12-24</span>
                </p>
            </router-link>
		</section>
         <my-footer :classStyle="[false,true,false]"></my-footer>
  </div>
</template>
<script>
import footer from './comm/footer.vue'
export default {
  name:'recordDate',
  data () {
      return {}
  },
  components: {
	'my-footer':footer,
  },
  methods:{
      indexClick () {
          this.$router.push({path:'/'})
      }
  }
}
</script>


<template>
  <div>
    <header class="centertBC textC fontSize36">
        <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>我的相册
    </header>
    <section>
        <div class="photoDiv"></div>
        <!-- <div id="easyContainer"></div> -->
    </section>
  </div>
</template>
<script>
import footer from './comm/footer.vue'
const wx = require('weixin-js-sdk')
export default {
    name: 'photo',
    data () {
        return {
        	msg: {}
        }
    },
    created(){
        this.getCertification()
    },
	methods:{
		getCertification () {
            const param = {
                appId: 'wx5f9e2248022a47b8',
                secret: '41c0fd9cef8c284f5dfbdc25e19ace02',
                url: window.location.origin
            }
			const url = window.location.origin
			this.getData(`/wechatmp/jssdk/wxconfig`, param)
                .then(res => {
                    console.log(res)
                })
		},
	    addPhoto () {

	    }
	}
}
</script>

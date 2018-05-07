<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
const wx = require('weixin-js-sdk')
export default {
    name: 'App',
    computed: {
        token () {
            return window.sessionStorage.samllLogin || ''
        },
    },
    beforeMount() {
        if (this.token) {
            // this.$router.push("/ReleaseDate")
            this.getUserInfo()
            this.getCertification()
        }
    },
    methods: {
        getUserInfo () {
            this.getData(`/fans/wxfansbase/info/`)
                .then(res => {
                    if (res.code === 0) {
                        const { userInfo } = res
                        const info = {
                            id: userInfo.id,
                            nickname: userInfo.nickname,
                            headImgUrl: userInfo.headImgUrl
                        }
                        sessionStorage.setItem("userInfo", JSON.stringify(info))
                        console.log(res, info)
                    }
                })
        },
		getCertification () {
            const param = {
                appId: 'wx34a8632f0f8f508c',
                secret: 'cfd47d86e739535cb980cb4544e1cf87',
                url: window.location.host
            }
			const url = window.location.host
			this.getData(`/wechatmp/jssdk/wxconfig`, param, 'Form')
                .then(res => {
                    this.wxConfig(res.result)
                    console.log(res)
                })
        },
        wxConfig (param) {
            wx.config({  
                debug: true, 
                ...param,
                jsApiList: [  
                    // 所有要调用的 API 都要加到这个列表中 
                    'chooseImage', 
                    'uploadImage',  
                    // 'downloadImage'  
                    'chooseWXPay'
                ]  
            })
            wx.ready(function () {  
                wx.checkJsApi({  
                    jsApiList: [  
                        'chooseImage',  
                        'uploadImage',  
                        'chooseWXPay' 
                    ],  
                    success: function (res) {
                        if (res.checkResult.getLocation == false) {  
                            alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');  
                            return;  
                        } else {
                            console.log(res)
                        }  
                    }  
                });  
            });  
            wx.error(function(res){  
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。  
                console.log("验证失败，请重试！",res);  
                // wx.closeWindow();  
            }); 
        },
    }
}
</script>
<style src="./assets/css/com.css"></style>
<style src="./assets/css/login.css"></style>
<style src="./assets/css/releaseDeta.css"></style>
<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}
ul {
	margin: 0;
	padding: 0;
	list-style: none;
}
</style>

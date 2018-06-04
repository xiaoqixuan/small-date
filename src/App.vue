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
            return window.sessionStorage.token || ''
        }
    },
    created(){
        this.getAuthorization()
    },
    beforeMount() {
        this.sessionUserMsg()
        sessionStorage.setItem("verify", JSON.stringify({
            appId: 'wx34a8632f0f8f508c',
            secret: 'cfd47d86e739535cb980cb4544e1cf87'
        }))
    },
    mounted(){
        if (this.token) {
            // this.$router.push("/ReleaseDate")
            this.getUserInfo()
        }
    },
    methods: {
        getAuthorization () {
            const { search } = window.location
            if (!search) {
                // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbc238120799ab05e&redirect_uri=https://www.guaiyun.store/scrm-web/wechat/auth2&response_type=code&scope=snsapi_base&state=https://www.guaiyun.store/xyh/#wechat_redirect'
            }
        },
        sessionUserMsg() {
            const { search } = window.location || ''
            const key = search.indexOf('fansId') > -1 ? 'fansId' : 'token'
            const val = search.split('=')[1] || ''
            key == 'fansId' ? sessionStorage.removeItem('token') : sessionStorage.removeItem('fansId')
            sessionStorage.setItem(key, val)
        },
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
        }
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

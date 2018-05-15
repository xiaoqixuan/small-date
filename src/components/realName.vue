<template>
    <div>
        <header class="centertBC textC fontSize36">
            <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>实名认证
        </header>
        <section>
            <div class="realNameDiv backGFFF">
                <span class="realNamePic"></span>
                <span class="fontSize36 color42 realName textC">实名认证</span>
                <span class="fontSize24 realName textC color999" style="padding:0;">为了每个人的真诚，请完成实名认证，</span>
                <span class="fontSize24 realName textC color999">我们绝不会泄露您的隐私</span>
            </div>
            <div class="realNamePhoto">
                <ul  v-if="num > 0" class="photos">
                    <li v-for="(n,index) in images.localIds" @click="deletePhoto(n.id)" class="img-wrap">
                        <div class="shaow"><i class="fa fa-trash-o"></i></div>
                        <img :src="n.src">
                    </li>
                </ul>
                <div v-if="num < 2" class="realNameBoder backGFFF">
                    <span class="photoNum fontSize28 color999">{{num}}/2</span>
                    <div class="photoDiv" @click="addPhoto"></div>
                    <div class="color999 fontSize28 realNameYu">请上传身份证正面和反面</div>
                </div>
            </div>
            <div @click="saveUpload" :class="{disable: num < 2}" class="indexButton loginButton textC centertBC fontSize28">提交</div>
        </section>
    </div>
</template>

<script>
import { Indicator } from 'mint-ui'
const wx = require('weixin-js-sdk')
export default {
    name: 'realName',
    data () {
        return {
        	images: {
                localIds: [],
                serverIds: []
            },
            num: 0
        }
    },
    computed: {
        verify () {
            return JSON.parse(sessionStorage.getItem("verify") || {})
        }
    },
    created(){
        this.getCertification()
    },
	methods:{
        clearData () {
            this.images = {
                localIds: [],  
                serverIds: []
            }
            this.num = 0
        },
		getCertification () {
            const { verify } = this
            const param = {
                // appId: 'wx34a8632f0f8f508c',
                // secret: 'cfd47d86e739535cb980cb4544e1cf87',
                ...verify,
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
                    'downloadImage'  
                ]  
            })
            wx.ready(function () {  
                wx.checkJsApi({  
                    jsApiList: [  
                        'chooseImage', 
                        'uploadImage',  
                        'downloadImage'  
                    ],  
                    success: function (res) {
                        if (res.checkResult.getLocation == false) {  
                            alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');  
                            return;  
                        }else{  
                            // wxChooseImage();  
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
	    addPhoto () {
            const self = this
            const { length } = this.images.localIds
            wx.chooseImage({
                count: length > 0 ? 1 : 2,
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    let list = []
                    if (length) { // 有数据
                        list = res.localIds.map((el, i) => {
                            return {
                                id: self.images.localIds[length-1].id + i + 1,
                                src: el
                            }
                        })
                        self.images.localIds = self.images.localIds.concat(list)
                    } else {
                        list = res.localIds.map((el, i) => {
                            return {
                                id: i + 1,
                                src: el
                            }
                        })
                        self.images.localIds = list
                        self.num = 0
                    }
                    self.upPhoto()
                }
            });
	    },
        upPhoto () {
            const self = this
            const { localIds } = this.images
            const { length } = localIds
            wx.uploadImage({
                localId: localIds[self.num].src,
                success: function (res) {
                    alert('已经上传：' + (self.num+1) + '/' + length)
                    self.images.serverIds.push({
                        id: self.images.localIds[self.num].id,
                        src: res.serverId
                    });
                    self.num++
                    if (self.num < length) {
                        self.upPhoto()
                    }
                },
                fail: function (res) {
                    alert("上传失败，请稍候重试");
                }
            });

        },
        saveUpload () {
            const { serverIds } = this.images
            if (this.num > 1) {
                const list = serverIds.map(el => el.src)
                const param = {
                    serverId: list.join(','),
                    type: 2
                }
                Indicator.open(); // loading组件
                this.getData(`/member/memberbasephotos/save`, param)
                    .then(res => {
                        console.log(res)
                        Indicator.close(); // loading组件
                        this.clearData()
                        this.$router.push("/rzDetails")
                    }).catch(err => {
                        console.log(err)
                        Indicator.close(); // loading组件
                    })
            }
        },
        deletePhoto (id) {
            const { localIds, serverIds } = this.images
            this.images.localIds = localIds.filter((n, index) => n.id !== id)
            this.images.serverIds = serverIds.filter((n, index) => n.id !== id)
            this.num = this.images.localIds.length
        }
	}
}
</script>

<style lang="css" rel="stylesheet/css" scoped>
    /* 照片 */
    .photos {
        padding: .2rem;
        /* padding-bottom: 0; */
        text-align: left;
        font-size: 0;
    }
    .photos .img-wrap {
        position: relative;
        display: inline-block;
        margin-right: 2%;
        /* margin-bottom: 2.5%; */
        width: 30%;
        border-radius: .1rem .1rem;
        overflow: hidden;
    }
    .shaow {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .3);
    }
    .img-wrap .fa {
        position: absolute;
        left: calc(50% - .2rem);
        top: calc(50% - .2rem);
        font-size: .4rem;
    }
    /* .photos .img-wrap:nth-child(4n) {
        margin-right: 0;
    } */
</style>

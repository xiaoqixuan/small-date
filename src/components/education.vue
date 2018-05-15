<template>
    <div>
        <header class="centertBC textC fontSize36">
            <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>学历认证
        </header>
        <section>
            <div class="realNameDiv backGFFF">
                <span class="realNamePic educationPic"></span>
                <span class="fontSize36 color42 realName textC">学历认证</span>
                <span class="fontSize24 realName textC color999" style="padding:0;">为了每个人的真诚靠谱，请完成学历认证，</span>
                <span class="fontSize24 realName textC color999">我们绝不会泄露您的隐私</span>
                </div>
            <div class="realNamePhoto">
                    <div v-if="images.serverIds" class="photos">
                        <div v-for="(n,index) in images.localIds" @click="deletePhoto()" class="img-wrap">
                            <p class="shaow"><i class="fa fa-trash-o"></i></p>
                            <img :src="n">
                        </div>
                    </div>    
                    <div v-if="!images.serverIds" class="realNameBoder backGFFF">
                        <div class="photoDiv"></div>
                        <div class="color999 fontSize28 realNameYu">请上传您的学历证书</div>
                    </div>
            </div>
            <div @click="saveUpload" :class="{disable: !num}" class="indexButton loginButton textC centertBC fontSize28">提交</div>
        </section>
  </div>
</template>
<script>
import { Indicator } from 'mint-ui'
const wx = require('weixin-js-sdk')
export default {
    name: 'education',
    data () {
        return {
        	images: {
                localIds: [],
                serverIds: ''
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
                serverIds: ''
            }
            this.num = 0
        },
		getCertification () {
            const { verify } = this
            const param = {
                // appId: 'wx34a8632f0f8f508c',
                // secret: 'cfd47d86e739535cb980cb4544e1cf87',
                ...verify,
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
                count: 1,
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    self.images.localIds = res.localIds;// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    self.upPhoto()
                    self.num = 0
                }
            });
	    },
        upPhoto () {
            const self = this
            const { localIds } = this.images
            const { length } = localIds
            wx.uploadImage({
                localId: localIds[self.num],
                success: function (res) {
                    self.num++
                    self.images.serverIds = res.serverId;
                },
                fail: function (res) {
                    alert("上传失败，请稍候重试");
                }
            });

        },
        saveUpload () {
            const { serverIds } = this.images
            if (this.num > 0) {
                const param = {
                    serverId: serverIds,
                    type: 3
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
            this.images.localIds = []
            this.images.serverIds = ''
            this.num = 0
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
        /* margin-right: 2%; */
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

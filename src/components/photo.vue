<template>
  <div>
    <header class="centertBC textC fontSize36">
        <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>我的相册
    </header>
    <section>
        <div class="photoDiv" @click="addPhoto"></div>
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
        	images: {
                localId: [],  
                serverId: [] 
            },
            num: 0
        }
    },
    created(){
        this.getCertification()
    },
	methods:{
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
                    // 'previewImage',  
                    'uploadImage',  
                    'downloadImage'  
                ]  
            })
            wx.ready(function () {  
                wx.checkJsApi({  
                    jsApiList: [  
                        'chooseImage',  
                        // 'previewImage',  
                        'uploadImage',  
                        'downloadImage'  
                    ],  
                    success: function (res) {  
                        //alert(JSON.stringify(res));  
                        //alert(JSON.stringify(res.checkResult.getLocation));  
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
            let { localId } = this.images
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    localId = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    alert('照片选择:', localId)
                    self.num = 0
                    self.upPhoto()
                }
            });
	    },
        upPhoto () {
            const self = this
            const { localId, serverId } = this.images
            const { length } = localId
            wx.uploadImage({
                localId: localId[self.num],
                success: function (res) {
                    self.num++
                    alert('已上传：' + self.num + '/' + length)
                    serverId.push(res.serverId);
                    if (self.num < length) {
                        self.upPhoto()
                    }
                },
                fail: function (res) {
                    alert("上传失败，请稍候重试");
                }
            });

        }
	}
}
</script>

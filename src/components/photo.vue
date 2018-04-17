<template>
  <div>
    <header class="centertBC textC fontSize36">
        <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>我的相册
            <span style="position: absolute;right: .3rem;font-size: .3rem;" @click="saveUpload">上传</span>
    </header>
    <section>
        <div v-if="images.showlist.length" class="photos">
            <li v-for="(n,index) in images.showlist" @click="deletePhoto(n.id, false)" class="img-wrap">
                <div class="shaow"><i class="fa fa-trash-o"></i></div>
                <img :src="n.imgUrl">
            </li>
        </div>
        <!-- <div v-if="images.localIds.length" class="photos"> -->
        <p v-if="images.localIds.length" class="photos-tip">已添加</p>
        <div v-if="images.localIds.length" class="photos">
            <li v-for="(n,index) in images.localIds" @click="deletePhoto(index, true)" class="img-wrap">
                <div class="shaow"><i class="fa fa-trash-o"></i></div>
                <img :src="n">
                <!-- <img v-for="(n,index) in images.localIds" :src="n"> -->
                <!-- <img src="http://www.onegreen.org/QQ/UploadFiles/201302/2013022822455722.jpg"> -->
            </li>
            
        </div>
        <div class="photoDiv" @click="addPhoto"></div>
    </section>
  </div>
</template>
<script>
import footer from './comm/footer.vue'
import { Indicator } from 'mint-ui'
const wx = require('weixin-js-sdk')
export default {
    name: 'photo',
    data () {
        return {
            pager: {
                limit: 30,
                page: 1,
                sidx: 'create_time',
                order: 'asc'
            },
        	images: {
                localIds: [],
                serverIds: [],
                showlist: []
            },
            num: 0
        }
    },
    created(){
        this.getCertification()
        this.getPhotos()
    },
	methods:{
        clearData () {
            this.images = {
                localIds: [],  
                serverIds: [],
                showlist: []
            }
            this.num = 0
        },
        getPhotos () {
            const self = this
            const { limit, page, sidx, order } = this.pager
            Indicator.open(); // loading组件
            this.getData(`/member/memberbasephotos/list?type=1&limit=${limit}&page=${page}&sidx=${sidx}&order=${order}`)
                .then(res => {
                    self.images.showlist = res.page.list
                    Indicator.close(); // loading组件
                }).catch(err => {
                    console.log(err)
                    Indicator.close(); // loading组件
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
            wx.chooseImage({
                // count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    self.images.localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    alert('照片选择:', res.localIds, self.images.localIds)
                    self.num = 0
                    self.upPhoto()
                }
            });
	    },
        upPhoto () {
            const self = this
            const { length } = this.images.localIds
            wx.uploadImage({
                localId: localId[self.num],
                success: function (res) {
                    self.num++
                    alert('已上传：' + self.num + '/' + length)
                    
                    self.images.serverIds.push(res.serverId);
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
            const param = {
                serverId: serverIds,
                type: 1
            }
            Indicator.open(); // loading组件
			this.getData(`/member/memberbasephotos/save`, param)
                .then(res => {
                    console.log(res)
                    this.clearData() // 清空现有数据
                    this.getPhotos() // 拉取最新数据
                    Indicator.close(); // loading组件
                }).catch(err => {
                    console.log(err)
                    Indicator.close(); // loading组件
                })
        },
        deletePhoto (id, type) {
            if (type) { // 待上传列表
                const { localIds, serverIds } = this.images
                this.images.localIds = localIds.filter((n, index) => index !== id)
                this.images.serverIds = serverIds.filter((n, index) => index !== id)
            } else { // 已上传列表
                // const { showlist } = this.images
                // this.images.showlist = showlist.filter(n => n.imgId !== id)
                this.getData(`/member/memberbasephotos/delete`, [id])
                    .then(res => {
                        console.log(res)
                        this.getPhotos()
                    })
            }
        }
	}
}
</script>
<style lang="css" rel="stylesheet/css" scoped>
    /* 照片 */
    .photos-tip {
        text-align: left;
        padding: .2rem .2rem 0 .2rem;
    }
    .photos {
        padding: .2rem;
        padding-bottom: 0;
        text-align: left;
        font-size: 0;
    }
    .photos .img-wrap {
        position: relative;
        display: inline-block;
        margin-right: 2%;
        margin-bottom: 2.5%;
        width: 23.5%;
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
    .photos .img-wrap:nth-child(4n) {
        margin-right: 0;
    }
</style>

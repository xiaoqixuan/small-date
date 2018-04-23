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
                <div v-if="images.serverIds.length" class="photos">
                    <li v-for="(n,index) in images.localIds" @click="deletePhoto(n.id)" class="img-wrap">
                        <div class="shaow"><i class="fa fa-trash-o"></i></div>
                        <img :src="n.src">
                    </li>
                </div>    
                <div v-if="images.serverIds.length < 2" class="realNameBoder backGFFF">
                    <span class="photoNum fontSize28 color999">{{images.serverIds.length}}/2</span>
                    <div class="photoDiv" @click="addPhoto"></div>
                    <div class="color999 fontSize28 realNameYu">请上传身份证正面和反面</div>
                </div>
            </div>
            <div @click="saveUpload" class="indexButton loginButton textC centertBC fontSize28">提交</div>
        </section>
    </div>
</template>

<script>
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
    created(){
        // this.getCertification()
        // this.getPhotos()
    },
	methods:{
	    addPhoto () {
            const self = this
            const { length } = this.images.localIds
            wx.chooseImage({
                count: length ? 1 : 2, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    let list = []
                    if (length) { // 有数据
                        list = res.localIds.map((el, i) => {
                            return {
                                id: self.images.localIds[length].id + i + 1,
                                src: el
                            }
                        })
                        self.images.localIds.concat(list)
                        // self.images.localIds.push(res.localIds) // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    } else {
                        list = res.localIds.map((el, i) => {
                            return {
                                id: i + 1,
                                src: el
                            }
                        })
                        self.images.localIds = list
                        // self.images.localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
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
                    self.num++
                    alert('已上传：' + self.num + '/' + length)
                    self.images.serverIds.push({
                        id: localIds[self.num].id,
                        src: res.serverId
                    });
                    if (self.num < length) {
                        self.upPhoto()
                    }
                },
                fail: function (res) {
                    const { localIds } = self.images
                    self.images.localIds = localIds.filter((n, index) => localIds[self.num].id !== id)
                    alert("上传失败，请稍候重试");
                }
            });

        },
        saveUpload () {
            const { serverIds } = this.images
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
                }).catch(err => {
                    console.log(err)
                    Indicator.close(); // loading组件
                })
        },
        deletePhoto (id) {
            const { localIds, serverIds } = this.images
            this.images.localIds = localIds.filter((n, index) => n.id !== id)
            this.images.serverIds = serverIds.filter((n, index) => n.id !== id)
        }
	}
}
</script>

<style lang="css" rel="stylesheet/css" scoped>
    /* 照片 */
    /* .photos-tip {
        text-align: left;
        padding: .2rem .2rem 0 .2rem;
    } */
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

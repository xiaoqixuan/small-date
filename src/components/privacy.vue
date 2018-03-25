<template>
    <div>
        <header class="centertBC textC fontSize36">
            <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>隐私设置
            <span style="position: absolute;right: .3rem;font-size: .3rem;" @click="save">保存</span>
        </header>
        <section>
            <div class="privacyList height88 color42 textL fontSize30 backGFFF borderBottome5e5e5">
                隐藏工作单位
                <!-- <i-switch v-model="switch1" @on-change="change"></i-switch> -->
                <mt-switch v-model="param.isHiddenWorkingunit"
                    class="fr basicsInput backGFFF color888" :class="{active: param.isHiddenWorkingunit}"
                    style="width: inherit;paading:0;"></mt-switch>
            </div>
            <div class="privacyList height88 color42 textL fontSize30 backGFFF borderBottome5e5e5">
                隐藏微信号
                <!-- <i-switch v-model="switch2" @on-change="change"></i-switch> -->
                <mt-switch v-model="param.switch2"
                    class="fr basicsInput backGFFF color888" :class="{active: param.switch2}"
                    style="width: inherit;paading:0;"></mt-switch>
            </div>
            <div class="privacyList height88 color888 textL fontSize24 borderBottome5e5e5">
                隐藏后微信号不会作为约会成功后的联系方式
            </div>
            <div class="privacyList height88 color42 textL fontSize30 backGFFF borderBottome5e5e5">
                拒收小约会推送信息
                <!-- <i-switch v-model="switch3" @on-change="change"></i-switch> -->
                <mt-switch v-model="param.isRefuseMsgPush"
                    class="fr basicsInput backGFFF color888" :class="{active: param.isRefuseMsgPush}"
                    style="width: inherit;paading:0;"></mt-switch>
            </div>
            <div class="privacyList height88 color888 textL fontSize24 borderBottome5e5e5">
                请谨慎操作，如果拒收将不会收到小约会推送消息
            </div>
            <div class="privacyList height88 color42 textL fontSize30 backGFFF borderBottome5e5e5">
                拒绝被推荐
                <!-- <i-switch v-model="switch4" @on-change="change"></i-switch> -->
                <mt-switch v-model="param.isRefuseRecommended"
                    class="fr basicsInput backGFFF color888" :class="{active: param.isRefuseRecommended}"
                    style="width: inherit;paading:0;"></mt-switch>
            </div>
            <div class="privacyList color888 textL fontSize24" style="padding-top:.3rem;">
                如果拒绝，将不会被推荐合适的异性，现在推荐的方式包括人工推荐和只能推荐
            </div>
        </section>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui'

export default {
    name:'privacy',
    data () {
        return{
            param: {
                isHiddenWorkingunit: false,
                switch2: false,
                isRefuseMsgPush: false,
                isRefuseRecommended: false,
            }
        }
    },
    created(){
        this.getDetail()
    },
    methods: {
        getDetail () {
            const self = this
            Indicator.open(); // loading组件
            this.getData(`/member/memberbaseinfo/info`)
                .then(_data => {
                    const { memberBaseInfo } = _data
                    Indicator.close(); // loading组件
                })
        },
        save () {
            const self = this
            const param = {}
            for (let k in this.param) {
                param[k] = this.param[k] ? 1 : 0
            }
            console.log(param)
            self.getData('/member/memberbaseinfo/update', param).then(res => {
                console.log(res)
                if(res.code == 0) {
                    self.getDetail()
                    // Toast('保存成功')
                }
            })
        }
    }
}
</script>
<style>
    .active .mint-switch-core {
        background-color: #f87e7e !important;
        border-color:#f87e7e !important;
    }
</style>



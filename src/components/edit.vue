<template>
    <div>
        <header class="centertBC textC fontSize36">
            <a href="javascript:history.back(-1)" @click="clear" class="historyGo fontSize36"></a>
            {{information.label}}
            <span style="position: absolute;right: .3rem;font-size: .3rem;" @click="save">保存</span>
        </header>
        <section>
            <div class="height88 borderBottome5e5e5 evaluate backGFFF">
                <textarea class="color888" rows="5" cols="20" placeholder="请输入。。。" v-model="information.value"></textarea>
            </div>
            
            <!-- <div class="textC fontSize36 myCash">
                我的押金
            </div>
            <div class="cashMoney textC colorfe5c5c fontSize36">
                <span class="spanMoney">{{depositBalance}}</span>
                <span>元</span>
            </div>
            <div class="loginButton textC centertBC fontSize28">退回押金</div> -->
            <!-- <div class="loginButton textC centertBC fontSize28" style="margin-top:.3rem; background-color:#bbbbbb;">退回押金</div> -->
        </section>
    </div>
</template>
<script>
export default {
    name:'edit',
    data () {
        return{
            
        }
    },
    computed: {
        information () {
            return JSON.parse(sessionStorage.getItem('information') || '')
        },
    },
    methods: {
        clear () {
            sessionStorage.setItem('information', null)
        },
        save () {
            const self = this
            const { type, value } = self.information
            const param = {
                [type]: value
            }
            console.log(param)
            self.getData('/member/memberbaseinfo/update', param).then(res => {
                console.log(res)
                if(res.code == 0) {
                    self.$router.push({path:'/basics'})
                    self.clear()
                }
            })
        }
    }
}
</script>

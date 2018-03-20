<template>
  <div>
    <header class="centertBC textC fontSize36">
        <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>发布约会
    </header>
    <section>
        <div class="releaseDate"></div>
        <ul class="basicsDiv backGFFF">
            <li class="height88 fontSize28 textL borderBottome5e5e5 paddingLR"
                v-for="(n,index) in deta">
                {{n.label}}

                <input class="fr basicsInput backGFFF"
                    type="text" style="height:.84rem;line-height:.84rem"
                    :placeholder="`请输入${n.label}`"
                    v-model="n.value">
            </li>
        </ul>
       <!--  <div class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
            <span class="fl textL">约会项目</span>
            <input type="text" class="fr height88 textR inputColor" style="height:.86rem;line-height:.86rem" placeholder="" readonly="value" />
        </div>
        <div class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
            <span class="fl textL">约会时间</span>
            <input type="text" class="fr height88 textR inputColor" style="height:.86rem;line-height:.86rem" placeholder="" readonly="value" />
        </div>
        <div class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
            <span class="fl textL">约会地点</span>
            <input type="text" class="fr height88 textR inputColor" style="height:.86rem;line-height:.86rem" placeholder="" readonly="value" />
        </div>
        <div class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
            <span class="fl textL">详细地址</span>
            <input type="text" class="fr height88 textR inputColor" style="height:.87rem;line-height:.87rem" placeholder="" readonly="value" />
        </div> -->
        <div class="indexButton loginButton textC centertBC fontSize28 marginTop06" @click="save">发布</div>
    </section>
  </div>
</template>

<script>
export default {
    name:'recordDate',
    data () {
        return {
            deta: [ // 基本资料'
                { label: '约会项目', value: '', type: 'dateType' }, 
                { label: '约会时间', value: '', type: 'dateTime' }, 
                { label: '约会地点', value: '', type: 'datePlace' }, 
                { label: '详细地址', value: '', type: 'dateDetailAddress' }
            ],
        }
    },
    methods:{
        checkVal (obj) {
            return true
        },
        processed (obj) {
            let arr = []
            for (let k in obj) {
                arr.push(k + '=' + obj[k]) 
            }
            return arr.join('&')
        },
        save () {
            // this.$router.push({path:'/'})
            let param = {
                createUserId: 1,
                createUser: 'Daisy'
            }
            this.deta.forEach(item => {
                param[item.type] = item.value
            })
            const result = this.checkVal(param)
            param = this.processed(param)
            
            if (result) {
                this.getData('/engage/engageengageinfo/save', param, 'Form').then(res => {
                    console.log(res)
                    if(res.code == 0) {
                        alert('发布成功')
                        // sessionStorage.setItem("samllLogin", res.token)
                        // self.$router.push({path:'/center'})
                    }
                })
            }
        }
    }
}
</script>
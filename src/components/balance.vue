<template>
    <div>
        <header class="centertBC textC fontSize36">
            <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>开通会员
        </header>
        <section>
        <div class="balanceBox">
            <ul class="list-wrap" style="text-align:center;">
                <li  class="balanceDiv backGFFF"
                    :class="{balanceActive: n.isChecked, fl: index%2 == 0, fr: index%2 == 1}"
                    v-for="(n,index) in cardList"
                    @click="chooseVal(n.id)">
                    <div class="balanceTop">
                        <div class="balanceMon textL fl">
                        <span class="fontSize32 color42">{{n.presentPrice}}</span>
                        <span class="fontSize24 color999 scx">{{n.originalPrice}}</span>
                        </div>
                        <div class="balanceZk fl textC">{{n.discount}}折</div>
                    </div>
                    <div class="balanceMonth textL fontSize28">{{n.duration}}个月</div>
                </li>
            </ul>
        </div>
        <div v-if="tip" class="fontSize32 color42 textL xsTq">
            享受特权:
            <div class="fontSize26 color999" v-html="tip"></div>
            <!-- <span class="fontSize26 color999 xsTqSpan"><label class="yuandian fl"></label>可享受8次免费发布小约会</span> -->
        </div>
        <div class="indexButton loginButton textC centertBC fontSize28" :class="{disable: !tip}">开通</div>
        </section>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui'
export default {
    name:'balance',
    data () {
        return{
            pager: {
                limit: 4,
                page: 1,
                sidx: 'create_time',
                order: 'asc'
            },
            cardList: [],
            tip: ''
        }
    },
    created(){
        this.getList()
    },
    methods: {
        getList () {
            let self = this
            const { limit, page, sidx, order } = this.pager
            Indicator.open(); // loading组件
            self.getData(`/member/membercard/list?limit=${limit}&page=${page}&sidx=${sidx}&order=${order}`)
                .then(res => {
                    if (res.code === 0) {
                        self.cardList = res.page.list.map(it => {
                            return {
                                id: it.id,
                                discount: it.discount,
                                duration: it.duration,
                                originalPrice: it.originalPrice,
                                presentPrice: it.presentPrice,
                                privileges:  it.privileges,
                                isChecked: false
                            }
                        })
                        Indicator.close(); // loading组件
                        console.log(self.cardList)
                    }
                }).catch(err => {
                    console.log(err)
                    Indicator.close(); // loading组件
                })
        },
        chooseVal (id) {
            let self = this
            self.cardList.forEach(it => {
                if (it.id === id) {
                    it.isChecked = true
                    self.tip = it.privileges
                } else {
                    it.isChecked = false
                }
            })
        }
    }
}
</script>


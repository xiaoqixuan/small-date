<template>
    <div>
        <header class="centertBC textC fontSize36">
            <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>开通会员
        </header>
        <section>
        <div class="balanceBox">
            <ul class="list-wrap borderTop5e5e5" style="text-align:center;">
                <li  class="balanceDiv backGFFF fl"
                    :class="{balanceActive: n.isChecked, fl: index%2 == 0, fr: index%2 == 1}"
                    v-for="(n,index) in cardList">
                    <div class="balanceTop">
                        <div class="balanceMon textL fl">
                        <span class="fontSize32 color42">{{n.value}}</span>
                        <span class="fontSize24 color999 scx">{{n.oldVal}}</span>
                        </div>
                        <div class="balanceZk fl textC">{{n.discount}}</div>
                    </div>
                    <div class="balanceMonth textL fontSize28">{{n.deadline}}</div>
                </li>
            </ul>
            <!-- <div class="balanceDiv backGFFF fl" :class="{balanceActive : isBalanceActive}" @click="isBalanceActive=!isBalanceActive">
                <div class="balanceTop">
                    <div class="balanceMon textL fl">
                    <span class="fontSize32 color42">99元</span>
                    <span class="fontSize24 color999 scx">129元</span>
                    </div>
                    <div class="balanceZk fl textC">
                    9折
                    </div>
                </div>
                <div class="balanceMonth textL fontSize28">
                    1个月
                </div>
            </div>
            <div class="balanceDiv backGFFF fr">
                <div class="balanceTop">
                    <div class="balanceMon textL fl">
                    <span class="fontSize32 color42">253元</span>
                    <span class="fontSize24 color999 scx">297元</span>
                    </div>
                    <div class="balanceZk fl textC">
                    8.5折
                    </div>
                </div>
                <div class="balanceMonth textL fontSize28">
                    3个月
                </div>
            </div>
            <div class="balanceDiv backGFFF fl" style="margin-top:.4rem;">
                <div class="balanceTop">
                    <div class="balanceMon textL fl">
                    <span class="fontSize32 color42">498元</span>
                    <span class="fontSize24 color999 scx">523元</span>
                    </div>
                    <div class="balanceZk fl textC">
                    8折
                    </div>
                </div>
                <div class="balanceMonth textL fontSize28">
                    6个月
                </div>
            </div>
            <div class="balanceDiv backGFFF fr" style="margin-top:.4rem;">
                <div class="balanceTop">
                    <div class="balanceMon textL fl">
                    <span class="fontSize32 color42">986元</span>
                    <span class="fontSize24 color999 scx">1188元</span>
                    </div>
                    <div class="balanceZk fl textC">
                    8折
                    </div>
                </div>
                <div class="balanceMonth textL fontSize28">
                    1个月
                </div>
            </div> -->
        </div>
        <div class="fontSize32 color42 textL xsTq">
            享受特权:
            <span class="fontSize26 color999 xsTqSpan"><label class="yuandian fl"></label><i class="fa fa-circle"></i>无限次免费报名异性发布的小约会</span>
            <span class="fontSize26 color999 xsTqSpan"><label class="yuandian fl"></label>可享受8次免费发布小约会</span>
        </div>
        <div class="indexButton loginButton textC centertBC fontSize28">开通</div>
        </section>
    </div>
</template>
<script>
export default {
    name:'balance',
    data () {
        return{
            cardList: [
                { value: '99元', oldVal: '129元', discount: '9折', deadline: '1个月', type: 'createUser', ischecked: true }, 
                { value: '99元', oldVal: '129元', discount: '9折', deadline: '1个月', type: 'createUser', ischecked: false }, 
                { value: '99元', oldVal: '129元', discount: '9折', deadline: '1个月', type: 'createUser', ischecked: false }, 
                { value: '99元', oldVal: '129元', discount: '9折', deadline: '1个月', type: 'createUser', ischecked: false }
            ],
            isBalanceActive: false
        }
    },
    created(){
        this.getList()
    },
    methods: {
        getList () {
            let self = this
            this.getData(`/member/membercard/list`)
            .then(res => {
                if (res.code === 0) {
                    console.log(res)
                }
            })
        }
    }
}
</script>


<template>
  <div>
      <header class="centertBC textC fontSize36">
        <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>开通会员
      </header>
      <section>
        <div class="balanceBox">
          <div class="balanceDiv backGFFF fl" :class="{balanceActive : isBalanceActive}" @click="isBalanceActive=!isBalanceActive">
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
          </div>
        </div>
        <div class="fontSize32 color42 textL xsTq">
          享受特权:
          <span class="fontSize26 color999 xsTqSpan"><label class="yuandian fl"></label>无限次免费报名异性发布的小约会</span>
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
      isBalanceActive: false
    }
  }
}
</script>


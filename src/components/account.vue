<template>
  <div class="backGFFF" style="height:100% width:100%;">
      <header class="centertBC textC fontSize36">
        <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>我的账户
      </header>
      <section>
        <div class="accountBanner"></div>
        <div class="borderBottome5e5e5 accountList textL fontSize28 color42">
          开通会员
          <router-link :to="{path:'/balance'}" tag="span" class="kaitong fr fontSize28">开通</router-link>
        </div>
        <div class="borderBottome5e5e5 accountList textL fontSize30 color42 accountListCz">
          <span class="fontSize28 color42 yue">余额</span>
          <div class="accountMon fontSize32 colorfe5c5c">
            128.00
            <router-link :to="{path:'/recharge'}" class="kaitong fr fontSize28 chongzhi">充值</router-link>
          </div>
        </div>
        <router-link :to="{path:'/cash'}" class="borderBottome5e5e5 cashDiv height88 paddingLR textL fontSize28 color42">
          押金
          <label class="fr jiantou color888">已交</label>
        </router-link>
      </section>
  </div>
</template>

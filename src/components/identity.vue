<template>
  <div>
      <header class="centertBC textC fontSize36">
        <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>身份认证
      </header>
      <section>
        <router-link :to="{path:'/realName'}" tag="div" class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
            <span class="fl textL">实名认证</span>
            <input type="text" class="fr height88 textR inputColor" style="height:.87rem;line-height:.87rem" placeholder="未认证" readonly="value" />
        </router-link>
        <router-link :to="{path:'/education'}" tag="div" class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
            <span class="fl textL">学历认证</span>
            <input type="text" class="fr height88 textR inputColor" style="height:.86rem;line-height:.86rem" placeholder="未认证" readonly="value" />
        </router-link>
        <router-link :to="{path:'/company'}" tag="div" class="fontSize28 height88 borderBottome5e5e5 registerDiv color42 backGFFF">
            <span class="fl textL">单位认证</span>
            <input type="text" class="fr height88 textR inputColor" style="height:.86rem;line-height:.86rem" placeholder="未认证" readonly="value" />
        </router-link>
      </section>
  </div>
</template>

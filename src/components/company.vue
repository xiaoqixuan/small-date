<template>
  <div>
      <header class="centertBC textC fontSize36">
        <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>单位认证
      </header>
      <section>
          <div class="realNameDiv backGFFF">
              <span class="realNamePic companyPic"></span>
              <span class="fontSize36 color42 realName textC">单位认证</span>
              <span class="fontSize24 realName textC color999" style="padding:0;">为了每个人的真诚靠谱，我们需要验证您的工作单位，</span>
              <span class="fontSize24 realName textC color999">您所提交的资料我们将严格保密</span>
          </div>
          <div class="realNamePhoto">
              <div class="realNameBoder backGFFF">
                  <span class="photoNum fontSize28 color999">0/6</span>
                  <div class="photoDiv"></div>
                  <div class="color999 fontSize24 realNameYu textL" style="padding-left: .2rem;padding-right: .2rem;">上传能证明工作单位的证件。例如工牌、劳动合同、社保记录截图（企业已认证）等，上传越多越容易通过审核。</div>
              </div>
          </div>
          <router-link :to="{path:'/rzDetails'}" tag="div" class="indexButton loginButton textC centertBC fontSize28">提交</router-link>
      </section>
  </div>
</template>

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
              <div class="realNameBoder backGFFF">
                  <span class="photoNum fontSize28 color999">0/2</span>
                  <div class="photoDiv"></div>
                  <div class="color999 fontSize28 realNameYu">请上传身份证正面和反面</div>
              </div>
          </div>
          <router-link :to="{path:'/rzDetails'}" tag="div" class="indexButton loginButton textC centertBC fontSize28">提交</router-link>
      </section>
  </div>
</template>

<template>
  <div class="divBox">
      <section>
        <div class="centerDivTop">
            <img :src="userInfo.headImgUrl" alt="">
            <span class="fontSize28">{{userInfo.nickname}}</span>
        </div>
        <div class="centerdiv1 borderBottome5e5e5">
            <router-link :to="{path:'/basics'}" class="personal fl textC fontSize28 color42"><i></i>个人资料</router-link>
            <router-link :to="{path:'/photo'}" class="photo fl textC fontSize28 color42"><i></i>我的相册</router-link>
        </div>
        <div class="datumList">
            <router-link :to="{path:'/account'}" class="datumListBox height88 textL borderBottome5e5e5 color42">
                <i class="account"></i>我的账户<label class="fr"></label>
            </router-link>
            <router-link :to="{path:'/ideal'}" class="datumListBox height88 textL borderBottome5e5e5 color42">
                <i class="ideal"></i>理想对象<label class="fr"></label>
            </router-link>
            <router-link :to="{path:'/identity'}" class="datumListBox height88 textL borderBottome5e5e5 color42">
                <i class="identity"></i>身份认证<label class="fr"></label>
            </router-link>
            <router-link :to="{path:'/privacy'}" class="datumListBox color42 height88 textL borderBottome5e5e5">
                <i class="privacy"></i>隐私设置<label class="fr"></label>
            </router-link>
        </div>
      </section>
      <my-footer :classStyle="[false,false,true]"></my-footer>
  </div>
</template>
<script>
import footer from './comm/footer.vue'
export default {
    name: 'center',
    data () {
        return {

        }
    },
    computed: {
        userInfo () {
            console.log()
            return JSON.parse(sessionStorage.getItem("userInfo") || '')
        }
    },
    components: {
        'my-footer':footer,
    }
}
</script>
<style scoped>
.divBox{
    width: 100%;
    height: 100%;
    background-color: #f2f2f2;
    padding-bottom: 2rem;
}
</style>

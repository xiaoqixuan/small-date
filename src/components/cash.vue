<template>
  <div>
      <header class="centertBC textC fontSize36">
        <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>押金
      </header>
      <section>
          <div class="textC fontSize36 myCash">
              我的押金
          </div>
          <div class="cashMoney textC colorfe5c5c fontSize36">
              <span class="spanMoney">{{depositBalance}}</span>
              <span>元</span>
          </div>
          <div class="loginButton textC centertBC fontSize28" @click="submit">退回押金</div>
          <!-- <div class="loginButton textC centertBC fontSize28" style="margin-top:.3rem; background-color:#bbbbbb;">退回押金</div> -->
      </section>
  </div>
</template>
<script>
export default {
    name:'balance',
    data () {
        return{
            memberProperty: {}
        }
    },
    computed: {
        depositBalance () {
            return this.$route.query.depositBalance
        },
        userInfo () {
            return JSON.parse(sessionStorage.getItem("userInfo") || '')
        }
    },
    methods: {
        submit () {
            const { userInfo, depositBalance } = this
            delete userInfo.headImgUrl
            const param = {
                amount: depositBalance,
                ...userInfo
            }
            this.getData(`/member/depositReturn`, param)
                .then(res => {
                    alert(JSON.stringify(res))
                }).catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>

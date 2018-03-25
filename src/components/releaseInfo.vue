<template>
  <div class="info">
    <header class="centertBC textC fontSize36">
        <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>晴天
    </header>
    <section>  
        <div>
            <router-link :to="{path:'/releaseDetail'}" class="datumListBox  textL borderBottome5e5e5 color42">
                <div class="info-detail">
                    <img class="logo" src="http://www.onegreen.org/QQ/UploadFiles/201302/2013022822455722.jpg">
                    <span>晴天</span>
                    <img class="icon" style="heigth:15px;width:15px;" src="http://img.zcool.cn/community/0192865798cd8a0000018c1b8dad1b.jpg">
                </div>
                <div>
                    <label class="fr"></label>
                </div>
            </router-link>
        </div>
    </section>
    <section>
        <h3 class="title">约会详情</h3>
        <mt-field label="约会项目" v-model="project" readonly></mt-field>
        <mt-field label="约会时间" v-model="time" readonly></mt-field>
        <mt-field label="约会地点" v-model="address" readonly></mt-field>
        <mt-field label="约会详细地址" v-model="detail" readonly></mt-field>
        <mt-field label="约会状态" v-model="status" readonly></mt-field>
        <mt-field class="surplus" label="约会剩余时间" v-model="surplus" readonly></mt-field>
    </section>
    <router-link tag="div" to="/releaseDetail" class="indexButton loginButton textC centertBC fontSize28 marginTop06">报名</router-link> 
    <router-link tag="div" to="/releaseDetail" class="indexButton loginButton textC centertBC fontSize28 marginTop06 margintop03">不在接收此人信息</router-link> 
    <div class="textC colorfe5c5c wathYh">什么是小约会？</div>
  </div>
</template>

<script>
export default {
  data () {
      return {
          project: "喝咖啡",
          time: "2017-12-13 10:12",
          address: "上海市股东双林路",
          detail:"上海市股东双林路77号",
          status: "约会中",
          surplus: "29:35"
      }
  }
}
</script>

<style>
    .info img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
    }
   .info .mint-cell-title{
       text-align: left;
       color:#888;
       font-size: 12px;
       padding-left: 15px;
   }
   .info .mint-cell-value{
       padding-left: 25px;
       font-size: 14px;
       color:#424242;
   }
   .info .datumListBox{
       display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding:20px 15px;
        background: white;
   }
   .info .info-detail{
       display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
   }
   .info .title{
       text-align: left;
       padding-left:15px;
       line-height: 45px;
       padding-left: 15px;
       font-size: 16px;
       color: #424242;
   }
    .info .mint-cell-wrapper{
       padding:0;
   }
   .logo{
       margin-right: 10px;
   }
   .info .icon{
       width:15;
       height: 15px;
       margin-left: 10px;
   }
   .margintop03{
       margin-top: 15px;
   }
   .surplus .mint-field-core{
       color:#fe5c5c;
       font-size: 14px;
   }
   .info .mintui-field-error{
       display: none;
   }
   .datumListBox label{
       margin-top: 0;
   }
   
</style>

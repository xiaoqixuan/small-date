<template>
  <div class="detail">
    <header class="centertBC textC fontSize36">
        <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>晴天
    </header>
    <section>  
        <div>
            <router-link :to="{path:'/releaseDetail'}" tag="div" class="datumListBox  textL borderBottome5e5e5 color42">
                <div class="info-detail">
                    <img class="logo" src="http://www.onegreen.org/QQ/UploadFiles/201302/2013022822455722.jpg">
                    <div class="wrap">
                        <div class="personinfo">
                            <span class="name">晴天</span>
                            <img class="icon" style="heigth:15px;width:15px;" src="http://img.zcool.cn/community/0192865798cd8a0000018c1b8dad1b.jpg">
                        </div>
                        <div class="authen">
                            <div>
                                <img class="icon" style="heigth:15px;width:15px;" src="http://img.zcool.cn/community/0192865798cd8a0000018c1b8dad1b.jpg"><span>实名认证</span>  
                            </div>
                            <div>
                                <img class="icon" style="heigth:15px;width:15px;" src="http://img.zcool.cn/community/0192865798cd8a0000018c1b8dad1b.jpg"><span>学历认证</span>  
                            </div>
                            <div>
                                <img class="icon" style="heigth:15px;width:15px;" src="http://img.zcool.cn/community/0192865798cd8a0000018c1b8dad1b.jpg"><span>单位认证</span>  
                            </div>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
    </section>
    <div style="padding-bottom:60px;">
        <section class="img-wrap">
            <img class="logo" src="http://www.onegreen.org/QQ/UploadFiles/201302/2013022822455722.jpg">
            <img class="logo" src="http://www.onegreen.org/QQ/UploadFiles/201302/2013022822455722.jpg">
            <img class="logo" src="http://www.onegreen.org/QQ/UploadFiles/201302/2013022822455722.jpg">
        </section>
        <section>
        <h3 class="title">基本资料</h3>
        <mt-field label="昵称" v-model="nickname" readonly></mt-field>
        <mt-field label="出生年月" v-model="birth" readonly></mt-field>
        <mt-field label="身高" v-model="height" readonly></mt-field>
        <mt-field label="体重" v-model="weight" readonly></mt-field>
        <mt-field label="最高学历" v-model="education" readonly></mt-field>
        <mt-field label="婚姻状况" v-model="marriage" readonly></mt-field>
        <mt-field label="籍贯" v-model="origin" readonly></mt-field>
        </section>
        <section>
            <h3 class="title">工作学习</h3>
            <mt-field label="工作单位" v-model="work" readonly></mt-field>
            <mt-field label="职位" v-model="position" readonly></mt-field>
        </section>
        <section>
            <h3 class="title">兴趣爱好</h3>
            <mt-field label="喜欢的电影" v-model="movie" readonly></mt-field>
            <mt-field label="喜欢的书" v-model="book" readonly></mt-field>
            <mt-field label="喜欢的名人爱情" v-model="like" readonly></mt-field>
        </section>
    </div>
  </div>
</template>

<script>
export default {
  data () {
      return {
          nickname:"晴天",
          birth:"1992-01-01",
          height: "165",
          weight: "60kg",
          education: "本科",
          marriage:"未婚",
          position: "销售",
          movie: "阿甘正川",
          book: "爱情",
          like: "张杰 谢娜",
          work: "阿里巴巴集团",
          origin:"上海"
      }
  }
}
</script>

<style>
    .detail img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
    }
    .detail .wrap{
        display: flex;
        flex-direction:column;
    }
    .detail .authen{
        display: flex;
        flex-direction: row;
    }
    .detail .authen div{
         display: flex;
         align-items:center;
         margin-right: 10px;
         font-size: 12px;
    }
    .detail .personinfo{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 5px;
    }
    .detail .img-wrap{
        display: flex;
        flex-direction: row;
        margin: 15px 0 20px 0px;
    }
    .detail .img-wrap img{
        width: 80px;
        height: 80px;
        border-radius: 5px;
        margin:  0 0 0 15px ;
    }
    .detail .personinfo .name {
        font-size: 14px;
        color:#424242;
        margin-right: 10px;
    }
   .detail .mint-cell-title{
       text-align: left;
       color:#888;
       font-size: 12px;
       padding-left: 15px;
   }
   .detail .mint-cell-value{
       padding-left: 25px;
       font-size: 14px;
       color:#424242;
   }
   .detail .datumListBox{
       display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding:20px 15px;
        background: white;
   }
   .detail .info-detail{
       display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
   }
   .detail .title{
       text-align: left;
       padding-left:15px;
       line-height: 45px;
       font-size: 16px;
       color: #424242;
   }
   .detail .logo{
       margin-right: 10px;
   }
   .detail .icon{
       width:15;
       height: 15px;
       margin-right: 5px;
   }
   .detail .margintop03{
       margin-top: 15px;
   }
   .detail .surplus .mint-field-core{
       color:#fe5c5c;
       font-size: 14px;
   }
   .detail .mint-cell-wrapper{
       padding:0;
   }
   .datumListBox label{
       margin-top: 0;
   }
   .detail .mintui-field-error{
       display: none;
   }
   
</style>

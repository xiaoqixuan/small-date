<template>
  <div>
    <header class="centertBC textC fontSize36">
      <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>约会记录
    </header>
    <section>
        <div id="mescroll" class="mescroll">
            <!--展示上拉加载的数据列表-->
            <ul v-cloak>
                <li id="dataList" v-for="n in list">
                    <router-link :to="{path:'/dateDetails',query: {id: n.id, status: n.status}}" class="recordList borderBottome5e5e5 colorfe5c5c backGFFF">
                        <p style="font-size:bold">
                            <span class="textL fontSize30 fl">{{n.createUser || '-'}}</span>
                            <span class="textR fontSize30 fl">{{n.dateTime ? ['未开始', '约会中', '约会结束'][n.status-1] : '-'}}</span>
                        </p>
                        <p>
                            <span class="textL fontSize18 fl">发起人</span>
                            <span class="textR fontSize18 fl">{{n.dateTime || '-'}}</span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- <div id="mescroll" class="mescroll">
            展示上拉加载的数据列表
            <ul id="dataList" class="data-list" v-cloak>
                <div v-for="(n,index) in list">
                    <router-link :to="{path:'/dateDetails',query: {id: n.id, status: n.status}}" class="recordList borderBottome5e5e5 colorfe5c5c backGFFF">
                      <p style="font-size:bold">
                        <span class="textL fontSize30 fl">{{n.createUser || '-'}}</span>
                        <span class="textR fontSize30 fl">{{n.dateTime ? ['未开始', '约会中', '约会结束'][n.status-1] : '-'}}</span>
                      </p>
                      <p>
                        <span class="textL fontSize18 fl">发起人</span>
                        <span class="textR fontSize18 fl">{{n.dateTime || '-'}}</span>
                      </p>
                    </router-link>
                </div>
            </ul>
        </div> -->
    </section>
    <my-footer :classStyle="[false,true,false]"></my-footer>
  </div>
</template>
<script>
import footer from './comm/footer.vue'
import { Indicator } from 'mint-ui'

export default {
    name:'recordDate',
    data () {
        return {
            pager: {
                limit: 10,
                page: 1,
                sidx: 'create_time',
                order: 'asc'
            },
            list: [],
            mescroll: null,
            totalPage: 2
        }
    },
    components: {
        'my-footer':footer,
    },
    computed: {
        currentDate () {
            return new Date()
        },
        status () {
            return this.$route.query.status
        }
    },
    mounted () {
      var self = this;
      self.mescroll = new this.MeScroll("mescroll", { 
        up: {
            callback: self.upCallback, //上拉回调
            //以下参数可删除,不配置
            isBounce: false, //此处禁止ios回弹,解析
            //page:{size:8}, //可配置每页8条数据,默认10
            toTop: { //配置回到顶部按钮
                src: require('../assets/img/mescroll-totop.png'), 
            },
            empty: { //配置列表无任何数据的提示
                warpId: "dataList",
                icon: require('../assets/img/mescroll-empty.png'),
                // tip : "亲,暂无相关数据哦~" ,
                // btntext : "去逛逛 >" ,
                // btnClick : function() {
                // 	alert("点击了去逛逛按钮");
                // }
            },
        }
      });

    },
    methods:{
        getList () {
            let self = this
            const { limit, page, sidx, order } = this.pager
            Indicator.open(); // loading组件
            this.getData(`/engage/engageengageinfo/list?limit=${limit}&page=${page}&sidx=${sidx}&order=${order}`)
            .then(res => {
                if (res.code === 0) {
                    self.list = res.page.list.map(it => {
                        const date = new Date(it.dateTime && it.dateTime.replace(/-/g,'/'))
                        const status = self.currentDate > date ? 3 : (self.currentDate < date ? 1 : 2)
                        return {
                            id: it.id,
                            createUser: it.createUser,
                            dateTime: it.dateTime,
                            status
                        }
                    })
                }
                console.log(self.list)
                Indicator.close(); // loading组件
            })
        },
        //上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
        upCallback (page) {
            //联网加载数据
            var self = this;
            this.getListDataFromNet(page.num, page.size, function (curPageData) {
                if (page.num == 1) self.list = [];
                //更新列表数据
                self.list = self.list.concat(curPageData);
                console.log("page.num=" + page.num + ", page.size=" + page.size + ", curPageData.length=" + curPageData.length + ", self.list.length==" + self.list.length);

                //方法一(推荐): 后台接口有返回列表的总页数 totalPage
                self.mescroll.endByPage(curPageData.length, self.totalPage); //必传参数(当前页的数据个数, 总页数)
            }, function () {
                self.mescroll.endErr();
            });
        },    
        getListDataFromNet (pageNum, pageSize, successCallback, errorCallback) {
            const { sidx, order } = this.pager
            this.getData(`/engage/engageengageinfo/list?limit=${pageSize}&page=${pageNum}&sidx=${sidx}&order=${order}`)
                .then(res => {
                    if (res.code === 0) {
                        const listData = res.page.list.map(it => {
                            const date = new Date(it.dateTime && it.dateTime.replace(/-/g,'/'))
                            const status = self.currentDate > date ? 3 : (self.currentDate < date ? 1 : 2)
                            return {
                                id: it.id,
                                createUser: it.createUser,
                                dateTime: it.dateTime,
                                status
                            }
                        })
                        this.totalPage = res.page.totalPage
                        successCallback && successCallback(listData);//成功回调
                    } else {
                        errorCallback&&errorCallback()//失败回调
                    }
                }).catch(function(error) {
					errorCallback&&errorCallback()//失败回调
				});
        }
    }
}
</script>
<style lang="css" rel="stylesheet/css" scoped>
    section {
        height: calc(100vh - 1.88rem);
    }
    [v-cloak] {
      display: none;
    }
    ul {
        height: auto;
    }
</style>


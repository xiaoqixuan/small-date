<template>
  <div>
        <header class="centertBC textC fontSize36">
            <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>约会记录
        </header>
        <section>
            <ul v-for="(n,index) in list">
                <li>
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
            list: []
        }
    },
    components: {
        'my-footer':footer,
    },
    created(){
        this.getList()
    },
    computed: {
        currentDate () {
            return new Date()
        },
        status () {
            return this.$route.query.status
        }
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
        indexClick () {
            this.$router.push({path:'/'})
        }
    }
}
</script>


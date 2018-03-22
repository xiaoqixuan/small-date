<template>
  <div>
        <header class="centertBC textC fontSize36">
            <a href="javascript:history.back(-1)" class="historyGo fontSize36"></a>约会记录
        </header>
        <section>
            <ul v-for="(n,index) in list">
                <li>
                    <router-link :to="{path:'/dateDetails',query: {id: n.id}}" class="recordList borderBottome5e5e5 colorfe5c5c backGFFF">
                        <p style="font-size:bold">
                            <span class="textL fontSize30 fl">{{n.createUser || '-'}}</span>
                            <span class="textR fontSize30 fl">{{'约会中'}}</span>
                        </p>
                        <p>
                            <span class="textL fontSize18 fl">发起人</span>
                            <span class="textR fontSize18 fl">{{n.dateTime || '2018-03-20'}}</span>
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
    methods:{
        getList () {
            let self = this
            const { limit, page, sidx, order } = this.pager
            this.getData(`/engage/engageengageinfo/list?limit=${limit}&page=${page}&sidx=${sidx}&order=${order}`)
            .then(res => {
                if (res.code === 0) {
                    self.list = res.page.list
                }
                console.log(self.list)
            })
        },
        indexClick () {
            this.$router.push({path:'/'})
        }
    }
}
</script>


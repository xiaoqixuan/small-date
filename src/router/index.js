import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '@/components/login'
import Password from '@/components/password'
import Register from '@/components/register'
import RecordDate from '@/components/recordDate'
import DateDetails from '@/components/dateDetails'
import Center from '@/components/center'
import Privacy from '@/components/privacy'
import Photo from '@/components/photo'
import Ideal from '@/components/ideal'
import Account from '@/components/account'
import Balance from '@/components/balance'
import Cash from '@/components/cash'
import Recharge from '@/components/recharge'
import Basics from '@/components/basics'
import Edit from '@/components/edit'
import Identity from '@/components/identity'
import RealName from '@/components/realName'
import Education from '@/components/education'
import Company from '@/components/company'
import RzDetails from '@/components/rzDetails'
import RzSuccess from '@/components/rzSuccess'
import ReleaseDate from '@/components/releaseDate'
import ReleaseDetail from '@/components/releaseDetail'
import ReleaseInfo from '@/components/releaseInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      meta: {
        title: '首页'
      },
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        title: '登录'
      },
      component: Login
    },
    {
      path: '/Password',
      name: 'Password',
      meta: {
        title: '修改密码'
      },
      component: Password
    },
    {
      path: '/Register',
      name: 'Register',
      meta: {
        title: '注册'
      },
      component: Register
    },
    {
      path: '/RecordDate',
      name: 'RecordDate',
      meta: {
        title: '约会记录'
      },
      component: RecordDate
    },
    {
      path: '/DateDetails',
      name: 'DateDetails',
      meta: {
        title: '约会详情'
      },
      component: DateDetails
    },
    {
      path: '/Center',
      name: 'Center',
      meta: {
        title: '个人中心'
      },
      component: Center
    },
    {
      path: '/Privacy',
      name: 'Privacy',
      meta: {
        title: '隐私设置'
      },
      component: Privacy
    },
    {
      path: '/Photo',
      name: 'Photo',
      meta: {
        title: '我的相册'
      },
      component: Photo
    },
    {
      path: '/Ideal',
      name: 'Ideal',
      meta: {
        title: '理想对象'
      },
      component: Ideal
    },
    {
      path: '/Account',
      name: 'Account',
      meta: {
        title: '我的账户'
      },
      component: Account
    },
    ,
    {
      path: '/Balance',
      name: 'Balance',
      meta: {
        title: '开通会员'
      },
      component: Balance
    },
    {
      path: '/Cash',
      name: 'Cash',
      meta: {
        title: '押金'
      },
      component: Cash
    },
    {
      path: '/Recharge',
      name: 'Recharge',
      meta: {
        title: '余额充值'
      },
      component: Recharge
    },
    {
      path: '/Basics',
      name: 'Basics',
      meta: {
        title: '基本资料'
      },
      component: Basics
    },
    {
      path: '/Edit',
      name: 'Edit',
      meta: {
        title: '编辑资料'
      },
      component: Edit
    },
    {
      path: '/Identity',
      name: 'Identity',
      meta: {
        title: '身份认证'
      },
      component: Identity
    },
    {
      path: '/RealName',
      name: 'RealName',
      meta: {
        title: '实名认证'
      },
      component: RealName
    },
    {
      path: '/Education',
      name: 'Education',
      meta: {
        title: '学历认证'
      },
      component: Education
    },
    {
      path: '/Company',
      name: 'Company',
      meta: {
        title: '单位认证'
      },
      component: Company
    },
    {
      path: '/RzDetails',
      name: 'RzDetails',
      meta: {
        title: '认证详情'
      },
      component: RzDetails
    },
    {
      path: '/RzSuccess',
      name: 'RzSuccess',
      meta: {
        title: '认证成功'
      },
      component: RzSuccess
    },
    {
      path: '/ReleaseDate',
      name: 'ReleaseDate',
      meta: {
        title: '发布约会'
      },
      component: ReleaseDate
    },
    {
      path: '/ReleaseDetail',
      name: 'ReleaseDetail',
      meta: {
        title: '约会详情'
      },
      component: ReleaseDetail
    },
    {
      path: '/ReleaseInfo/:id',
      name: 'ReleaseInfo',
      meta: {
        title: '报名'
      },
      component: ReleaseInfo
    }
  ]
})

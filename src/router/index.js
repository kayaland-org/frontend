import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/pages/home/index'),
      meta: {
        title: 'KayaLand - Smart Matrix of the Best DeFi DApps',
        content: {
          keywords: 'Decentralized Funds, DeFi, Ethereum, Blockchain',
          description: 'Smart Matrix of the Best DeFi DApps'
        }
      }
    },
    {
      path: '/fund',
      name: 'fund',
      redirect: '/fund/list',
      component: () => import('@/pages/fund/index'),
      children: [{
        path: 'detail/:address',
        name: 'detail',
        component: () => import('@/pages/fund/detail-index')
      }, {
        path: 'list',
        name: 'list',
        component: () => import('@/pages/fund/list')
      }],
      meta: {
        title: 'KayaLand - Smart Matrix of the Best DeFi DApps',
        content: {
          keywords: 'Decentralized Funds, DeFi, Ethereum, Blockchain',
          description: 'Smart Matrix of the Best DeFi DApps'
        }
      }
    },
    {
      path: '/info',
      name: 'info',
      component: () => import('@/pages/info/index'),
      meta: {
        title: 'KayaLand - Smart Matrix of the Best DeFi DApps',
        content: {
          keywords: 'Decentralized Funds, DeFi, Ethereum, Blockchain',
          description: 'Smart Matrix of the Best DeFi DApps'
        }
      }
    },
    {
      path: '/commingsoon',
      name: 'commingsoon',
      component: () => import('@/pages/soon/index'),
      meta: {
        title: 'KayaLand - Smart Matrix of the Best DeFi DApps',
        content: {
          keywords: 'Decentralized Funds, DeFi, Ethereum, Blockchain',
          description: 'Smart Matrix of the Best DeFi DApps'
        }
      }
    }
  ]
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import router from './router'
import { store } from './store/'
import Layout from './pages/layout'
import './icons'

import axios from 'axios'
import VueAxios from 'vue-axios'

import VueI18n from 'vue-i18n'

import VTooltip from 'v-tooltip'

Vue.prototype.$EventBus = new Vue()

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    'zh': require('./locales/zh_CN.json'),
    'en': require('./locales/en_US.json')
  }
})
Vue.use(VueAxios, axios)
Vue.use(VTooltip)

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.meta.content) {
    let head = document.getElementsByTagName('head')
    let meta = document.createElement('meta')
    document.querySelector('meta[name="keywords"]').setAttribute('content', to.meta.content.keywords)
    document.querySelector('meta[name="description"]').setAttribute('content', to.meta.content.description)
    meta.content = to.meta.content
    head[0].appendChild(meta)
  }
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { Layout },
  template: '<Layout/>'
})

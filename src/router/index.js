import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from '@/utils/cookie'
import store from '@/store/index'
import { Message, LoadingBar } from 'iview'
import { constantRoutes } from './routes'

Vue.use(Router)

// 创建路由函数
const createRouter = () => new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

// see: https://github.com/vuejs/vue-router/issues/2881
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const router = createRouter()
const LOGIN_PAGE_NAME = 'login'

router.beforeEach(async (to, from, next) => {
  LoadingBar.start()
  const hasToken = getToken()
  if (hasToken) {
    if (to.name === LOGIN_PAGE_NAME) {
      next({ path: '/' })
    } else {
      const username = store.getters.username
      if (!username) {
        try {
          // 获取用户信息
          await store.dispatch('user/getUserInfo')
          // 生成对应的路由
          await store.dispatch('permission/generateRoutes', store.getters.roles)
          router.addRoutes(store.getters.addRoutes)
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
        } catch (e) {
          await store.dispatch('user/resetToken')
          Message.error('请重新登录')
          next({
            name: LOGIN_PAGE_NAME
          })
          LoadingBar.error()
        }
      } else {
        // 用户已经登录
        next()
      }
    }
  } else {
    // 没找到token
    if (LOGIN_PAGE_NAME === to.name) {
      next()
    } else {
      next({
        name: LOGIN_PAGE_NAME
      })
    }
  }
})

router.afterEach(() => {
  LoadingBar.finish()
})

export function resetRoutes () {
  const newRoute = createRouter()
  router.matcher = newRoute.matcher
}

export default router

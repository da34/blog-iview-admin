import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/cookie'
import { Message } from 'iview'
import { resetRoutes } from '@/router'

const state = () => ({
  token: getToken(),
  username: '',
  avatar: '',
  roles: ''
})

const mutations = {
  SET_AVATAR (state, avatar) {
    state.avatar = avatar
  },
  SET_USERNAME (state, username) {
    state.username = username
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_ROLES (state, roles) {
    state.roles = roles
  }
}

const actions = {
  async login ({ commit }, userInfo) {
    await new Promise((resolve, reject) => {
      login(userInfo).then(res => {
        const { token, role } = res
        if (role === 'normal') {
          Message.warning('权限不足，无法进入!')
          /* eslint-disable */
          reject()
          return
        }
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 根据token获取用户信息
  async getUserInfo ({ commit }) {
    await new Promise((resolve, reject) => {
      getInfo().then(res => {
        const { code, data = {} } = res
        if (code) {
          /* eslint-disable */
          reject('验证失败请重新登录')
        }
        // console.log(data)
        commit('SET_AVATAR', data.avatar)
        commit('SET_USERNAME', data.username)
        commit('SET_ROLES', data.roles)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 清除token
  async resetToken ({ commit }) {
    await new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_AVATAR', '')
      commit('SET_USERNAME', '')
      commit('SET_ROLES', '')
      // 清空路由
      resetRoutes()
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

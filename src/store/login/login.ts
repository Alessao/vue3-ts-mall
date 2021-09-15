import { Module } from 'vuex'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import localCache from '@/utils/cache'

import { ILoginState } from './types'
import { IRootState } from '../main/types'
import { IAccount } from '@/service/login/type'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router'
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: (localCache.getCache('token') as string) ?? '',
      userInfo: localCache.getCache('userInfo') ?? {},
      userMenus: localCache.getCache('userMenus') ?? [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
      localCache.setCache('token', token)
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
      localCache.setCache('userInfo', userInfo)
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      localCache.setCache('userMenus', userMenus)

      const routes = mapMenusToRoutes(userMenus)

      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      const permissions = mapMenusToPermissions(userMenus)
      // console.log(permissions)

      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)

      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)

      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)

      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    },
    phoneLoginAction({ commit }, payload: any) {
      console.log('Phone Login', payload)
    }
  }
}

export default loginModule

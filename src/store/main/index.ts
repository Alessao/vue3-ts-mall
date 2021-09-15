import { createStore, Store, useStore as useVuexStore } from 'vuex'
import login from '../login/login'
import system from './system/system'
import { getPageListData } from '@/service/main/system/system'
import dashboard from './analysis/dashboard'

import { IRootState, IStoreType } from './types'
const store = createStore<IRootState>({
  state() {
    return {
      name: 'coderwhy',
      age: 13,
      entireDepartment: [],
      entireRole: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data

      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('getInitialDataAction')
}

export default store

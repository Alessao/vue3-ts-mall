import { Module } from 'vuex'

import { IdashboardState } from './types'
import { IRootState } from '../types'
import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/service/main/analysis/dashboard'

const dashBoardModule: Module<IdashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    async getDashboadDataAction({ commit }) {
      const categoryGoodCount = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', categoryGoodCount.data)
      const categoryGoodsSale = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', categoryGoodsSale.data)
      const categoryGoodsFavor = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', categoryGoodsFavor.data)
      const addressGoodsSale = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addressGoodsSale.data)
    }
  }
}

export default dashBoardModule

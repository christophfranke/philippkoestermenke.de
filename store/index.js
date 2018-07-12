import Vuex from 'vuex'
import Vue from 'vue'
import data from '../cms-data.json'

export default () => {
  return new Vuex.Store({
    state: {
      data: {},
    },
    getters: {
      page: ({ data }) => uid => (data.find(doc => doc.type === 'page' && doc.uid === uid) || {}).data,
      exhibitions: ({ data }) => data.filter(doc => doc.type === 'exhibitions'),
      heizkoerper: ({ data }) => data.filter(doc => doc.type === 'heizkoerper')
    },
    actions: {
      nuxtServerInit({ state }) {
        Vue.set(state, 'data', data)
      }
    },
  })
}

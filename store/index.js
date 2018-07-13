import Vuex from 'vuex'
import Vue from 'vue'
import data from '../cms-data.json'

export default () => {
  return new Vuex.Store({
    state: {
      data: {},
    },
    getters: {
      piece: ({ data }) => uid => (data.find(doc => doc.type === 'heizkoerper' && doc.uid === uid) || {}).data,
      exhibitions: ({ data }) => data.filter(doc => doc.type === 'exhibitions'),
      heizkoerper: ({ data }) => data.filter(doc => doc.type === 'heizkoerper'),
      infoPages: ({ data }) => data.filter(doc => doc.type === 'info'),
      infoPage: ({ data }) => slug => (data.find(doc => doc.type === 'info' && doc.uid === slug) || {}).data,
      heizungsbuch: ({ data }) => (data.find(doc => doc.type === 'heizungsbuch') || {}).data
    },
    actions: {
      nuxtServerInit({ state }) {
        Vue.set(state, 'data', data)
      }
    },
  })
}

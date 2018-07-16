import Vuex from 'vuex'
import Vue from 'vue'
import data from '../cms-data.json'

const waitFor = fn => new Promise(resolve => {
  const resolveOrRequest = () => {
    if (fn()) {
      resolve()
    } else {
      requestAnimationFrame(resolveOrRequest)
    }
  }
  resolveOrRequest()
})

const windowWidth = store => {
  if (process.browser) {
    window.addEventListener('resize', () => {
      store.commit('windowWidth', window.innerWidth)
    })
  }
}

const windowOverflow = store => {
  if (process.browser) {
    window.addEventListener('resize', () => {
      store.commit('windowOverflow', document.body.clientHeight - window.innerHeight)
    })
  }
}

const koesteDimensions = store => {
  if (process.browser) {
    window.addEventListener('resize', () => {
      store.dispatch('calculateKoesteDimensions')
    })
  }
}

const dispatchResize = () => {
  if (process.browser) {  
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }
}

export default () => {
  return new Vuex.Store({
    state: {
      data: {},
      windowWidth: null,
      windowOverflow: false,
      koesteOffset: 75,
      koesteWidth: null,
    },
    getters: {
      piece: ({ data }) => uid => (data.find(doc => doc.type === 'heizkoerper' && doc.uid === uid) || {}).data,
      exhibitions: ({ data }) => data.filter(doc => doc.type === 'exhibitions'),
      heizkoerper: ({ data }) => data.filter(doc => doc.type === 'heizkoerper'),
      infoPages: ({ data }) => data.filter(doc => doc.type === 'info'),
      infoPage: ({ data }) => slug => (data.find(doc => doc.type === 'info' && doc.uid === slug) || {}).data,
      heizungsbuch: ({ data }) => (data.find(doc => doc.type === 'heizungsbuch') || {}).data,
      windowWidth: ({ windowWidth }) => windowWidth,
      windowOverflow: ({ windowOverflow }) => windowOverflow,
      koesteOffset: ({ koesteOffset }) => koesteOffset,
      koesteWidth: ({ koesteWidth }) => koesteWidth
    },
    actions: {
      nuxtServerInit({ state }) {
        Vue.set(state, 'data', data)
      },
      calculateKoesteDimensions({ commit }) {
        return waitFor(() => document.getElementById('koeste').getBoundingClientRect().left)
          .then(() => {        
            const rect = document.getElementById('koeste').getBoundingClientRect()
            const left = Math.round(rect.left)
            const width = Math.round(rect.right - rect.left)
            commit('updateKoesteDimensions', { left, width })
          })
      }
    },
    mutations: {
      windowWidth(state, newWidth) {
        state.windowWidth = newWidth
      },
      windowOverflow(state, windowOverflow) {
        state.windowOverflow = windowOverflow
      },
      updateKoesteDimensions(state, { left, width }) {
        state.koesteOffset = left
        state.koesteWidth = width
      }
    },
    plugins: [windowWidth, koesteDimensions, windowOverflow, dispatchResize],
  })
}

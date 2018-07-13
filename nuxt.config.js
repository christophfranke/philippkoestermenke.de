const data = require('./cms-data.json')

module.exports = {
  generate: {
  	routes() {
      return data
        .filter(doc => doc.type === 'exhibitions')
        .map(doc => `/exhibitions/${doc.uid}`)
        .concat(data
          .filter(doc => doc.type === 'heizkoerper')
          .map(doc => `/work/heizkoerper/${doc.uid}`))
    }
  },
  loading: false,
  head: {
  	titleTemplate: 'Philipp Köstermenke - %s',
    link: [
      { rel: "preload", href: "/graebenbach-regular.woff", as: "font", type: "font/woff" }
    ] 
  }
}

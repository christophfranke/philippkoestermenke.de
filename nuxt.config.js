const data = require('./cms-data.json')

module.exports = {
  // generate: {
  // 	routes() {
  //     return ['index']
  //   }
  // },
  loading: false,
  head: {
  	titleTemplate: 'Philipp Köstermenke - %s',
    link: [
      { rel: "preload", href: "/graebenbach-regular.woff", as: "font", type: "font/woff" }
    ] 
  }
}

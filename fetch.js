import Prismic from 'prismic-javascript'
import fs from 'mz/fs'

const apiEndpoint = 'https://philippkoestermenke-de.prismic.io/api/v2'
const targetFile = `${__dirname}/cms-data.json`
 
Prismic.getApi(apiEndpoint)
	.then(api => api.query('', { pageSize : 100 }))
	.then(response => {
	  console.log(response.total_pages)
	  console.log(response.results.map(result => result.data))
	  fs.writeFile(targetFile, JSON.stringify(response.results))
	})

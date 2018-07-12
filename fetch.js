import Prismic from 'prismic-javascript'
import fs from 'mz/fs'

const apiEndpoint = 'https://philippkoestermenke-de.prismic.io/api/v2'
const targetFile = `${__dirname}/cms-data.json`
 
Prismic.getApi(apiEndpoint)
	.then(api => api.query('', { pageSize : 100 }))
	.then(response => {
		if (response.total_pages > 1) {
			console.error('There are more results than fit into first response page. This will lead to missing cms data. Do another api request for the next page to fix this.')
		}
	  fs.writeFile(targetFile, JSON.stringify(response.results))
	  console.log(`successfully written cms data to ${targetFile}`)
	})

const themes = ['internet', 'neon', 'pink', 'waldmeister']

const theme = () => {
  if (process.browser) {
  	const date = new Date()
  	const hour = date.getHours()
    return themes[Math.floor(hour / (Math.floor(24 / themes.length)))]
  }

  return ''
}

const classObject = () => {
  const args = [].slice.call(arguments)
  const result = {}
  result[theme()] = true
  args.forEach(arg => {
    result[arg] = true
  })

  return result
}

export default {
	theme,
	classObject,
}
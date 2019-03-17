const theme = () => {
  if (process.browser) {
  	const date = new Date()
  	const hour = date.getHours()
    return ['internet', 'neon', 'pink', 'waldmeister'][Math.floor(hour / 6)]
  }

  return ''
}

const classObject = (...args) => ({
  [theme()] : true,
  ...args.reduce((obj, arg) => ({ ...obj, [arg]: true }), {})
})

export default {
	theme,
	classObject,
}
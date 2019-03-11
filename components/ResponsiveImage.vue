<template>
	<picture>
		<source v-if="image.small" :srcset="image.small.url" media="(max-width: 512px)" />
		<source v-if="image.medium" :srcset="image.medium.url" media="(max-width: 1024px)" />
		<img :src="image.url" @load="$emit('load')">
	</picture>
</template>

<script>
import components from '../components'

export default {
	name: 'ResponsiveImage',
	components,

	props: {
		image: {
			type: Object,
			required: true,
		}
	},

	// mounted() {
	// 	console.log(this)
	// }
}
</script>

<style lang="scss" scoped>
img {
	display: block;
	width: 100%;
	height: auto
}
</style>
<template>
	<picture>
		<source v-if="image.small" :srcset="image.small.url" media="(max-width: 500px)" />
		<source v-if="image.medium" :srcset="image.medium.url" media="(max-width: 1000px)" />
		<img :src="image.url" @load="$emit('load')">
	</picture>
</template>

<script>
import components from '../components'

export default {
	name: 'ResponsiveSlideImage',
	components,

	props: {
		image: {
			type: Object,
			required: true,
		},
	},
}
</script>

<style lang="scss" scoped>
picture {
	display: block;
	object-fit: contain;
	width: 100%;
	height: 100%;
}

img {
	object-fit: contain;
	display: block;
	width: 100%;
	height: 100%;
}
</style>
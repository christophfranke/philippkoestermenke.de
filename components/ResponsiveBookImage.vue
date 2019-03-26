<template>
	<picture>
		<source v-if="image.small" :srcset="image.small.url" media="(max-width: 500px)" />
		<source v-if="image.medium" :srcset="image.medium.url" media="(max-width: 1000px)" />
		<img :src="image.url" @load="$emit('load')" :class="{ visible }">
	</picture>
</template>

<script>
import components from '../components'

export default {
	name: 'ResponsiveBookImage',
	components,

	props: {
		image: {
			type: Object,
			required: true,
		},
		visible: {
			type: Boolean,
			default: true
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../style/definitions';

img {
	display: block;

	max-height: 100%;
	max-width: 100vw;
	margin: auto;
	opacity: 0;
	&.visible {
		opacity: 1;
	}
}
</style>
<template>
	<picture>
		<source v-if="image.small" :srcset="image.small.url" media="(max-width: 500px)" />
		<source v-if="image.medium" :srcset="image.medium.url" media="(max-width: 1000px)" />
		<img :src="image.url" @load="$emit('load')" :class="{ visible, portrait: format.portrait, landscape: format.landscape }">
	</picture>
</template>

<script>
import components from '../components'

export default {
	name: 'ResponsiveGalleryImage',
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
		format: {
			type: Object,
			default: () => ({})
		}
	},
}
</script>

<style lang="scss" scoped>
@import '../style/definitions';

img {
	display: block;

	max-height: 100%;
	max-width: 75vw;
	border-right: border();
	opacity: 0;
	transition: opacity 0.1s 0.1s;
	&.visible {
		opacity: 1;
	}
	&.portrait {
		margin-left: auto;
		border-left: border();
	}
}
</style>
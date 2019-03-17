<template>
	<div :class="baseClass">
		<div class="cms-content" v-html="html" />
	</div>
</template>

<script>
	import PrismicDOM from 'prismic-dom'
	import Color from '../functions/color'

	export default {
		name: 'RichText',
		props: {
			content: {
				type: Array,
				required: true,
			},
		},

		data() {
			return {
				loaded: false
			}
		},

		mounted() {
			this.loaded = true
		},

		computed: {
			html() {
				return PrismicDOM.RichText.asHtml(this.content)
			},
			baseClass() {
				if (this.loaded) {
					return Color.classObject()
				} else {
					return {}
				}
			}
		},
	}
</script>

<style lang="scss">
@import '../style/definitions';

.cms-content{
	a {
		@include theme(color, primary);
		&:hover{
			color: $black;
		}
	}
	p {
		line-height: 1.35;
	}
}
</style>
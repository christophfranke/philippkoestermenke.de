<template>
	<div class="cms-content" v-html="html" />
</template>

<script>
	import PrismicDOM from 'prismic-dom'

	export default {
		name: 'RichText',
		props: {
			content: {
				type: Array,
				required: true,
			},
		},
		computed: {
			html() {
				return PrismicDOM.RichText.asHtml(this.content)
			},
		},
	}
</script>

<style lang="scss">
@import '../style/definitions';
.cms-content{
	a {
		color: $blue;
	}
	p {
		line-height: 1.35;
	}
}
</style>
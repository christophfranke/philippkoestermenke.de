<template>
	<div v-html="html" />
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
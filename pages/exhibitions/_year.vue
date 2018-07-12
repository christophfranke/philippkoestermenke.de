<template>
	<div>
		<div v-for="exhibition in exhibitions" class="line">
			<RichText :content="exhibition" />
		</div>
	</div>
</template>

<script>
import components from '../../components'

export default {
	name: 'Exhibitions',
	components,
	computed: {
		exhibitions() {
 			return this.$store.getters.exhibitions
 				.find(doc => doc.uid === this.$route.params.year).data.exhibitions
 				.map(exhibition => exhibition.exhibition)
 				.map(paragraphs => paragraphs.map(data => ({ ...data, text: `● ${data.text}`})))
		}
	}
}
</script>

<style lang="scss" scoped>
	.dot {
		margin-right: 5px;
	}
</style>
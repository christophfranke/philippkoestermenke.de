<template>
	<div class="wrapper">
		<Breadcrump :path="['Exhibitions', year]" />
		<div class="exhibitions">
			<div v-for="exhibition in exhibitions" class="line">
				<RichText :content="exhibition" />
			</div>
		</div>
		<Logo />
	</div>
</template>

<script>
import components from '../../components'

export default {
	name: 'Exhibitions',
	components,
	computed: {
		year() {
			return this.$route.params.year
		},
		exhibitions() {
 			return this.$store.getters.exhibitions
 				.find(doc => doc.uid === this.year).data.exhibitions
 				.map(exhibition => exhibition.exhibition)
 				.map(paragraphs => paragraphs.map(data => ({ ...data, text: `● ${data.text}`})))
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../style/definitions';

.dot {
	margin-right: 5px;
}
.wrapper {
	border-bottom: border();
}
.exhibitions {
	padding-top: 24px;
	padding-bottom: 24px;
}
</style>
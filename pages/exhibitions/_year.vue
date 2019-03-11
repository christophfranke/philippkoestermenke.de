<template>
	<div class="wrapper">
		<Breadcrump :path="['Exhibitions', year]" />
		<div :class="{ single: exhibitions.length === 1, exhibitions: true }" :style="style">
			<div v-for="(exhibition, index) in exhibitions" class="line">
				<RichText :content="exhibition" />
				<br v-show="index < exhibitions.length - 1">
			</div>
		</div>
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
 				.map(paragraphs => paragraphs.map(data => ({ ...data, text: `${data.text}`})))
 				// .filter((item, index) => index > 1)
		},
		style() {
			return this.$store.getters.offsetStyle
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../style/definitions';

.dot {
	margin-right: spacer(a);
}
.wrapper {
	border-bottom: border();
}
.exhibitions {
	padding-top: spacer(c);
	padding-bottom: spacer(c);
	&.single {
		padding-bottom: spacer(c) - 1px;
	}
}
</style>
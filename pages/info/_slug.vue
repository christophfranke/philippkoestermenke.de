<template>
	<div>
		<Breadcrump :path="['Info', page.title[0].text]" />
		<RichText :content="page.content" :style="style" class="info" />
	</div>
</template>

<script>
import components from '../../components'

export default {
	name: 'Info',
	components,
	computed: {
		slug() {
			return this.$route.params.slug
		},
		page() {
			return this.$store.getters.infoPage(this.slug)
		},
		style() {
			return this.$store.getters.offsetStyle
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../style/definitions';

.info {
	padding-top: spacer(c);
	padding-bottom: spacer(c);
	border-bottom: border();
	overflow-x: hidden;
}
</style>
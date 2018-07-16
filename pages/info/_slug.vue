<template>
	<div>
		<Breadcrump :path="['Info', page.title[0].text]" />
		<RichText :content="page.content" :style="style" class="info" />
		<Logo />
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
			return {
				paddingLeft: `${this.$store.getters.koesteOffset}px`,
				paddingRight: `${this.$store.getters.koesteOffset}px`
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../style/definitions';

.info {
	padding-top: 16px;
	padding-bottom: 16px;
	border-bottom: border();
}
</style>
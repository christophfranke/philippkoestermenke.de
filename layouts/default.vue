<template>
	<div>
		<Menu />
		<nuxt v-show="visible" />
	</div>
</template>

<script>
import components from '../components';

export default {
	components,
	computed: {
		visible() {
			const width = this.$store.getters.windowWidth
			return !width || width > 550 || !this.$store.getters.isMenuOpen
		}
	}
}
</script>

<style lang="scss">
	@import '../style/global'
</style>
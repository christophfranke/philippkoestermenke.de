<template>
	<img src="/philippkoestermenke.svg" class="logo" :style="style">
</template>

<script>
export default {
	name: 'Logo',
	computed: {
		style() {
			return {
				left: `${this.$store.getters.koesteOffset}px`,
				width: `${this.$store.getters.koesteWidth}px`
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	img.logo {
		height: auto;
		position: absolute;
		bottom: 24px;
		transform: scale(1.1);
	}
</style>
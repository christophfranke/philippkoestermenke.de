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
				width: `${this.$store.getters.koesteWidth}px`,
				visibility: this.$store.getters.koesteWidth ? 'visible' : 'hidden',
				display: -this.$store.getters.windowOverflow > 0.6*this.$store.getters.koesteWidth ? 'block' : 'none'
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../style/definitions';

img.logo {
	height: auto;
	position: absolute;
	bottom: spacer(c);
	transform: scale(1.1);
}
</style>
<template>
	<img src="/philippkoestermenke.svg" class="logo" :style="style">
</template>

<script>
export default {
	name: 'Logo',
	computed: {
		logoWidth() {
			if (this.$store.getters.windowWidth > 1024) {
				return this.$store.getters.windowWidth / 4
			}
			if (this.$store.getters.windowWidth > 360) {
				return this.$store.getters.windowWidth / 2
			}
			return this.$store.getters.windowWidth - 32
		},
		style() {
			const logoAspectRatio = 0.6
			return {
				left: `${this.$store.getters.contentOffset}px`,
				// width: `${this.$store.getters.koesteWidth}px`,
				visibility: this.$store.getters.koesteWidth ? 'visible' : 'hidden',
				display: -this.$store.getters.windowOverflow > logoAspectRatio * this.logoWidth ? 'block' : 'none'
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
	width: 25%;
	@include breakpoint(l) {
		width: 50%;
	}
	@include breakpoint(xs) {
		width: calc(100% - #{2*spacer(c)});
	}
}
</style>
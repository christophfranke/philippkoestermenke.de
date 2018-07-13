<template>
	<div>
		<Breadcrump :path="['Work', 'Heizkörper', piece.title[0].text]" />
		<Gallery :images="gallery" />
		<RichText :content="piece.description" style="font-size: 24px" />
	</div>
</template>

<script>
import components from '../../../components'

export default {
	name: 'HeizkoerperDetail',
	components,
	computed: {
		uid() {
			return this.$route.params.uid
		},
		piece() {
			return this.$store.getters.piece(this.uid)
		},
		gallery() {
			return this.piece.gallery.map(entry => entry.image)
		},
	},
}
</script>

<style lang="scss" scoped>

</style>
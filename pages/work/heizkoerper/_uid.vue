<template>
	<div>
		<Breadcrump :path="['Work', 'Heizkörper', piece.title[0].text]" />
		<Gallery :images="gallery" type="tiles" @load="ready = true"/>
		<RichText :content="piece.description" class="subline" style="font-size: 16px" v-if="ready" />
	</div>
</template>

<script>
import components from '../../../components'

export default {
	name: 'HeizkoerperDetail',
	components,

	data() {
		return {
			ready: false
		}
	},

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
.subline {
	margin-top: 12px;
}
</style>
<template>
	<div>
		<Breadcrump :path="['Work', 'Heizkörper', piece.title[0].text]" />
		<Gallery :images="gallery" type="tiles" @load="ready = true"/>
		<RichText :content="piece.description" class="subline" :style="sublineStyle" v-if="ready" />
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
		sublineStyle() {
			return {
				paddingLeft: `${this.$store.getters.koesteOffset}px`
			}
		}
	},
}
</script>

<style lang="scss" scoped>
.subline {
	font-size: 16px;
	margin-top: 12px;
}
</style>
<template>
	<div>
		<Breadcrump :path="['Work', 'Heizungsbuch']" />
		<Gallery :images="gallery" type="free" @load="ready = true"/>
		<RichText :content="heizungsbuch.description" class="subline" :style="sublineStyle" v-if="ready" />
	</div>
</template>

<script>
import components from '../../components'

export default {
	name: 'Heizungsbuch',
	components,

	data() {
		return {
			ready: false
		}
	},

	computed: {
		heizungsbuch() {
			return this.$store.getters.heizungsbuch
		},
		gallery() {
			return this.heizungsbuch.gallery.map(entry => entry.image)
		},
		sublineStyle() {
			return {
				paddingLeft: `${this.$store.getters.koesteOffset}px`
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.subline {
	font-size: 16px;
	margin-top: 12px;
}
</style>
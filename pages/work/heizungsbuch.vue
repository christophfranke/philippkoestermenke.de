<template>
	<div>
		<Breadcrump :path="['Work', 'Heizungsbuch']" />
		<Gallery :images="gallery" @load="ready = true"/>
		<RichText :content="heizungsbuch.description" style="font-size: 24px" v-if="ready" />
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
	}
}
</script>
<template>
	<div>
		<Breadcrump :path="['Work', 'Heizkörper', piece.title[0].text]" />
		<Gallery :images="gallery" type="tiles" @load="ready = true"/>
		<RichText :content="piece.description" :class="{ subline: true, fixed: isSublineFixed }" :style="sublineStyle" v-if="ready" />
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
				paddingLeft: `${this.$store.getters.koesteOffset}px`,
				paddingRight: `${this.$store.getters.koesteOffset}px`
			}
		},
		isSublineFixed() {
			return this.$store.getters.windowOverflow > - 45
		}
	},
}
</script>

<style lang="scss" scoped>
@import '../../../style/definitions';

.subline {
	font-size: 16px;
	padding-top: 12px;
	padding-bottom: 12px;
	&.fixed {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: $white;
		border-top: border();
	}
}
</style>
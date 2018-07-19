<template>
	<div>
		<Breadcrump :path="['Work', { name: 'Heizkörper', url: '/work/heizkoerper' }, piece.title[0].text]" />
		<Gallery :images="gallery" type="tiles" @load="ready = true"/>
		<RichText :content="piece.description" :class="{ subline: true, fixed: isSublineFixed }" :style="sublineStyle" v-if="ready" />
		<div v-show="isSublineFixed" class="sublinePlaceholder" />
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
			return this.$store.getters.offsetStyle
		},
		isSublineFixed() {
			return this.$store.getters.windowOverflow > 0
		}
	},
}
</script>

<style lang="scss" scoped>
@import '../../../style/definitions';

.subline {
	font-size: spacer(c);
	padding-top: spacer(b);
	padding-bottom: spacer(b);
	&.fixed {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: $white;
		border-top: border();
	}
}
.sublinePlaceholder {
	height: 45px;
}
</style>
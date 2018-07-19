<template>
	<div>
		<Breadcrump :path="['Work', 'Heizungsbuch']" />
		<Gallery :images="gallery" type="free" @load="ready = true"/>
		<RichText :content="heizungsbuch.description" :class="{ subline: true, fixed: isSublineFixed }" :style="sublineStyle" v-if="ready" />
		<div v-show="isSublineFixed" class="sublinePlaceholder" />
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
			return this.$store.getters.offsetStyle
		},
		isSublineFixed() {
			return this.$store.getters.windowOverflow > 0
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../style/definitions';

.subline {
	font-size: .66rem;
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
<template>
	<div>
		<Breadcrump :path="[{ name: 'Work', menu: 'work' }, 'Heizungsbuch']" />
		<div v-if="['xs', 's'].includes(breakpoint)">
			<no-ssr placeholder="loading...">
				<Carousel :perPage="1">
					<Slide v-for="(entry, index) in heizungsbuch.gallery" :key="index">
						<ResponsiveImage :image="entry.image" />
					</Slide>
				</Carousel>
			</no-ssr>
		</div>
		<div v-else>
			<Gallery :images="gallery" type="free" @load="ready = true"/>
			<RichText :content="heizungsbuch.description" :class="{ subline: true, fixed: isSublineFixed }" :style="sublineStyle" v-if="ready" />
			<div v-show="isSublineFixed" class="sublinePlaceholder" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
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
		...mapGetters(['breakpoint']),
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
	font-size: 16px;
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
img {
	width: 100%;
	height: auto;
}
.sublinePlaceholder {
	height: 45px;
}
</style>
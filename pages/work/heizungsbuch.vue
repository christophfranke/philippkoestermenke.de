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
			<div class="page">
				<ResponsiveBookImage :image="currentImage" :visible="visible" @load="visible=true" />
				<div class="overlay prev" @click="prevImage" v-if="visible && galleryIndex > 0"></div>
				<div class="overlay next" @click="nextImage" v-if="visible && galleryIndex + 1 < gallery.length"></div>
				<RichText :content="heizungsbuch.description" :class="{ subline: true }" :style="sublineStyle" v-if="visible" />
			</div>
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
			visible: false,
			galleryIndex: 0,
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
		currentImage() {
			return this.gallery[this.galleryIndex]
		},
		sublineStyle() {
			return this.$store.getters.offsetStyle
		},
	},

	methods: {
		nextImage() {
			this.visible = false
			this.galleryIndex += 1
		},
		prevImage() {
			this.visible = false
			this.galleryIndex -= 1
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../style/definitions';

.page {
	height: calc(100vh - 175px);
	position: relative;
}
.subline {
	font-size: 16px;
	padding-top: spacer(b);
	padding-bottom: spacer(b);
	border-top: border();
}
img {
	width: 100%;
	height: auto;
}
.sublinePlaceholder {
	height: 45px;
}
.overlay {
	position: absolute;
	height: calc(100vh - 175px);
	width: 50vw;	
}

.prev {
	left: 0;
	top: 0;
	cursor: url(/arrow-left.png), auto;
}
.next {
	left: 50vw;
	top: 0;
	cursor: url(/arrow-right.png), auto;
}

</style>
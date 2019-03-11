<template>
	<div>
		<Breadcrump :path="[{ name: 'Work', menu: 'work' }, { name: 'Heizkörper', url: '/work/heizkoerper' }, piece.title[0].text]" />
		<div :class="{ image: true, portrait: format.portrait, landscape: format.landscape }">
			<ResponsiveGalleryImage :image="currentImage" :visible="visible" @load="visible=true" :format="format" />
			<RichText :content="piece.description" :class="{ subline: true, visible: visible, selected: format.landscape }" />
			<div class="overlay prev" @click="prevImage" v-if="visible && galleryIndex > 0"></div>
			<div class="overlay next" @click="nextImage" v-if="visible && galleryIndex + 1 < gallery.length"></div>
		</div>
		<RichText :content="piece.description" :class="{ subline: true, visible: visible, selected: format.portrait }" />
	</div>
</template>

<script>
import components from '../../../components'

export default {
	name: 'HeizkoerperDetail',
	components,

	data() {
		return {
			visible: false,
			galleryIndex: 0,
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
		},
		currentImage() {
			return this.gallery[this.galleryIndex]
		},
		format() {
			return {
				landscape: this.currentImage.dimensions.width > this.currentImage.dimensions.height,
				portrait: this.currentImage.dimensions.width <= this.currentImage.dimensions.height,
			} 
		}
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
@import '../../../style/definitions';

.image {
	height: calc(100vh - 175px);
	width: auto;
	position: relative;
	&.portrait {
		width: 66vw;
	}
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

.subline {
	font-size: spacer(c);
	padding-top: spacer(b);
	padding-bottom: spacer(b);
	padding-left: spacer(b);
	border-top: border();
	color: $white;
	display: none;
	&.visible {
		color: $black;
	}
	&.selected {
		display: block;
	}
}
</style>
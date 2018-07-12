<template>
	<div>
		<Breadcrump :path="['Work', 'Heizkörper', piece.title[0].text]" />
		<div class="gallery">
			<img :src="currentImage.url" :class="currentImageClass" @load="onImageLoad">
			<div :class="{ next: true, show: hasNextImage }"><a @click="nextImage">-&gt;</a></div>
		</div>
		<RichText :content="piece.description" style="font-size: 24px" />
	</div>
</template>

<script>
import components from '../../../components'

export default {
	name: 'HeizkoerperDetail',
	data() {
		return {
			currentImageIndex: 0,
			imagesLoaded: false,
		};
	},
	components,
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
		currentImageClass() {
			const aspectRatio = this.currentImage.dimensions.width / this.currentImage.dimensions.height
			return {
				wide: Math.round(aspectRatio) > 1,
				square: Math.round(aspectRatio) <= 1,
				visible: this.imagesLoaded
			}
		},
		hasNextImage() {
			return this.gallery.length > 1;
		},
		currentImage() {
			return this.gallery[this.currentImageIndex]
		}
	},

	methods: {
		nextImage() {
			this.currentImageIndex = (this.currentImageIndex + 1) % this.gallery.length
			this.imagesLoaded = false
		},
		onImageLoad() {
			this.imagesLoaded = true
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../../../style/definitions';

.gallery {
	display: grid;
	grid-template-columns: 25% 25% 25% 25%;
	border-bottom: border();
	
	.placeholder {
		display: none;
		&.show {
			display: block;
		}
	}
	img {
		width: 100%;
		height: auto;
		visibility: hidden;
		&.visible {
			visibility: visible;
		}
		&.wide {
			grid-column-start: 1;
			grid-column-end: 4;
		}
		&.square {
			grid-column-start: 2;
			grid-column-end: 4;
			border-left: border();
		}
	}
	.next {
		border-left: border();
		grid-column-start: 4;
		grid-column-end: 4;
		text-align: center;
		align-self: stretch;
		display: flex;
		align-items: center;
		justify-content: center;
		a {
			cursor: pointer;
			display: none;
		}
		&.show a {
			display: inline;
		}
	}
}
</style>
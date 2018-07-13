<template>
	<div class="gallery">
		<img :src="currentImage.url" :class="currentImageClass" @load="onImageLoad" :style="imageStyle" ref="image">
		<div :class="{ next: true, show: hasNextImage, disabled: !imagesLoaded }"><a @click="nextImage">-&gt;</a></div>
	</div>
</template>

<script>
export default {
	name: 'Gallery',
	props: {
		images: {
			type: Array,
			required: true,
		}
	},

	data() {
		return {
			currentImageIndex: 0,
			imagesLoaded: false,
			currentWidth: 0,
			currentHeight: 0,
			currentImageClass: {},
		};
	},

	computed: {
		hasNextImage() {
			return this.images.length > 1;
		},
		currentImage() {
			return this.images[this.currentImageIndex]
		},
		imageStyle() {
			if (!this.imagesLoaded) {
				return {
					width: `${this.currentWidth}px`,
					height: `${this.currentHeight}px`,
				}
			}
			return {}
		}
	},

	methods: {
		updateDimensions() {
			const rect = this.$refs.image.getBoundingClientRect()
			this.currentWidth = rect.right - rect.left
			this.currentHeight = rect.bottom - rect.top
		},
		updateImageClass() {
			const aspectRatio = this.currentImage.dimensions.width / this.currentImage.dimensions.height
			this.currentImageClass = {
				wide: Math.round(aspectRatio) > 1,
				square: Math.round(aspectRatio) <= 1,
				visible: true
			}
		},
		nextImage() {
			if (this.imagesLoaded) {			
				this.imagesLoaded = false
				this.updateDimensions()
				this.updateImageClass()
				this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length
			}
		},
		onImageLoad() {
			this.imagesLoaded = true
			this.updateImageClass()
			this.$emit('load')
		},
	}
}
</script>

<style lang="scss" scoped>
@import '../style/definitions';

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
		&.disabled a {
			display: none;
		}
	}
}
</style>
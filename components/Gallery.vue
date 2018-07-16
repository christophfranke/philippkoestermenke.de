<template>
	<div :class="{ gallery: true, [type]: true }">
		<img :src="currentImage.url" :class="currentImageClass" @load="onImageLoad" :style="imageStyle" ref="image">
		<div :class="{ next: true, show: hasNextImage, disabled: !imagesLoaded }"><a @click="nextImage">→</a></div>
	</div>
</template>

<script>
export default {
	name: 'Gallery',
	props: {
		images: {
			type: Array,
			required: true,
		},
		type: {
			type: String,
			default: 'tiles'
		},
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
	&.tiles {
		grid-template-columns: 25% 50% 25%;
	}
	&.free {
		grid-template-columns: 376fr 292fr 585fr 292fr 116fr 259fr;
	}
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
			grid-column-end: 3;
		}
		&.square {
			grid-column-start: 2;
			grid-column-end: 3;
		}
	}
	.next {
		align-self: stretch;
		display: flex;
		align-items: center;
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

	&.tiles {
		.next {
			grid-column-start: 3;
			grid-column-end: 3;
			border-left: border();
			justify-content: center;
		}

		img.square {
			border-left: border();
		}
	}

	&.free {
		padding-top: 54px;
		padding-bottom: 56px;

		img.square {
			grid-column-start: 3;
			grid-column-end: 4;
		}

		img.wide {
			grid-column-start: 2;
			grid-column-end: 5;
		}

		.next {
			grid-column-start: 6;
			grid-column-end: 6;
		}
	}
}
</style>
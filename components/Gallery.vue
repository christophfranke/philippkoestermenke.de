<template>
	<div :class="{ gallery: true, [type]: true }">
		<div :class="currentImageClass" :style="imageStyle" ref="image">
			<ResponsiveImage :image="currentImage" @load="onImageLoad" />
		</div>
		<div :class="{ next: true, show: hasNextImage, disabled: !imagesLoaded, arrowIsFixed: arrowIsFixed }"><a @click="nextImage">→</a></div>
	</div>
</template>

<script>
import components from '../components'

export default {
	name: 'Gallery',
	components,

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
				if(this.currentWidth && this.currentHeight) {				
					return {
						width: `${this.currentWidth}px`,
						height: `${this.currentHeight}px`,
					}
				}
				return {
					width: '50vw',
					height: '50vw'
				}
			}
			return {}
		},
		arrowIsFixed() {
			return this.$store.getters.windowOverflow > 0
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
			this.$nextTick(() => {
				this.$store.dispatch('updateWindowOverflow')
			})
		},
	}
}
</script>

<style lang="scss" scoped>
@import '../style/definitions';

.gallery {
	display: grid;
	position: relative;
	&.tiles {
		grid-template-columns: 25% 50% 25%;
		@include breakpoint(s) {
			grid-template-columns: 215fr 108fr;
		}
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
			transform: translateX(1px);
		}
		&.square {
			grid-column-start: 2;
			grid-column-end: 3;
			@include breakpoint(s) {
				border-right: border();
			}
		}
	}
	.next {
		align-self: stretch;
		display: flex;
		align-items: center;
		@include breakpoint(s) {
			position: absolute;
	    top: 50%;
	    right: 50%;
		}
		&.arrowIsFixed a {			
			position: fixed;
			right: 12.5%;
		}
		a {
			cursor: pointer;
			display: none;
		}
		&.show a {
			display: inline;
			top: 50%;
			transform: translateX(50%);
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
			@include breakpoint(s) {
		    border-left: none;
		    grid-column-start: 2;
		    grid-column-end: 2;
			}
			justify-content: center;
		}

		img.square {
			border-left: border();
			@include breakpoint(s) {
				grid-column-start: 1;
				grid-column-end: 2;
			}
		}
		img.wide {
			@include breakpoint(s) {
				grid-column-start: 1;
				grid-column-end: 3;
			}
		}
	}

	&.free {
		padding-top: spacer(e);
		padding-bottom: spacer(e);
		@include breakpoint(m) {
			padding-top: spacer(d);
			padding-bottom: spacer(d);
		}
		@include breakpoint(s) {
			padding-top: 0;
			padding-bottom: 0;
		}

		img.square {
			grid-column-start: 3;
			grid-column-end: 4;
			@include breakpoint(s) {			
				grid-column-start: 1;
				grid-column-end: 7;
			}
		}

		img.wide {
			grid-column-start: 2;
			grid-column-end: 5;
			@include breakpoint(s){
				grid-column-start: 1;
				grid-column-end: 7;
			}
		}

		.next {
			grid-column-start: 6;
			grid-column-end: 6;
		}
	}
}
</style>
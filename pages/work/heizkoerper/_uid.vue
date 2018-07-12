<template>
	<div>
		<Breadcrump :path="['Work', 'Heizkörper', piece.title[0].text]" />
		<div class="gallery">
			<div :class="{ placeholder: true, show: currentImageClass.square }" />
			<img :src="currentImage.url" :class="currentImageClass">
			<div :class="{ next: true, show: hasNextImage }"><a @click="nextImage">-&gt;</a></div>
		</div>
		
	</div>
</template>

<script>
import components from '../../../components'

export default {
	name: 'HeizkoerperDetail',
	data() {
		return {
			currentImageIndex: 0,
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
			}
		},
		hasNextImage() {
			return this.gallery.length > 1;
		},
		currentImage() {
			return this.gallery[this.currentImageIndex]
		}
	},

	mounted() {
		this.preloadImages()
	},

	methods: {
		nextImage() {
			this.currentImageIndex = (this.currentImageIndex + 1) % this.gallery.length
		},
		preloadImages() {
			if (window) {
				this.gallery.forEach(image => {
					new Image().src = image.url;
				})
			}
		}
	},
}
</script>

<style lang="scss" scoped>
@import '../../../style/definitions';

.gallery {
	display: flex;
	align-items: center;
	.placeholder {
		width: 25%;
		border-right: border();
		display: none;
		&.show {
			display: block;
		}
	}
	img {
		border-right: border();
		border-bottom: border();
		&.wide {
			width: 75%;
		}
		&.square {
			width: 50%;
			border-left: border();
		}
	}
	.next {
		width: 25%;
		text-align: center;
		align-self: stretch;
		display: flex;
		align-items: center;
		justify-content: center;
		a {
			display: none;
		}
		&.show a {
			display: inline;
		}
	}
}
</style>
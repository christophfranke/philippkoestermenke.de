<template>
	<div>
		<Breadcrump :path="[{ name: 'Work', menu: 'work' }, 'Heizungsbuch']" />
		<div v-if="mobileMenu">
			<no-ssr placeholder="loading...">
				<Carousel :perPage="1" :paginationEnabled="false">
					<Slide v-for="(entry, index) in heizungsbuch.gallery" :key="index" class="slide">
						<ResponsiveSlideImage :image="entry.image" />
						<span class="arrow left" v-if="index + 1 === heizungsbuch.gallery.length">←</span>
						<span class="arrow right" v-if="index === 0">→</span>
					</Slide>
				</Carousel>
			</no-ssr>
		</div>
		<div v-else>
			<div class="page">
				<ResponsiveBookImage :image="currentImage" :visible="visible" @load="visible=true" />
				<div class="overlay prev" @click="prevImage" v-if="visible && galleryIndex > 0"></div>
				<div class="overlay next" @click="nextImage" v-if="visible && galleryIndex + 1 < gallery.length"></div>
				<RichText :content="heizungsbuch.description" :class="{ subline: true, visible }" :style="sublineStyle" />
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
		...mapGetters(['mobileMenu']),
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
	height: calc(100vh - 257px);
	position: relative;
}
.slide {
	position: relative;
	height: calc(100vh - 210px);
	@include breakpoint(s) {
		height: calc(100vh - 257px);
	}
}
.subline {
	font-size: 16px;
	padding-top: spacer(b);
	padding-bottom: spacer(b);
	border-top: border();
	opacity: 0;
	transition: opacity 0.1s 0.1s;
	&.visible {
		opacity: 1;
	}
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
	height: calc(100vh - 257px);
	width: 50vw;	
}
.arrow {
	position: absolute;
	bottom: 10px;
	font-size: 1rem;
	&.left {
		left: 10px;
	}
	&.right {
		right: 10px;
	}
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
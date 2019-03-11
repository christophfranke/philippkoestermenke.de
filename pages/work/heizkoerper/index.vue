<template>
	<div>
		<Breadcrump :path="[{ name: 'Work', menu: 'work' }, 'Heizkörper']" />
		<div v-if="['xs', 's'].includes(breakpoint)">
			<no-ssr>
				<div>
					<Carousel
						v-for="(hk, index) in heizkoerper"
						:key="index"
						:perPage="1"
						:paginationEnabled="false"
						class="slideshow">
						<Slide>
							<div class="slide">
								<ResponsiveSlideImage :image="hk.data.thumb" />
								<span class="arrow right">→</span>
							</div>
						</Slide>
						<Slide v-for="(entry, index) in hk.data.gallery" :key="index">
							<div class="slide">
								<ResponsiveSlideImage :image="entry.image" />
								<span class="arrow left" v-if="index + 1 === hk.data.gallery.length">←</span>
							</div>
						</Slide>
					</Carousel>
				</div>
			</no-ssr>
		</div>
		<div class="work" v-else>
			<nuxt-link
				v-for="(hk, index) in heizkoerper"
				:to="`/work/heizkoerper/${hk.uid}`"
				:key="hk.uid"
				:class="{ hasLeftBorder: index % numTilesHorizontal, hasBottomBorder: true, link: true }">
				<img :src="hk.data.thumb.url" @load="onImageLoad(hk.uid)" :class="imageClass[hk.uid]">
			</nuxt-link>
			<div :class="{ hasLeftBorder: heizkoerper.length % numTilesHorizontal }" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import components from '../../../components'

export default {
	name: 'HeizkoerperOverview',
	components,

	data() {
		return {
			loaded: {}
		}
	},

	computed: {
		...mapGetters(['breakpoint']),
		heizkoerper() {
			return this.$store.getters.heizkoerper
		},
		numTilesHorizontal() {
			const w = this.$store.getters.windowWidth
			const all = this.$store.getters.heizkoerper.length // we dont have a window width yet, so we assume all tiles next to each other
			return w ? w > 1024 ? 3 : w > 550 ? 2 : 1 : (all + 1)
		},
		imageClass() {
			return Object.values(this.heizkoerper).reduce((obj, { uid }) => ({ ...obj, [uid]: {
				preview: !this.loaded[uid],
				loaded: this.loaded[uid]
			}}))
		}
	},
	methods: {
		onImageLoad(uid) {
			this.$set(this.loaded, uid, true)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../../style/definitions';

.work {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	@include breakpoint(l) {
		grid-template-columns: 1fr 1fr;
	}
	@include breakpoint(s) {
		grid-template-columns: 1fr;
	}
}
img {
	display: block;
	width: 100%;
	&.preview {
		min-height: 25vw;
	}
}

.slideshow {
	border-bottom: 2px solid black;
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

.slide {
	width: 100vw;
	height: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
}

.hasBottomBorder {
	border-bottom: border();
}
.hasLeftBorder {	
	border-left: border();
}
.link {
	display: block;
	position: relative;
}
</style>
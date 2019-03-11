<template>
	<div>
		<Breadcrump :path="[{ name: 'Work', menu: 'work' }, 'Heizkörper']" />
		<div class="work">
			<nuxt-link
				v-for="(hk, index) in heizkoerper"
				:to="`/work/heizkoerper/${hk.uid}`"
				:key="hk.uid"
				:class="{ hasLeftBorder: index % numTilesHorizontal, hasBottomBorder: true, link: true }">
				<img :src="hk.data.thumb.url" @load="onImageLoad(hk.uid)" :class="imageClass[hk.uid]">
				<span class="number">{{ index + 1 }}</span>
			</nuxt-link>
			<div :class="{ hasLeftBorder: heizkoerper.length % numTilesHorizontal }" />
		</div>
	</div>
</template>

<script>
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
.number {
	position: absolute;
	bottom: spacer(c);
	right: spacer(c);
	font-size: 1rem;
	@include breakpoint(s) {
		font-size: 15px;
	}
	:hover & {
		color: $black;
	}
}
</style>
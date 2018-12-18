<template>
	<div>
		<Breadcrump :path="['Work', 'Heizkörper']" />
		<div class="work">
			<nuxt-link
				v-for="(hk, index) in heizkoerper"
				:to="`/work/heizkoerper/${hk.uid}`"
				:key="hk.uid"
				:class="{ hasLeftBorder: index % 4, hasBottomBorder: true, link: true }">
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
			return 4
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
			console.log('loaded', uid)
			this.$set(this.loaded, uid, true)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../../style/definitions';

.work {
	display: grid;
	grid-template-columns: 25% 25% 25% 25%;
	@include breakpoint(l) {
		grid-template-columns: 50% 50%;
	}
	@include breakpoint(s) {
		grid-template-columns: 100%;
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
	font-size: .66rem;
	:hover & {
		color: $black;
	}
}
</style>
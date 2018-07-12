<template>
	<div>
		<Breadcrump :path="['Work', 'Heizkörper']" />
		<div class="work">
			<nuxt-link
				v-for="(hk, index) in heizkoerper"
				:to="`/work/heizkoerper/${hk.uid}`"
				:key="hk.uid"
				:class="{ hasLeftBorder: index % 4, hasBottomBorder: true, link: true }">
				<img :src="hk.data.thumb.url">
				<span class="number">{{ index + 1 }}</span>
			</nuxt-link>
			<div :class="{ hasLeftBorder: heizkoerper.length % 4 }" />
		</div>
	</div>
</template>

<script>
import components from '../../components'

export default {
	name: 'Heizkoerper',
	components,
	computed: {
		heizkoerper() {
			return this.$store.getters.heizkoerper
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../style/definitions';

.work {
	display: grid;
	grid-template-columns: 25% 25% 25% 25%;
}
img {
	display: block;
	width: 100%;
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
	bottom: 30px;
	right: 30px;
	font-size: 24px;
	:hover & {
		color: $black;
	}
}
</style>
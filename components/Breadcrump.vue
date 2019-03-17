<template>
	<div class="wrapper">
		<div class="offset" :style="style">
			<span v-for="crump in parents">
				<nuxt-link :to="crump.url" v-if="crump.url" :class="linkClass">{{ crump.name }}</nuxt-link>
				<span v-if="!crump.url && crump.menu" @click.stop="openMobileMenu(crump.menu)" :class="clickableClass">{{ crump.name }}</span>
				<span v-if="!crump.url && !crump.menu">{{ crump.name }}</span> →
			</span>
			<span :class="lastClass">
				{{ current.name }}
			</span>
		</div>
	</div>
</template>

<script>
import Color from '../functions/color'
import { mapGetters } from 'vuex'

export default {
	name: 'Breadcrump',
	props: {
		path: {
			type: Array,
			required: true,
		},
	},
	computed: {
		...mapGetters(['mobileMenu']),
		parents() {
			return this.path.slice(0, this.path.length - 1)
				.filter((item, index) => this.$store.getters.windowWidth > 550 || index >= this.path.length - 2)
				.map(this.expandItem)
		},
		current() {
			return this.expandItem(this.path[this.path.length - 1])
		},
		style() {
			return this.$store.getters.offsetStyle
		},
		linkClass() {
			return Color.classObject('link')
		},
		clickableClass() {
			return this.mobileMenu ? Color.classObject('clickable') : Color.classObject()
		},
		lastClass() {
			return Color.classObject('last')
		}
	},

	methods: {
		openMobileMenu(menu) {
			this.$store.dispatch('openMobileMenu', menu)
		},
		expandItem(item) {
			if (typeof item === 'string') {
				return {
					name: item,
					url: null
				}
			} else {
				return item
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../style/definitions';
.last {
	@include theme(color, secondary);
}
span {
	font-size: 1em;
}

.link, .clickable {
	cursor: pointer;
	@include theme(color, primary);
	&:hover {
		color: $black;
	}
}
.wrapper {
	padding-top: spacer(c);
	padding-bottom: spacer(c);
	border-bottom: border();
	white-space: nowrap;
	@include breakpoint(s) {
		text-align: center;
	}
}
</style>
<template>
	<div class="wrapper" :style="style">
		<span v-for="crump in parents">
			<nuxt-link :to="crump.url" v-if="crump.url">{{ crump.name }}</nuxt-link>
			<span v-if="!crump.url">{{ crump.name }}</span> →
		</span>
		<span class="last">
			{{ current.name }}
		</span>
	</div>
</template>

<script>
export default {
	name: 'Breadcrump',
	props: {
		path: {
			type: Array,
			required: true,
		},
	},
	computed: {
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
		}
	},

	methods: {
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
	color: $blue;
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
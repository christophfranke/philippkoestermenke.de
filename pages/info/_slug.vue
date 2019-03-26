<template>
	<div>
		<Breadcrump :path="[{ name: 'Info', menu: 'info' }, page.title[0].text]" />
		<!-- <RichText :content="page.content" :style="style" class="info" /> -->
		<div :style="style" :class="infoClass">
			<div v-for="(pair, index) in page.table" class="pair">
				<div v-html="pairHtml(pair.key, pair.value)" />
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import PrismicDOM from 'prismic-dom'
import Color from '../../functions/color'
import components from '../../components'

export default {
	name: 'Info',
	components,

	data() {
		return {
			loaded: false
		}
	},

	computed: {
		...mapGetters(['breakpoint']),
		slug() {
			return this.$route.params.slug
		},
		page() {
			return this.$store.getters.infoPage(this.slug)
		},
		style() {
			return this.$store.getters.offsetStyle
		},
		infoClass() {
			if (this.loaded) {
				return Color.classObject('info')
			} else {
				return {
					info: true
				}
			}
		}
	},

	methods: {
		pairHtml(key, value) {
			const keyText = PrismicDOM.RichText.asText(key)
			const valueText = PrismicDOM.RichText.asHtml(value).substring('<p>'.length)
			const connector = ['xs', 's'].includes(this.breakpoint) ? '<br>' : ' → '
			return `<p>${keyText}${connector}${valueText}`
		}
	},

	mounted() {
		this.loaded = true
	}
}
</script>

<style lang="scss" scoped>
@import '../../style/definitions';

.info {
	padding-top: spacer(c);
	padding-bottom: spacer(c);
	border-bottom: border();
	overflow-x: hidden;
}

.pair:not(:last-child) {
	margin-bottom: 24px;
}

.info {
	a {
		@include theme(color, primary);
		&:hover{
			color: $black;
		}
	}
}

</style>
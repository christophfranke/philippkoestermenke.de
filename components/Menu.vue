<template>
	<ul :class="ulClass">
		<li class="home"><nuxt-link to="/"><span id="koeste">Philipp&nbsp;Köstermenke</span></nuxt-link></li>
		<li
			v-if="mobile"
			:class="{ item: true, open: isOpen('mobile') }"
			@click.stop.prevent="toggleMobileMenu">
			Menu
			<ul class="sub mostRight">
				<li :class="{ item: true, open: isOpen('exhibition') }"
					@click.stop.prevent="close(); open('exhibition', 'mobile')">
					Exhibitions
					<ul class="sub mostRight">
						<li v-for="exhibition in exhibitions" @click.stop="close">
							<nuxt-link :to="`/exhibitions/${exhibition.uid}`">{{ exhibition.uid }}</nuxt-link>
						</li>
					</ul>
				</li>
				<li :class="{ item: true, open: isOpen('work') }"
					@click.stop.prevent="close(); open('work', 'mobile')">
					Work
					<ul class="sub mostRight">
						<li @click.stop="close"><nuxt-link to="/work/heizkoerper">Heizkörper</nuxt-link></li>
						<li @click.stop="close"><nuxt-link to="/work/heizungsbuch">Heizungsbuch</nuxt-link></li>
					</ul>
				</li>
				<li :class="{ item: true, open: isOpen('info') }"
					@click.stop.prevent="close(); open('info', 'mobile')">
					Info
					<ul class="sub mostRight">
						<li v-for="info in infoPages" @click.stop="close">
							<nuxt-link :to="`/info/${info.uid}`">{{ info.data.title[0].text }}</nuxt-link>
						</li>
					</ul>
				</li>
			</ul>
		</li>
		<li
			v-if="!mobile"
			:class="{ item: true, open: isOpen('exhibition') }"
			@click.stop
			@mouseover.stop.prevent="open('exhibition')"
			@mouseout.stop.prevent="close">
			Exhibitions
			<ul class="sub">
				<li v-for="exhibition in exhibitions" @click="close">
					<nuxt-link :to="`/exhibitions/${exhibition.uid}`">{{ exhibition.uid }}</nuxt-link>
				</li>
			</ul>
		</li>
		<li
			v-if="!mobile"
			:class="{ item: true, open: isOpen('work') }"
			@click.stop
			@mouseover.stop.prevent="open('work')"
			@mouseout.stop.prevent="close">
			Work
			<ul class="sub">
				<li @click="close"><nuxt-link to="/work/heizkoerper">Heizkörper</nuxt-link></li>
				<li @click="close"><nuxt-link to="/work/heizungsbuch">Heizungsbuch</nuxt-link></li>
			</ul>
		</li>
		<li
			v-if="!mobile"
			:class="{ item: true, open: isOpen('info') }"
			@click.stop
			@mouseover.stop.prevent="open('info')"
			@mouseout.stop.prevent="close">
			Info
			<ul class="sub mostRight">
				<li v-for="info in infoPages" @click="close">
					<nuxt-link :to="`/info/${info.uid}`">{{ info.data.title[0].text }}</nuxt-link>
				</li>
			</ul>
		</li>
	</ul>
</template>

<script>
import Color from '../functions/color'
import { mapGetters } from 'vuex'

export default {
 	name: 'Menu',

 	data() {
 		return {
 			openSubs: {},
 		};
 	},

 	computed: {
 		...mapGetters({
 			mobile: 'mobileMenu'
 		}),
 		exhibitions() {
 			return this.$store.getters.exhibitions.sort((a, b) => parseInt(b.uid, 10) - parseInt(a.uid, 10))
 		},
 		infoPages() {
 			return this.$store.getters.infoPages
 		},
 		ulClass() {
 			return this.mobile ? Color.classObject('mobile') : Color.classObject()
 		}
 	},

 	mounted() {
 		if (process.browser) {
 			window.addEventListener('click', () => {
 				this.close();
 			})

			this.$store.dispatch('registerMenu', this)
 		}
 	},

 	methods: {
 		open(...args) {
 			args.forEach((name) => {
	 			this.$set(this.openSubs, name, true)
 			})
 			this.$store.commit('updateMenuState', true)
 		},
 		close() {
 			Object.keys(this.openSubs).forEach((name) => {
	 			this.$set(this.openSubs, name, false)
 			})
			this.$store.commit('updateMenuState', false)
 			this.$nextTick(() => {
 				this.$store.dispatch('updateWindowOverflow')
 			})
 		},
 		isOpen(name) {
 			return !!this.openSubs[name]
 		},
 		toggleMobileMenu() {
 			const wasOpen = this.isOpen('mobile')
 			this.close()
 			if (!wasOpen)
	 			this.open('mobile')
 		}
 	}
}
</script>

<style lang="scss" scoped>
@import '../style/colors';
@import '../style/definitions';


ul {
	display: grid;
	grid-template-columns: 25% 25% 25% 25%;
	&.mobile {
		grid-template-columns: 50% 50%;
		@include breakpoint(s) {	
			grid-template-columns: 100%;
		}
	}
	justify-content: space-between;
	margin: 0;
	padding: 0;
	&.sub {
		position: absolute;
		z-index: 10;
		left: - map-get($border, width);
		right: - map-get($border, width);
		display: none;
	}
}
li {
	padding-top: spacer(c);
	padding-bottom: spacer(c);
	text-align: center;
	display: block;
	background-color: $white;
	border-bottom: border();
	a {
		display: block;
		padding-top: spacer(c);
		padding-bottom: spacer(c);
		margin-top: - spacer(c);
		margin-bottom: - spacer(c);
	}
	&.item {
		position: relative;
		border-left: border();
		@include breakpoint(s) {
			border-left: none;
		}
	}
	&:hover {
		@include theme(color, primary);
	}
	&.open > .sub {
		margin-top: spacer(c) + map-get($border, width);
		border: none;
		color: $black;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		li {
			border-left: border();
			@include breakpoint(s) {
				border-left: none;
			}
		}
		border-right: border();
		&.mostRight {
			border-right: none;
		}
		li {
			border-bottom: border();
		}
	}
}
</style>
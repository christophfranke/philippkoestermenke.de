<template>
	<ul :class="{ mobile: mobile }">
		<li class="home"><nuxt-link to="/">Philipp&nbsp;Köstermenke</nuxt-link></li>
		<li
			v-if="mobile"
			:class="{ item: true, open: isOpen('mobile') }"
			@mouseover.stop.prevent="open('mobile')"
			@mouseout.stop.prevent="close('mobile')">
			Menu
			<ul class="sub">
				<li :class="{ item: true, open: isOpen('exhibition') }"
					@mouseover.stop.prevent="open('exhibition', 'mobile')"
					@mouseout.stop.prevent="close('exhibition', 'mobile')">
					Exhibitions
					<ul class="sub">
						<li v-for="exhibition in exhibitions" @click="close('exhibition', 'mobile')">
							<nuxt-link :to="`/exhibitions/${exhibition.uid}`">{{ exhibition.uid }}</nuxt-link>
						</li>
					</ul>
				</li>
				<li :class="{ item: true, open: isOpen('work') }"
					@mouseover.stop.prevent="open('work', 'mobile')"
					@mouseout.stop.prevent="close('work', 'mobile')">
					Work
					<ul class="sub">
						<li @click="close('work', 'mobile')"><nuxt-link to="/work/heizkoerper">Heizkörper</nuxt-link></li>
						<li @click="close('work', 'mobile')"><nuxt-link to="/work/heizungsbuch">Heizungsbuch</nuxt-link></li>
					</ul>
				</li>
				<li :class="{ item: true, open: isOpen('info') }"
					@mouseover.stop.prevent="open('info', 'mobile')"
					@mouseout.stop.prevent="close('info', 'mobile')">
					Info
					<ul class="sub">
						<li v-for="info in infoPages" @click="close('info', 'mobile')">
							<nuxt-link :to="`/info/${info.uid}`">{{ info.data.title[0].text }}</nuxt-link>
						</li>
					</ul>
				</li>
			</ul>
		</li>
		<li
			v-if="!mobile"
			:class="{ item: true, open: isOpen('exhibition') }"
			@mouseover.stop.prevent="open('exhibition')"
			@mouseout.stop.prevent="close('exhibition')">
			Exhibitions
			<ul class="sub">
				<li v-for="exhibition in exhibitions" @click="close('exhibition')">
					<nuxt-link :to="`/exhibitions/${exhibition.uid}`">{{ exhibition.uid }}</nuxt-link>
				</li>
			</ul>
		</li>
		<li
			v-if="!mobile"
			:class="{ item: true, open: isOpen('work') }"
			@mouseover.stop.prevent="open('work')"
			@mouseout.stop.prevent="close('work')">
			Work
			<ul class="sub">
				<li @click="close('work')"><nuxt-link to="/work/heizkoerper">Heizkörper</nuxt-link></li>
				<li @click="close('work')"><nuxt-link to="/work/heizungsbuch">Heizungsbuch</nuxt-link></li>
			</ul>
		</li>
		<li
			v-if="!mobile"
			:class="{ item: true, open: isOpen('info') }"
			@mouseover.stop.prevent="open('info')"
			@mouseout.stop.prevent="close('info')">
			Info
			<ul class="sub">
				<li v-for="info in infoPages" @click="close('info')">
					<nuxt-link :to="`/info/${info.uid}`">{{ info.data.title[0].text }}</nuxt-link>
				</li>
			</ul>
		</li>
	</ul>
</template>

<script>
 export default {
 	name: 'Menu',

 	data() {
 		return {
 			openSubs: {},
 			windowWidth: null
 		};
 	},

 	computed: {
 		exhibitions() {
 			return this.$store.getters.exhibitions.sort((a, b) => parseInt(b.uid, 10) - parseInt(a.uid, 10))
 		},
 		infoPages() {
 			return this.$store.getters.infoPages
 		},
 		mobile() {
 			return this.windowWidth && this.windowWidth <= 1024
 		},
 	},

 	mounted() {
 		this.calculateWidth()
 		this.listenToResize()
 	},

 	methods: {
 		open(...args) {
 			args.forEach((name) => {
	 			this.$set(this.openSubs, name, true)
 			})
 		},
 		close(...args) {
 			args.forEach((name) => {
	 			this.$set(this.openSubs, name, false)
 			})
 		},
 		isOpen(name) {
 			return !!this.openSubs[name]
 		},
 		calculateWidth() {
 			if (window) {
	 			this.windowWidth = window.innerWidth
 			}
 		},
 		listenToResize() {
 			if (window) {
 				window.addEventListener('resize', this.calculateWidth)
 			}
 		}
 	}
}
</script>

<style lang="scss" scoped>
@import '../style/definitions';


ul {
	display: grid;
	grid-template-columns: 25% 25% 25% 25%;
	&.mobile {
		grid-template-columns: 50% 50%;
		@media (max-width: 550px) {
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
	padding-top: 16px;
	padding-bottom: 16px;
	text-align: center;
	display: block;
	background-color: $white;
	border-bottom: border();
	a {
		display: block;
		padding-top: 16px;
		padding-bottom: 16px;
		margin-top: -16px;
		margin-bottom: -16px;
	}
	&.item {
		position: relative;
		border-left: border();
	}
	&:hover {
		color: $blue;
	}
	&.open > .sub {
		margin-top: 16px + map-get($border, width);
		border: none;
		color: $black;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		li {
			border-left: border();
		}
		border-right: border();
		li {
			// width: 100%;
			border-bottom: border();
		}
	}
}
</style>
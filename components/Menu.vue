<template>
	<ul @click="closeAll" :class="baseClasses">
		<li class="home"><nuxt-link to="/">Philipp&nbsp;Köstermenke</nuxt-link></li>
		<li class="item">
			Exhibitions
			<ul class="sub">
				<li v-for="exhibition in exhibitions">
					<nuxt-link :to="`/exhibitions/${exhibition.uid}`">{{ exhibition.uid }}</nuxt-link>
				</li>
			</ul>
		</li>
		<li class="item">Work</li>
		<li class="item">Info</li>
	</ul>
</template>

<script>
 export default {
 	name: 'Menu',
 	data() {
 		return {
 			baseClasses: [],
 		};
 	},
 	computed: {
 		exhibitions() {
 			return this.$store.getters.exhibitions.sort((a, b) => parseInt(b.uid, 10) - parseInt(a.uid, 10));
 		}
 	},
 	methods: {
 		closeAll() {
 			this.baseClasses = ['closed']
 			// only allow new hovering after 100ms
 			setTimeout(() => {
 				this.baseClasses = []
 			}, 100)
 		}
 	}
 }
</script>

<style lang="scss" scoped>
@import '../style/definitions';


ul {
	display: flex;
	justify-content: space-between;
	margin: 0;
	padding: 0;
	&.sub {
		position: absolute;
		left: - map-get($border, width);
		right: - map-get($border, width);
		display: none;
	}
}
li {
	font-size: 36px;
	padding-top: 24px;
	padding-bottom: 24px;
	text-align: center;
	width: 25%;
	display: block;
	background-color: $white;
	border-bottom: border();
	a {
		display: block;
	}
	&.item {
		position: relative;
		border-left: border();
	}
	&:hover {
		color: $blue;
		.sub {
			margin-top: 26.5px;
			border: none;
			color: $black;
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			border-left: border();
			border-right: border();
			.closed & {
				display: none;
			}
			li {
				width: 100%;
				border-bottom: border();
			}
		}
	}
}
</style>
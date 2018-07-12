<template>
	<ul>
		<li class="home">Philipp&nbsp;Köstermenke</li>
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
 	computed: {
 		exhibitions() {
 			return this.$store.getters.exhibitions;
 		}
 	}
 }
</script>

<style lang="scss" scoped>
@import '../style/colors';

$border: (
	width: 3px,
	style: solid,
	color: $black
);
@function border {
	@return map-get($border, width) map-get($border, style) map-get($border, color);
}

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
			li {
				width: 100%;
				border-bottom: border();
			}
		}
	}
}
</style>
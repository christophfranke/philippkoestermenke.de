<template>
	<div class="wrapper">
		<span v-for="crump in parents">
			{{ crump }} ->
		</span>
		<span class="last">
			{{ current }}
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
			return this.path.slice(this.path.length - 2, this.path.length - 1)
		},
		current() {
			return this.path[this.path.length - 1]
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
	padding-top: 24px;
	padding-bottom: 24px;
	border-bottom: border();
}
</style>
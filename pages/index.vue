<template>
	<div>
		<RichText :content="page.title" />
		<RichText :content="page.description" />
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import components from '../components'

	export default {
		name: 'homepage',
		components,
		computed: {
			page() {
				return this.$store.getters.page('homepage')
			},
		}
	}
</script>
<template>
	<view class="content">
	</view>
</template>

<script>
	import api from '@/api/api.js'
	import {mapState, mapGetters, mapActions} from 'vuex'
	export default {
	    components:{
	    },
	    computed: {
	    	...mapGetters(['user', 'remUser']),
	    },
		data() {
			return {
			};
		},
	    onShow() {
	    },
	    methods:{
	    }
	}
</script>

<style lang="scss">
</style>

<template>
	<view class="content">
		<text>暂无相关接口!</text>
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
		onLoad(opts) {
			if(undefined != opts.title && null != opts.title){
				uni.setNavigationBarTitle({
					title:opts.title
				})
			}
		},
	    methods:{
	    }
	}
</script>

<style lang="scss">
</style>

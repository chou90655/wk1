<template>
	<view class="content">
		<web-view :webview-styles="webviewStyles" :src="url"></web-view>
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
				url:'',
				title:'',
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
			};
		},
		onLoad(options) {
			if(null != options.url && undefined != options.url){
				this.url = options.url;
			}

			if(null != options.title && undefined != options.title){
				this.title = options.title;
				uni.setNavigationBarTitle({
					title:this.title
				})
			}
		},
	    onShow() {
	    },
	    methods:{
	    }
	}
</script>

<style lang="scss">
</style>

<template>
	<view class="content uni-padding-wrap">
		<view v-if="null != newBin">
			<h3>{{newBin.title}}</h3>
			<!-- <view class="new-content">
				{{newBin.content}}
			</view> -->
			<rich-text :nodes=newBin.content bindtap="tap"></rich-text>
		</view>
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
				newBin:null
			};
		},
		onLoad(opts) {
			if(undefined != opts.newBin && null != opts.newBin){
				this.newBin = JSON.parse(opts.newBin);
			}
		},
	    onShow() {
	    },
	    methods:{
	    }
	}
</script>

<style lang="scss">
	.new-content{
		height: calc(100vh - 200rpx);
	}
	h3{
		text-align: center;
	}
</style>

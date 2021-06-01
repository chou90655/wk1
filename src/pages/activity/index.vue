<template>
	<view class="content">
		<uni-nav-bar backgroundColor="#697AFF" color="#ffffff" title="优惠活动">
		</uni-nav-bar>
		<view class="activity-item" v-for="(item, index) in items" :key='index' @click="navto(item)">
			<text>{{item.title}}</text>
			<text>活动时间:{{item.time}}</text>
			<img-cache style="width: 95%; height: 200rpx;padding: 10rpx;" :src='item.icon'></img-cache>
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
    	...mapGetters(['user']),
    },
		data() {
			return {
				items:[
					{
						title:'VIP每日加奖',
						icon:'../../static/activity/fanshui.jpg',
						time:'长期有效',
						link:'/pages/activity/list/fanshui'
					},
					{
						title:'VIP晋级奖励',
						icon:'../../static/activity/vip.jpg',
						time:'长期有效',
						link:'/pages/activity/list/vip'
					}
				]
			};
		},
    onShow() {
    },
    methods:{
		navto(item){
			console.log(item);
			uni.navigateTo({
				url:item.link
			})
		}
    }
	}
</script>

<style lang="less">
	.activity-item{
		padding: 10rpx 0;
		margin: 10rpx 5%;
		width: 90%;
		background: #ffffff;
		border-radius: 30rpx;

		text{
			padding-left: 10rpx;
			display: inline-block;
		}
	}
</style>

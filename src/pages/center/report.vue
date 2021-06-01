<template>
	<view class="content uni-padding-wrap">
		<view class="panel-head">
			<view class="panel-title uni-row uni-flex">
				<img-cache class="user-face" :src="user.face"></img-cache>
				<text>{{user.username}}</text>
			</view>
			<view class="panel-body">
				<uni-row class="row-title">
					<uni-col :span="10" :offset="2">主账户余额(元)</uni-col>
					<uni-col :span="12">主账户盈亏(元)</uni-col>
				</uni-row>
				<uni-row class="row-info">
					<uni-col :span="10" :offset="2">{{userDetails.balance}}</uni-col>
					<uni-col :span="12">{{userDetails.yingli}}</uni-col>
				</uni-row>
			</view>
		</view>
		<view>
			<uni-row>
				<uni-col :span="10" :offset="2" v-for="(item, index) in infos" :key='index' class="info-item">
					<p class="item-title">{{item.title}}</p>
					<p class="item-value">{{item.value}}</p>
				</uni-col>
			</uni-row>
			<view class="uni-flex uni-row">
				<view class="uni-flex uni-column" style="-webkit-flex: 1;flex: 1;-webkit-justify-content: space-between;justify-content: space-between;">
					<view class="uni-flex uni-row">
						<view style="-webkit-flex: 1;flex: 1; display: inline-block;">
							<button type="primary" @click="navtoChongzhi()">充值</button>
						</view>
						<view style="-webkit-flex: 1;flex: 1;display: inline-block;">
							<button type="primary" @click="navtoTikuan()">提款</button>
						</view>
					</view>
				</view>
				<view class="text uni-flex" style="width: 200rpx;height: 220rpx;-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;">
					<text>预留</text>
				</view>
			</view>
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
			...mapState(['userDetails']),
	    	...mapGetters(['user', 'remUser']),
	    },
		data() {
			return {
				infos:[{
					title:'充值总金额',
					value:0
				},{
					title:'投注总金额',
					value:0
				},{
					title:'返点金额',
					value:0
				},{
					title:'活动礼金',
					value:0
				},{
					title:'每日加奖-反水',
					value:0
				},{
					title:'提现',
					value:0
				}]
			};
		},
	    onShow() {
			this.infos[0].value = this.userDetails.chuzhicount;
			this.infos[1].value = this.userDetails.touzhucount;
			this.infos[2].value = this.userDetails.fandian;
			this.infos[3].value = this.userDetails.huodonglijin;
			this.infos[4].value = this.userDetails.fanshui;
			this.infos[5].value = this.userDetails.tikuancount;
	    },
	    methods:{
			navtoChongzhi(){
				uni.navigateTo({
					url:'/pages/blance/chongzhi'
				})
			},
			navtoTikuan(){
				uni.navigateTo({
					url:'/pages/blance/tixian'
				})
			}
	    }
	}
</script>

<style lang="scss">
	.panel-head{
		margin-top: 20rpx;
		border-radius: 30rpx;
		height: 300rpx;
		background: #8aa3fc;;
		.panel-title{
			border-top-left-radius : 30rpx;
			border-top-right-radius : 30rpx;
			position: relative;
			background: $uni-color-primary;
			height: 100rpx;
			line-height: 100rpx;
			color: #ffffff;
			line-height: 100rpx;
			padding-left: 5%;

			.user-face{
				width: 80rpx;
				height: 80rpx;
				border-radius: 80rpx;
				padding: 10rpx;
			}
		}
		.panel-body{
			.row-title{
				font-size: 40rpx;
				color: rgba(255,255,255,.5);
			}

			.row-info{
				color: #ffffff;
				font-size: 60rpx;
			}
		}
	}

	.info-item{
		height: 150rpx;
		border-radius: 30rpx;
		background: #ffffff;
		margin: 20rpx 0;
		margin-left: 40rpx;

		.item-title{
			color: #8e8e93;
			font-size: 32rpx;
			font-weight: 400;
			text-align: center;
			line-height: 60rpx;
		}
		.item-value{
			text-align: center;
			color: #000;
			font-size: 48rpx;
			font-weight: 700;
			line-height: 56rpx;
		}
	}
</style>

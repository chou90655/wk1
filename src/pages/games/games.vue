<template>
	<view class="content" style="background: #efeff4;padding: 0 20rpx;overflow: hidden;">
		<scroll-view class="game-sidebar" scroll-x="true">
			<view class="tab-bar-btn" v-for="(item, index) in sideBars" :key='index' :class="{active:index == sideBarIndex}" @click="switchSideBar(index)">
				<text class="sidebar-title">{{item.title}}</text>
			</view>
		</scroll-view>
		<scroll-view class="gamge-content" scroll-y="true">
			<view class="gamge-gamges">
				<uni-row>
					<uni-col :span="8" v-for="(item, index) in games" :key='index'>
						<view v-if="item.id > 0" class="game-content" @click="gotoBet(item)">
							<view style="margin-left: 20%; padding-top:10rpx;"><image class="game-icon" :src='item.iconUrl' mode="aspectFit"></image></view>
							<p class="game-title">{{item.title}}</p>
							<p class="game-desc">{{item.ftitle}}</p>
						</view>
					</uni-col>
				</uni-row>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import api from '@/api/api.js'
	import {mapState, mapGetters, mapActions} from 'vuex'
	export default {
	    components:{
	    },
		computed: {
			...mapGetters(['user', 'lotteryHall', 'sideBars']),
			games(){
				var games = this.lotteryHall;
				var typeid = this.sideBarType;
				if(typeid != ''){
					games = this.lotteryHall.filter(item =>{
						return item.typeid == typeid;
					})
				}
				return games;
			}
		},
		data() {
			return {
				sideBarType:'',
				sideBarIndex:0
			};
		},
	    onShow() {
	    },
	    methods:{
			switchSideBar(index){
				this.sideBarIndex = index;
				this.sideBarType = this.sideBars[index].type;
			},
			gotoBet(item){
				uni.navigateTo({
					url:'/pages/games/bet?id=' + item.id
				})
			}
	    }
	}
</script>

<style lang="scss">
	.game-sidebar{
		white-space: nowrap;
		width: 100%;
		height: 100rpx;
		.active{
			background: linear-gradient(90deg, #9B98FF, #40B9FF) !important;

			.sidebar-title{
				color: #FFFFFF !important;
			}
		}
		.tab-bar-btn{
			width: 150rpx;
			height: 72rpx;
			margin: 14rpx 10rpx;
			display: inline-block;
			border-radius: 72rpx;
			text-align: center;
			border: 1rpx solid #D5D5D5;
			background: #fff;

			.sidebar-title{
				font-size: 23rpx;
				font-family: PingFang;
				font-weight: 500;
				color: #929292;
				line-height: 72rpx;
			}
		}
	}
	.gamge-content{
		margin-left: 5%;
		margin-top: 10rpx;
		height: calc(100vh - 220rpx);
		.gamge-gamges{
			border-radius: 30rpx;
			overflow: scroll;
			padding: 5rpx 10rpx;
			.game-content{
				background: #fff;
				width: 80%;
				border-radius: 20rpx;
				margin-bottom: 20rpx;
				.game-title{
					font-size: 23rpx;
					font-family: PingFang;
					font-weight: 800;
					color: #000000;
					text-align: center;
				}
				.game-desc{
					font-size: 18rpx;
					font-family: PingFang;
					font-weight: 500;
					color: #A0A0A0;
					text-align: center;
				}

				.game-icon{
					width: 100rpx;
					height: 100rpx;
				}
			}
		}
	}
</style>

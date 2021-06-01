<template>
	<view class="content me-content">
		<view class="me-head">
			<uni-row v-if="null != user">
				<uni-col :span="4">
					<img-cache class="user-head" :src="user.face"></img-cache>
				</uni-col>
				<uni-col :span="14" style="padding: 30rpx;">
					<p class='welcome-text'>欢迎您，{{user.username}}</p>
					<p class='blance-text' v-if='null == userDetails'>主账户余额：{{user.balance}}</p>
					<p class='blance-text' v-if='null !== userDetails'>主账户余额：{{userDetails.balance}}</p>
					<p class='blance-text' v-if='null !== userDetails'>今日投注：{{userDetails.touzhucount}},今日盈亏：{{userDetails.yingli}}</p>
				</uni-col>
				<uni-col :span="3">
					<view class="tool-btn" style="margin-top: 40rpx;" @click="gotoOtherPage('/pages/set/set')">
						<img-cache class="tool-image" src="../../static/user/shezhi.png"></img-cache>
					</view>
				</uni-col>
				<uni-col :span="3">
					<view class="tool-btn" style="margin-top: 40rpx;" @click="gotoKefu()">
						<img-cache class="tool-image" src="../../static/user/kefu.png"></img-cache>
					</view>
				</uni-col>
			</uni-row>
			<uni-row style="margin-top: 50rpx;">
				<uni-col :span="8">
					<view class="border-btn" @click="gotoOtherPage('/pages/blance/chongzhi')">
						<img-cache style="width: 30rpx; height: 30rpx;" src="../../static/user/chongzhi.png"></img-cache>
						<text>充值</text>
					</view>
				</uni-col>
				<uni-col :span="8">
					<view class="border-btn" @click="gotoOtherPage('/pages/blance/tixian')">
						<img-cache style="width: 30rpx; height: 30rpx;" src="../../static/user/tixian.png"></img-cache>
						<text>提款</text>
					</view>
				</uni-col>
				<uni-col :span="8">
					<view class="border-btn" @click="gotoOtherPage('/pages/blance/zhuanzhang')">
						<img-cache style="width: 30rpx; height: 30rpx;" src="../../static/user/zhuanzhang.png"></img-cache>
						<text>划转</text>
					</view>
				</uni-col>
			</uni-row>
		</view>
		<scroll-view class="me-list" scroll-y="true">
			<uni-list>
				<uni-list-item v-for="(item, index) in setList1" :key='index' :showExtraIcon="true" thumbSize="sm"  :clickable="true"
					:thumb='item.thumb'
					@click="gotoOtherPage(item.link, undefined != item.isTab?item.isTab:false)"
					:title="item.title" showArrow>
				</uni-list-item>
			</uni-list>
			<uni-list style="margin-top: 30rpx">
				<uni-list-item v-for="(item, index) in setList2" :key='index' :showExtraIcon="true" thumbSize="sm"  :clickable="true"
					:thumb='item.thumb'
					@click="gotoOtherPage(item.link, undefined != item.isTab?item.isTab:false)"
					:title="item.title" showArrow>
				</uni-list-item>
			</uni-list>
			<uni-list style="margin-top: 30rpx">
				<uni-list-item v-for="(item, index) in setList3" :key='index' :showExtraIcon="true" thumbSize="sm" :clickable="true"
					:thumb='item.thumb'
					@click="gotoOtherPage(item.link, undefined != item.isTab?item.isTab:false)"
					:title="item.title" showArrow>
				</uni-list-item>
			</uni-list>
			<uni-list style="margin-top: 30rpx">
				<uni-list-item  :showExtraIcon="true" thumbSize="sm" :clickable="true"
					thumb='../../static/user/user.png'
					@click="logout"
					title="退出登陆" showArrow>
				</uni-list-item>
			</uni-list>
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
			...mapGetters(['user', 'remUser']),
			...mapState(['userDetails'])
		},
		data() {
			return {
				setList1:[
				// 	{
				// 	thumb:'../../static/user/graph.png',
				// 	title:'余额宝中心',
				// 	link:'/pages/center/graph'
				// },
				{
					thumb:'../../static/user/present.png',
					title:'活动中心',
					link:'/pages/activity/index',
					isTab:true,
				}],
				setList2:[{
					thumb:'../../static/user/clock.png',
					title:'交易记录',
					link:'/pages/record/dealRecord'
				},{
					thumb:'../../static/user/compositePath.png',
					title:'充值记录',
					link:'/pages/record/depositRecord'
				},
				{
					thumb:'../../static/user/portfolio.png',
					title:'提现记录',
					link:'/pages/record/withdrawalRecord'
				},{
					thumb:'../../static/user/inbox.png',
					title:'资金记录',
					link:'/pages/record/dealRecord'
				},
				{
					thumb:'../../static/user/grid.png',
					title:'投注记录',
					link:'/pages/bet/index',
					isTab:true,
				}],
				setList3:[{
					thumb:'../../static/user/user.png',
					title:'个人中心',
					link:'/pages/center/user'
				},{
					thumb:'../../static/user/globe.png',
					title:'代理中心',
					link:'/pages/center/globe'
				},{
					thumb:'../../static/user/calendar.png',
					title:'报表中心',
					link:'/pages/center/report'
				}]
			};
		},
		onShow() {
			this.userdetails({username:this.remUser.name});
		},
		methods:{
			...mapActions(['getPersonalInfo', 'Logout', 'gotoKefu','userdetails']),
			gotoOtherPage(url, isTab){
				console.log(url);
				if(isTab){
					uni.switchTab({
						url:url
					})
				}else{
					uni.navigateTo({
						url:url
					})
				}
			},
			logout(){
				var self = this;
				uni.showModal({
				    content: '确认退出登陆吗',
				    success: function (res) {
				        if (res.confirm) {
							self.Logout();
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.me-content{
		.me-head{
			background: $uni-color-primary;
			height: 300rpx;
			padding: 18rpx;

			.user-head{
				width: 118rpx;
				height: 118rpx;
				border:6rpx solid #fff;
				border-radius: 118rpx;
			}

			.welcome-text{
				font-size: 30rpx;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 42rpx;
				height: 42rpx;
			}
			.blance-text{
				font-size: 22rpx;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 31rpx;
				height: 31rpx;
				opacity: 0.5;
			}

			.border-btn{
				background: rgba(128, 142, 255, 0);
				border: 2rpx solid rgba(255, 255, 255, 0.57);
				border-radius: 32rpx;

				height: 70rpx;
				line-height: 70rpx;
				width: 90%;
				font-weight: 500;
				color: #FFFFFF;
				font-size: 30rpx;
				text-align: center;

				.uni-text{
					margin-left: 5rpx !important;
				}
			}
		}
		.me-list{
			height: calc(100vh - 450rpx);
			overflow: scroll;
		}
	}
</style>

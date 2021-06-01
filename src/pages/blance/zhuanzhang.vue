<template>
	<view class="content">
		<view class="panel-head">
			<view class="panel-title uni-row uni-flex">
				<img-cache class="user-face" :src="user.face"></img-cache>
				<text>{{user.username}}</text>
			</view>
			<view class="panel-body">
				<uni-row class="row-title">
					<uni-col :span="22" :offset="2">主账户余额(元)</uni-col>
				</uni-row>
				<uni-row class="row-info">
					<uni-col :span="22" :offset="2">{{null==userDetails?'0':userDetails.balance}}</uni-col>
				</uni-row>
			</view>
		</view>
		<view>
			<uni-row>
				<uni-col :span="10" :offset="1" v-for="(item, index) in gameList" :key='index' class="info-item">
					<p class="item-title">{{item.name}}余额</p>
					<p class="item-value">{{null!=balances?null!=balances[item.type]?balances[item.type]:'0.00':'...'}}</p>
				</uni-col>
			</uni-row>
		</view>
		<view class="form-items">
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>转换类型</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<view style="width: 340rpx;" @click="showGameTitles()">
					{{gameTitle}}
					<uni-icons type="arrowdown" color="#000000" size="18" />
				</view>
			</view>
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>划转金额</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="请输入用户名" v-model="formData.amount" />
			</view>
		</view>
		<view style="margin-top: 20rpx;padding: 0 20rpx;">
			<button type="primary" style="margin-bottom: 50px;" @click="submit()">提交</button>
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
				gameList:[],
				balances:null,
				gameTitle:'',
				formData:{
					type:'local',
					amount:0
				}
			};
		},
	    onShow() {
	    },
		onLoad() {
			this.getGameList();
		},
	    methods:{
			getGameList(){
				api.getList({
					username:this.user.username
				}).then(res=>{
					if(res.code == 0){
						res.data.forEach(element => {
							var type = element.type;
							var jsongame = {"type":type, "name":element.type_name};
							this.gameList.forEach(element => {
								if (element.type == type){
									jsongame = null;
								}
							});
							if (jsongame!= null){
								this.gameList.push(jsongame);
							}
							
						});
						this.getBalance();
					}
				})
			},
			getBalance(){
				var gamelist = [];
				this.gameList.forEach(element => {
					gamelist.push(element.type)
				});
				console.log(gamelist);
				api.getBalance({
					username:this.user.username,
					type:gamelist
				}).then(res=>{
					if(res.code == 0){
						this.balances = res.data;
						console.log(res.data)
					}
				})
			},
			
			navtoChongzhi(){
				uni.navigateTo({
					url:'/pages/blance/chongzhi'
				})
			},
			submit(){

			},
			showGameTitles(){
				var self = this;
				var gameItems = [];
				this.gameList.forEach(item=>{
					gameItems.push("主账号至" + item.name);
					gameItems.push(item.name + "至主账号");
				});
				uni.showActionSheet({
					itemList:gameItems,
					success: function(res){
						self.gameTitle = gameItems[res.tapIndex];
						// console.log(self.chargeStatus);
						// self.formData.status = self.chargeStatus[res.tapIndex].status;
					}
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
		height: 120rpx;
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
			font-size: 36rpx;
			font-weight: 700;
			line-height: 56rpx;
		}
	}
</style>

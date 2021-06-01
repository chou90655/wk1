<template>
	<view class="content">
		<uni-nav-bar backgroundColor="#697AFF" color="#ffffff" title="投注记录" @clickRight="showSideBars">
			<block slot="right">
				<view class="sideBarType">
					<view><text class="uni-nav-bar-text">{{ sideBarTitle }}</text></view>
					<uni-icons type="arrowdown" color="#ffffff" size="18" />
				</view>
			</block>
		</uni-nav-bar>
		<scroll-view class="game-sidebar" scroll-x="true">
			<view class="tab-bar-btn" v-for="(item, index) in isdraws" :key='index' :class="{active:index == tabIndex}" @click="changeTabs(index, item)">
				<text class="sidebar-title">{{item.title}}</text>
			</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="record-list">
			<view v-for="(item, index) in records" :key='index' class="record-item">
				<view class="uni-row uni-flex">
					<view class="item-cptitle">{{item.cptitle}}</view>
					<view class="item-draw">{{getRecordDraw(item)}}</view>
				</view>
				<view class="uni-row uni-flex">
					<view class="item-left-info">期号:{{item.expect}}</view>
					<view class="item-right-info">玩法:{{item.playtitle}}</view>
				</view>
				<view class="uni-row uni-flex">
					<view class="item-left-info">金额:{{item.amount}}</view>
					<view class="item-right-info">中奖金:{{item.mode}}</view>
				</view>
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
			...mapGetters(['user', 'sideBars', 'isdraws']),
			records(){
				var records = this.recordList;
				var typeid = this.sideBarType;
				if(typeid != ''){
					records = this.recordList.filter(item =>{
						return item.typeid == typeid;
					})
				}

				var isdraw = this.tabIsdraw;
				if(isdraw != ''){
					records = records.filter(item =>{
						return item.isdraw == isdraw;
					})
				}
				return records;
			}
		},
		data() {
			return {
				sideBarType: '',
				sideBarTitle:'全部彩种',
				sideBarIndex:0,
				tabIndex:0,
				tabIsdraw:'',
				recordList:[]
			};
		},
		onShow() {
			this.sideBarType = "";
			this.tabIsdraw = "";
			this.tabIndex = "";
			this.sideBarTitle = this.sideBars[0].title;
			this.getBetRecord();
		},
		methods:{
			changeTabs(index, item){
				console.log(index, item);
				this.tabIndex = index;
				this.tabIsdraw = item.isdraw;
			},
			back(){
				uni.switchTab({
					url:'/pages/home/index'
				})
			},
			getBetRecord(){
				api.getBetRecord({
					username:this.user.username,
				}).then(res=>{
					if(res.code == 0){
						this.recordList = res.data;
					}
				})
			},
			getRecordDraw(item){
				var text = '未知';
				switch (item.isdraw){
					case '-2':
						text = '撤单';
						break;
					case '-1':
						text = '未中奖';
						break;
					case '1':
						text = '中奖';
						break;
					case '0':
						text = '未开奖';
						break;
					default:
						text = '未知';
						break;
				}
				return text;
			},
			showSideBars(){
				var self = this;
				var sides = [];
				this.sideBars.forEach(item=>{
					sides.push(item.title);
				});
				uni.showActionSheet({
					itemList:sides,
					success: function(res){
						self.sideBarIndex = res.tapIndex;
						self.sideBarType =  self.sideBars[res.tapIndex].type;
						self.sideBarTitle = self.sideBars[res.tapIndex].title;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.sideBarType {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		margin-left: 4px;
		overflow: hidden;
		width: 200rpx;
		font-size: 28rpx;
		text-align: right;
	}

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
			width: 22%;
			height: 72rpx;
			margin: 14rpx 10rpx;
			display: inline-block;
			border-radius: 72rpx;
			text-align: center;
			border: 1rpx solid #D5D5D5;
			background: #fff;

			.sidebar-title{
				font-size: 25rpx;
				font-family: PingFang;
				font-weight: 500;
				color: #929292;
				line-height: 72rpx;
			}
		}
	}

	.record-list{
		width: 100%;
		height: calc(100vh - 290rpx);
		.record-item{
			margin: 30rpx 30rpx;
			padding: 10rpx 40rpx;
			height: 140rpx;
			background: #ffffff;
			border-radius: 20rpx;

			.item-cptitle{
				-webkit-flex: 1;
				flex: 1;
				font-size: 25rpx;
				font-family: PingFang;
				font-weight: 800;
				color: #000000;
			}

			.item-draw{
				width: 200rpx;
				font-size: 25rpx;
				font-family: PingFang;
				font-weight: 800;
				color: #A3A3A3;
				text-align: right;
			}

			.item-left-info{
				text-align: left;
			}
			.item-right-info{
				text-align: right;
			}
			.item-left-info,.item-right-info{
				font-size: 21rpx;
				font-family: PingFang;
				font-weight: 500;
				color: #929292;
				width: 50%;
				height: 50rpx;
				line-height: 50rpx;
			}
		}
	}
</style>

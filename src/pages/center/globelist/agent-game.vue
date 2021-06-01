<template>
	<view class="content">
		<view class="form-items">
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>开始日期</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<uni-datetime-picker style="width: fit-content;" v-model='startime'></uni-datetime-picker>
			</view>
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>结束日期</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<uni-datetime-picker style="width: fit-content;" v-model='endtime'></uni-datetime-picker>
			</view>
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>全部彩种</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<view @click="showLotteryHalls()" style="width: 340rpx;">
				{{lotteryHallTitle}}
				</view>
			</view>
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>订单状态</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<view style="width: 340rpx;" @click="showIsdraws()">
					{{isdrawTitle}}
					<uni-icons type="arrowdown" color="#000000" size="18" />
				</view>
			</view>
		</view>
		<view class="form-items">
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>期号</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="请输入期号" v-model="formData.expect" />
			</view>
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>订单编号</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="请输入订单编号" v-model="formData.trano" />
			</view>
		</view>
		<view style="margin-top: 20rpx;padding: 0 20rpx;">
			<button type="primary" @click="getAgentGameRecord()">查询</button>
		</view>
		<view style="padding: 20rpx;" v-if="null != gameRecordData.root && gameRecordData.root.length > 0">
			<scroll-view class="record-list" :scroll-y="true">
				<view v-for="(item, index) in gameRecordData.root" :key='index' class="panel-info">
					<uni-row>
						<uni-col :span="24">
							<text class="panel-info-label">期号:</text>
							<text class="panel-info-value">{{item.expect}}</text>
						</uni-col>
					</uni-row>
					<uni-row>
						<uni-col :span="12">
							<text class="panel-info-label">用户名:</text>
							<text class="panel-info-value">{{item.username}}</text>
						</uni-col>
						<uni-col :span="12">
							<text class="panel-info-label">盈利:</text>
							<text class="panel-info-value">{{item.amount}}</text>
						</uni-col>
					</uni-row>
					<uni-row>
						<uni-col :span="12">
							<text class="panel-info-label">彩种:</text>
							<text class="panel-info-value">{{item.cptitle}}</text>
						</uni-col>
						<uni-col :span="12">
							<text class="panel-info-label">玩法:</text>
							<text class="panel-info-value">{{item.playtitle}}</text>
						</uni-col>
					</uni-row>
					<uni-row>
						<uni-col :span="12">
							<text class="panel-info-label">时间:</text>
							<text class="panel-info-value">{{item.oddtime}}</text>
						</uni-col>
						<uni-col :span="12">
							<text class="panel-info-label">倍数:</text>
							<text class="panel-info-value">{{item.beishu}}</text>
						</uni-col>
					</uni-row>
					<uni-row>
						<uni-col :span="24">
							<text class="panel-info-label">积分:</text>
							<text class="panel-info-value">{{item.amountbefor}}{{item.amount>0?('+'+item.amount):''}}={{item.amountafter}}</text>
						</uni-col>
					</uni-row>
				</view>
			</scroll-view>
			<uni-pagination :current="formData.p" :total="gameRecordData.total*10" :pageSize='10' title="标题文字" :show-icon="true" @change="change" />
		</view>
		<view style="padding: 20rpx;" v-if="null == gameRecordData.root || gameRecordData.root.length <= 0">
			游戏记录列表为空!
		</view>
	</view>
</template>

<script>
	import api from '@/api/api.js'
	import {
		friendlyDate
	} from '@/components/uni-dateformat/date-format.js'
	import {mapState, mapGetters, mapActions} from 'vuex'
	export default {
	    components:{
	    },
	    computed: {
	    	...mapGetters(['user', 'remUser', 'lotteryHall', 'isdraws']),
	    },
		data() {
			return {
				startime: friendlyDate(new Date().getTime() - 60*60*1000*24, {
					locale: 'en',
					threshold: [0, 0],
					format: 'yyyy/MM/dd hh:mm:ss'
				}),
				endtime: friendlyDate(new Date(), {
					locale: 'en',
					threshold: [0, 0],
					format: 'yyyy/MM/dd hh:mm:ss'
				}),
				formData:{
					username:'',
					loginname:'',
					expect:'', //期号
					trano:'', //订单编号
					status:'0',//订单状态
					startime:'', //查询注册的开始时间
					endtime:'',//查询注册结束始时间
					p:1,
					pagesize:10,
					lotteryname:''//彩票名称
				},
				lotteryHallIndex: 0,
				lotteryHallTitle:'全部彩种',
				gameRecordData:{
					total:0,
					root:[]
				},
				isdrawIndex:0,
				isdrawTitle:'全部'
			};
		},
		watch: {
			startime: {
				handler(newVal) {
					this.formData.startime = newVal;
				},
				immediate: true
			},
			endtime: {
				handler(newVal) {
					this.formData.endtime = newVal;
				},
				immediate: true
			},
		},
		mounted() {
			this.formData.username = this.user.username;
		},
	    onShow() {
	    },
	    methods:{
			getAgentGameRecord(){
				//分页没有完成
				api.getAgentGameRecord(this.formData).then(res=>{
					if(res.code == 0){
						this.gameRecordData = res.data;
					}else{
						uni.showToast({
							title:res.message,
							icon:'none'
						})
					}
				})
			},
			change(e) {
				this.formData.p = e.current;
				this.getAgentGameRecord();
			},
			showLotteryHalls(){
				var self = this;
				var lotteryHallItems = [];
				this.lotteryHall.forEach(item=>{
					lotteryHallItems.push(item.title);
				});
				uni.showActionSheet({
					itemList:lotteryHallItems,
					success: function(res){
						self.lotteryHallIndex = res.tapIndex;
						self.lotteryHallTitle = self.lotteryHall[res.tapIndex].title;
						self.formData.lotteryname = self.lotteryHall[res.tapIndex].name;
					}
				})
			},
			showIsdraws(){
				var self = this;
				var isdrawItems = [];
				this.isdraws.forEach(item=>{
					isdrawItems.push(item.title);
				});
				uni.showActionSheet({
					itemList:isdrawItems,
					success: function(res){
						self.isdrawIndex = res.tapIndex;
						self.isdrawTitle = self.isdraws[res.tapIndex].title;
						self.formData.status = self.isdraws[res.tapIndex].isdraw;
					}
				})
			}
	    }
	}
</script>

<style lang="scss">
	.record-list{
		padding: 20rpx 0;
		height: calc(100vh - 1090rpx);
	}
</style>

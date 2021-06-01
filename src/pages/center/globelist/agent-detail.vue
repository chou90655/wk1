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
		</view>
		<uni-section type="line" title="代理概述"></uni-section>
		<view class="panel-info">
			<uni-row>
				<uni-col :span="12">
					<text class="panel-info-label">团队人数:</text>
					<text class="panel-info-value">{{agentDetails.totalnum}}人</text>
				</uni-col>
				<uni-col :span="12">
					<text class="panel-info-label">玩家人数:</text>
					<text class="panel-info-value">{{agentDetails.noproxynum}}人</text>
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col :span="12">
					<text class="panel-info-label">代理人数:</text>
					<text class="panel-info-value">{{agentDetails.proxynum}}人</text>
				</uni-col>
				<uni-col :span="12">
					<text class="panel-info-label">团队余额:</text>
					<text class="panel-info-value">{{agentDetails.totalamount}}元</text>
				</uni-col>
			</uni-row>
		</view>
		<uni-section type="line" title="彩票概述"></uni-section>
		<view class="panel-info">
			<uni-row>
				<uni-col :span="12">
					<text class="panel-info-label">充值量:</text>
					<text class="panel-info-value">{{agentStatistics.transferIn}}</text>
				</uni-col>
				<uni-col :span="12">
					<text class="panel-info-label">派奖量:</text>
					<text class="panel-info-value">{{agentStatistics.payoutAmount}}</text>
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col :span="12">
					<text class="panel-info-label">提现量:</text>
					<text class="panel-info-value">{{agentStatistics.transferOut}}</text>
				</uni-col>
				<uni-col :span="12">
					<text class="panel-info-label">活动/返水:</text>
					<text class="panel-info-value">{{agentStatistics.activityAmount}}/{{agentStatistics.dayBackPoint}}</text>
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col :span="12">
					<text class="panel-info-label">代购量:</text>
					<text class="panel-info-value">{{agentStatistics.validAmount}}</text>
				</uni-col>
				<uni-col :span="12">
				</uni-col>
			</uni-row>
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
	    	...mapGetters(['user', 'remUser']),
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
				agentDetails:{
					totalnum:0, //团队总人数
					proxynum:0,//代理人数
					noproxynum:0,//玩家人数
					totalamount:0//团队余额
				},
				agentStatistics:{
					transferIn:0,//充值
					transferOut:0,//提现量
					validAmount:0,//代购量
					payoutAmount:0,//派奖量
					dayBackPoint:0,//返水
					activityAmount:0//活动
				},
				handle:0
			};
		},
		watch: {
			startime: {
				handler(newVal) {
					this.getAgentDetails();
				},
				immediate: true
			},
			endtime: {
				handler(newVal) {
					this.getAgentDetails();
				},
				immediate: true
			},
		},
		mounted() {
			this.getAgentDetails();
		},
	    onShow() {
	    },
	    methods:{
			getAgentDetails(){
				var self = this;
				if(this.handle){
					return;
				}
				this.handle = setTimeout(function(){
					var params = {
						username: self.user.username,
						startime: self.startime,
						endtime: self.endtime
					}
					//获取概览
					api.getAgentDetails({username: self.user.username}).then(res=>{
						if(res.code == 0){
							self.agentDetails = res.data;
						}
					})
					//获取统计
					api.getAgentStatistics(params).then(res=>{
						if(res.code == 0){
							self.agentStatistics = res.data;
							clearTimeout(self.handle);
							self.handle = 0;
						}
					})
				}, 500);
			}
	    }
	}
</script>

<style lang="scss">

</style>

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
					<text>用户名</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="请输入用户名" v-model="formData.loginname" />
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
			<button type="primary" @click="getAgentReportList()">查询</button>
		</view>
		<view style="padding: 20rpx;" v-if="null != reportData.root && reportData.root.length > 0">
			<scroll-view class="report-list" :scroll-y="true">
				<view v-for="(item, index) in reportData.root" :key='index' class="panel-info">
					<uni-row>
						<uni-col :span="12">
							<text class="panel-info-label">充值:</text>
							<text class="panel-info-value">{{item.dayRechargeMoney}}</text>
						</uni-col>
						<uni-col :span="12">
							<text class="panel-info-label">提款:</text>
							<text class="panel-info-value">{{item.dayDrawRechargeMoney}}</text>
						</uni-col>
					</uni-row>
					<uni-row>
						<uni-col :span="12">
							<text class="panel-info-label">消费(投注):</text>
							<text class="panel-info-value">{{item.dayConsumptionMoney}}</text>
						</uni-col>
						<uni-col :span="12">
							<text class="panel-info-label">返点:</text>
							<text class="panel-info-value">{{item.dayCommissionMoney}}</text>
						</uni-col>
					</uni-row>
					<uni-row>
						<uni-col :span="12">
							<text class="panel-info-label">中奖:</text>
							<text class="panel-info-value">{{item.dayIncomeMoney}}</text>
						</uni-col>
						<uni-col :span="12">
							<text class="panel-info-label">活动:</text>
							<text class="panel-info-value">{{item.dayActivitiesMoney}}</text>
						</uni-col>
					</uni-row>
					<uni-row>
						<uni-col :span="12">
							<text class="panel-info-label">盈利:</text>
							<text class="panel-info-value">{{item.dayDividendMoney}}</text>
						</uni-col>
						<uni-col :span="12">
							<text class="panel-info-label">报表日期:</text>
							<text class="panel-info-value">{{item.statDate}}</text>
						</uni-col>
					</uni-row>
				</view>
			</scroll-view>
			<uni-pagination :current="formData.p" :total="reportData.total*10" :pageSize='10' title="标题文字" :show-icon="true" @change="change" />
		</view>
		<view style="padding: 20rpx;" v-if="null == reportData.root || reportData.root.length <= 0">
			报表列表为空!
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
				formData:{
					username:'',
					loginname:'',
					startime:'',
					endtime:'',
					p:1,
					pagesize:10,
					type: '', //类型 0充值 1取款
					trano:'',//订单编号
					status:'' //订单状态 0未审核 1已审核 -1退回取消
				},
				reportData:{
					total:0,
					root:[]
				},
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
			getAgentReportList(){
				api.getAgentReportList(this.formData).then(res=>{
					if(res.code == 0){
						this.reportData = res.data;
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
				this.getAgentReportList();
			},
	    }
	}
</script>

<style lang="scss">
.report-list{
	padding: 20rpx 0;
	height: calc(100vh - 890rpx);
}
</style>

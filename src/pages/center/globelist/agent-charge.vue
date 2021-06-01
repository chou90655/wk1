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
					<text>状态</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<view style="width: 340rpx;" @click="showChargeStatus()">
					{{chargeStatusTitle}}
					<uni-icons type="arrowdown" color="#000000" size="18" />
				</view>
			</view>
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>充提</text>
				</view>
				<radio-group style="-webkit-flex: 1;flex: 1;" @change="typeChange">
					<label>
						<radio color="#697AFF" style="transform:scale(0.8)" value="0" :checked="formData.type=='0'"/><text>充值</text>
					</label>
					<label>
						<radio color="#697AFF" style="transform:scale(0.8)" value="1" :checked="formData.type=='1'"/><text>取款</text>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="form-items">
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
			<button type="primary" @click="getAgentChargeWithdrawList()">查询</button>
		</view>
		<view style="padding: 20rpx;" v-if="null != chargeWithdrawData.root && chargeWithdrawData.root.length > 0">
			<scroll-view class="change-list" :scroll-y="true">
				<view v-for="(item, index) in chargeWithdrawData.root" :key='index' class="panel-info">
					<uni-row>
						<uni-col :span="12">
							<text class="panel-info-label">用户名:</text>
							<text class="panel-info-value">{{item.username}}</text>
						</uni-col>
						<uni-col :span="12">
							<text class="panel-info-label">金额:</text>
							<text class="panel-info-value">{{item.amount}}</text>
						</uni-col>
					</uni-row>
					<uni-row>
						<uni-col :span="18">
							<text class="panel-info-label">账变时间:</text>
							<text class="panel-info-value">{{item.oddtime}}</text>
						</uni-col>
						<uni-col :span="6">
							<uni-tag type="warning"  size="small" :text="item.remark"  :inverted="true"/>
						</uni-col>
					</uni-row>
				</view>
			</scroll-view>
			<uni-pagination :current="formData.p" :total="chargeWithdrawData.total*10" :pageSize='10' title="标题文字" :show-icon="true" @change="change" />
		</view>
		<view style="padding: 20rpx;" v-if="null == chargeWithdrawData.root || chargeWithdrawData.root.length <= 0">
			充提记录列表为空!
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
			...mapState(['chargeStatus']),
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
					trano:'',//订单编号
					type:'0',//类型 0充值 1取款
					startime:'',
					endtime:'',
					p:1,
					pagesize:10,
					status:'' //订单状态 0未审核 1已审核 -1退回取消
				},
				chargeWithdrawData:{
					total:0,
					root:[]
				},
				chargeStatusTitle:'全部'
			};
		},
		watch: {
			startime: {
				handler(newVal) {
					this.formData.startime= newVal;
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
			getAgentChargeWithdrawList(){
				api.getAgentChargeWithdrawList(this.formData).then(res=>{
					if(res.code == 0){
						this.chargeWithdrawData = res.data;
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
				this.getAgentChargeWithdrawList();
			},
			typeChange(evt){
				this.formData.type = evt.detail.value;
			},
			statusChange(evt){
				this.formData.status = evt.detail.value;
			},
			showChargeStatus(){
				var self = this;
				var chargeStatusItems = [];
				this.chargeStatus.forEach(item=>{
					chargeStatusItems.push(item.title);
				});
				uni.showActionSheet({
					itemList:chargeStatusItems,
					success: function(res){
						self.chargeStatusTitle = self.chargeStatus[res.tapIndex].title;
						self.formData.status = self.chargeStatus[res.tapIndex].status;
					}
				})
			}
	    }
	}
</script>

<style lang="scss">

</style>

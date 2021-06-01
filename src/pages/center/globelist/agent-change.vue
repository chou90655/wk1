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
					<text>账变类型</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<view @click="showChangetype()" style="width: 340rpx;">
					{{changeTypeTitle}}
					<uni-icons type="arrowdown" color="#000000" size="18" />
				</view>
			</view>
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>用户名</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="请输入用户名" v-model="formData.loginname" />
			</view>
		</view>
		<view style="margin-top: 20rpx;padding: 0 20rpx;">
			<button type="primary" @click="getAgentChangeList()">查询</button>
		</view>
		<view style="padding: 20rpx;" v-if="null != changeData.root && changeData.root.length > 0">
			<scroll-view class="change-list" :scroll-y="true">
				<view v-for="(item, index) in changeData.root" :key='index' class="panel-info">
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
							<uni-tag type="warning"  size="small" :text="item.typename"  :inverted="true"/>
						</uni-col>
					</uni-row>
				</view>
			</scroll-view>
			<uni-pagination :current="formData.p" :total="changeData.total*10" :pageSize='10' title="标题文字" :show-icon="true" @change="change" />
		</view>
		<view style="padding: 20rpx;" v-if="null == changeData.root || changeData.root.length <= 0">
			账变记录列表为空!
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
	    	...mapGetters(['user', 'remUser', 'changetypes']),
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
					loginname:'',//查询某个下线
					type:'',//类型 购彩 撤单等
					startime:'',
					endtime:'',
					p:1,
					pagesize:10
				},
				changeData:{
					total:0,
					root:[]
				},
				changeTypeTitle:'全部类型'
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
			getAgentChangeList(){
				api.getAgentChangeList(this.formData).then(res=>{
					if(res.code == 0){
						this.changeData = res.data;
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
				this.getAgentChangeList();
			},
			showChangetype(){
				var self = this;
				var changeTypeItems = [];
				this.changetypes.forEach(item=>{
					changeTypeItems.push(item.title);
				});
				uni.showActionSheet({
					itemList:changeTypeItems,
					success: function(res){
						self.changeTypeTitle = self.changetypes[res.tapIndex].title;
						self.formData.type = self.changetypes[res.tapIndex].type;
					}
				})
			}
	    }
	}
</script>

<style lang="scss">
.change-list{
	padding: 20rpx 0;
	height: calc(100vh - 900rpx);
}
</style>

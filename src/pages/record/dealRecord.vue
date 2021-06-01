<template>
	<view class="content">
		<scroll-view class="game-sidebar" scroll-x="true">
			<view class="tab-bar-btn" v-for="(item, index) in atimes" :key='index' :class="{active:index == tabIndex}" @click="changeTabs(index, item)">
				<text class="sidebar-title">{{item.title}}</text>
			</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="record-list">
			<view v-for="(item, index) in records.list" :key='index' class="record-item">
				<uni-row>
					<uni-col :span="18">
						<text class="panel-info-label">金额:</text>
						<text class="panel-info-value">{{item.amount}}</text>
					</uni-col>
					<uni-col :span="6">
						<uni-tag circle="true" inverted="true" type="primary" :text="'类型:'+item.typename" size="small"></uni-tag>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="24">
						<text class="panel-info-label">订单:</text>
						<text class="panel-info-value">{{item.trano}}</text>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="24">
						<text class="panel-info-label">备注:</text>
						<text class="panel-info-value">{{item.remark}}</text>
					</uni-col>
				</uni-row>
			</view>
		</scroll-view>
		<uni-pagination class="page-foot" :current="formData.p" :total="records.count" :pageSize='10' title="标题文字" :show-icon="true" @change="change" />
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
	    },
		data() {
			return {
				atimes:[
					{
						title:'今天',
						atime:'1'
					},
					{
						title:'昨天',
						atime:'2'
					},
					{
						title:'七天',
						atime:'3'
					},
					{
						title:'全部',
						atime:''
					}
				],
				tabIndex: 3,
				formData:{
					username:'',
					atime:'',
					p:1,
					pagesize:10
				},
				records:{
					count:0,
					list:[]
				}
			};
		},
	    onShow() {
	    },
		onLoad() {
			this.formData.username = this.user.username;
			this.getRecords();
		},
	    methods:{
			change(e) {
				this.formData.p = e.current;
				this.getRecords();
			},
			getRecords(){
				api.getDealRecord(this.formData).then(res=>{
					if(res.code == 0){
						this.records = res.data;
					}
				})
			},
			changeTabs(index, item){
				this.tabIndex = index;
				this.formData.atime = item.atime;
				this.formData.p = 1;
				this.getRecords();
			},
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
	.page-foot{
		position: absolute;
		bottom: 0;
		width: 100%;
		padding-bottom: 10rpx;
	}
</style>

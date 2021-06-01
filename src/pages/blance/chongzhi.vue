<template>
	<view class="content" style="padding: 0 20rpx;overflow: hidden;">
		<uni-section type="line" title="选择充值方式"></uni-section>
		<uni-row class="pay-list">
			<uni-col :span='10' v-for="(item, index) in pays" :key='index' class="pay-item"  :offset="index%2==0?1:2" :class="{active:payIndex==index}">
				<img-cache class="pay-item-icon" :src="item.img"  @click='changePay(index)'></img-cache>
				<p class="pay-item-title"  @click='changePay(index)'>{{item.paytypetitle}}</p>
			</uni-col>
		</uni-row>
		<button type="primary" @click='gotoDetail()'>提交</button>
		<p class='pay-info' style='margin-top: 30rpx;'>温馨提示</p>
		<p class='pay-info'>1、如通过在线充钱方式，每天的充值处理时间为：早上00:00 至次日 23:59。</p>
		<p class='pay-info'>2、填写金额与充值金额一致，否则无法到账。</p>
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
				payIndex:0,
				pays:[],
			};
		},
	    onShow() {
			this.getRechargeList();
	    },
	    methods:{
			changePay(index){
				this.payIndex = index;
			},
			getRechargeList(){
				api.getRechargeList().then(res=>{
					if(res.code == 0){
						res.data.forEach(item=>{
							item.img = api.getFileAccessHttpUrl(item.img);
						})
						this.pays = res.data;
					}
				})
			},
			gotoDetail(){
				uni.navigateTo({
					url:'/pages/blance/chongzhiDetail?payItem=' + JSON.stringify(this.pays[this.payIndex])
				})
			}
	    }
	}
</script>

<style lang="scss">
	.pay-list{
		.active{
			border: 2rpx solid $uni-color-primary !important;
			.pay-item-title{
				color: $uni-color-primary !important;
				font-weight: bold !important;
			}
		}
		.pay-item{
			height: 210rpx;
			background: #ffffff;
			margin-bottom: 40rpx;
			text-align: center;
			.pay-item-icon{
				width: 30%;
				height: 64rpx;
				padding: 0 10%;
				padding-top: 10%;
			}

			.pay-item-title{
				margin-top: 20rpx;
				font-size: 25rpx;
				font-family: PingFang;
				font-weight: 500;
				color: #737373;
				text-align: center;
			}
		}
	}
</style>

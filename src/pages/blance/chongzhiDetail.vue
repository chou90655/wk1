<template>
	<view class="content" style="padding:30rpx;">
		<text class="user-info">账户余额:<span class='user-balance'>{{user.balance}}</span></text>
		<view v-if="null != payItem" class="form-items">
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>充值金额</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="number" placeholder="请输入充值金额" v-model="formData.amount" />
			</view>
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>支付姓名</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="请输入支付姓名" v-model="formData.userpayname" />
			</view>
		</view>
		<p style='padding: 20rpx; font-size: 24rpx;font-weight: 500;color: #767676;'>
			·存款金额必须在{{payItem.minmoney}}-{{payItem.maxmoney}}元之间。<br/>
			·小提示：使用非整数金额充值能更快到账哦~ （例如：101、1002、2011）<br/>
			·请勿使用信用卡充值，导致的银行已扣款却充值不到账平台无法 处理。<br/>
		</p>
		<view style="padding: 20rpx;">
			<button type="primary" @click="getRecharge()">确认充值</button>
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
	    	...mapGetters(['user', 'remUser']),
	    },
		data() {
			return {
				payItem:null,
				formData:{
					username:'',
					userpayname:'',
					paytype:'',
					amount:''
				}
			};
		},
		onLoad(opts) {
			if(undefined != opts.payItem || null != opts.payItem){
				this.payItem = JSON.parse(opts.payItem);
				uni.setNavigationBarTitle({
					title:this.payItem.paytypetitle
				})
			}
		},
	    onShow() {
	    },
	    methods:{
			getRecharge(){
				this.formData.username = this.user.username;
				if(undefined != this.payItem || null != this.payItem){
					this.formData.paytype = this.payItem.paytype;
				}

				api.getRecharge(this.formData).then(res=>{
					if(res.code == 0 && undefined != res.data.paygate_result && null != res.data.paygate_result){
						var result = res.data.paygate_result;
						console.log(result);
						if(result.result == 0){
							uni.navigateTo({
								url:'/pages/webview/webview?url=' + encodeURIComponent(result.content.data.url) + "&title=" + this.payItem.paytypetitle
							})
						}else{
							uni.showToast({
								title:result.msg,
								icon:'none'
							})
						}
					}
					// uni.showToast({
					// 	title:res.message,
					// 	icon:'none'
					// })
				})
			}
	    }
	}
</script>

<style lang="scss">
	.user-info{
		font-size: 24rpx;
		font-family: PingFang;
		font-weight: 500;
		color: $uni-text-color;

		span{
			margin-left: 30rpx;
			color: $uni-color-primary;
		}
	}
</style>

<template>
	<view class="content">
		<view class="form-items">
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 300rpx;" class="uni-form-item__label">
					<text>银行卡姓名</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="请输入银行卡姓名" v-model="formData.accountname" />
			</view>
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 300rpx;" class="uni-form-item__label">
					<text>银行</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="请输入银行" v-model="formData.bankCode" />
			</view>
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 300rpx;" class="uni-form-item__label">
					<text>银行卡账号</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="请输入银行卡账号" v-model="formData.bankCardNumber" />
			</view>
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 300rpx;" class="uni-form-item__label">
					<text>重复银行卡账号</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="请输入重复银行卡账号" v-model="formData.regbankCardNumber" />
			</view>
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 300rpx;" class="uni-form-item__label">
					<text>银行卡姓名</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="请输入银行卡姓名" v-model="formData.accountname" />
			</view>
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 300rpx;" class="uni-form-item__label">
					<text>开户行网点</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="请输入开户行网点" v-model="formData.bankBranch" />
			</view>
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 300rpx;" class="uni-form-item__label">
					<text>开户行地址</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="请输入开户行地址" v-model="formData.bankAddress" />
			</view>
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 300rpx;" class="uni-form-item__label">
					<text>资金密码</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="请输入资金密码" v-model="formData.bankTradPwd" />
			</view>
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 300rpx;" class="uni-form-item__label">
					<text>开户省份</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="请输入开户省份" v-model="formData.province" />
			</view>
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 300rpx;" class="uni-form-item__label">
					<text>开户城市</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="请输入开户城市" v-model="formData.city" />
			</view>
		</view>
		<view style="margin-top: 20rpx;padding: 0 20rpx;">
			<button type="primary" @click="submit()">提交绑定</button>
		</view>

		<scroll-view class="view-cards" :scroll-y="true">
			<view v-for="(item, index) in cards" :key='index' class='card-info'>
				<uni-row>
					<uni-col :span="12">银行卡姓名:{{item.accountname}}</uni-col>
					<uni-col :span="12">银行:{{item.bankcode}}</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="24">银行卡号:{{item.banknumber}}</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="24">开户行网点:{{item.bankbranch}}</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="24">开户行地址:{{item.bankaddress}}</uni-col>
				</uni-row>
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
	    	...mapGetters(['user', 'remUser']),
	    },
		data() {
			return {
				cards:[],
				formData:{
					username:'',
					accountname:'',
					bankCode:'',
					bankCardNumber:'',
					regbankCardNumber:'',
					bankBranch:'',
					bankAddress:'',
					bankTradPwd:'',
					stype:'y',
					province:'',
					city:''
				}
			};
		},
	    onShow() {
			this.getBindcard();
	    },
	    methods:{
			getBindcard(){
				api.getBindcard({
					username:this.user.username
				}).then(res=>{
					if(res.code == 0){
						this.cards = res.data;
					}
				})
			},
			submit(){
				api.bindBankcard(this.formData).then(res=>{
					uni.showToast({
						title: res.message
					})
				})
			}
	    }
	}
</script>

<style lang="scss">
	.card-info{
		background: #ffffff;
		border-radius: 30rpx;
		padding: 20rpx;
		margin: 20rpx;
		height: fit-content;
		min-height: 150rpx;
	}
</style>

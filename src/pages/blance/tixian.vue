<template>

	<view class="uni-padding-wrap">
		<form>
			<view class="uni-form-item uni-column">
				<view class="uni-row uni-flex">
					<view style="-webkit-flex: 1;flex: 1;" class="title">
						<text>持卡人姓名</text>
					</view>
					<view style="width: 350rpx;padding: 5px 12px;">
						账户余额:<span class='user-balance'>{{null != userDetails?userDetails.balance:''}}</span>
					</view>
				</view>
				<input class="uni-input" name="userbankname" v-model="user.userbankname" disabled placeholder="请输入用户名" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">洗码金额</view>
				<input class="uni-input" name="xima" v-model="user.xima" placeholder="请输入洗码金额" disabled/>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">可提现金</view>
				<input class="uni-input" name="cpassword" v-model="userDetails.balance" placeholder="请再次输入密码" disabled/>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">提现账户</view>
				<view class="uni-list">
					<radio-group @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in banks" :key="item.value">
							<view>
								<radio :value="item.id" :checked="index === current"/>
							</view>
							<view>{{item.bankname}}{{item.banknumber}}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">提现金额</view>
				<input class="uni-input" name="reccode" v-model="userInfo.amount" placeholder="请输入提现金额" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">资金密码</view>
				<input class="uni-input" type="password" name="linkid" v-model="userInfo.withdraw_pwd" placeholder="请输入资金密码" />
			</view>
			<view>
				<p class='pay-info' style='margin-top: 30rpx;'>温馨提示</p>
				<p class='pay-info'>1、今天还可以提现 {{userDetails.tikuancount}} 次</p>
				<p class='pay-info'>2、可提现金额=有效投注×3(此项需达到充值金额的30%才计入)+奖金+活动礼金.</p>
				<p class='pay-info'>3、单笔提现最低元，最高元。</p>
			</view>
			<view class="uni-btn-v">
				<button form-type="submit" type="primary" @click="gotoTikuanOrder()">确认提现</button>
			</view>
		</form>
	</view>
</template>

<script>
	import api from '@/api/api.js'
	import {mapState, mapGetters, mapActions} from 'vuex'
	export default {
	    components:{
	    },
	    computed: {
			...mapState(['userDetails']),
	    	...mapGetters(['user', 'remUser']),
	    },
			data() {
				return {
					userInfo:{
						amount: 0,
						withdraw_pwd:'',
						bankid:''
					},
					banks:[],
					current:0
				};
			},
	    onShow() {
			this.getBindcard();
	    },
	    methods:{
			gotoTikuanOrder(){
				console.log(this.userInfo);
				if(this.userInfo.bankid == '' || this.userInfo.withdraw_pwd == '' || this.userInfo.amount <= 0){
					uni.showToast({
						title:'请输入正确的提款信息!'
					})
					return;
				}

				api.tikuanOrder({
					username: this.user.username,
					userbankname: this.user.userbankname,
					amount:this.userInfo.amount,
					withdraw_pwd: this.userInfo.withdraw_pwd,
					bankid: this.userInfo.bankid
				}).then(res=>{
					uni.showToast({
						title:res.message
					})
				})
			},
			getBindcard(){
				api.getBindcard({
					username:this.user.username
				}).then(res=>{
					if(res.code == 0){
						this.banks = res.data;
						if (this.banks.length == 0){
							uni.showModal({
								content: '还未绑定银行卡，请前往绑定银行卡',
								success: function (res) {
									if (res.confirm) {
										uni.navigateTo({
											url:'/pages/bind/cards'
										})
									}
								}
							});
							
						}else{
							this.userInfo.bankid=this.banks[0].id;
						}
					}
				})
			},
			radioChange(evt) {
				this.userInfo.bankid = evt.detail.value;
			}
	    }
	}
</script>

<style lang="scss">
	.user-balance{
		margin-left: 10rpx;
		font-size: 40rpx;
		font-weight: 700;
		line-height: 17px;
		color: #d4a85e;
		vertical-align: baseline;
	}
</style>

<template>
	<view>
		<view class="form-items">
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>旧密码</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="password" placeholder="请输入旧密码" v-model="formData.password" />
			</view>
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>新密码</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="password" placeholder="请输入新密码" v-model="formData.new_password" />
			</view>
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>重复密码</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="password" placeholder="请输入重复密码" v-model="formData.new_password2" />
			</view>
		</view>
		<view style="margin-top: 20rpx;padding: 0 20rpx;">
			<button type="primary" @click="submit()">提交修改</button>
		</view>
	</view>
</template>

<script>
	import api from '@/api/api.js'
	import graceChecker from '../../common/graceChecker.js'
	import {mapState, mapGetters, mapActions} from 'vuex'
	export default {
		computed: {
			...mapGetters(['user', 'remUser']),
		},
		data() {
			return {
				formData:{
					username:'',
					password:'',
					new_password:'',
					new_password2:'',
					type:'1'
				}
			}
		},
		onLoad(opts) {
			if(undefined != opts.type && null != opts.type){
				this.formData.type = opts.type;
			}
			this.formData.username = this.user.username;
			if(this.formData.type == '1'){
				uni.setNavigationBarTitle({
					title:'登陆密码修改'
				})
			}else{
				uni.setNavigationBarTitle({
					title:'交易密码修改'
				})
			}
		},
		methods: {
			submit(){
				if(this.formData.new_password != this.formData.new_password2){
					uni.showToast({title:"重复密码输入不一致!", icon:"none"});
					return;
				}
				var rule = [
				    {name:"password", checkType : "string", checkRule:"1,20",  errorMsg:"旧密码输入不正确"}
				];
				var checkRes = graceChecker.check({password: this.formData.password}, rule);
				if(checkRes){
				    uni.showToast({title:"验证通过!", icon:"none"});
					api.changePassword(this.formData).then(res=>{
						uni.showToast({ title: res.message, icon: "none" });
					});
				}else{
				    uni.showToast({ title: graceChecker.error, icon: "none" });
				}
			}
		}
	}
</script>

<style>

</style>

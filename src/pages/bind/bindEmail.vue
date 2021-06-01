<template>
	<view class="content">
		<view class="form-items">
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>邮箱</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="请输入邮箱" v-model="email" />
			</view>
		</view>
		<view style="margin-top: 20rpx;padding: 0 20rpx;">
			<button type="primary" @click="submit()">提交绑定</button>
		</view>
	</view>
</template>

<script>
	import api from '@/api/api.js'
	import graceChecker from '../../common/graceChecker.js'
	import {mapState, mapGetters, mapActions} from 'vuex'
	export default {
	    components:{
	    },
	    computed: {
	    	...mapGetters(['user', 'remUser']),
	    },
		data() {
			return {
				email:''
			};
		},
	    onShow() {
			this.email = this.user.email
	    },
	    methods:{
			submit(){
				var rule = [
				    {name:"email", checkType : "email", checkRule:"0,20",  errorMsg:"请输入正确的邮箱"}
				];
				var checkRes = graceChecker.check({email: this.email}, rule);
				if(checkRes){
					api.bindEmail({
						username: this.user.username,
						email: this.email
					}).then(res=>{
						if (res.code == 0){
							uni.showToast({ title: res.message});
							this.$store.commit('CHANGE_USER_INFO', {"email":this.email});
							setTimeout(function(){
								uni.navigateBack({
									delta: 1
								})
							},2000);
						}else{
							uni.showToast({ title: res.message, icon: "none" });
						}
					});
				}else{
				    uni.showToast({ title: graceChecker.error, icon: "none" });
				}
			}
	    }
	}
</script>

<style lang="scss">
</style>

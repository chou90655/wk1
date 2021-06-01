<template>
	<view class="uni-padding-wrap">
		<form @submit="formSubmit">
			<view class="uni-form-item uni-column">
				<view class="title">新密码</view>
				<input type="password" class="uni-input" name="password" v-model="userInfo.password" placeholder="请输入新密码" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">重复新密码</view>
				<input type="password" class="uni-input" name="password2" v-model="userInfo.password2" placeholder="请再次输入新密码" />
			</view>
			<view class="uni-btn-v">
				<button form-type="submit" type="primary">确认修改</button>
			</view>
		</form>
	</view>
</template>

<script>
	import api from '@/api/api.js'
	import graceChecker from '@/common/graceChecker.js'
	import {mapState, mapGetters, mapActions} from 'vuex'
	export default {
		components:{
		},
		computed: {
			...mapGetters(['user']),
		},
		data() {
			return {
				userInfo:{
					username:'',
					password:'',
					password2:'',
					oldpassword:''
				}
			};
		},
		onLoad(opts) {
			this.userInfo.username=opts.username;
		},
		onShow() {
		},
		methods:{
			formSubmit: function(e) {
				//进行表单检查
			    var formData = e.detail.value;
				formData.username = this.userInfo.username;
			    //定义表单规则
			    var rule = [
					{name:"password", checkType : "string", checkRule:"4,10",  errorMsg:"密码应为4-10个字符"},
					{name:"password2", checkType : "same", checkRule:formData.password,  errorMsg:"密码输入不一致"}
			    ];
			    var checkRes = graceChecker.check(formData, rule);
			    if(checkRes){
					api.setPassword(formData).then(res=>{
						if (res.code == 0){
							uni.showToast({ 
							title: res.message, 
							complete:function(res){
								setTimeout(function(){
									uni.navigateTo({
										url:'/pages/public/login'
									})
								},1000);
							}});
						}else{
							uni.showToast({ title: res.message, icon: "none" });
						}
						
					});
			    }else{
			        uni.showToast({ title: graceChecker.error, icon: "none" });
			    }
			},
		}
	}
</script>

<style lang="less">
</style>
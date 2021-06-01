<template>
	<view class="uni-padding-wrap">
		<form @submit="formSubmit">
			<view class="uni-form-item uni-column">
				<view class="title">用户名</view>
				<input type="text" class="uni-input" name="username" v-model="userInfo.username" placeholder="请输入用户名" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">密码</view>
				<input type="password" class="uni-input" name="password" v-model="userInfo.password" placeholder="请输入密码" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">重复密码</view>
				<input type="password" class="uni-input" name="cpassword" v-model="userInfo.cpassword" placeholder="请再次输入密码" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">交易密码</view>
				<input type="password" class="uni-input" name="tradepassword" v-model="userInfo.tradepassword" placeholder="请输入交易密码" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">重复交易密码</view>
				<input type="password" class="uni-input" name="cptradepassword" v-model="userInfo.cptradepassword" placeholder="请再次输入交易密码" />
			</view>
			<view class="uni-form-item uni-column" v-if="registerType == 0">
				<view class="title">邀请码</view>
				<input type="text" class="uni-input" name="reccode" v-model="userInfo.reccode" placeholder="请输入邀请码" />
			</view>
			<view class="uni-btn-v">
				<button form-type="submit" type="primary">确认注册</button>
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
					cpassword:'',
					tradepassword:'',
					cptradepassword:'',
					reccode:'',
					linkid:'',
					tgid:''
				},
				registerType:0 //0普通注册,用户自己输入邀请码, 1固定连接邀请注册,不需要邀请码,自动带入邀请人id-tgid,2 推广链接邀请 自动带入linkid
			};
		},
		onLoad(opts) {
			var title = '注册账号';
			if(undefined != opts.linkid && null != opts.linkid){
				this.registerType = 2;
				this.userInfo.linkid = opts.linkid;
			}

			if(undefined != opts.agentId && null != opts.agentId){
				this.registerType = 1;
				this.userInfo.tgid = opts.agentId;
			}

			switch (this.registerType){
				case 1:
					title = '注册账号-邀请人注册';
					break;
				case 2:
					title = '注册账号-邀请链接注册';
					break;
				default:
					title = '注册账号-普通注册';
					break;
			}

			uni.setNavigationBarTitle({
				title: title
			})
		},
		onShow() {
		},
		methods:{
			...mapActions(['register']),
			formSubmit: function(e) {
			    var formData = e.detail.value;
			    //定义表单规则
			    var rule = [
			        {name:"username", checkType : "string", checkRule:"4,10",  errorMsg:"用户名应为4-10个字符"},
					{name:"password", checkType : "string", checkRule:"4,10",  errorMsg:"密码应为4-10个字符"},
					{name:"cpassword", checkType : "same", checkRule:formData.password,  errorMsg:"密码输入不一致"},
					{name:"tradepassword", checkType : "string", checkRule:"6,6",  errorMsg:"交易密码应为6个字符"},
					{name:"cptradepassword", checkType : "same", checkRule:formData.tradepassword,  errorMsg:"交易密码输入不一致"}
			    ];
				switch (this.registerType){
					case 1:
						formData.tgid=this.userInfo.tgid;
						rule.push({name:"tgid", checkType : "string", checkRule:"2,10",  errorMsg:"邀请链接无效"});
						break;
					case 2:
						formData.linkid=this.userInfo.linkid;
						rule.push({name:"linkid", checkType : "string", checkRule:"2,10",  errorMsg:"邀请链接无效"});
						break;
					default:
						rule.push({name:"reccode", checkType : "string", checkRule:"5,10",  errorMsg:"邀请码应为5-10个字符"})
						break;
				}
				//进行表单检查
			    var checkRes = graceChecker.check(formData, rule);
			    if(checkRes){
			        uni.showToast({title:"验证通过!", icon:"none"});
					uni.clearStorageSync();
					this.register(formData).then(res=>{
						console.log(res);
						if(res.code == 0){
							uni.switchTab({
								url:'/pages/home/index'
							})
						}else{
							uni.showToast({
								title:res.message,
								icon:'none'
							})
						}
					})
			    }else{
			        uni.showToast({ title: graceChecker.error, icon: "none" });
			    }
			},
		}
	}
</script>

<style lang="less">
</style>

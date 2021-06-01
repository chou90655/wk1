<template>
	<view class="content login-content">
		<view class="uni-center">
			<img-cache class="logo-img" src="/static/logo.png"></img-cache>
		</view>
		<view class="uni-padding-wrap">
			<view class="form-row">
				<uni-easyinput prefixIcon="person" v-model="userInfo.name" placeholder="请输入用户名"></uni-easyinput>
			</view>
			<view class="form-row">
				<uni-easyinput type='password' prefixIcon="locked" v-model="userInfo.pass" placeholder="请输入密码"></uni-easyinput>
			</view>
			<uni-row>
				<uni-col :span='10' :offset="1">
					<view class="tip-text" @click="gotoGetPassword">忘记密码?</view>
				</uni-col>
				<uni-col :span='10' :offset="1">
					<view class="tip-text" style="text-align: right;" @click="gotoRegister">立即注册</view>
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col :span='10' :offset="1"><button type="primary" @click="userLogin">登录</button></uni-col>
				<uni-col :span='10' :offset="1"><button type="primary" @click="downApp">下载app</button></uni-col>
			</uni-row>
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
				userInfo:{
					name:'',
					pass:''
				}
			};
		},
		mounted() {
			var userInfo = this.remUser;
			if(null != userInfo){
				this.userInfo = userInfo;
			}
		},
		methods:{
			...mapActions(['login']),
			downApp(){
				uni.showToast({
					title:'下载app',
					icon:'none'
				})
			},
			userLogin(){
				if(this.userInfo.name.length < 6 || this.userInfo.pass.length < 6){
					uni.showToast({
						title:'请输入正确的用户账号或密码',
						icon:'none'
					})
					return;
				}
				//清空所有缓存
				uni.clearStorageSync();
				this.login(this.userInfo).then(res=>{
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
			},
			gotoGetPassword(){
				uni.navigateTo({
					url:'/pages/public/getPassword'
				})
			},
			gotoRegister(){
				uni.navigateTo({
					url:'/pages/public/register'
				})
			}
		}
	}
</script>

<style lang="less">
	.content{
	}
	.logo-img{
		padding-top: 30%;
		width: 361rpx;
		height: 394rpx;
	}

	.login-content{
		height: 100vh;
		background: url(../../static/bg/login-bg.png);
		background-size: 100% 100%;
	}
</style>

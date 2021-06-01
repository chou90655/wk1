<template>
	<view class="content">
		<view class="form-items">
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>真实姓名</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="请输入真实姓名" v-model="userbankname" />
			</view>
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>交易密码</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="password" maxlength="6" placeholder="请输入交易密码" v-model="tradepassword" />
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
	import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
	export default {
	    components:{
	    },
	    computed: {
	    	...mapGetters(['user', 'remUser']),
	    },
		data() {
			return {
				userbankname:'',
				tradepassword:''
			};
		},
	    onShow() {
			this.userbankname = this.user.userbankname;
	    },
	    methods:{
			submit(){
				var rule = [
				    {name:"userbankname", checkType : "string", checkRule:"2,20",  errorMsg:"请输入正确的真实姓名"},
					{name:"tradepassword", checkType : "string", checkRule:"6", errorMsg:"请输入正确的交易密码"}
				];
				var checkRes = graceChecker.check({userbankname: this.userbankname,tradepassword:this.tradepassword}, rule);
				if(checkRes){
				    uni.showToast({title:"验证通过!", icon:"none"});
					api.bindName({
						username: this.user.username,
						userbankname: this.userbankname,
						tradepassword: this.tradepassword,
					}).then(res=>{
						console.log(res)
						if (res.code == 0){
							uni.showToast({ title: res.message});
							this.$store.commit('CHANGE_USER_INFO', {'userbankname':this.userbankname});
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

<template>
	<view class="content">
		<view class="form-items">
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>QQ账号</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="请输入QQ号" v-model="qq" />
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
				qq:''
			};
		},
	    onShow() {
			this.qq = this.user.qq
	    },
	    methods:{
			submit(){
				var rule = [
				    {name:"qq", checkType : "int", checkRule:"5,12",  errorMsg:"请输入正确的QQ号"}
				];
				var checkRes = graceChecker.check({qq: this.qq}, rule);
				if(checkRes){
				    uni.showToast({title:"验证通过!", icon:"none"});
					api.getPersonalInfo({
						username: this.user.username,
						type:'1',
						qq: this.qq
					}).then(res=>{
						if(res.code == 0){
							uni.showToast({ title: res.message});
							this.$store.commit('CHANGE_USER_INFO', {"qq":this.qq});
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

<template>
	<view class="uni-padding-wrap">
		<form @submit="formSubmit">
			<view class="uni-form-item uni-column">
				<view class="title">用户名</view>
				<input class="uni-input" name="username" v-model="userInfo.username" placeholder="请输入用户名" />
			</view>
				<view class="uni-form-item uni-column">
					<view class="tip-text">
					请选择验证类型
					</view>
					<uni-row>
						<uni-col :span="7" :offset="1" v-for="(item, index) in tabs" :key='index'>
							<button type="primary" class="tab-button" :class="{'tab-button-active': tabsIndex==index}" @click="tabsIndex=index;">{{item.title}}</button>
						</uni-col>
					</uni-row>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">{{tabs[tabsIndex].title}}</view>
				<input class="uni-input" name="yztext" v-model="userInfo.yztext" :placeholder="tabs[tabsIndex].placeholder" />
			</view>
			<view class="uni-btn-v">
				<button form-type="submit" type="primary">找回密码</button>
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
				tabsIndex:0,
				tabs:[
					{'yztype':'tel', 'title':'手机号码', 'placeholder':'请输入手机号码'},
					{'yztype':'email', 'title':'邮箱', 'placeholder':'请输入邮箱账号'},
					{'yztype':'qq', 'title':'QQ', 'placeholder':'请输入QQ号码'},
				],
				userInfo:{
					username:'',
					yztype:'tel',
					yztext:''
				}
			};
		},
		onShow() {
		},
		methods:{
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
			    //定义表单规则
			    var rule = [
			        {name:"username", checkType : "string", checkRule:"4,10",  errorMsg:"用户名应为4-10个字符"},
					
			    ];
				switch (this.tabsIndex){
					case 0:
						rule.push({name:"yztext", checkType : "phoneno", checkRule:"11",  errorMsg:"请输入正确的手机号码"});
						break;
					case 1:
						rule.push({name:"yztext", checkType : "email", checkRule:"8,12",  errorMsg:"请输入正确的邮箱账号"})
						break;
					case 2:
						rule.push({name:"yztext", checkType : "string", checkRule:"6,12",  errorMsg:"请输入正确的QQ号码"})
						break;

				}
			    //进行表单检查
			    var formData = e.detail.value;
				formData.yztype=this.tabs[this.tabsIndex].yztype;
			    var checkRes = graceChecker.check(formData, rule);
			    if(checkRes){
					api.getPassword(formData).then(res=>{
						if (res.code == 0){
							this.$store.commit('SET_TOKEN_INFO', res.data);
							uni.navigateTo({
								url:'/pages/public/setPassword?username='+formData.username
							})
						}else{
							uni.showToast({ title: res.message, icon: "none" });
						}
					});
			    }else{
			        uni.showToast({ title: graceChecker.error, icon: "none" });
			    }
			},
			radioChange(evt) {
				this.userInfo.yztype = evt.detail.value;
			}
		}
	}
</script>

<style lang="less">
</style>

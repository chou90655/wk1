<template>
	<view class="content">
		<view class="panel-head uni-padding-wrap">
			<p>您的账号安全级别为:{{user.security}}</p>
			<uni-rate max="5" :value="user.security_level" color="#bbb" size="36" readonly="true"/>
			<p>上次登陆:{{user.logintime | formatDate}}</p>
			<p>ip:{{user.loginip}}</p>
		</view>
		<uni-section type="line" title="账户安全"></uni-section>
		<view class="form-items">
			<view class="uni-flex uni-row uni-form-item-date" @click="changePass('1')">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>登陆密码</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<text class="uni-form-item__input">修改</text>
				<uni-icons type="arrowright" color="#000000" size="18" />
			</view>
			<view class="uni-flex uni-row uni-form-item-date"  @click="changePass('2')">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>交易密码</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<text class="uni-form-item__input">修改</text>
				<uni-icons type="arrowright" color="#000000" size="18" />
			</view>
			<!-- <view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>密保问题</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<text class="uni-form-item__input">去修改</text>
				<uni-icons type="arrowright" color="#000000" size="18" />
			</view>
			<view class="uni-flex uni-row uni-form-item-date" @click="changePhone()">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>密保手机</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" :placeholder="user.tel!=''?'请输入手机号':'去绑定'" v-model="user.tel" disabled/>
				<uni-icons type="arrowright" color="#000000" size="18" />
			</view>
			<view class="uni-flex uni-row uni-form-item-date" @click="changeEmail()">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>密保邮箱</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" :placeholder="user.source!=''?'请输入邮箱':'去绑定'" v-model="user.email" disabled/>
				<uni-icons type="arrowright" color="#000000" size="18" />
			</view> -->
			<view class="uni-flex uni-row uni-form-item-date" @click="viewCards()">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>银行卡管理</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<text class="uni-form-item__input">查看</text>
				<uni-icons type="arrowright" color="#000000" size="18" />
			</view>
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
				};
			},
	    onShow() {
	    },
	    methods:{
			changePass(type){
				uni.navigateTo({
					url:"/pages/bind/password?type=" + type
				})
			},
			changePhone(){
				uni.navigateTo({
					url:'/pages/bind/bindPhone'
				})
			},
			changeEmail(){
				uni.navigateTo({
					url:'/pages/bind/bindEmail'
				})
			},
			viewCards(){
				uni.navigateTo({
					url:'/pages/bind/cards'
				})
			}
	    },
		//时间戳的处理    
        filters: {
            formatDate: function(value) {
                var date = new Date();
				console.log(value)
                date.setTime(value*1000);
                var month = date.getMonth() + 1;
                var hours = date.getHours();
				var minutes = date.getMinutes();
				var second = date.getSeconds();
                if (hours < 10)
                    hours = "0" + hours;
                if (minutes < 10)
                    minutes = "0" + minutes;
				if (second < 10)
					second = "0" + second;
                var time = date.getFullYear() + "-" + month + "-" + date.getDate() +
                    " " + hours + ":" + minutes + ":" + second;
                return time;
            }

        },
	}
</script>

<style lang="scss">
	.panel-head{
		display:flex;
		flex-direction: column;
		align-items: center;
		p{
			font-size: 28rpx;
			color: #878996;
		}
	}
	.uni-form-item__input{
		width: auto;
		// padding-right: 5%;
	}
	
</style>

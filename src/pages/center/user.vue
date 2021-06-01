<template>
	<view class="content">
		<view class="form-items">
			<view class="uni-flex uni-row uni-form-item-date" style="height: 130rpx;" @click="showHeads()">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>头像</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;text-align: right;padding-right: 10rpx;">去更换</view>
				<img-cache class="user-head" :src="user.face"></img-cache>
			</view>
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>账号</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text"  v-model="user.username" disabled/>
			</view>
			<view class="uni-flex uni-row uni-form-item-date" @click="changeName()">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>真实姓名</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="未设置" v-model="user.userbankname" disabled/>
				<uni-icons type="arrowright" color="#000000" size="18" />
			</view>
			<view class="uni-flex uni-row uni-form-item-date" @click="changePhone()">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>手机号</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="未设置" v-model="user.tel" disabled/>
				<uni-icons type="arrowright" color="#000000" size="18" />
			</view>
			<view class="uni-flex uni-row uni-form-item-date" @click="changeEmail()">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>邮箱</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="未设置" v-model="user.email" disabled/>
				<uni-icons type="arrowright" color="#000000" size="18" />
			</view>
			<view class="uni-flex uni-row uni-form-item-date" @click="changeQQ()">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>QQ</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="未设置" v-model="user.qq" disabled/>
				<uni-icons type="arrowright" color="#000000" size="18" />
			</view>
		</view>
		<!-- 分享示例 -->
		<uni-popup id="popupShare"  ref="popupShare" type="share" @change="change">
			<uni-popup-share title="选择您的头像" :facelist='facelist' @select="select"></uni-popup-share>
		</uni-popup>
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
				formData:{
					userbankname: '',
					qq:''
				},
				facelist:[]
			};
		},
		onLoad() {
		},
	    onShow() {
			this.formData.userbankname = this.user.userbankname;
			this.formData.username = this.user.username;
			this.getFace({type:'', face:''});
	    },
	    methods:{
			getFace({type, face}){
				api.getFace({
					username:this.user.username,
					type:type,
					face: face
				}).then(res=>{
					if(res.code==0){
						if(face == ''){
							res.data.forEach(item=>{
								item.push(api.getFileAccessHttpUrl(item[0]));
							})
							this.facelist = res.data;
						}else{
							this.$store.commit('CHANGE_USER_FACE', face);
						}
					}
				})
			},
			getPersonalInfo(){
				api.getPersonalInfo().then(res=>{

				})
			},
			showHeads(){
				this.$refs.popupShare.open();
			},
			/**
			 * 选择内容
			 */
			select(e, done) {
				var face = '' + e.item[0];
				this.getFace({type:'1', face: face});
				/*uni.showToast({
					title: `您选择了第${e.index+1}项：${e.item[0]}`,
					icon: 'none'
				})*/
				done()
			},
			/**
			 * popup 状态发生变化触发
			 * @param {Object} e
			 */
			change(e) {
				console.log('popup ' + e.type + ' 状态', e.show)
			},
			changeName(){
				uni.navigateTo({
					url:'/pages/bind/bindName'
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
			changeQQ(){
				uni.navigateTo({
					url:'/pages/bind/bindQQ'
				})
			},
	    }
	}
</script>

<style lang="scss">
	.user-head{
		width: 84rpx;
		height: 84rpx;
		border:6rpx solid #fff;
		border-radius: 118rpx;
	}
</style>

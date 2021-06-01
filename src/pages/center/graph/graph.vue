<template>
	<view class="content">
		<uni-row class="user-info">
			<uni-col :offset="2" :span="10" >账户余额:<span>655元</span></uni-col>
			<uni-col :span="12">账户余额:<span>655元</span></uni-col>
		</uni-row>
		<uni-row class="user-info">
			<uni-col :offset="2" :span="10"  >账户余额:<span>655元</span></uni-col>
			<uni-col :span="12">账户余额:<span>655元</span></uni-col>
		</uni-row>
		<view class="form-items">
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>转入类型</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<view @click="showTypes()" style="width: 340rpx;">
				{{typeTitle}}
				<uni-icons type="arrowdown" color="#000000" size="18" />
				</view>
			</view>
			<view class="uni-flex uni-row uni-form-item-date">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>转入金额</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<input class="uni-form-item__input" type="text" placeholder="请输入转入金额" v-model="formData.amount" />
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
				formData:{
					type:'',
					amount:0
				},
				typeTitle:'',
				isdrawIndex:0,
				types:[{title:'1', type:1},{title:'2', type:2},{title:'3', type:3}]
			};
		},
	    onShow() {
	    },
	    methods:{
			showTypes(){
				var self = this;
				var isdrawItems = [];
				this.types.forEach(item=>{
					isdrawItems.push(item.title);
				});
				uni.showActionSheet({
					itemList:isdrawItems,
					success: function(res){
						self.isdrawIndex = res.tapIndex;
						self.typeTitle = self.types[res.tapIndex].title;
						self.formData.type = self.types[res.tapIndex].type;
					}
				})
			}
	    }
	}
</script>

<style lang="scss">
	.user-info{
		height: 72rpx;
		line-height: 72rpx;

		span{
			color: $uni-color-primary;
		}
	}
</style>

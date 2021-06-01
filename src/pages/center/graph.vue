<template>
	<view class="content">
		<view class="form-items">
			<view class="uni-flex uni-row uni-form-item-date" @click="gotoGraph()">
				<view style="width: 200rpx;" class="uni-form-item__label">
					<text>余额宝转取</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
				<uni-icons type="arrowright" color="#000000" size="18" />
			</view>
			<view class="uni-flex uni-row uni-form-item-date" v-for="(item, index) in links" :key='index' @click="navto(item)">
				<view style="width: 500rpx;" class="uni-form-item__label">
					<text>{{item.title}}</text>
				</view>
				<view style="-webkit-flex: 1;flex: 1;"></view>
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
				links:[
					{
						title:'余额宝活期记录',
						link:'/pages/center/graph/list',
						type:'1'
					},
					{
						title:'余额宝定期记录',
						link:'/pages/center/graph/list',
						type:'2'
					},
					{
						title:'余额宝收益记录',
						link:'/pages/center/graph/list',
						type:'3'
					},
					{
						title:'余额宝存取记录',
						link:'/pages/center/graph/list',
						type:'4'
					},
					{
						title:'定期存取记录',
						link:'/pages/center/graph/list',
						type:'5'
					}
				]
			};
		},
	    onShow() {
	    },
	    methods:{
			gotoGraph(){
				uni.navigateTo({
					url:'/pages/center/graph/graph'
				})
			},
			navto(item){
				uni.navigateTo({
					url:item.link + `?type=${item.type}&title=${item.title}`
				})
			}
		}
	}
</script>

<style lang="scss">
</style>

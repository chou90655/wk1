<template>
	<view class="content" style="padding: 20rpx 0;">
		<view v-if="null != ggData.root && ggData.root.length > 0">
			<scroll-view class="news-list" :scroll-y="true">
				<view v-for="(item, index) in ggData.root" :key='index' class="panel-info" @click="gotoNew(item)">
					<uni-row>
						<uni-col :span="12">
							<text class="panel-info-label">标题:</text>
							<text class="panel-info-value">{{item.title}}</text>
						</uni-col>
						<uni-col :span="12">
							<text class="panel-info-label">创建时间:</text>
							<text class="panel-info-value">{{item.oddtime}}</text>
						</uni-col>
					</uni-row>
				</view>
			</scroll-view>
			<uni-pagination :current="formData.p" :total="ggData.total" :pageSize='10' title="标题文字" :show-icon="true" @change="change" />
		</view>
		<view style="padding: 20rpx;" v-if="null == ggData.root || ggData.root.length <= 0">
			公告列表为空!
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
					p:1,
					pageSize:10
				},
				ggData:{
					total:0,
					root:[]
				}
			};
		},
	    onShow() {
			this.getGg();
	    },
	    methods:{
			getGg(){
				api.getGg(this.formData).then(res=>{
					if(res.code == 0){
						this.ggData = res.data;
						this.ggData.total = parseInt(this.ggData.total);
					}else{
						uni.showToast({
							title:res.message,
							icon:'none'
						})
					}
					
				})
			},
			change(e) {
				this.formData.p = e.current;
				this.getGg();
			},
			gotoNew(ggBin){
				uni.navigateTo({
					url:'/pages/newslist/newsdetail?newBin=' + JSON.stringify(ggBin)
				})
			}
	    }
	}
</script>

<style lang="scss">
	.news-list{
		height: calc(100vh - 200rpx);
	}
	.uni-row{
		width: 100%;
	}
	.panel-info{
		display: flex;
		align-items: center;
	}
</style>

<template>
	<view class="content" style="padding-top: 30rpx;">
		<uni-row class="globe-tabs">
			<uni-col :span="5" :offset="1" v-for="(item, index) in tabBtns" :key='index' >
				<view class="tab-bar-btn" :class="{active:index == tabIndex}" @click="switchBar(index)">
					<text class="sidebar-title">{{item.title}}</text>
				</view>
			</uni-col>
		</uni-row>
		<agent-detail v-if="tabIndex == 0"></agent-detail>
		<agent-user v-if="tabIndex == 1"></agent-user>
		<agent-member v-if="tabIndex == 2"></agent-member>
		<agent-member-online v-if="tabIndex == 3"></agent-member-online>
		<agent-game v-if="tabIndex == 4"></agent-game>
		<agent-change v-if="tabIndex == 5"></agent-change>
		<agent-charge v-if="tabIndex == 6"></agent-charge>
		<agent-report v-if="tabIndex == 7"></agent-report>
	</view>
</template>

<script>
	import api from '@/api/api.js'
	import {mapState, mapGetters, mapActions} from 'vuex'

	import agentDetail from './globelist/agent-detail.vue'
	import agentUser from './globelist/agent-user.vue'
	import agentMember from './globelist/agent-member.vue'
	import agentMemberOnline from './globelist/agent-member-online.vue'
	import agentGame from './globelist/agent-game.vue'
	import agentChange from './globelist/agent-change.vue'
	import agentCharge from './globelist/agent-charge.vue'
	import agentReport from './globelist/agent-report.vue'
	export default {
	    components:{
			agentDetail,
			agentUser,
			agentMember,
			agentMemberOnline,
			agentGame,
			agentChange,
			agentCharge,
			agentReport
	    },
	    computed: {
	    	...mapGetters(['user', 'remUser']),
	    },
		data() {
			return {
				tabIndex:0,
				tabBtns:[{
					title:'概况'
				},{
					title:'开户'
				},{
					title:'下线'
				},{
					title:'在线'
				},{
					title:'游戏'
				},{
					title:'账变'
				},{
					title:'充提'
				},{
					title:'报表'
				}]
			};
		},
	    onShow() {
	    },
	    methods:{
			switchBar(index){
				this.tabIndex = index;
			}
	    }
	}
</script>

<style lang="scss">
	.globe-tabs{
		padding-right: 20rpx;
		.active{
			background: linear-gradient(90deg, #9B98FF, #40B9FF) !important;

			.sidebar-title{
				color: #FFFFFF !important;
			}
		}
		.tab-bar-btn{
			height: 72rpx;
			border-radius: 72rpx;
			text-align: center;
			border: 1rpx solid #D5D5D5;
			background: #fff;
			margin-bottom: 20rpx;

			.sidebar-title{
				font-size: 25rpx;
				font-family: PingFang;
				font-weight: 500;
				color: #929292;
				line-height: 72rpx;
			}
		}
	}
</style>

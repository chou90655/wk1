<template>
	<view class="content uni-padding-wrap">
		<view class="vip-head">
			<view class="vip-tip">当前等级:<text style="color: #FF0000;">代理</text></view>
			<button type="primary">无奖励</button>
		</view>
		<div class="promotion_main">
			<div class="promotion_rule">
				<h2 class="promotion_h2">
					普级机制
				</h2>
				<table class="am-table am-table-bordered">
					<thead>
						<tr>
							<th>等级</th>
							<th>成长积分</th>
							<th>晋级奖励</th>
							<th>跳级奖励</th>
						</tr>
					</thead>
					<tbody>
					<tr>
							<td>VIP1</td>
							<td>0</td>
							<td>0</td>
							<td>0</td>
						</tr><tr>
							<td>VIP2</td>
							<td>10000</td>
							<td>38</td>
							<td>38</td>
						</tr><tr>
							<td>VIP3</td>
							<td>50000</td>
							<td>188</td>
							<td>229</td>
						</tr><tr>
							<td>VIP4</td>
							<td>100000</td>
							<td>388</td>
							<td>623</td>
						</tr><tr>
							<td>VIP5</td>
							<td>200000</td>
							<td>688</td>
							<td>1329</td>
						</tr><tr>
							<td>VIP6</td>
							<td>500000</td>
							<td>1288</td>
							<td>2671</td>
						</tr><tr>
							<td>VIP7</td>
							<td>800000</td>
							<td>1888</td>
							<td>4730</td>
						</tr><tr>
							<td>VIP8</td>
							<td>1000000</td>
							<td>2888</td>
							<td>8122</td>
						</tr><tr>
							<td>VIP9</td>
							<td>1500000</td>
							<td>5888</td>
							<td>15522</td>
						</tr>				</tbody>
				</table>
			</div>
			<div class="promotion_explain">
				<h2 class="promotion_h2">
					活动说明
				</h2>
				<p>1、会员每晋升一个等级，都能获得奖励，最高可达5888元。</p>
				<p>2、充值1元可获得1成长积分。</p>
				<br>
				<p>例1：奥巴马从VIP1直接晋升到VIP4，他将能获得1+5+10=16元奖励。</p>
				<p>例2：本拉登从VIP2直接晋升到VIP4，他将能获得5+10=15元奖励。</p>
				<br>
			</div>
		</div>
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
		onLoad() {
			this.getPromotion();
		},
	    onShow() {
	    },
	    methods:{
			getPromotion(){
				api.getPromotion({
					username:this.user.username,
					type:''
				}).then(res=>{

				})
			}
	    }
	}
</script>

<style lang="scss">
	.vip-head{
		height: 200rpx;
	}
	.vip-tip{
		height: 130rpx;
		line-height: 130rpx;
	}

	.promotion_main{
		margin-top: 20rpx;
		background: #ffffff;
		padding: 20rpx;
		border-radius: 10rpx;
	}

	.am-table-bordered {
	    border: 1px solid #ddd;
	    border-left: none;
	}
	.am-table {
	    width: 100%;
	    margin-bottom: 1.6rem;
	    border-spacing: 0;
	    border-collapse: separate;
	}
	table {
	    max-width: 100%;
	    background-color: transparent;
	    empty-cells: show;
	}
</style>

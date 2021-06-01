<template>
	<view class="content uni-padding-wrap">
		<div class="activity_content">
			<div class="activity_info1">

													<table class="am-table am-table-bordered" style="font-size: 12px;">
					<tbody>
					<tr><th>VIP等级</th><th>流水金额</th><th>反水比例</th><th>领取金额</th><th>领取时间</th><th>状态</th></tr>
														</tbody>
				</table>									<div class="ty_page pages" id="lrx_ty_page"></div>
			</div>
			<div class="activity_info2"> 
				<h3 class="activity_common_h3">
					加奖比例
				</h3>
				<table class="table table-bordered" style="width: 100% !important;">
					<thead>
						<tr>
							<th class="ths">
								<i>等级</i>
								<ins></ins>
								<em>昨日投注</em>
							</th>
							<th>100+</th><th>10000+</th><th>100000+</th>			                				</tr>
					</thead>
					<tbody>
					  <tr>
							<td>VIP1</td>
							<td>0.1%</td>
							<td>0.2%</td>
							<td>0.3%</td>
						</tr><tr>
							<td>VIP2</td>
							<td>0.2%</td>
							<td>0.3%</td>
							<td>0.4%</td>
						</tr><tr>
							<td>VIP3</td>
							<td>0.3%</td>
							<td>0.4%</td>
							<td>0.5%</td>
						</tr><tr>
							<td>VIP4</td>
							<td>0.4%</td>
							<td>0.5%</td>
							<td>0.6%</td>
						</tr><tr>
							<td>VIP5</td>
							<td>0.5%</td>
							<td>0.6%</td>
							<td>0.7%</td>
						</tr><tr>
							<td>VIP6</td>
							<td>0.6%</td>
							<td>0.7%</td>
							<td>0.8%</td>
						</tr><tr>
							<td>VIP7</td>
							<td>0.7%</td>
							<td>0.8%</td>
							<td>0.9%</td>
						</tr><tr>
							<td>VIP8</td>
							<td>0.8%</td>
							<td>0.9%</td>
							<td>1.0%</td>
						</tr><tr>
							<td>VIP9</td>
							<td>1.0%</td>
							<td>1.1%</td>
							<td>1.2%</td>
						</tr>			                			</tbody>
				</table>
			</div>
			<div class="activity_info3">
				<h3 class="activity_common_h3">
					活动说明
				</h3>
				<p>1、每日加奖在每日凌晨00:20后开放领取；</p>
				<p>2、每日加奖是根据会员昨日投注金额进行加奖，奖金无上限；</p>
				<!--<p>3、需Vip3以上且昨日投注额大于或等于100才能获得加奖；</p>-->
				<p>3、撤单和其他无效投注将不计算在内；</p>
				<p>4、提款后相应的降级将会影响加奖的比例。</p>
				<p>5、活动奖金逾期未领取，视为自动放弃活动资格。</p>
				<p>6、反水比例仅限彩票游戏。</p>

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
			this.getFanshui('');
		},
	    onShow() {
	    },
	    methods:{
			getFanshui(type){
				api.getFanshui({
					username:this.user.username,
					type:type
				}).then(res=>{

				})
			}
	    }
	}
</script>

<style lang="scss">
	.activity_content{
		background: #ffffff;
	}
</style>

<template>
	<view class="content">
		<uni-segmented-control styleType="text" :values="controls" :current="current" @clickItem="onClickItem" ></uni-segmented-control>
		<view class="control-content">
			<view v-if="current == 0">
				<view class="panel-info" >
					<p>温馨提示：</p><p>1、自动注册的会员初始密码为“123456”。 </p>
					<p>2、为提高服务器效率，系统将自动清理注册一个月没有充值，或2个 月未登陆，并且金额低于10元的账户。 </p>
					<p>3、固定推广链接(点击即可复制)</p>
					<p @click="copyLink()">
						<uni-easyinput :value="staticUrlText" :disabled="true"></uni-easyinput>
					</p>
					<p>4、专属推广码(点击即可复制)</p>
					<p @click="copyCode()">
						<uni-easyinput :value="user.referral_code"></uni-easyinput>
					</p>
				</view>
				<view class="form-items">
					<view class="uni-flex uni-row uni-form-item-date">
						<view style="width: 200rpx;" class="uni-form-item__label">
							<text>开户类别</text>
						</view>
						<view style="-webkit-flex: 1;flex: 1;"></view>
						<radio-group class="uni-form-item__input" @change="isProxyChange">
							<label>
								<radio color="#697AFF" style="transform:scale(0.8)" value="0" :checked="formData.isProxy==0"/><text>玩家</text>
							</label>
							<label>
								<radio color="#697AFF" style="transform:scale(0.8)" value="1" :checked="formData.isProxy==1"/><text>代理</text>
							</label>
						</radio-group>
					</view>
					<view class="uni-flex uni-row uni-form-item-date">
						<view style="width: 200rpx;" class="uni-form-item__label">
							<text>用户名</text>
						</view>
						<view style="-webkit-flex: 1;flex: 1;"></view>
						<input class="uni-form-item__input" type="text" placeholder="请输入用户名" v-model="formData.addname" />
					</view>
					<view class="uni-flex uni-row uni-form-item-date">
						<view style="width: 200rpx;" class="uni-form-item__label">
							<text>奖金组</text>
						</view>
						<view style="-webkit-flex: 1;flex: 1;"></view>
						<input class="uni-form-item__input" type="number" :placeholder="'奖金组范围' + getRebate()" v-model="formData.rebate" />
					</view>
				</view>
				<view style="margin-top: 20rpx;padding: 0 20rpx;">
					<button type="primary" @click="agentAddUser()">添加账户</button>
				</view>
			</view>
			<view v-if="current == 1" style="min-height: 600rpx;">
				<view class="form-items">
					<view class="uni-flex uni-row uni-form-item-date">
						<view style="width: 200rpx;" class="uni-form-item__label">
							<text>开户类别</text>
						</view>
						<view style="-webkit-flex: 1;flex: 1;"></view>
						<radio-group class="uni-form-item__input" @change="isProxyChange">
							<label>
								<radio color="#697AFF" style="transform:scale(0.8)" value="0" :checked="formData.isProxy==0"/><text>玩家</text>
							</label>
							<label>
								<radio color="#697AFF" style="transform:scale(0.8)" value="1" :checked="formData.isProxy==1"/><text>代理</text>
							</label>
						</radio-group>
					</view>
					<view class="uni-flex uni-row uni-form-item-date">
						<view style="width: 200rpx;" class="uni-form-item__label">
							<text>模版类型</text>
						</view>
						<view style="-webkit-flex: 1;flex: 1;"></view>
						<radio-group class="uni-form-item__input" @change="isTpltypeChange">
							<label>
								<radio color="#697AFF" style="transform:scale(0.8)" value="0" :checked="tpltype==0"/><text>0</text>
							</label>
							<label>
								<radio color="#697AFF" style="transform:scale(0.8)" value="1" :checked="tpltype==1"/><text>1</text>
							</label>
							<label>
								<radio color="#697AFF" style="transform:scale(0.8)" value="2" :checked="tpltype==2"/><text>2</text>
							</label>
							<label>
								<radio color="#697AFF" style="transform:scale(0.8)" value="3" :checked="tpltype==3"/><text>3</text>
							</label>
						</radio-group>
					</view>
					<view class="uni-flex uni-row uni-form-item-date">
						<view style="width: 200rpx;" class="uni-form-item__label">
							<text>使用次数</text>
						</view>
						<view style="-webkit-flex: 1;flex: 1;"></view>
						<input class="uni-form-item__input" type="number" placeholder="请输入返点" v-model="times" />
					</view>
					<view class="uni-flex uni-row uni-form-item-date">
						<view style="width: 200rpx;" class="uni-form-item__label">
							<text>奖金组</text>
						</view>
						<view style="-webkit-flex: 1;flex: 1;"></view>
						<input class="uni-form-item__input" type="number" :placeholder="'奖金组范围' + getRebate()" v-model="formData.rebate" />
					</view>
				</view>
				<view style="margin-top: 20rpx;padding: 0 20rpx;">
					<button type="primary" @click="addsignupLink()">生成链接</button>
				</view>
				<view>
					<text>{{signupLink}}</text>
				</view>
			</view>
			<scroll-view v-if="current == 2" class="link-list" :scroll-y="true">
				<view class="panel-info" v-for='(item, index) in linklist' :key='index'>
					<uni-row>
						<uni-col :span="12">
							<text class="panel-info-label">用户类型:</text>
							<text class="panel-info-value">{{item.proxy==0?'用户':'代理'}}</text>
						</uni-col>
						<uni-col :span="12">
							<text class="panel-info-label">奖金组:</text>
							<text class="panel-info-value">{{item.fandian}}</text>
						</uni-col>
					</uni-row>
					<uni-row>
						<uni-col :span="12">
							<text class="panel-info-label">总次数:</text>
							<text class="panel-info-value">{{item.usenum}}</text>
						</uni-col>
						<uni-col :span="12">
							<text class="panel-info-label">使用次数:</text>
							<text class="panel-info-value">{{item.okusenum}}</text>
						</uni-col>
					</uni-row>
					<uni-row>
						<uni-col :span="18">
							<text class="panel-info-label">使用模版:</text>
							<text class="panel-info-value">{{item.tpltype}}</text>
						</uni-col>
						<uni-col :span="6">
							<button type="warn" size="mini" @click="delLink(item)">删除</button>
						</uni-col>
					</uni-row>
					<uni-row>
						<uni-col :span="18">
							<text class="panel-info-label">创建时间:</text>
							<text class="panel-info-value">{{item.oddtime}}</text>
						</uni-col>
						<uni-col :span="6">
							<button type="primary" size="mini" @click="showLink(item)">查看</button>
						</uni-col>
					</uni-row>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import api from '@/api/api.js'
	import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'
	import graceChecker from '../../../common/graceChecker.js'
	import {
		friendlyDate
	} from '@/components/uni-dateformat/date-format.js'
	import {mapState, mapGetters, mapActions} from 'vuex'
	export default {
	    components:{
	    },
	    computed: {
	    	...mapGetters(['user', 'remUser']),
	    },
		data() {
			return {
				current:0,
				controls:['普通开户', '链接开户', '链接管理'],
				formData:{
					username:'',
					addname:'',
					type:'', //1为获取 留空或其他则为添加账户
					isProxy:'1', //是否开代理户 1为代理户 0为玩家
					rebate:'' //返点
				},
				porxyRebate:"1800,",
				userRebate:"1800,",
				times:100 ,//使用次数
				tpltype:1,
				signupLink:'',
				pageNo:1,
				pageSize:10,
				linklist:[],
				staticUrlText:''
			};
		},
		watch:{
			userType:function(val){
				switch (val){
					case '玩家':
						this.formData.isProxy = '0';
						break;
					case '代理':
						this.formData.isProxy = '1';
						break;
					default:
						break;
				}
			}
		},
		mounted() {
			this.formData.username = this.user.username;
			this.staticUrlText = api.geMobielAccessHttpUrl(`${this.user.id}`); //&referralCode=${this.user.referral_code}
			//获取用户奖金组
			api.agentAddUser({
					username: this.user.username,
					type:'1', //1为获取 留空或其他则为添加账户
					isProxy:'0', //是否开代理户 1为代理户 0为玩家
					rebate:'' //返点
				}).then(res=>{
				if(res.code == 0){
					this.userRebate += res.data.maxRebate;
				}
			});

			//获取代理奖金组
			api.agentAddUser({
					username: this.user.username,
					type:'1', //1为获取 留空或其他则为添加账户
					isProxy:'1', //是否开代理户 1为代理户 0为玩家
					rebate:'' //返点
				}).then(res=>{
				if(res.code == 0){
					this.porxyRebate += res.data.maxRebate;
				}
			});
		},
	    onShow() {
	    },
	    methods:{
			getRebate(){
				if(this.formData.isProxy == '0'){
					return this.userRebate;
				}else{
					return this.porxyRebate;
				}
			},
			copyLink(){
				uniCopy({
					content: this.staticUrlText,
					success:(res)=>{
						uni.showToast({
							title:'固定推广链接复制成功',
							icon:'none'
						})
					},
					error:(e)=>{
					}
				})
			},
			copyCode(){
				uniCopy({
					content: this.user.referral_code,
					success:(res)=>{
						uni.showToast({
							title:'邀请码复制成功',
							icon:'none'
						})
					},
					error:(e)=>{
					}
				})
			},
			isProxyChange(evt){
				this.formData.isProxy = evt.detail.value;
			},
			isTpltypeChange(evt){
				this.tpltype = evt.detail.value;
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
					if(this.current == 2){
						this.linklist = [];
						this.getLinklist();
					}
				}
			},
			agentAddUser(){
				var rule = [
				    {name:"addname", checkType : "string", checkRule:"4,10",  errorMsg:"用户名应为4-10个字符"},
				    {name:"rebate", checkType : "between", checkRule: this.getRebate(),  errorMsg:"奖金组范围" + this.getRebate()}
				];

				//进行表单检查
				var checkRes = graceChecker.check(this.formData, rule);
				var self = this;
				if(checkRes){
				    api.agentAddUser(this.formData).then(res=>{
						if(res.code == 0){
							var text = '添加用户成功!';
							if(self.formData.isProxy == '1'){
								text = '添加代理成功!';
							}
							uni.showToast({ title: text, icon: "none" });
						}else{
							uni.showToast({ title: res.message, icon: "none" });
						}
					});
				}else{
				    uni.showToast({ title: graceChecker.error, icon: "none" });
				}
			},
			addsignupLink(){
				var rule = [
				    {name:"rebate", checkType : "between", checkRule:"1800,1985.2",  errorMsg:"奖金组范围1800-1985.2"}
				];
				var data = {
					username: this.user.username,
					times: this.times,
					isProxy: this.formData.isProxy,
					rebate: this.formData.rebate,
					tpltype: this.tpltype
				};
				//进行表单检查
				var checkRes = graceChecker.check(data, rule);
				if(checkRes){
					api.addsignupLink(data).then(res=>{
						uni.showToast({ title: res.message, icon: "none" });
						if(res.code == 0){

						}
					});
				}else{
				    uni.showToast({ title: graceChecker.error, icon: "none" });
				}
			},
			getLinklist(){
				var data = {
					username: this.user.username,
					p:this.pageNo,
					pagesize: this.pageSize
				}
				api.getLinklist(data).then(res=>{
					if(res.code == 0){
						this.pageNo++;
						this.linklist = res.data.root;
					}
				})
			},
			showLink(item){
				var urlText = api.geMobielAccessHttpUrl(`linkid/${item.linkid}`); //&referralCode=${this.user.referral_code}
				uni.showModal({
					title: '点击确定即可复制',
					content: urlText,
					success: function (res) {
						if (res.confirm) {
							uniCopy({
								content:urlText,
								success:(res)=>{
									uni.showToast({
										title:'邀请人推广链接复制成功',
										icon:'none'
									})
								},
								error:(e)=>{
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			delLink(item){
				api.delLink({
					username: this.user.username,
					linkid: item.linkid
				}).then(res=>{
					if(res.code == 0 || res.code == 994){
						this.pageNo = 1;
						this.getLinklist();
					}
				})
			}
	    }
	}
</script>

<style lang="scss">
	.control-content{
		margin: 20rpx 0;
	}
	.link-list{
		padding: 20rpx 0;
		height: calc(100vh - 490rpx);
	}
</style>

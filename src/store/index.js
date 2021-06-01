import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/api.js'
import {USER_INFO, REM_USER, ACCESS_TOKEN, TOKEN_INFO, LOTTERY_HALL, USER_DETAILS} from '../common/util/constants.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		user:null,
		token:'',
		tokenInfo:null,
		lotteryHall:[],
		sideBars:[{
				title:'全部彩种',
				type:''
			},{
				title:'快三',
				type:'k3'
			},{
				title:'时时彩',
				type:'ssc'
			},
			{
				title:'快乐八',
				type:'keno'
			},
			{
				title:'赛车PK拾',
				type:'pk10'
			},
			{
				title:'3D',
				type:'dpc'
			},
			{
				title:'六合彩',
				type:'lhc'
			},
			{
				title:'十一选五',
				type:'x5'
			}],
		isdraws:[{
				title:'全部',
				isdraw:''
			},{
				title:'已中奖',
				isdraw:'1'
			},{
				title:'未中奖',
				isdraw:'-1'
			},{
				title:'等待开奖',
				isdraw:'0'
			},{
				title:'撤单',
				isdraw:'-2'
			}],
		changetypes:[
			{
				type:'',
				title:'全部'
			},
			{
				type:'order',
				title:'代购'
			},
			{
				type:'cancel',
				title:'撤单'
			},
			{
				type:'reward',
				title:'返奖'
			},
			{
				type:'commission',
				title:'返点'
			},
			{
				type:'activity',
				title:'活动'
			},
			{
				type:'transferPlatform',
				title:'平台转帐'
			},
			{
				type:'backwater',
				title:'百家乐返水'
			},
			{
				type:'backpoint',
				title:'百家乐返点'
			},{
				type:'rollback',
				title:'后台撤单'
			},{
				type:'editcommission',
				title:'修正手续费'
			},
			{
				type:'editrecharge',
				title:'修正充值'
			},
			{
				type:'editwithdraw',
				title:'修正提款'
			},
			{
				type:'editactivity',
				title:'修正活动'
			},
			{
				type:'downrecharge',
				title:'下级充值'
			},{
				type:'upwithdraw',
				title:'上级提款'
			},
			{
				type:'withdrawFailure',
				title:'提款失败'
			}
		],
		chargeStatus:[
			{
				title:'全部',
				status:''
			},
			{
				title:'已审核',
				status:'0'
			},
			{
				title:'未审核',
				status:'1'
			},
			{
				title:'退回取消',
				status:'-1'
			}
		],
		userDetails:null
	},
	mutations: {
		SET_USER(state, user){
			if(null !=user && undefined != user.face){
				user.face = api.getFileAccessHttpUrl(user.face);
				state.user = user;
				uni.setStorageSync(USER_INFO, user);
			}else{
				uni.removeStorageSync(USER_INFO);
			}
		},
		SET_TOKEN_INFO(state, tokenInfo){
			state.tokenInfo = tokenInfo;
			if(null!=tokenInfo && undefined != tokenInfo.token && null != tokenInfo.token){
				uni.setStorageSync(ACCESS_TOKEN, tokenInfo.token);
			}else{
				uni.setStorageSync(ACCESS_TOKEN, null);
			}
			uni.setStorageSync(TOKEN_INFO, tokenInfo);
		},
		SET_REM_USER(state, userInfo){
			uni.setStorageSync(REM_USER, userInfo);
		},
		SET_LOTTERY_HALL(state, lotteryHall){
			state.lotteryHall = lotteryHall;
			uni.setStorageSync(LOTTERY_HALL, lotteryHall);
		},
		SET_USER_DETAILS(state, userDetails){
			state.userDetails = userDetails;
			uni.setStorageSync(USER_DETAILS, userDetails);
		},
		CHANGE_USER_FACE(state, face){
			var user = uni.getStorageSync(USER_INFO);
			if(null != user && undefined != user){
				user.face = face;
				user.face = api.getFileAccessHttpUrl(user.face);
				state.user = user;
				uni.setStorageSync(USER_INFO, user);
			}
		},
		CHANGE_USER_INFO(state, vulus){
			var user = uni.getStorageSync(USER_INFO);
			if(null != user && undefined != user){
				for(var key in vulus){
					user[key] = vulus[key];
			　　}
				state.user = user;
				uni.setStorageSync(USER_INFO, user);
			}
		},
	},
	getters: {
		user:function(state){
			var userInfo = state.user;
			if(null == userInfo || undefined == userInfo || '' == userInfo){
				userInfo = uni.getStorageSync(USER_INFO);
			}
			if(null == userInfo || undefined == userInfo || '' == userInfo){
				userInfo = null;
			}else{
				state.user = userInfo;
			}
			console.log(userInfo);
			return userInfo;
		},
		remUser:function(state){
			var userInfo = uni.getStorageSync(REM_USER);
			if(null == userInfo || undefined == userInfo || '' == userInfo){
				userInfo = null;
			}
			return userInfo;
		},
		lotteryHall:function(state){
			var lotteryHall = uni.getStorageSync(LOTTERY_HALL);
			if(null == lotteryHall || undefined == lotteryHall || '' == lotteryHall){
				lotteryHall = null;
			}
			return lotteryHall;
		},
		sideBars: function(state){
			return state.sideBars;
		},
		isdraws: function(state){
			return state.isdraws;
		},
		changetypes: function(state){
			return state.changetypes;
		}
	},
	actions: {
		gotoKefu({dispatch, commit, state}){
			api.kefu({
				username:state.user.username
			}).then(res=>{
				if(res.code == 0){
					uni.navigateTo({
						url:'/pages/webview/webview?url=' + encodeURIComponent(res.data.value) + "&title=客服中心"// + res.data.name
					})
				}
				uni.showToast({
					title:res.message
				})
			});
		},
		getLotteryHall({dispatch, commit, state}, {userName, successCallBack}){
			api.getLotteryHall({
				username: userName,
				typeid:'',
				isopen:'1'
			}).then(res=>{
				if(res.code == 0){
					if(res.data.length > 0){
						res.data.forEach(item=>{
							item.iconUrl = api.getFileAccessHttpUrl(item.iconUrl);
						});
					}
					res.data.unshift({
						typeid: "",
						title: "全部彩种",
						name:'',
						id:-1
					})
					commit('SET_LOTTERY_HALL', res.data);
					successCallBack && successCallBack(res);
				}
			});
		},
		userdetails: function({dispatch, commit, state}, {username}){
			api.userdetails({
				username: username
			}).then(res=>{
				if(res.code == 0){
					commit('SET_USER_DETAILS', res.data);
				}
			})
		},
		getPersonalInfo: function({dispatch, commit, state}, userInfo){
			api.getPersonalInfo({
				username: userInfo.name,
				type:'2'
			}).then(res=>{
				if(res.code == 0){
					commit('SET_USER', res.data);
				}
			})
		},
		Logout:function({commit, state}){
			// var user = state.user;
			// if(undefined == user || null == user || '' == user){
			// 	user = uni.getStorageSync('USER_INFO');
			// }
			// console.log(user);
			// if(undefined !== user && null !== user && '' !== user){
			// 	api.loginout({
			// 		username: user.username
			// 	}).then(res=>{
			// 	});

			// }
			commit('SET_TOKEN_INFO', null);
			commit('SET_USER', null);
			uni.redirectTo({
				url:'/pages/public/login'
			})
		},
		// login
		login: async function({
			dispatch,
			commit,
			state
		}, userInfo) {
			return await new Promise((resolve, reject) => {
				api.login(userInfo).then(res=>{
					if(res.code == 0){
						commit('SET_TOKEN_INFO', res.data);
						commit('SET_REM_USER', userInfo);
						dispatch('getPersonalInfo', userInfo);
						dispatch('getLotteryHall', {
							userName: userInfo.name,
							successCallBack:successRes=>{
								resolve(res);
							}
						})
					}else{
						resolve(res);
					}
				}).catch(err=>{
					reject(err);
				});
			})
		},
		// login
		register: async function({
			dispatch,
			commit,
			state
		}, formData,userInfo) {
			return await new Promise((resolve, reject) => {
				var userInfo = {'name':formData.username, 'pass':formData.password};
				api.register(formData).then(res=>{
					if(res.code == 0){
						commit('SET_TOKEN_INFO', res.data);
						commit('SET_REM_USER', userInfo);
						dispatch('getPersonalInfo', userInfo);
						dispatch('getLotteryHall', {
							userName: userInfo.name,
							successCallBack:successRes=>{
								resolve(res);
							}
						})
					}else{
						resolve(res);
					}
				}).catch(err=>{
					reject(err);
				});
			})
		}
	}
})

export default store

import { http } from '@/common/service/service.js'
import configService from '@/common/service/config.service.js';
const apiService = {
	 //-----------------------用户相关--------------------
	 /**
	  * 用户登录
	  */
	login(params){
		return http.post('/public.logindo.do', params);
	},
	/**
	 * 用户注册
	 */
	register(params){
		return http.post('/public.register.do', params);
	},
	/**
	 * 找回密码
	 */
	getPassword(params){
		return http.post('/public.getPassword.do', params);
	},
	/**
	 * 设置新密码
	 */
	setPassword(params){
		return http.post('/public.setPassword.do', params);
	},
	/**
	 * 退出登陆
	 */
	loginout(params){
		return http.post('/public.loginout.do', params);
	},
	/**
	 * 获取个人信息
	 */
	getPersonalInfo(params){
		return http.post('/member.getPersonalInfo.do', params);
	},
	/**
	 * 获取绑定的银行信息
	 */
	getBindcard(params){
		return http.post('/member.getBindcard.do', params);
	},
	/**
	 * 绑定真实姓名
	 */
	 bindName(params){
		return http.post('/Account.bindName.do', params);
	},
	/**
	 * 绑定的银行信息
	 */
	bindBankcard(params){
		return http.post('/Apijiekou.bindBankcard.do', params);
	},
	/**
	 * 获取个人信息
	 */
	userdetails(params){
		return http.post('/index.userdetails.do', params);
	},
	/*-------活动---------*/
	//每日加奖
	getFanshui(params){
		return http.post('/activity.getFanshui.do', params);
	},
	//VIP晋级奖励
	getPromotion(params){
		return http.post('/activity.getPromotion.do', params);
	},
	//各种记录
	getDealRecord(params){
		return http.post('/Account.getDealRecord.do', params);
	},
	//充值记录
	getDepositRecord(params){
		return http.post('/Account.getDepositRecord.do', params);
	},
	//提现记录
	getWithdrawalRecord(params){
		return http.post('/Account.getWithdrawalRecord.do', params);
	},
	/*----------------游戏相关---------------------*/
	//获取彩票大厅彩种类别
	/**
	 * @param {username,typeid,isopen} params
	 */
	getLotteryHall(params){
		return http.post('/index.getLotteryHall.do', params);
	},
	//客服地址
	kefu(params){
		return http.post('/index.kefu.do', params);
	},
	//获取彩种数据
	/**
	 * @param {username,typeid} params
	 */
	getCpDetails(params){
		return http.post('/game.getCpDetails.do', params);
	},
	//获取彩票大厅彩种类别
	/**
	 * @param {lotteryname,num,expect} params
	 */
	getLotteryOpencodes(params){
		return http.post('/apijiekou.getLotteryOpencodes.do', params);
	},
	//获取实时开奖的期数和时间
	/**
	 * @param {username,cptype,lotteryname,expect,orderList} params
	 */
	getLotterytimes(params){
		return http.post('/apijiekou.getLotterytimes.do', params);
	},
	//购买彩票
	/**
	 * @param {Object} params
	 */
	getCpBuy(params){
		return http.post('/apijiekou.getCpBuy.do', params);
	},
	getChedan(params){
		return http.post('/apijiekou.getChedan.do', params);
	},
	//获取投注记录
	getBetRecord(params){
		return http.post('/member.getBetRecord.do', params);
	},
	//充值记录
	getRechargeList(params){
		return http.post('/Account.getRechargeList.do', params);
	},
	//充值
	getRecharge(params){
		return http.post('/apijiekou.getRecharge.do', params);
	},
	//提款
	tikuanOrder(params){
		return http.post('/apijiekou.tikuanOrder.do', params);
	},
	//公告版
	getGg(params){
		return http.post('/index.getGg.do', params);
	},
	//获取头像
	getFace(params){
		return http.post('/member.getFace.do', params);
	},
	//--------------代理---------------
	//代理概况
	getAgentDetails(params){
		return http.post('/apijiekou.getAgentDetails.do', params);
	},
	//代理统计
	getAgentStatistics(params){
		return http.post('/apijiekou.getAgentStatistics.do', params);
	},
	//代理手动开户(开代理和玩家户)
	agentAddUser(params){
		return http.post('/apijiekou.agentAddUser.do', params);
	},
	//开户链接生成
	addsignupLink(params){
		return http.post('/apijiekou.addsignupLink.do', params);
	},
	getLinklist(params){
		return http.post('/apijiekou.getLinklist.do', params);
	},
	delLink(params){
		return http.post('/apijiekou.delLink.do', params);
	},
	//获取下线会员
	getMemberList(params){
		return http.post('/apijiekou.getMemberList.do', params);
	},
	//获取代理游戏记录
	getAgentGameRecord(params){
		return http.post('/apijiekou.getAgentGameRecord.do', params);
	},
	//获取代理账变记录
	getAgentChangeList(params){
		return http.post('/apijiekou.getAgentChangeList.do', params);
	},
	//获取代理充提记录
	getAgentChargeWithdrawList(params){
		return http.post('/apijiekou.getAgentChargeWithdrawList.do', params);
	},
	//获取代理报表
	getAgentReportList(params){
		return http.post('/apijiekou.getAgentReportList.do', params);
	},
	//绑定手机
	bindPhone(params){
		return http.post('/member.bindPhone.do', params);
	},
	//绑定邮箱
	bindEmail(params){
		return http.post('/member.bindEmail.do', params);
	},
	//修改密码
	changePassword(params){
		return http.post('/member.changePassword.do', params);
	},
	//----------接口游戏---------------
	//接口游戏登录
	getLogin(params){
		return http.post('/zhenren.getLogin.do', params);
	},
	//接口游戏列表
	getList(params){
		return http.post('/zhenren.getList.do', params);
	},
	//接口游戏余额
	getBalance(params){
		return http.post('/member.getBalance.do', params);
	},
	//接口游戏存入
	getDeposit(params){
		return http.post('/zhenren.getDeposit.do', params);
	},
	//接口游戏转出
	getWithdrawal(params){
		return http.post('/zhenren.getWithdrawal.do', params);
	},
	/**
	 * 获取文件访问路径
	 * @param avatar
	 * @param subStr
	 * @returns {*}
	 */
	getFileAccessHttpUrl(avatar,subStr){
	    if(!subStr) subStr = 'http'
	    if(avatar && avatar.startsWith(subStr)){
	        return avatar;
	    }else{
	        return configService.staticDomainURL + "/" + avatar;
	    }
	},
	geMobielAccessHttpUrl(avatar,subStr){
	    if(!subStr) subStr = 'http'
	    if(avatar && avatar.startsWith(subStr)){
	        return avatar;
	    }else{
	        return configService.staticMobielURL + "/" + avatar;
	    }
	}

};

export default apiService;

let BASE_URL = ''
let staticMobielURL = ''
let LOTTERY_URL = ''

if (process.env.NODE_ENV == 'development') {
	// BASE_URL = 'http://ceshi.fc225.info' // 开发环境
	BASE_URL = 'https://api.qinaw.com/' // 开发环境
	staticMobielURL = 'http://localhost:8080'
  LOTTERY_URL = 'http://cp.fc212.info/' // 彩票地址
} else {
	BASE_URL = 'http://ceshi.fc225.info' // 生产环境
	staticMobielURL = 'http://35.220.168.80' // 生产环境
  LOTTERY_URL = 'http://cp.fc212.info/'  // 彩票地址
}
let staticDomainURL = BASE_URL;

const configService = {
	apiUrl: BASE_URL,
	lotteryUrl: LOTTERY_URL,
	staticDomainURL: staticDomainURL,
	staticMobielURL: staticMobielURL
};

export default configService

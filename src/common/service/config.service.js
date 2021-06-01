let BASE_URL = ''
let staticMobielURL = ''

if (process.env.NODE_ENV == 'development') {
	BASE_URL = 'http://ceshi.fc225.info' // 开发环境
	staticMobielURL = 'http://localhost:8080'
} else {
	BASE_URL = 'http://ceshi.fc225.info' // 生产环境

	staticMobielURL = 'http://35.220.168.80' // 生产环境
}
let staticDomainURL = BASE_URL;

const configService = {
	apiUrl: BASE_URL,
	staticDomainURL: staticDomainURL,
	staticMobielURL: staticMobielURL
};

export default configService

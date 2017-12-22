'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
	build: {
		env: require('./prod.env'),
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		productionSourceMap: false,
		// Gzip off by default as many popular static hosts such as
		// Surge or Netlify already gzip all static assets for you.
		// Before setting to `true`, make sure to:
		// npm install --save-dev compression-webpack-plugin
		productionGzip: false,
		productionGzipExtensions: ['js', 'css'],
		// Run the build command with an extra argument to
		// View the bundle analyzer report after build finishes:
		// `npm run build --report`
		// Set to `true` or `false` to always turn it on or off
		bundleAnalyzerReport: process.env.npm_config_report
	},
	dev: {
		env: require('./dev.env'),
		port: process.env.PORT || 9024,
		autoOpenBrowser: true,
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: {
			'/user/login': {
				target: 'http://192.168.1.252:3001',
			},
			'/trip': {
				target: 'http://192.168.1.252:3001',
			},
			'/trip/listMyApply': {
				target: 'http://192.168.1.252:3001',
			},
			'/trip/listActingAll': {
				target: 'http://192.168.1.252:3001',
			},
			'/trip/audit': {
				target: 'http://192.168.1.252:3001',
			},
			'/hotel/search': {
				target: 'http://192.168.1.252:3001',
			},
			'/hotel/detail': {
				target: 'http://192.168.1.252:3001',
			},
			'/shopping/query': {
				target: 'http://192.168.1.252:3001',
			},
			'/trip/applyDetail/':{
				target: 'http://192.168.1.252:3001',
			},
			'/shopping/orderConfirm':{
				target: 'http://192.168.1.252:3001',
			},
			'/order/create':{
				target: 'http://192.168.1.252:3001',
			},
			'/hotel/orderNew':{
				target: 'http://192.168.1.252:3001',
			},
			'/pay/hotelPay':{
				target: 'http://192.168.1.252:3001',
			},
			'/hotel/orderDetail':{
				target: 'http://192.168.1.252:3001',
			},
			'/hotel/orderCancel':{
				target: 'http://192.168.1.252:3001',
			},
			'/common/hotelcity':{
				target: 'http://192.168.1.252:3001',
			},
			'/pay/tmcPay':{
				target: 'http://192.168.1.252:3001',
			},
			'/rule':{
				target: 'http://192.168.1.252:3001',
			},
			'/train':{
				target: 'http://192.168.1.252:3001',
			},
			'/trainTicketRule':{
				target: 'http://192.168.1.252:3001',
			},
			'/user/save':{
				target: 'http://192.168.1.252:3001',
			},
			'/user/list':{
				target: 'http://192.168.1.252:3001',
			},
			'/user/detail/':{
				target: 'http://192.168.1.252:3001',
			},
			'/user/update/':{
				target: 'http://192.168.1.252:3001',
			},
			'/user/remove/':{
				target: 'http://192.168.1.252:3001',
			},
			'/common/hotelcitydistrict/':{
				target: 'http://192.168.1.252:3001',
			},
			'/refundEndorse':{
				target: 'http://192.168.1.252:3001',
			}
		},
		// CSS Sourcemaps off by default because relative paths are "buggy"
		// with this option, according to the CSS-Loader README
		// (https://github.com/webpack/css-loader#sourcemaps)
		// In our experience, they generally work as expected,
		// just be aware of this issue when enabling this option.
		cssSourceMap: false
	}
}
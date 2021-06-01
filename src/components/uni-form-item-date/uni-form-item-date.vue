<template>
	<view class="uni-flex uni-row uni-form-item-date">
		<view style="width: 200rpx;" class="uni-form-item-date__label">
			<text>{{label}}</text>
		</view>
		<view style="-webkit-flex: 1;flex: 1;"></view>
		<uni-datetime-picker style="width: fit-content;" :value="datetime" @change="datetimeChange"></uni-datetime-picker>
	</view>
</template>

<script>
	import uniIcons from '../uni-icons/uni-icons.vue'
	/**
	 * Combox 组合输入框
	 * @description 组合输入框一般用于既可以输入也可以选择的场景
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=1261
	 * @property {String} label 左侧文字
	 * @property {String} labelWidth 左侧内容宽度
	 * @property {String} date 日期
	 */
	export default {
		name: 'uniCombox',
		components: {
			uniIcons
		},
		props: {
			label: {
				type: String,
				default: ''
			},
			datetime: {
				type: String,
				default: new Date()
			}
		},
		data() {
			return {
			}
		},
		methods: {
			datetimeChange(e) {
				this.datetime = e
				this.$emit('datetimeChange', this.datetime)
			}
		}
	}
</script>

<style scoped>
	.uni-form-item-date {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		height: 40px;
		flex-direction: row;
		align-items: center;
		background: #ffffff;
	}

	.uni-form-item-date__label {
		font-size: 30rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #3E3E3E;
		line-height: 40px;
		padding: 0 20px;
	}

	.uni-combox__input-box {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		align-items: center;
		text-align: right;
	}

	.uni-combox__input {
		flex: 1;
		font-size: 16px;
		height: 22px;
		line-height: 22px;
	}

	.uni-combox__input-arrow {
		padding: 10px;
	}

	.uni-combox__selector {
		box-sizing: border-box;
		position: absolute;
		top: 42px;
		left: 0;
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 6px;
		box-shadow: #DDDDDD 4px 4px 8px, #DDDDDD -4px -4px 8px;
		z-index: 2;
	}

	.uni-combox__selector-scroll {
		max-height: 200px;
		box-sizing: border-box;
	}

	.uni-combox__selector::before {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		border-bottom: solid 6px #FFFFFF;
		border-right: solid 6px transparent;
		border-left: solid 6px transparent;
		left: 50%;
		top: -6px;
		margin-left: -6px;
	}

	.uni-combox__selector-empty,
	.uni-combox__selector-item {
		/* #ifdef APP-NVUE */
		display: flex;
		/* #endif */
		line-height: 36px;
		font-size: 14px;
		text-align: center;
		border-bottom: solid 1px #DDDDDD;
		margin: 0px 10px;
		cursor: pointer;
	}

	.uni-combox__selector-empty:last-child,
	.uni-combox__selector-item:last-child {
		border-bottom: none;
	}
</style>

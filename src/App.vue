<script>
import { mapMutations } from "vuex";
export default {
  onLaunch: function () {},
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  globalData: {
    test: "",
  },
  methods: {
    ...mapMutations(["setUniverifyErrorMsg", "setUniverifyLogin"]),
  },
};
</script>

<style>
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import "./common/uni.css";
uni-page-body {
  background-color: #f5f5f5 !important;
  min-height: 100% !important;
  height: auto !important;
  font-family: PingFang;
}

.uni-tabbar__label {
  font-weight: 500;
}

page {
  background-color: #efeff4;
  height: 100%;
  font-size: 28rpx;
  line-height: 1.8;
}

.tip-text {
  margin: 20rpx 50rpx;
  font-size: 30rpx;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #9e9e9e;
  line-height: 26rpx;
  text-align: center;
}

uni-button {
  border-radius: 100rpx;
  font-size: 28rpx;
  color: #ffffff;
}

uni-button[type="primary"] {
  color: #fff;
  background-color: #697aff;
}

.button-hover[type="primary"] {
  color: #fff;
  background-color: #a091ff;
}

.tab-button {
  background: #fff !important;
  color: #929292 !important;
  border: 1px solid #d5d5d5;
  border-radius: 100rpx;
  font-size: 25rpx;
  font-weight: 500;
}

.tab-button-active {
  background: linear-gradient(90deg, #9b98ff, #40b9ff) !important;
  color: #ffffff !important;
  border: 1px solid #d5d5d5 !important;
}

.form-row {
  margin: 20rpx 30rpx;
}

.uni-easyinput {
  border-radius: 30rpx !important;
}

.uni-easyinput__content {
  border-radius: 50rpx !important;
}

.tool-btn {
  padding: 17rpx;
  width: 41rpx;
  height: 41rpx;
  border-radius: 41rpx;
  background: #8a94e4f0;
}

.tool-image {
  width: 41rpx;
  height: 41rpx;
}

.content {
  background: #efeff4;
  overflow: hidden;
}

.panel-info {
  margin-bottom: 20rpx;
  p {
    font-size: 21rpx;
    font-family: PingFang;
    font-weight: 500;
    color: #777777;
    line-height: 38rpx;
  }

  .uni-input-wrapper {
    border: 1rpx solid #000 !important;
  }
}

.form-items {
  margin-top: 20rpx;
  .uni-form-item-date {
    border-bottom: 1rpx solid #eaeaea;
  }
}

/* .uni-icons{
		color: rgb(187, 187, 187) !important;
		font-size: 16px !important;
	} */

.pay-info {
  padding: 10rpx 30rpx;
  font-size: 25rpx;
  font-family: PingFang;
  font-weight: 500;
  color: #737373;
  line-height: 42rpx;
}
</style>

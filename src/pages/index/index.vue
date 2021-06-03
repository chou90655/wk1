<template>
  <view class="content">
    <uni-nav-bar backgroundColor="#697AFF" color="#ffffff" title="购彩大厅">
    </uni-nav-bar>
    <view style="background: #efeff4; padding: 0 20rpx; overflow: hidden">
      <scroll-view class="game-sidebar" scroll-x="true">
        <view
          class="tab-bar-btn"
          v-for="(item, index) in sideBars"
          :key="index"
          :class="{ active: index == sideBarIndex }"
          @click="switchSideBar(index)"
        >
          <text class="sidebar-title">{{ item.title }}</text>
        </view>
      </scroll-view>
    </view>
    <scroll-view class="gamge-content" scroll-y="true">
      <view class="gamge-gamges">
        <uni-row>
          <uni-col :span="8" v-for="(item, index) in games" :key="index">
            <view
              v-if="item.id > 0"
              class="game-content"
              @click="gotoBet(item)"
            >
              <view style="padding-top: 10rpx"
                ><image
                  class="game-icon"
                  :src="item.iconUrl"
                  mode="aspectFit"
                ></image
              ></view>
              <p class="game-title">{{ item.title }}</p>
              <p class="game-desc">{{ item.ftitle }}</p>
            </view>
          </uni-col>
        </uni-row>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import api from "@/api/api.js";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  components: {},
  computed: {
    ...mapGetters(["user", "lotteryHall"]),
    games() {
      var games = this.lotteryHall;
      var typeid = this.sideBarType;
      if (typeid != "") {
        games = this.lotteryHall.filter((item) => {
          return item.typeid == typeid;
        });
      }
      return games;
    },
  },
  data() {
    return {
      sideBarType: "",
      sideBarIndex: 0,
      sideBars: [
        {
          title: "全部彩种",
          type: "",
        },
        {
          title: "快三",
          type: "k3",
        },
        {
          title: "时时彩",
          type: "ssc",
        },
        {
          title: "快乐八",
          type: "keno",
        },
        {
          title: "赛车PK拾",
          type: "pk10",
        },
        {
          title: "3D",
          type: "dpc",
        },
        {
          title: "六合彩",
          type: "lhc",
        },
        {
          title: "十一选五",
          type: "x5",
        },
      ],
    };
  },
  onShow() {},
  methods: {
    switchSideBar(index) {
      this.sideBarIndex = index;
      this.sideBarType = this.sideBars[index].type;
    },
    gotoBet(item) {
      uni.showToast({
        title: "暂未开放，敬请期待",
        icon: "none",
      });
      uni.navigateTo({
        url: "/pages/lottery/index?code=" + item.name + "&fcode=" + item.typeid,
      });
    },
  },
};
</script>

<style lang="scss">
.game-sidebar {
  white-space: nowrap;
  width: 100%;
  height: 100rpx;
  .active {
    background: linear-gradient(90deg, #9b98ff, #40b9ff) !important;

    .sidebar-title {
      color: #ffffff !important;
    }
  }
  .tab-bar-btn {
    width: 150rpx;
    height: 72rpx;
    margin: 14rpx 10rpx;
    display: inline-block;
    border-radius: 72rpx;
    text-align: center;
    border: 1rpx solid #d5d5d5;
    background: #fff;

    .sidebar-title {
      font-size: 23rpx;
      font-family: PingFang;
      font-weight: 500;
      color: #929292;
      line-height: 72rpx;
    }
  }
}
.gamge-content {
  // margin-left: 5%;
  margin-top: 10rpx;
  height: calc(100vh - 220rpx);
  .gamge-gamges {
    border-radius: 30rpx;
    overflow: scroll;
    padding: 5rpx 10rpx;
    .game-content {
      background: #fff;
      width: 80%;
      margin-left: 10%;
      text-align: center;
      border-radius: 20rpx;
      margin-bottom: 20rpx;
      .game-title {
        font-size: 23rpx;
        font-family: PingFang;
        font-weight: 800;
        color: #000000;
        text-align: center;
      }
      .game-desc {
        font-size: 18rpx;
        font-family: PingFang;
        font-weight: 500;
        color: #a0a0a0;
        text-align: center;
      }

      .game-icon {
        width: 100rpx;
        height: 100rpx;
      }
    }
  }
}
</style>
